/* Stellina activity engine: choice, sort, fill, order, pick and model parts, in Italian or Spanish. */
(function () {
  const UI = {
    it: {
      next: 'Avanti →', retry: ['Riprova!', 'Quasi! Prova ancora.', 'Non è questa. Riprova!'],
      ok: ['Giusto!', 'Bravissima!', 'Perfetto!', 'Esatto!'], done: 'Finito!',
      score: (a, b) => `${a} su ${b} al primo colpo`, again: 'Rifai', nextPart: 'Parte successiva →', menu: '← Menu',
      check: 'Controlla', first: 'prima', last: 'dopo', tapOrder: "Tocca le carte nell'ordine giusto.",
      orderWrong: n => n === 1 ? 'Una carta è al posto sbagliato: torna giù!' : `${n} carte sono al posto sbagliato: tornano giù!`,
      bank: 'Tocca la parola giusta:', pickTitle: 'Nel compito puoi scrivere:', doneBtn: 'Fatto!', part: 'Parte'
    },
    es: {
      next: 'Siguiente →', retry: ['¡Probá de nuevo!', '¡Casi! Probá otra vez.', 'No es esa. ¡Probá de nuevo!'],
      ok: ['¡Bien!', '¡Bravísima!', '¡Perfecto!', '¡Exacto!'], done: '¡Terminado!',
      score: (a, b) => `${a} de ${b} al primer intento`, again: 'Otra vez', nextPart: 'Siguiente parte →', menu: '← Menú',
      check: 'Revisar', first: 'antes', last: 'después', tapOrder: 'Tocá las cartas en el orden correcto.',
      orderWrong: n => n === 1 ? 'Una carta está en el lugar equivocado: ¡vuelve abajo!' : `${n} cartas están en el lugar equivocado: ¡vuelven abajo!`,
      bank: 'Tocá la palabra correcta:', pickTitle: 'En la prueba podés escribir:', doneBtn: '¡Listo!', part: 'Parte'
    }
  };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pickOne = a => a[Math.floor(Math.random() * a.length)];

  let ac = null;
  function beep(freqs, dur = 0.12, gap = 0.09, type = 'sine', vol = 0.12) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      freqs.forEach((f, i) => {
        const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + i * gap;
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur + 0.15);
        o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + dur + 0.2);
      });
    } catch (e) {}
  }
  const sOk = () => beep([660, 880], 0.12, 0.08, 'triangle', 0.12);
  const sNo = () => beep([300, 220], 0.15, 0.12, 'triangle', 0.1);
  const sWin = () => beep([523, 659, 784, 1047], 0.18, 0.11, 'triangle', 0.15);

  function confetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = $('confetti'), x = c.getContext('2d');
    const W = c.width = innerWidth, H = c.height = innerHeight;
    const cols = ['#f2b33d', '#e8604c', '#5fbf74', '#6aa6ff', '#f496a0', '#b38cf0'];
    const P = Array.from({ length: 150 }, () => ({ x: W / 2 + (Math.random() - .5) * W * .3, y: H * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, r: Math.random() * 3, vr: (Math.random() - .5) * .3, c: cols[Math.floor(Math.random() * cols.length)], s: 6 + Math.random() * 6 }));
    let f = 0;
    (function tick() {
      x.clearRect(0, 0, W, H);
      P.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s, -p.s / 3, p.s * 2, p.s * .66); x.restore(); });
      if (++f < 140) requestAnimationFrame(tick); else x.clearRect(0, 0, W, H);
    })();
  }

  window.mountActivity = function (PAGE) {
    const S = { lang: store.get('lang', 'it'), part: 0, stars: store.get('stars', 0), st: null };
    const L = o => (o && typeof o === 'object' && !Array.isArray(o) && ('it' in o || 'es' in o)) ? o[S.lang] : o;
    const U = () => UI[S.lang];

    document.body.insertAdjacentHTML('afterbegin', `
      <canvas id="confetti" aria-hidden="true"></canvas>
      <div class="wrap">
        <div class="topbar">
          <a class="back" id="back" href="index.html"></a>
          <div class="seg" role="group" aria-label="Lingua / Idioma">
            <button type="button" id="lang-it">Italiano</button>
            <button type="button" id="lang-es">Español</button>
          </div>
          <span class="stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" fill="#f2b33d" stroke="#23263a" stroke-width="1.5" stroke-linejoin="round"/></svg><span id="stars-n">0</span></span>
        </div>
        <header class="hero">
          <img class="mascot" id="mascot" src="img/mascot.png" alt="">
          <div><h1 id="title"></h1><p class="bubble" id="msg" role="status" aria-live="polite"></p></div>
        </header>
        <div class="seg" role="group" id="parts"></div>
        <section class="board" id="stage"></section>
      </div>`);

    function say(text, kind) {
      $('msg').textContent = text;
      $('msg').className = 'bubble' + (kind ? ' ' + kind : '');
    }
    function jump(wow) {
      const m = $('mascot'); m.src = wow ? 'img/mascot-wow.png' : 'img/mascot.png';
      m.classList.remove('jump'); void m.offsetWidth; m.classList.add('jump');
    }
    function chrome() {
      document.documentElement.lang = S.lang;
      $('back').textContent = U().menu;
      $('title').innerHTML = L(PAGE.title);
      ['it', 'es'].forEach(l => $('lang-' + l).setAttribute('aria-pressed', String(S.lang === l)));
      $('stars-n').textContent = S.stars;
      $('parts').innerHTML = PAGE.parts.map((p, i) => `<button type="button" data-i="${i}" aria-pressed="${i === S.part}">${i + 1} · ${esc(L(p.name))}</button>`).join('');
      $('parts').querySelectorAll('button').forEach(b => b.addEventListener('click', () => startPart(+b.dataset.i)));
    }
    function addStar() { S.stars += 1; store.set('stars', S.stars); $('stars-n').textContent = S.stars; }

    function dots(n, i) { return `<div class="dots" aria-hidden="true">${Array.from({ length: n }, (_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}"></span>`).join('')}</div>`; }

    function finish() {
      const st = S.st, p = PAGE.parts[S.part];
      addStar(); sWin(); confetti(); jump(true);
      say(U().done, 'good');
      const hasScore = st.total > 0;
      const nextBtn = S.part < PAGE.parts.length - 1 ? `<button type="button" class="btn" id="nextpart">${U().nextPart}</button>` : `<a class="btn" href="index.html">${U().menu}</a>`;
      $('stage').innerHTML = `<div class="finish"><div class="big">★</div><h2>${U().done}</h2>${hasScore ? `<p class="prompt">${U().score(st.first, st.total)}</p>` : ''}${p.after ? `<div class="paper" style="text-align:left;justify-self:stretch">${p.after.map(b => `<p class="q">${esc(L(b.q))}</p>${L(b.lines).map(l => `<p>${esc(l)}</p>`).join('')}`).join('')}</div>` : ''}<div class="actions"><button type="button" class="btn secondary" id="again">${U().again}</button>${nextBtn}</div></div>`;
      $('again').addEventListener('click', () => startPart(S.part));
      const nb = $('nextpart'); if (nb) nb.addEventListener('click', () => startPart(S.part + 1));
    }

    // ---------------------------------------------------------------- choice / sort
    function startQuiz(p) {
      S.st = { order: p.shuffle === false ? p.items.map((_, i) => i) : shuffle(p.items.map((_, i) => i)), i: 0, first: 0, total: p.items.length, wrong: false, binsFill: (p.bins || []).map(() => []) };
      renderQuiz(p);
    }
    function renderQuiz(p) {
      const st = S.st;
      if (st.i >= st.order.length) return finish();
      const it = p.items[st.order[st.i]];
      st.wrong = false;
      say(L(p.intro), '');
      $('mascot').src = 'img/mascot.png';
      let h = dots(st.total, st.i);
      if (p.type === 'choice') {
        st.opts = p.fixedOptions ? it.options.map((_, i) => i) : shuffle(it.options.map((_, i) => i));
        const tiles = it.options.some(o => o.img);
        h += `<p class="prompt">${esc(L(it.prompt))}</p>`;
        if (it.img) h += `<img class="pic" src="${it.img}" alt="">`;
        h += `<div class="opts${tiles ? ' tiles' : ''}">` + st.opts.map(k => {
          const o = it.options[k];
          return `<button type="button" class="opt" data-k="${k}">${o.img ? `<img src="${o.img}" alt="">` : ''}<span>${esc(L(o.label || o))}</span></button>`;
        }).join('') + '</div>';
      } else {
        h += `<div class="item${it.img ? '' : ' noimg'}">${it.img ? `<img src="${it.img}" alt="">` : ''}<p>${esc(L(it.label))}</p></div>`;
        h += `<div class="bins" style="--bins:${p.bins.length}">` + p.bins.map((b, k) => `<button type="button" class="bin b${k}" data-k="${k}"><h3>${esc(L(b))}</h3>${st.binsFill[k].map(x => `<span class="mini">${esc(L(x))}</span>`).join('')}</button>`).join('') + '</div>';
      }
      h += `<p class="explain" id="explain" hidden></p><div class="actions"><button type="button" class="btn" id="next" hidden>${U().next}</button></div>`;
      $('stage').innerHTML = h;
      const answer = p.type === 'choice' ? it.answer : it.bin;
      $('stage').querySelectorAll(p.type === 'choice' ? '.opt' : '.bin').forEach(b => b.addEventListener('click', () => {
        if (st.solved) return;
        const k = +b.dataset.k;
        if (k === answer) {
          st.solved = true;
          if (!st.wrong) st.first += 1;
          if (p.type === 'choice') { b.classList.add('ok'); $('stage').querySelectorAll('.opt').forEach(o => o.disabled = true); }
          else { st.binsFill[k].push(it.short || it.label); b.insertAdjacentHTML('beforeend', `<span class="mini">${esc(L(it.short || it.label))}</span>`); }
          sOk(); jump(true); say(pickOne(U().ok), 'good');
          if (it.explain) { $('explain').hidden = false; $('explain').textContent = L(it.explain); }
          $('next').hidden = false; $('next').focus();
        } else {
          st.wrong = true; sNo();
          b.classList.remove('no'); void b.offsetWidth; b.classList.add('no');
          if (p.type === 'choice') b.disabled = true;
          say(pickOne(U().retry), 'bad');
        }
      }));
      st.solved = false;
      $('next').addEventListener('click', () => { st.i += 1; renderQuiz(p); });
    }

    // ---------------------------------------------------------------- fill in the blank
    function startFill(p) {
      S.st = { i: 0, first: 0, total: p.items.length, bank: shuffle(p.items.map((_, k) => k)), wrong: false };
      renderFill(p);
    }
    function renderFill(p) {
      const st = S.st;
      if (st.i >= p.items.length) return finish();
      const it = p.items[st.i];
      st.wrong = false;
      say(L(p.intro), ''); $('mascot').src = 'img/mascot.png';
      const parts = L(it.text).split('___');
      $('stage').innerHTML = dots(st.total, st.i) +
        `<div class="sentence">${esc(parts[0])}<span class="blank" id="blank">&nbsp;</span>${esc(parts[1] || '')}</div>` +
        `<p class="prompt" style="font-size:1.1rem">${U().bank}</p><div class="bank">` +
        st.bank.map(k => `<button type="button" class="chip" data-k="${k}">${esc(L(p.items[k].answer))}</button>`).join('') + '</div>';
      $('stage').querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
        const k = +b.dataset.k;
        if (k === st.i) {
          if (!st.wrong) st.first += 1;
          $('blank').textContent = L(it.answer); $('blank').classList.add('ok');
          st.bank = st.bank.filter(x => x !== k);
          b.remove(); sOk(); jump(true); say(pickOne(U().ok), 'good');
          $('stage').querySelectorAll('.chip').forEach(c => c.disabled = true);
          setTimeout(() => { st.i += 1; renderFill(p); }, 1300);
        } else {
          st.wrong = true; sNo(); b.classList.remove('no'); void b.offsetWidth; b.classList.add('no');
          say(pickOne(U().retry), 'bad');
        }
      }));
    }

    // ---------------------------------------------------------------- order
    function startOrder(p) {
      const n = p.items.length;
      let pool = shuffle(p.items.map((_, k) => k));
      while (pool.every((v, i) => v === i)) pool = shuffle(pool);
      S.st = { pool, slots: Array(n).fill(null), locked: Array(n).fill(false), first: 0, total: 0, tries: 0 };
      renderOrder(p);
    }
    function renderOrder(p, msg) {
      const st = S.st, n = p.items.length;
      if (!msg) say(L(p.intro) || U().tapOrder, '');
      const card = (k, where, i) => `<button type="button" class="card${where === 'slot' && st.locked[i] ? ' ok' : ''}" data-k="${k}" data-where="${where}" data-i="${i ?? ''}"><img src="${p.items[k].img}" alt=""><span>${esc(L(p.items[k].label))}</span></button>`;
      const cols = n > 5 ? 4 : n;
      $('stage').innerHTML = `<div class="row-label"><span>${U().first}</span><span class="arrow"></span><span>${U().last}</span></div>
        <div class="slots" style="--cols:${cols}">${st.slots.map((k, i) => `<div class="slot${k !== null ? ' filled' : ''}"><span class="ord">${i + 1}</span>${k !== null ? card(k, 'slot', i) : ''}</div>`).join('')}</div>
        <div class="pool" style="--cols:${cols}">${st.pool.map(k => card(k, 'pool')).join('')}</div>
        <div class="actions"><button type="button" class="btn" id="check" ${st.slots.includes(null) ? 'disabled' : ''}>${U().check}</button></div>`;
      $('stage').querySelectorAll('.card').forEach(b => b.addEventListener('click', () => {
        const k = +b.dataset.k;
        if (b.dataset.where === 'pool') {
          const i = st.slots.indexOf(null); if (i < 0) return;
          st.slots[i] = k; st.pool = st.pool.filter(x => x !== k); beep([520 + i * 60], 0.08);
        } else {
          const i = +b.dataset.i; if (st.locked[i]) return;
          st.pool.push(k); st.slots[i] = null; beep([330], 0.08);
        }
        renderOrder(p);
      }));
      $('check').addEventListener('click', () => {
        const wrong = [];
        st.slots.forEach((k, i) => { if (k === i) st.locked[i] = true; else wrong.push(i); });
        if (!wrong.length) return finish();
        sNo(); say(U().orderWrong(wrong.length), 'bad');
        $('stage').querySelectorAll('.slot').forEach((el, i) => { if (wrong.includes(i)) { const c = el.querySelector('.card'); if (c) c.classList.add('no'); } });
        setTimeout(() => { wrong.forEach(i => { st.pool.push(st.slots[i]); st.slots[i] = null; }); st.pool = shuffle(st.pool); renderOrder(p, true); }, 1300);
      });
    }

    // ---------------------------------------------------------------- pick (favourite) and model answers
    function startPick(p) {
      S.st = { first: 0, total: 0 };
      say(L(p.intro), ''); $('mascot').src = 'img/mascot.png';
      $('stage').innerHTML = `<div class="opts tiles">${p.options.map((o, k) => `<button type="button" class="opt" data-k="${k}"><img src="${o.img}" alt=""><span>${esc(L(o.label))}</span></button>`).join('')}</div><div id="model"></div>`;
      $('stage').querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
        $('stage').querySelectorAll('.opt').forEach(o => o.classList.remove('ok'));
        b.classList.add('ok'); sOk(); jump(true);
        const o = p.options[+b.dataset.k];
        $('model').innerHTML = `<div class="paper"><p class="q">${U().pickTitle}</p>${L(o.model).map(l => `<p>${esc(l)}</p>`).join('')}</div><div class="actions" style="margin-top:12px"><button type="button" class="btn" id="pdone">${U().doneBtn}</button></div>`;
        $('pdone').addEventListener('click', finish);
        $('model').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }));
    }
    function startModel(p) {
      S.st = { first: 0, total: 0 };
      say(L(p.intro), ''); $('mascot').src = 'img/mascot.png';
      $('stage').innerHTML = p.blocks.map(b => `${b.img ? `<img class="pic" src="${b.img}" alt="">` : ''}<div class="paper"><p class="q">${esc(L(b.q))}</p>${L(b.lines).map(l => `<p>${esc(l)}</p>`).join('')}</div>`).join('') +
        `<div class="actions"><button type="button" class="btn" id="mdone">${U().doneBtn}</button></div>`;
      $('mdone').addEventListener('click', finish);
    }

    function startPart(i) {
      S.part = i; chrome();
      const p = PAGE.parts[i];
      ({ choice: startQuiz, sort: startQuiz, fill: startFill, order: startOrder, pick: startPick, model: startModel })[p.type](p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    ['it', 'es'].forEach(l => $('lang-' + l).addEventListener('click', () => { S.lang = l; store.set('lang', l); startPart(S.part); }));
    const h = (location.hash || '').replace('#p', '');
    startPart(/^\d+$/.test(h) && +h >= 1 && +h <= PAGE.parts.length ? +h - 1 : 0);
  };
})();
