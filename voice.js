/* Stellina's voice: plays the recorded feedback lines (audio/<lang>_<hash>.m4a, made by src/voice.py).
   One audio element is reused so phones keep allowing playback after the first tap. */
(function () {
  const hash = s => {
    let h = 0x811c9dc5;
    for (const b of new TextEncoder().encode(s)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  };
  const read = () => { try { return localStorage.getItem('voice') !== 'off'; } catch (e) { return true; } };
  const el = new Audio();
  let queue = [], lang = 'it', on = read();

  function next() {
    const s = queue.shift();
    if (s === undefined) return;
    el.src = `audio/${lang}_${hash(s)}.m4a`;
    el.play().catch(() => { queue = []; });
  }
  el.addEventListener('ended', next);
  el.addEventListener('error', next);

  const ICON_ON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const ICON_OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  window.Voice = {
    /* Say one line or several in a row; a new call interrupts the previous one. */
    say(lines, l) {
      lang = l || lang;
      queue = [].concat(lines).filter(Boolean);
      el.pause();
      if (on) next(); else queue = [];
    },
    stop() { queue = []; el.pause(); },
    /* A speaker toggle; `label` gives its name in the current language. */
    button(label) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'voice-btn';
      const paint = () => { b.innerHTML = on ? ICON_ON : ICON_OFF; b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', label()); b.title = label(); };
      b.addEventListener('click', () => {
        on = !on;
        try { localStorage.setItem('voice', on ? 'on' : 'off'); } catch (e) {}
        if (!on) window.Voice.stop();
        paint();
      });
      b.repaint = paint;
      paint();
      return b;
    }
  };
})();
