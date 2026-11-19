/* Rondì's geography games: word pairs, fill the definition, label the pictures, sort into columns, fill the table.
   Cards can be dragged onto their place, or tapped and then tapped on the place (easier on a phone).
   Rondì speaks the feedback through recorded lines in audio/ (recorded by src/geografia/voice.py). */
(function () {
  const G = window.GEO, A = window.ART;
  const $ = s => document.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  /* the sentence Rondì reads for a word and its definition (src/geografia/voice.py builds the same string) */
  const defLine = it => `${it.w}: ${it.d.toLowerCase()}.`;

  /* ------------------------------------------------ sounds, confetti, voice */
  let ac = null;
  function beep(freqs, dur = .12, gap = .09, type = 'triangle', vol = .12) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      freqs.forEach((f, i) => {
        const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + i * gap;
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(.001, t0 + dur + .15);
        o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + dur + .2);
      });
    } catch (e) {}
  }
  const sOk = () => beep([660, 880], .12, .08);
  const sNo = () => beep([300, 220], .15, .12, 'triangle', .1);
  const sWin = () => beep([523, 659, 784, 1047], .18, .11, 'triangle', .15);
  function confetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = $('#confetti'), x = c.getContext('2d');
    const W = c.width = innerWidth, H = c.height = innerHeight;
    const cols = ['#d63c8f', '#f59ac4', '#f2b33d', '#7cc4e8', '#a9d57f', '#b38cf0'];
    const P = Array.from({ length: 150 }, () => ({ x: W / 2 + (Math.random() - .5) * W * .3, y: H * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, r: Math.random() * 3, vr: (Math.random() - .5) * .3, c: pick(cols), s: 6 + Math.random() * 6 }));
    let f = 0;
    (function tick() {
      x.clearRect(0, 0, W, H);
      P.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s, -p.s / 3, p.s * 2, p.s * .66); x.restore(); });
      if (++f < 140) requestAnimationFrame(tick); else x.clearRect(0, 0, W, H);
    })();
  }
  const Voice = (() => {
    const hash = s => { let h = 0x811c9dc5; for (const b of new TextEncoder().encode(s)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
    const audio = new Audio();
    let queue = [], on = store.get('geo:voice', true);
    const next = () => { const s = queue.shift(); if (s === undefined) return; audio.src = `audio/${hash(s)}.m4a`; audio.play().catch(() => { queue = []; }); };
    audio.addEventListener('ended', next);
    audio.addEventListener('error', next);
    const ON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    const OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    const btn = $('#voice');
    const paint = () => { btn.innerHTML = on ? ON : OFF; btn.setAttribute('aria-pressed', String(on)); btn.title = on ? 'Voce di Rondì: accesa' : 'Voce di Rondì: spenta'; };
    btn.addEventListener('click', () => { on = !on; store.set('geo:voice', on); if (!on) { queue = []; audio.pause(); } paint(); });
    paint();
    return {
      say(lines, force) { queue = [].concat(lines).filter(Boolean); audio.pause(); if (on || force) next(); else queue = []; },
      stop() { queue = []; audio.pause(); }
    };
  })();

  /* ------------------------------------------------ Rondì */
  const S = { stars: store.get('geo:stars', 0) };
  const mascot = $('#mascot');
  function pose(wow) {
    mascot.innerHTML = A.rondi(wow ? 'wow' : '');
    if (wow) { mascot.classList.remove('jump'); void mascot.offsetWidth; mascot.classList.add('jump'); clearTimeout(pose.t); pose.t = setTimeout(() => pose(false), 1400); }
  }
  pose(false);
  function say(text, kind, spoken) {
    $('#msg').textContent = text;
    $('#msg').className = 'bubble' + (kind ? ' ' + kind : '');
    if (spoken !== false) Voice.say(spoken || text);
  }
  function addStar() { S.stars++; store.set('geo:stars', S.stars); $('#stars-n').textContent = S.stars; }
  $('#stars-n').textContent = S.stars;

  /* ------------------------------------------------ drag or tap to place */
  let sel = null, hoverEl = null;
  function select(chip) {
    if (sel) sel.classList.remove('sel');
    sel = chip;
    if (sel) sel.classList.add('sel');
  }
  const dropAt = (x, y) => { const e = document.elementFromPoint(x, y); return e && e.closest('.drop:not(.full)'); };
  function setHover(t) { if (hoverEl === t) return; if (hoverEl) hoverEl.classList.remove('hover'); hoverEl = t; if (t) t.classList.add('hover'); }
  /* chip: an element with chip.data (whatever the game needs); onUse is optional */
  function chip(html, cls, data) {
    const c = el('div', 'chip ' + (cls || ''), html);
    c.data = data;
    c.setAttribute('role', 'button');
    c.tabIndex = 0;
    c.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      e.preventDefault();
      const r = c.getBoundingClientRect();
      const st = { x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, drag: false, ghost: null };
      try { c.setPointerCapture(e.pointerId); } catch (err) {}
      const move = ev => {
        if (!st.drag && Math.hypot(ev.clientX - st.x, ev.clientY - st.y) > 8) {
          st.drag = true; select(null);
          st.ghost = c.cloneNode(true); st.ghost.classList.add('ghost'); st.ghost.classList.remove('sel');
          st.ghost.style.width = r.width + 'px'; document.body.appendChild(st.ghost); c.classList.add('lifted');
        }
        if (st.drag) { st.ghost.style.left = (ev.clientX - st.dx) + 'px'; st.ghost.style.top = (ev.clientY - st.dy) + 'px'; setHover(dropAt(ev.clientX, ev.clientY)); }
      };
      const up = ev => {
        c.removeEventListener('pointermove', move); c.removeEventListener('pointerup', up); c.removeEventListener('pointercancel', up);
        if (st.drag) {
          st.ghost.remove(); c.classList.remove('lifted'); setHover(null);
          const t = ev.type === 'pointerup' && dropAt(ev.clientX, ev.clientY);
          if (t) attempt(c, t);
        } else select(sel === c ? null : c);
      };
      c.addEventListener('pointermove', move); c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
    });
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(sel === c ? null : c); } });
    return c;
  }
  /* drop zone: accept(chip) says if the chip belongs here; place(chip) is called when it does */
  function drop(node, accept, place) {
    node.classList.add('drop');
    node.accept = accept; node.place = place;
    node.addEventListener('click', () => { if (sel && !node.classList.contains('full')) attempt(sel, node); });
    return node;
  }
  function attempt(c, t) {
    select(null);
    if (t.accept(c)) {
      sOk();
      if (!c.missed) addStar();
      t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop');
      t.place(c);
    } else {
      c.missed = true;
      sNo();
      c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
      say(pick(G.ui.retry), 'no');
    }
  }
  const praise = () => pick(G.ui.ok);

  /* ------------------------------------------------ screens */
  const stage = $('#stage');
  const ROUTES = {};
  function frame(title, intro) {
    $('#title').textContent = title;
    $('#back').hidden = false;
    stage.innerHTML = '';
    const b = el('section', 'board');
    const bar = el('div', 'gbar');
    b.append(bar);
    stage.append(b);
    if (intro) say(intro);
    return { b, bar };
  }
  function progress(bar, i, n) { let p = bar.querySelector('.prog'); if (!p) { p = el('span', 'prog'); bar.append(p); } p.textContent = `${i} / ${n}`; }
  function finish(b, again, extra) {
    sWin(); confetti(); pose(true);
    const line = pick(G.ui.done);
    say(line, 'ok', [line].concat(extra || []));
    const d = el('div', 'done', `<b>${esc(line)}</b>`);
    const acts = el('div', 'actions');
    const r = el('button', 'btn', 'Rifai'); r.type = 'button'; r.onclick = again;
    const m = el('a', 'btn alt', '← Menu'); m.href = '#';
    acts.append(r, m); d.append(acts); b.append(d);
    d.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function nextButton(b, label, fn) {
    const acts = el('div', 'actions');
    const n = el('button', 'btn', label); n.type = 'button'; n.onclick = fn;
    acts.append(n); b.append(acts);
    n.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* -------- 1. word pairs: drag the word and the definition under the right picture */
  ROUTES.coppie = function () {
    const order = shuffle(G.pairs);
    let i = 0;
    const f = frame('Parole in coppia', G.intro.coppie);
    f.bar.append(el('span', 'note', 'La parola va sopra, la DEFINIZIONE sotto.'));
    const body = el('div'); body.style.display = 'grid'; body.style.gap = '14px'; f.b.append(body);
    function round() {
      const p = order[i], sides = shuffle([p.a, p.b]);
      progress(f.bar, i + 1, order.length);
      body.innerHTML = '';
      const grid = el('div', 'pairs'), bank = el('div', 'bank');
      let left = 4;
      sides.forEach(it => {
        const card = el('div', 'pcard');
        card.append(el('div', 'pic', A.pic[it.art]));
        let got = 0;
        const done = () => {
          got++;
          if (!left) {
            say(p.tip, 'ok', [defLine(it), p.tip]); pose(true);
            nextButton(body, i + 1 < order.length ? 'Avanti →' : 'Fine!', () => { i++; i < order.length ? round() : finish(f.b, ROUTES.coppie); });
          } else if (got === 2) { const pr = praise(); say(pr, 'ok', [pr, defLine(it)]); }
          else say(praise(), 'ok');
        };
        const w = drop(el('div', 'slot w', 'parola'), c => c.data.k === 'w' && c.data.it === it, c => { w.textContent = it.w; w.classList.add('full'); c.remove(); left--; done(); });
        const d = drop(el('div', 'slot d', 'definizione'), c => c.data.k === 'd' && c.data.it === it, c => { d.textContent = it.d; d.classList.add('full'); c.remove(); left--; done(); });
        card.append(w, d);
        grid.append(card);
      });
      shuffle([...sides.map(it => chip(esc(it.w), 'word', { k: 'w', it })), ...sides.map(it => chip(esc(it.d), 'def', { k: 'd', it }))]).forEach(c => bank.append(c));
      body.append(grid, bank);
    }
    round();
  };

  /* -------- 2. complete the definition */
  ROUTES.completa = function () {
    const items = shuffle(G.pairs.flatMap(p => [p.a, p.b])).slice(0, 8);
    let i = 0;
    const f = frame('Completa la definizione', G.intro.completa);
    const body = el('div'); body.style.display = 'grid'; body.style.gap = '14px'; f.b.append(body);
    function round() {
      const it = items[i];
      progress(f.bar, i + 1, items.length);
      body.innerHTML = '';
      const card = el('div', 'qcard');
      const right = el('div');
      right.append(el('div', 'w', esc(it.w) + ' ='));
      const [pre, post] = it.q.split('___');
      const dq = el('div', 'dq');
      dq.append(document.createTextNode(pre));
      const blank = drop(el('span', 'blank', '?'), c => c.data === it.ans, c => {
        blank.textContent = it.ans; blank.classList.add('full'); bank.remove();
        say(praise() + ' ' + it.d, 'ok', [praise(), defLine(it)]); pose(true);
        const ls = el('button', 'listen', '🔊 Ascolta'); ls.type = 'button'; ls.onclick = () => Voice.say(defLine(it), true);
        right.append(ls);
        nextButton(body, i + 1 < items.length ? 'Avanti →' : 'Fine!', () => { i++; i < items.length ? round() : finish(f.b, ROUTES.completa); });
      });
      dq.append(blank, document.createTextNode(post));
      right.append(dq);
      card.append(el('div', 'pic', A.pic[it.art]), right);
      const bank = el('div', 'bank');
      shuffle(it.opts).forEach(o => bank.append(chip(esc(o), 'def', o)));
      body.append(card, bank);
    }
    round();
  };

  /* -------- 3. label a picture */
  function labelGame(key, intro) {
    return function (level) {
      const sc = G.scenes[key];
      level = level || 1;
      const f = frame(sc.title, intro);
      if (sc.levels) {
        const seg = el('div', 'seg');
        sc.levels.forEach((t, k) => { const b = el('button', '', esc(t)); b.type = 'button'; b.setAttribute('aria-pressed', String(k + 1 === level)); b.onclick = () => ROUTES[key](k + 1); seg.append(b); });
        f.bar.append(seg);
      }
      const slots = sc.slots.filter(s => !s.level || s.level <= level);
      const wrap = el('div', 'scene' + (sc.h > sc.w ? ' tall' : ''));
      wrap.innerHTML = A[sc.art];
      const lines = slots.filter(s => s.a[0] !== s.l[0] || s.a[1] !== s.l[1]).map(s =>
        `<line x1="${s.a[0]}" y1="${s.a[1]}" x2="${s.l[0]}" y2="${s.l[1]}" stroke="#3b2235" stroke-width="3"/><circle cx="${s.a[0]}" cy="${s.a[1]}" r="7" fill="#d63c8f" stroke="#fff" stroke-width="2.5"/>`).join('');
      wrap.insertAdjacentHTML('beforeend', `<svg class="lines" viewBox="0 0 ${sc.w} ${sc.h}" preserveAspectRatio="none">${lines}</svg>`);
      let left = slots.length;
      const seen = {};
      const chips = [];
      slots.forEach(s => {
        const g = s.ans.join('|'); seen[g] = (seen[g] || 0);
        chips.push(s.ans[seen[g]++]);
        const n = drop(el('div', 'sl', '?'), c => s.ans.includes(c.data), c => {
          n.textContent = c.data; n.classList.add('full'); c.remove();
          if (--left) say(praise(), 'ok');
          else finish(f.b, () => ROUTES[key](level), sc.note ? [sc.note] : []);
          if (!left && sc.note) f.b.insertBefore(el('p', 'note', esc(sc.note)), f.b.querySelector('.done'));
        });
        n.style.left = (s.l[0] / sc.w * 100) + '%';
        n.style.top = (s.l[1] / sc.h * 100) + '%';
        wrap.append(n);
      });
      const bank = el('div', 'bank');
      shuffle(chips).forEach(t => bank.append(chip(esc(t), 'lbl', t)));
      f.b.append(wrap, bank);
    };
  }
  ROUTES.montagna = labelGame('montagna', G.intro.montagna);
  ROUTES.mare = labelGame('mare', G.intro.mare);
  ROUTES.italia = labelGame('italia', G.intro.italia);
  ROUTES.profilo = labelGame('profilo', G.intro.profilo);

  /* -------- 4. sort into columns */
  function sortBoard(parent, bins, cards, onDone) {
    const box = el('div', 'bins'); box.style.setProperty('--n', bins.length);
    let left = cards.length;
    bins.forEach(bn => {
      const col = el('div', 'bin');
      col.append(el('header', '', `<div class="pic">${bn.pic}</div><b>${esc(bn.t)}</b>${bn.s ? `<small>${esc(bn.s)}</small>` : ''}`));
      const list = el('div', 'list');
      col.append(list);
      drop(col, c => c.data.c === bn.id, c => {
        list.append(el('div', 'item', (c.data.e ? `<span class="e">${c.data.e}</span>` : '') + esc(c.data.t)));
        c.remove();
        col.classList.remove('full');
        if (--left) say(praise(), 'ok'); else onDone();
      });
      col.classList.remove('full');
      box.append(col);
    });
    const bank = el('div', 'bank');
    shuffle(cards).forEach(cd => bank.append(chip((cd.e ? `<span class="e">${cd.e}</span>` : '') + esc(cd.t), '', cd)));
    parent.append(box, bank);
  }
  ROUTES.citta = function () {
    const f = frame('Città o campagna?', G.intro.citta);
    const bins = G.citta.bins.map(b => ({ ...b, pic: b.id === 'citta' ? A.CITTA : A.CAMPAGNA }));
    sortBoard(f.b, bins, G.citta.cards, () => { f.b.append(el('p', 'note', esc(G.citta.tip))); finish(f.b, ROUTES.citta, [G.citta.tip]); });
  };
  const LBINS = () => G.landscapes.map(l => ({ id: l.id, t: l.t, pic: A.pic[l.art] }));
  ROUTES.righe = function () {
    let r = 0;
    const f = frame('La tabella, riga per riga', G.intro.righe);
    const body = el('div'); body.style.display = 'grid'; body.style.gap = '14px'; f.b.append(body);
    function round() {
      const row = G.rows[r];
      progress(f.bar, r + 1, G.rows.length);
      body.innerHTML = '';
      body.append(el('h2', '', `<span class="num">${r + 1}</span>${esc(row.t)}`));
      say(row.say);
      const cards = G.landscapes.flatMap(l => shuffle(row.items.filter(it => it.c === l.id)).slice(0, 3));
      sortBoard(body, LBINS(), cards, () => {
        pose(true);
        if (r + 1 < G.rows.length) { say(praise(), 'ok'); nextButton(body, 'Riga successiva →', () => { r++; round(); }); }
        else finish(f.b, ROUTES.righe);
      });
    }
    round();
  };

  /* -------- 5. the table, as in the test */
  ROUTES.tabella = function () {
    const f = frame('Completa la tabella', G.intro.tabella);
    const tab = el('div', 'tab');
    tab.append(el('div', 'th', ''));
    G.landscapes.forEach(l => tab.append(el('div', 'th ' + l.id, esc(l.t))));
    const bank = el('div', 'bank');
    const chips = [];
    let left = G.rows.length * G.landscapes.length;
    G.rows.forEach(row => {
      tab.append(el('div', 'rh', esc(row.cell)));
      G.landscapes.forEach(l => {
        const it = pick(row.items.filter(x => x.c === l.id));
        chips.push({ ...it, r: row.id });
        const cell = drop(el('div', 'cell', ''), c => c.data.r === row.id && c.data.c === l.id, c => {
          cell.innerHTML = (c.data.e ? `<span class="e">${c.data.e}</span>` : '') + esc(c.data.t);
          cell.classList.add('full'); c.remove();
          if (--left) say(praise(), 'ok'); else finish(f.b, ROUTES.tabella);
        });
        tab.append(cell);
      });
    });
    shuffle(chips).forEach(cd => bank.append(chip((cd.e ? `<span class="e">${cd.e}</span>` : '') + esc(cd.t), '', cd)));
    f.b.append(tab, bank);
  };

  /* ------------------------------------------------ home */
  const MENU = [
    { g: 'Prima guarda il video', video: true },
    { g: 'Le parole', items: [
      { r: 'coppie', pic: A.pic.golfo, t: 'Parole in coppia', d: 'Golfo e baia, isola e penisola…' },
      { r: 'completa', pic: A.pic.penisola, t: 'Completa la definizione', d: 'Quale parola manca?' } ] },
    { g: 'I disegni da completare', items: [
      { r: 'montagna', pic: A.MONT, t: 'La montagna', d: 'Cima, ghiacciaio, versante, passo, valico, valle' },
      { r: 'mare', pic: A.MARE, t: 'Il mare', d: 'Golfo, baia, isola, penisola, costa…' },
      { r: 'italia', pic: A.ITALIA, t: "La cartina d'Italia", d: 'Alpi, Appennini, Pianura Padana' },
      { r: 'profilo', pic: A.PROFILO, t: 'Dal nord al sud', d: 'La pianura sta tra le montagne' } ] },
    { g: 'I confronti', items: [
      { r: 'citta', pic: A.CITTA, t: 'Città o campagna?', d: 'Traffico, verde, lavoro, agricoltura…' },
      { r: 'righe', emo: '🦊🌲🍝⛷️', t: 'La tabella, riga per riga', d: 'Animali, piante, piatti, attività' },
      { r: 'tabella', emo: '⛰️🌾🌊', t: 'Completa la tabella', d: 'Montagna, pianura e mare, come nel compito' } ] }
  ];
  const YT = [
    ['E1zYN8jlDdY', 'Il mare'],
    ['dL1Q2d4uDhc', 'La pianura'],
    ['JOlQRGsJfqY', 'Le Alpi (la montagna)']
  ];
  function home() {
    $('#title').textContent = 'I paesaggi';
    $('#back').hidden = true;
    say(G.intro.home, '', false);
    stage.innerHTML = '';
    const box = el('div'); box.style.display = 'grid'; box.style.gap = '18px';
    let n = 0;
    MENU.forEach(grp => {
      const g = el('section', 'group');
      g.append(el('h2', '', esc(grp.g)));
      if (grp.video) {
        const v = el('details', 'vbox');
        v.open = true;
        v.innerHTML = `<summary>Il video di Rondì: mare, montagna e pianura</summary>
          <video controls playsinline preload="metadata" poster="video/paesaggi.jpg" src="video/paesaggi.mp4"></video>`;
        const yt = el('details', 'vbox');
        yt.innerHTML = `<summary>I video della maestra</summary><div class="yt">${YT.map(([id, t]) => `<figure><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(t)}" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe><figcaption>${esc(t)}</figcaption></figure>`).join('')}</div>`;
        v.querySelector('video').addEventListener('play', () => Voice.stop());
        g.append(v, yt);
      } else {
        const grid = el('div', 'grid');
        grp.items.forEach(it => {
          n++;
          const a = el('a', 'tile');
          a.href = '#' + it.r;
          a.innerHTML = `<div class="thumb${it.emo ? ' emo' : ''}">${it.emo || it.pic}</div><div><b><span class="num">${n}</span>${esc(it.t)}</b><small>${esc(it.d)}</small></div>`;
          grid.append(a);
        });
        g.append(grid);
      }
      box.append(g);
    });
    stage.append(box);
  }

  function route() {
    Voice.stop(); select(null);
    const r = location.hash.slice(1);
    if (ROUTES[r]) ROUTES[r](); else home();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
  // the first tap anywhere lets Rondì say hello on the menu (browsers block sound before a tap)
  document.addEventListener('pointerdown', function hello() {
    document.removeEventListener('pointerdown', hello);
    if (!location.hash.slice(1)) setTimeout(() => { if (!location.hash.slice(1)) Voice.say(G.intro.home); }, 50);
  });
})();
