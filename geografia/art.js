/* Rondì's pictures: the mascot, the small pictures for each word, and the big scenes to label.
   Everything is inline SVG so it stays sharp on the iPad and needs no image files. */
(function () {
  const C = {
    sky: '#e7f4fb', sea: '#7cc4e8', sea2: '#4f9fcf', land: '#a9d57f', land2: '#87b95e', sand: '#f3dc9a',
    rock: '#a68a74', rock2: '#7d6553', mnt: '#a3adbf', mnt2: '#808ba0', snow: '#ffffff', ice: '#cdeefa',
    ink: '#3b2235', hi: '#d63c8f', tree: '#4f8a4a', tree2: '#3c6f3a', roof: '#d9614f', wall: '#fff7ea'
  };
  const svg = (vb, body, label) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label || ''}">${body}</svg>`;
  const waves = (pts, col = '#ffffffb0') => pts.map(([x, y]) => `<path d="M${x},${y} q5,-5 10,0 t10,0" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`).join('');
  const tree = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,-26 L11,-4 L-11,-4 Z M0,-16 L13,6 L-13,6 Z" fill="${C.tree}"/><rect x="-2" y="6" width="4" height="6" fill="${C.rock2}"/></g>`;
  const house = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-9" y="-8" width="18" height="14" fill="${C.wall}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-12,-7 L0,-17 L12,-7 Z" fill="${C.roof}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-3" y="-1" width="5" height="7" fill="${C.rock2}"/></g>`;
  const sun = (x, y, r = 14) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd45c"/>`;
  const ring = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${C.hi}" stroke-width="4" stroke-dasharray="6 4"/>`;
  const mountain = (ax, ay, x0, x1, base, snowTo) => {
    const t = snowTo ? (snowTo - ay) / (base - ay) : 0, xl = ax - (ax - x0) * t, xr = ax + (x1 - ax) * t, w = xr - xl;
    const sl = snowTo ? `<path d="M${ax},${ay} L${xl},${snowTo} l${w * .2},-6 l${w * .2},7 l${w * .2},-7 l${w * .2},6 L${xr},${snowTo} Z" fill="${C.snow}"/>` : '';
    return `<path d="M${x0},${base} L${ax},${ay} L${x1},${base} Z" fill="${C.mnt}"/><path d="M${ax},${ay} L${x1},${base} L${ax + (x1 - ax) * 0.15},${base} Z" fill="${C.mnt2}"/>${sl}`;
  };

  /* ------------------------------------------------------------ small pictures, 200 × 140 */
  const P = {};
  const frame = (body, l) => svg('0 0 200 140', body, l);
  P.golfo = frame(`<rect width="200" height="140" fill="${C.land}"/>
    <path d="M0,0 H200 V38 C178,38 175,118 100,118 C25,118 22,38 0,38 Z" fill="${C.sea}"/>
    ${waves([[20, 16], [80, 22], [140, 14], [90, 70], [60, 92], [118, 88]])}
    <path d="M14,40 C30,44 30,112 100,112 C170,112 170,44 186,40" fill="none" stroke="${C.hi}" stroke-width="4" stroke-dasharray="7 5"/>
    ${house(30, 120)}${tree(170, 128, .8)}`, 'golfo');
  P.baia = frame(`<rect width="200" height="140" fill="${C.land}"/>
    <path d="M0,0 H200 V44 H122 C118,44 120,80 100,80 C80,80 82,44 78,44 H0 Z" fill="${C.sea}"/>
    ${waves([[20, 16], [80, 22], [140, 14]])}
    <path d="M80,48 C86,52 84,74 100,74 C116,74 114,52 120,48" fill="none" stroke="${C.hi}" stroke-width="4" stroke-dasharray="6 4"/>
    ${tree(40, 100)}${tree(160, 104)}${house(100, 116)}`, 'baia');
  P.isola = frame(`<rect width="200" height="140" fill="${C.sea}"/>
    ${waves([[14, 18], [160, 20], [20, 116], [158, 112], [90, 12], [92, 128]])}
    <ellipse cx="100" cy="72" rx="52" ry="32" fill="${C.sand}"/><ellipse cx="100" cy="70" rx="44" ry="26" fill="${C.land}"/>
    <path d="M100,72 q-2,-20 4,-34" stroke="${C.rock2}" stroke-width="4" fill="none"/>
    <path d="M104,38 q-16,-6 -24,6 M104,38 q14,-8 24,2 M104,38 q-6,-14 -18,-14 M104,38 q8,-14 20,-10" stroke="${C.tree}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g fill="${C.hi}" font-family="Fredoka,Arial Rounded MT Bold,sans-serif" font-weight="700" font-size="13" text-anchor="middle"><text x="100" y="30">↓</text><text x="100" y="124">↑</text><text x="34" y="77">→</text><text x="166" y="77">←</text></g>`, 'isola');
  P.penisola = frame(`<rect width="200" height="140" fill="${C.sea}"/>
    ${waves([[14, 18], [160, 20], [20, 70], [160, 70], [90, 8]])}
    <path d="M0,140 V112 H66 C68,60 80,24 100,24 C120,24 132,60 134,112 H200 V140 Z" fill="${C.land}"/>
    ${tree(100, 70, .9)}${house(90, 98, .8)}
    <g fill="#fff" stroke="${C.hi}" stroke-width="2"><circle cx="54" cy="70" r="10"/><circle cx="100" cy="12" r="10"/><circle cx="146" cy="70" r="10"/></g>
    <g fill="${C.hi}" font-family="Fredoka,Arial Rounded MT Bold,sans-serif" font-weight="700" font-size="13" text-anchor="middle"><text x="54" y="75">1</text><text x="100" y="17">2</text><text x="146" y="75">3</text></g>`, 'penisola');
  P.spiaggia = frame(`<rect width="200" height="140" fill="${C.sky}"/>${sun(160, 26)}
    <path d="M0,86 H200 V140 H0 Z" fill="${C.sea}"/>${waves([[20, 100], [70, 112]])}
    <path d="M60,140 C100,108 140,96 200,92 V140 Z" fill="${C.sand}"/>
    <path d="M70,138 C104,112 144,100 198,96" fill="none" stroke="${C.hi}" stroke-width="4" stroke-dasharray="7 5"/>
    <path d="M150,96 L150,62" stroke="${C.ink}" stroke-width="2.5"/><path d="M126,66 Q150,42 174,66 Z" fill="${C.hi}"/>
    <g fill="${C.rock2}" opacity=".5"><circle cx="110" cy="124" r="2"/><circle cx="130" cy="114" r="2"/><circle cx="170" cy="118" r="2"/></g>`, 'spiaggia');
  P.scogliera = frame(`<rect width="200" height="140" fill="${C.sky}"/>
    <path d="M0,100 H200 V140 H0 Z" fill="${C.sea}"/>
    <path d="M96,140 L104,30 L118,22 L200,18 V140 Z" fill="${C.rock}"/>
    <path d="M104,40 l14,4 M100,62 l18,2 M102,86 l14,6 M98,110 l20,0 M120,36 l10,10 M118,70 l12,8" stroke="${C.rock2}" stroke-width="3" stroke-linecap="round"/>
    <path d="M118,22 L200,18 V30 L118,32 Z" fill="${C.land}"/>
    <path d="M100,96 q-10,-14 -24,-6 q10,2 8,10 q-14,-6 -22,4" fill="#fff" stroke="#fff" stroke-width="2"/>
    ${waves([[20, 112], [60, 122]])}
    <path d="M92,136 L100,32" stroke="${C.hi}" stroke-width="4" stroke-dasharray="7 5"/>`, 'scogliera');
  P.costa = frame(`<rect width="200" height="140" fill="${C.sea}"/>${waves([[150, 20], [160, 70], [146, 116]])}
    <path d="M0,0 H96 C110,24 86,44 104,66 C120,86 92,108 108,140 H0 Z" fill="${C.land}"/>
    <path d="M96,0 C110,24 86,44 104,66 C120,86 92,108 108,140" fill="none" stroke="${C.hi}" stroke-width="5"/>
    ${tree(40, 40)}${house(56, 98)}${tree(70, 60, .8)}`, 'costa');
  P.promontorio = frame(`<rect width="200" height="140" fill="${C.sea}"/>${waves([[150, 20], [160, 110], [40, 120]])}
    <path d="M0,0 H70 L80,36 L176,70 L80,100 L70,140 H0 Z" fill="${C.land}"/>
    <path d="M80,36 L176,70 L80,100" fill="none" stroke="${C.rock2}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M86,42 L172,70 L86,96" fill="none" stroke="${C.hi}" stroke-width="3" stroke-dasharray="6 4"/>
    ${tree(30, 50)}${house(36, 100)}<path d="M160,66 v-14 l8,4 l-8,4" stroke="${C.ink}" stroke-width="1.6" fill="${C.hi}"/>`, 'promontorio');
  P.mare = frame(`<rect width="200" height="140" fill="${C.sky}"/>${sun(36, 26)}
    <path d="M0,58 H200 V140 H0 Z" fill="${C.sea}"/>
    ${waves([[20, 80], [70, 96], [130, 84], [160, 116], [40, 120], [100, 126]])}
    <path d="M120,54 h40 l-6,10 h-28 Z" fill="${C.wall}" stroke="${C.ink}" stroke-width="1.5"/><path d="M140,52 V20 L158,50 Z" fill="${C.hi}"/>
    <path d="M10,70 H190" stroke="${C.hi}" stroke-width="3" stroke-dasharray="7 5"/>`, 'mare');
  P.cima = frame(`<rect width="200" height="140" fill="${C.sky}"/>${mountain(100, 24, 10, 190, 140, 52)}
    ${ring(100, 26, 15)}<path d="M100,24 V4 l14,5 l-14,5" stroke="${C.ink}" stroke-width="2" fill="${C.hi}"/>`, 'cima');
  P.piede = frame(`<rect width="200" height="140" fill="${C.sky}"/>${mountain(100, 24, 10, 190, 126, 52)}
    <rect y="124" width="200" height="16" fill="${C.land}"/>
    <path d="M14,128 H186" stroke="${C.hi}" stroke-width="6" stroke-linecap="round" stroke-dasharray="10 6"/>${tree(28, 134, .7)}${tree(176, 134, .7)}`, 'piede');
  P.versante = frame(`<rect width="200" height="140" fill="${C.sky}"/>${mountain(100, 20, 10, 190, 140, 46)}
    <path d="M100,24 L14,140 L58,140 Z" fill="${C.hi}" opacity=".45"/>
    <path d="M98,30 L18,136" stroke="${C.hi}" stroke-width="4" stroke-dasharray="7 5"/>${tree(70, 126, .7)}${tree(54, 132, .7)}`, 'versante');
  P.passo = frame(`<rect width="200" height="140" fill="${C.sky}"/>
    ${mountain(50, 20, -40, 140, 140, 44)}${mountain(150, 26, 60, 240, 140, 50)}
    <path d="M60,140 L84,122 L70,112 L96,92 L104,80 L120,100 L108,112 L136,140" fill="none" stroke="${C.wall}" stroke-width="5" stroke-linejoin="round"/>
    ${ring(100, 82, 16)}`, 'passo');
  P.ghiacciaio = frame(`<rect width="200" height="140" fill="${C.sky}"/>${mountain(100, 16, 0, 200, 140, 44)}
    <path d="M78,46 C70,70 88,88 74,118 C92,124 112,124 128,116 C114,90 130,70 122,46 Z" fill="${C.ice}" stroke="#8fcbe6" stroke-width="2"/>
    <path d="M86,64 l12,4 M90,84 l14,2 M86,102 l16,4" stroke="#8fcbe6" stroke-width="2"/>
    <path d="M74,46 C64,72 84,90 68,122 C92,130 114,130 134,120 C118,90 136,70 126,46" fill="none" stroke="${C.hi}" stroke-width="3" stroke-dasharray="7 5"/>`, 'ghiacciaio');
  P.pianura = frame(`<rect width="200" height="140" fill="${C.sky}"/>${sun(170, 22)}
    <rect y="60" width="200" height="80" fill="${C.land}"/>
    <path d="M0,74 H200 M0,92 H200 M0,114 H200" stroke="${C.land2}" stroke-width="3"/>
    <path d="M0,60 L200,60" stroke="${C.hi}" stroke-width="3" stroke-dasharray="7 5"/>
    <rect y="92" width="90" height="22" fill="#f1d36b" opacity=".85"/>${house(140, 86)}${tree(30, 72, .7)}${tree(182, 72, .7)}`, 'pianura');
  P.valle = frame(`<rect width="200" height="140" fill="${C.sky}"/>
    ${mountain(30, 14, -70, 120, 112, 40)}${mountain(170, 18, 80, 270, 112, 44)}
    <path d="M60,112 L80,100 H120 L140,112 Z" fill="${C.land}"/><rect y="110" width="200" height="30" fill="${C.land}"/>
    <path d="M100,100 C90,110 112,118 96,140" stroke="${C.sea}" stroke-width="5" fill="none"/>
    <path d="M40,124 C70,104 130,104 160,124" fill="none" stroke="${C.hi}" stroke-width="4" stroke-dasharray="7 5"/>${house(130, 126, .8)}`, 'valle');

  /* ------------------------------------------------------------ mascot: Rondì, a swallow */
  function rondi(pose) {
    const B = '#2c3a6b', B2 = '#46598f';
    const wings = pose === 'wow'
      ? `<path d="M56,92 C42,64 24,40 6,26 C12,52 28,82 52,106 Z" fill="${B}"/><path d="M50,90 C38,70 26,54 14,42" stroke="${B2}" stroke-width="3" fill="none"/>
         <path d="M104,92 C118,64 136,40 154,26 C148,52 132,82 108,106 Z" fill="${B}"/><path d="M110,90 C122,70 134,54 146,42" stroke="${B2}" stroke-width="3" fill="none"/>`
      : `<path d="M56,92 C36,82 16,86 0,104 C18,100 36,104 54,112 Z" fill="${B}"/><path d="M50,96 C36,92 22,94 10,100" stroke="${B2}" stroke-width="3" fill="none"/>
         <path d="M104,92 C124,82 144,86 160,104 C142,100 124,104 106,112 Z" fill="${B}"/><path d="M110,96 C124,92 138,94 150,100" stroke="${B2}" stroke-width="3" fill="none"/>`;
    const eyes = pose === 'wow'
      ? `<path d="M60,60 q8,-10 16,0" stroke="#1d1d2b" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M84,60 q8,-10 16,0" stroke="#1d1d2b" stroke-width="4.5" fill="none" stroke-linecap="round"/>`
      : `<circle cx="68" cy="60" r="7" fill="#1d1d2b"/><circle cx="92" cy="60" r="7" fill="#1d1d2b"/><circle cx="70.5" cy="57.5" r="2.5" fill="#fff"/><circle cx="94.5" cy="57.5" r="2.5" fill="#fff"/>`;
    return `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M70,122 L50,158 L78,132 Z M90,122 L110,158 L82,132 Z" fill="${B}"/>
      ${wings}
      <ellipse cx="80" cy="102" rx="32" ry="30" fill="${B}"/>
      <ellipse cx="80" cy="108" rx="23" ry="22" fill="#fffaf5"/>
      <circle cx="80" cy="60" r="32" fill="${B}"/>
      <path d="M70,36 Q80,30 90,36 Q86,43 80,43 Q74,43 70,36 Z" fill="#e8604c"/>
      <ellipse cx="80" cy="82" rx="15" ry="9" fill="#e8604c"/>
      ${eyes}
      <path d="M75,69 L85,69 L80,77 Z" fill="#f2b33d" stroke="#b9791d" stroke-width="1.5" stroke-linejoin="round"/>
      <circle cx="58" cy="70" r="5.5" fill="#f59ac4" opacity=".8"/><circle cx="102" cy="70" r="5.5" fill="#f59ac4" opacity=".8"/>
      <path d="M58,90 Q80,102 102,90 L104,98 Q80,111 56,98 Z" fill="#d63c8f"/>
      <path d="M94,100 l8,16 l7,-4 l-5,-14 Z" fill="#d63c8f"/>
    </svg>`;
  }

  /* ------------------------------------------------------------ scenes to label, 800 × 500 */
  const MONT = svg('0 0 800 500', `
    <defs><linearGradient id="skyM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7eefa"/><stop offset="1" stop-color="#fbeef5"/></linearGradient></defs>
    <rect width="800" height="500" fill="url(#skyM)"/>${sun(90, 70, 26)}
    <path d="M0,330 L120,250 L220,300 L340,220 L470,290 L600,210 L720,280 L800,240 V500 H0 Z" fill="#c9d1de"/>
    <path d="M0,420 L180,150 L360,420 Z" fill="${C.mnt}"/><path d="M180,150 L360,420 L210,420 Z" fill="${C.mnt2}"/>
    <path d="M180,150 L163,176 l10,-4 l9,8 l9,-6 l8,6 L198,177 Z" fill="${C.snow}"/>
    <path d="M500,430 L660,140 L800,380 V430 Z" fill="${C.mnt}"/><path d="M660,140 L800,380 V430 L690,430 Z" fill="${C.mnt2}"/>
    <path d="M660,140 L642,172 l10,-4 l9,8 l10,-6 l8,6 L677,170 Z" fill="${C.snow}"/>
    <path d="M230,430 L420,60 L640,430 Z" fill="${C.mnt}"/><path d="M420,60 L640,430 L460,430 Z" fill="${C.mnt2}"/>
    <path d="M420,60 L386,126 l14,-8 l14,12 l14,-10 l14,10 l14,-8 L459,126 Z" fill="${C.snow}"/>
    <path d="M446,112 C436,150 466,176 452,222 C470,232 494,232 512,222 C494,186 506,150 472,112 Z" fill="${C.ice}" stroke="#8fcbe6" stroke-width="3"/>
    <path d="M456,150 l18,4 M462,186 l20,4 M458,206 l24,2" stroke="#8fcbe6" stroke-width="3"/>
    <path d="M150,430 L196,382 L170,370 L240,344 L218,334 L290,312 L330,330 L304,344 L360,364 L330,380 L380,430" fill="none" stroke="${C.wall}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M520,430 L548,380 L540,350 L567,306 L586,340 L578,380 L604,430" fill="none" stroke="${C.wall}" stroke-width="4" stroke-dasharray="3 6" stroke-linecap="round"/>
    <path d="M0,420 Q200,404 400,424 T800,414 V500 H0 Z" fill="${C.land}"/>
    <path d="M0,452 C120,446 200,470 320,462 C440,454 520,480 800,470" stroke="${C.sea}" stroke-width="12" fill="none" stroke-linecap="round"/>
    ${[[40, 408], [70, 412], [100, 404], [600, 410], [640, 414], [690, 406], [740, 410], [250, 404], [272, 398]].map(([x, y]) => tree(x, y, 1.2)).join('')}
    ${[[150, 384], [176, 392], [520, 396], [560, 392], [600, 398]].map(([x, y]) => tree(x, y, .9)).join('')}
    ${house(370, 446, 1.3)}${house(410, 452, 1.2)}${house(440, 442, 1.3)}${house(110, 470, 1.1)}
  `, 'montagna da completare');

  const MARE = svg('0 0 800 500', `
    <rect width="800" height="500" fill="${C.sea}"/>
    ${waves([[480, 120], [560, 60], [740, 260], [460, 260], [720, 470], [380, 200], [520, 190]])}
    <path d="M0,0 L250,0 L262,22 L440,86 L300,140 C330,170 150,160 170,236 C185,300 300,290 330,300 L560,320 C612,324 616,372 560,376 L360,386 L420,430 C425,472 470,472 475,430 L800,440 V500 H0 Z" fill="${C.land}"/>
    <path d="M262,22 L440,86 L300,140" fill="none" stroke="${C.rock2}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M280,36 l6,-14 M310,46 l6,-14 M340,57 l6,-14 M370,68 l6,-14 M400,79 l6,-14" stroke="${C.rock2}" stroke-width="3"/>${tree(330, 90)}${tree(370, 96, .8)}
    <path d="M292,150 C220,168 160,180 176,240 C190,286 264,292 322,298" fill="none" stroke="${C.sand}" stroke-width="16" stroke-linecap="round"/>
    <path d="M362,386 L420,430 C425,472 470,472 475,430 L800,440" fill="none" stroke="#5a8a3c" stroke-width="3"/>
    <ellipse cx="650" cy="160" rx="66" ry="40" fill="${C.sand}"/><ellipse cx="650" cy="158" rx="58" ry="33" fill="${C.land}"/>
    ${tree(640, 160)}${tree(664, 150)}${house(624, 172)}
    ${tree(60, 60)}${tree(100, 90)}${tree(40, 160)}${tree(80, 300)}${tree(120, 420)}${tree(500, 352)}
    ${house(200, 60)}${house(230, 80)}${house(100, 240)}${house(260, 460)}${house(620, 480)}
    <path d="M520,250 h34 l-5,8 h-24 Z" fill="${C.wall}" stroke="${C.ink}" stroke-width="1.5"/><path d="M536,248 V222 L551,246 Z" fill="${C.hi}"/>
  `, 'mare da completare');

  const ITALIA = svg('0 0 570 660', `
    <rect width="570" height="660" fill="${C.sea}"/>
    ${waves([[200, 330], [300, 560], [470, 300], [470, 600], [40, 330], [200, 620]])}
    <g fill="#ece3d4" stroke="#cbbfa9" stroke-width="2" stroke-linejoin="round">
      <path d="M0,0 H570 V318 L532,292 L456,238 L407,208 L371,130 L345,90 L335,55 L291,49 L269,22 L237,25 L215,37 L193,31 L191,52 L175,70 L139,58 L121,85 L99,61 L64,91 L35,100 L23,142 L32,181 L35,199 L68,202 L60,221 L37,235 L10,256 L0,258 Z"/>
      <path d="M144,268 L148,292 L144,328 L135,364 L117,352 L108,322 L113,292 Z"/>
    </g>
    <g fill="${C.land}" stroke="#5a8a3c" stroke-width="2.5" stroke-linejoin="round">
      <path d="M60,221 L68,202 L35,199 L32,181 L23,142 L35,100 L64,91 L99,61 L121,85 L139,58 L175,70 L191,52 L193,31 L215,37 L237,25 L269,22 L291,49 L335,55 L333,76 L331,91 L342,112 L327,100 L309,112 L278,122 L273,136 L284,151 L273,184 L285,204 L327,231 L359,300 L393,328 L445,333 L440,349 L434,352 L477,381 L525,410 L549,439 L543,460 L526,445 L493,420 L460,466 L488,503 L463,544 L441,573 L422,562 L425,553 L431,527 L445,523 L438,490 L425,449 L406,446 L393,427 L383,407 L364,412 L360,398 L330,375 L307,375 L287,361 L272,344 L250,323 L222,304 L193,272 L184,235 L182,216 L163,202 L123,183 L103,189 L83,215 Z"/>
      <path d="M135,373 L155,394 L159,430 L155,475 L150,499 L130,496 L119,516 L99,511 L99,484 L101,454 L88,412 L90,391 L110,382 Z"/>
      <path d="M422,552 L402,553 L320,561 L295,557 L282,567 L279,580 L291,595 L331,610 L360,625 L398,647 L407,625 L398,598 L411,571 Z"/>
    </g>
    <path d="M72,115 L126,103 L188,109 L242,103 L284,112 L278,148 L271,187 L228,175 L184,163 L126,151 L72,166 L61,142 Z" fill="#f1d36b" opacity=".8"/>
    <path d="M50,163 L77,142 L108,139 L144,142 L184,145 L224,151 L260,151 L280,151" fill="none" stroke="${C.sea2}" stroke-width="3"/>
    ${[[50, 190], [37, 154], [46, 112], [81, 91], [126, 70], [171, 67], [215, 58], [260, 55], [304, 61]].map(([x, y]) => `<path d="M${x - 11},${y + 9} L${x},${y - 11} L${x + 11},${y + 9} Z" fill="#9b6b4f" stroke="#6e4a35" stroke-width="2" stroke-linejoin="round"/>`).join('')}
    ${[[108, 187], [153, 184], [197, 199], [246, 220], [286, 250], [313, 286], [340, 322], [371, 352], [402, 388], [425, 418], [440, 454], [449, 490], [445, 532]].map(([x, y]) => `<path d="M${x - 9},${y + 7} L${x},${y - 9} L${x + 9},${y + 7} Z" fill="#b9805e" stroke="#6e4a35" stroke-width="2" stroke-linejoin="round"/>`).join('')}
    <path d="M244,64 L255,46 L266,64 M256,64 L267,46 L278,64" fill="#e7a1c4" stroke="#6e4a35" stroke-width="2" stroke-linejoin="round"/>
  `, 'cartina dell’Italia da completare');

  const PROFILO = svg('0 0 800 400', `
    <rect width="800" height="400" fill="#e7f4fb"/>${sun(700, 60, 24)}
    <path d="M0,330 L40,170 L80,230 L120,90 L160,200 L200,120 L240,250 L270,300 V400 H0 Z" fill="${C.mnt}"/>
    <path d="M120,90 L160,200 L140,240 Z M200,120 L240,250 L214,250 Z" fill="${C.mnt2}"/>
    <path d="M120,90 L106,124 l8,-4 l7,6 l7,-4 l6,4 Z M200,120 L189,146 l7,-4 l6,6 l7,-6 Z M40,170 L32,200 l8,-6 l8,4 Z" fill="#fff"/>
    <path d="M270,300 H530 V400 H270 Z" fill="${C.land}"/>
    <path d="M270,316 H530 M270,338 H530 M270,362 H530" stroke="${C.land2}" stroke-width="3"/>
    <rect x="300" y="338" width="90" height="24" fill="#f1d36b" opacity=".85"/>
    <ellipse cx="420" cy="306" rx="30" ry="5" fill="${C.sea2}"/>
    ${house(470, 300)}${house(340, 302)}
    <path d="M530,300 C560,250 580,200 610,200 C640,200 650,250 670,260 C690,240 700,280 720,320 V400 H530 Z" fill="#b7a58c"/>
    <path d="M720,320 L800,320 V400 H720 Z" fill="${C.sea}"/>${waves([[740, 350], [760, 372]])}
    ${tree(600, 230)}${tree(630, 236)}${tree(660, 270)}
  `, 'dal nord al sud');

  const CITTA = svg('0 0 300 190', `<rect width="300" height="190" fill="#ece9f2"/>
    <circle cx="70" cy="34" r="20" fill="#c9c4d4"/><circle cx="96" cy="28" r="16" fill="#c9c4d4"/>
    <rect x="16" y="60" width="50" height="110" fill="#9fa6c4"/><rect x="72" y="30" width="56" height="140" fill="#7f88aa"/><rect x="134" y="76" width="44" height="94" fill="#b3b9d3"/><rect x="186" y="44" width="60" height="126" fill="#8d95b6"/><rect x="250" y="90" width="40" height="80" fill="#a9afcb"/>
    ${[...Array(24)].map((_, i) => `<rect x="${[24, 82, 104, 142, 196, 220, 258][i % 7]}" y="${70 + Math.floor(i / 7) * 22}" width="10" height="12" fill="#fff6c9"/>`).join('')}
    <rect y="166" width="300" height="24" fill="#5d6070"/><path d="M0,178 H300" stroke="#fff" stroke-width="2" stroke-dasharray="12 10"/>
    <rect x="40" y="168" width="34" height="12" rx="4" fill="${C.hi}"/><rect x="180" y="168" width="34" height="12" rx="4" fill="#f2b33d"/><rect x="120" y="170" width="30" height="10" rx="4" fill="#5aa0d8"/>
    <path d="M232,44 V20 h10 V44" fill="#6c7393"/><path d="M237,18 q-12,-8 0,-14 q12,-6 4,-14" stroke="#b9b5c2" stroke-width="7" fill="none" stroke-linecap="round"/>`, 'città');
  const CAMPAGNA = svg('0 0 300 190', `<rect width="300" height="190" fill="#e7f4fb"/>${sun(250, 34, 20)}
    <path d="M0,96 C80,80 200,84 300,92 V190 H0 Z" fill="${C.land}"/>
    <path d="M0,120 C90,110 200,112 300,118 M0,148 C100,138 200,140 300,146" stroke="${C.land2}" stroke-width="3" fill="none"/>
    <path d="M150,118 C200,112 260,114 300,118 V146 C240,140 190,140 150,142 Z" fill="#f1d36b"/>
    ${house(70, 100, 1.6)}${tree(120, 98)}${tree(20, 102)}${tree(270, 98)}
    <g transform="translate(150,166)"><ellipse rx="22" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="2"/><circle cx="-6" cy="-2" r="5" fill="${C.ink}"/><circle cx="10" cy="3" r="4" fill="${C.ink}"/><circle cx="24" cy="-8" r="8" fill="#fff" stroke="${C.ink}" stroke-width="2"/><path d="M-14,10 v10 M14,10 v10" stroke="${C.ink}" stroke-width="3"/></g>
    <g transform="translate(60,168)"><rect x="-16" y="-14" width="22" height="14" fill="${C.hi}"/><rect x="2" y="-22" width="14" height="22" fill="${C.hi}"/><circle cx="-10" cy="2" r="7" fill="${C.ink}"/><circle cx="12" cy="4" r="5" fill="${C.ink}"/></g>`, 'campagna');

  window.ART = { pic: P, rondi, MONT, MARE, ITALIA, PROFILO, CITTA, CAMPAGNA };
})();
