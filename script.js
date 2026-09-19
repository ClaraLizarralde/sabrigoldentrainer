// ── SWIPE UP: mouse/touch drag & click ──
const intro = document.getElementById('swipe-intro');
let startY = 0, dragging = false, dismissed = false;

function dismiss() {
  if (dismissed) return;
  dismissed = true;
  intro.classList.add('swiped');
  setTimeout(() => { intro.style.display = 'none'; }, 900);
}

intro.addEventListener('mousedown', e => { startY = e.clientY; dragging = true; });
intro.addEventListener('mousemove', e => {
  if (!dragging) return;
  const dy = startY - e.clientY;
  if (dy > 30) dismiss();
});
intro.addEventListener('mouseup', () => { dragging = false; });
intro.addEventListener('click', dismiss);

intro.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
intro.addEventListener('touchmove', e => {
  const dy = startY - e.touches[0].clientY;
  if (dy > 40) dismiss();
}, { passive: true });

// Also dismiss after 6 seconds automatically
setTimeout(dismiss, 6000);

// ── ROTATING SWIPE PHOTOS ──
const swipePhotos = document.querySelectorAll('.swipe-photo-wrap .swipe-photo');
let currentPhoto = 0;
if (swipePhotos.length > 1) {
  setInterval(() => {
    swipePhotos[currentPhoto].classList.remove('active');
    currentPhoto = (currentPhoto + 1) % swipePhotos.length;
    swipePhotos[currentPhoto].classList.add('active');
  }, 2000);
}

// ── FADE IN ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.07 });
document.querySelectorAll('.fade').forEach(el => obs.observe(el));

// ── LANGUAGE SWITCHER ──
// El español vive en el HTML (es la fuente de verdad: se guarda al cargar la página).
// Acá sólo va el inglés. Cada elemento traducible tiene data-i18n="clave" en el HTML.
const translations = {
  en: {
    // INTRO
    swipe_h1: 'WE ALWAYS<br><span>PUSH</span><br>FURTHER',
    swipe_sub: 'profesabri.fit · Buenos Aires · Worldwide',
    // NAV
    nav_servicios: 'services',
    nav_sobre: 'about me',
    nav_planes: 'plans',
    nav_opiniones: 'reviews',
    nav_contacto: 'contact',
    // TICKER
    tick_presencial: 'In-person · At home · In the park',
    tick_profe: 'Physical Education Teacher',
    tick_hibrida: 'Hybrid training',
    // HERO
    hero_eyebrow: 'Physical Education Teacher · Buenos Aires',
    hero_h1: 'TRAIN<br><span class="yellow">WHEREVER</span><br><span class="stroke">YOU ARE.</span>',
    hero_tagline: '"Here we always push further — your goals within reach"',
    hero_desc: 'I\'m Sabri, a personal trainer. In person, online, at your home, in the park, at the gym — with what you have and at the level you need. There\'s a way of training that works for you. All you need is to take the first step.',
    btn_escribir: 'message me',
    btn_planes: 'see plans →',
    // DIFERENCIAL
    diferencial: 'TRAIN <em>WHERE</em> YOU ARE,<br>WITH <em>WHAT YOU HAVE.</em>',
    // SERVICIOS
    sec01_title: 'services',
    serv_intro: 'Personalized training sessions — you set the goal. No prior experience needed. If you\'ve never stepped into a gym, feel intimidated by the idea, or simply don\'t know where to start, I\'ll guide you. From a personalized routine adapted to your space and equipment, to 1-on-1 classes. As much or as little support as you need.',
    serv_claim: '"The only mistake is not starting."',
    serv1_name: 'Personal Training',
    serv1_desc: '100% personalized plan — strength, endurance, body composition. Adapted to your level, your goal and your life.',
    serv1_badge: 'in-person / online',
    serv2_name: 'High Performance',
    serv2_desc: 'For athletes who want to take it a step further. Method, tracking, concrete results. Competition experience.',
    serv2_badge: 'specialization',
    serv3_name: 'Online Training',
    serv3_desc: 'Assessment + monthly routine + demo videos + follow-up. From anywhere in the world, in your language.',
    serv3_badge: '🌍 global remote',
    serv4_name: 'CPR & First Aid',
    serv4_desc: 'Certified instructor (Argentina, Brazil, USA — Red Cross). Courses for individuals, families and organizations.',
    serv4_badge: "int'l certification",
    serv5_name: 'Active Breaks',
    serv5_desc: 'Mobility and activation sessions for companies and schools. Dynamic, approachable and with real impact on the team.',
    serv5_badge: 'companies · schools',
    serv6_name: 'Lifeguard',
    serv6_desc: 'Certified in Argentina, Brazil and the USA. For pools, clubs and events. Also a lifeguard instructor.',
    serv6_badge: 'triple certification',
    serv_ig_txt: 'Find out about other activities on my Instagram',
    // SOBRE MÍ
    sec02_title: 'about me',
    sobre_p1: 'I\'m Sabrina Goldenstein, a Physical Education teacher from Buenos Aires. I spent my childhood in gyms, tagging along with my father — Master Jorge Goldenstein, founder of the Shaolin Lao Hu Kung Fu School. As a teenager I was already teaching kids\' classes and helping out in the adult ones. Movement has always been my world.',
    sobre_p2: 'Over the years I kept widening my path: from working with kids to adult training, strength training and high performance. I kept studying because I always felt there was more to learn.',
    cred1: '<strong>Physical Education Teacher (Profesorado Superior) — ISEF No. 1 Dr. Enrique Romero Brest</strong>',
    cred2: 'Bachelor\'s in High-Performance Sport — Univ. of Lomas de Zamora',
    cred3: '<strong>Lifeguard — Argentina (EPSA) · Brazil · USA (Red Cross)</strong>',
    cred4: 'BLS Instructor (EPSA) · Lifeguard Instructor (Red Cross)',
    cred5: 'Kung Fu Instructor — Shaolin Lao Hu School',
    filosofia_tag: 'MY APPROACH',
    filosofia_quote: 'When I train anyone, my north star is always <strong class="f-highlight">health</strong>. Whatever goal you start with — gaining <strong class="f-highlight">muscle mass</strong>, improving a specific <strong class="f-highlight">physical capacity</strong>, a particular <strong class="f-highlight">aesthetic</strong> goal — that north star is never lost. Maintaining and improving health in a <strong class="f-highlight">holistic</strong> way leads to a better <strong class="f-highlight">quality of life</strong>, a longer life expectancy and a wider margin to achieve any goal.',
    // PLANES
    sec03_title: 'plans',
    plan_presencial: 'In-person',
    plan_sub: 'Personalized routine tailored to each student\'s goals',
    plan_tag_a: 'to get started',
    plan_tag_b: 'most complete',
    plan_tag_c: 'live',
    pA1: 'One live class for every routine change, to walk through the exercises and the routine ahead',
    pA2: 'Videos of every exercise with explanation and demonstration',
    pB1: 'Everything in Plan A',
    pB2: 'One live class per week for corrections, follow-up and updates',
    pC1: 'Written training plan',
    pC2: 'Live class 3 times a week to train with real-time corrections and guidance',
    pack4_name: '4 CLASSES',   pack4_item: 'Pack of 4 in-person classes',
    pack8_name: '8 CLASSES',   pack8_item: 'Pack of 8 in-person classes',
    pack12_name: '12 CLASSES', pack12_item: 'Pack of 12 in-person classes',
    pack16_name: '16 CLASSES', pack16_item: 'Pack of 16 in-person classes',
    pack20_name: '20 CLASSES', pack20_item: 'Pack of 20 in-person classes',
    btn_consultar: 'inquire →',
    btn_loquiero: 'I want this →',
    // OPINIONES
    sec04_title: 'reviews',
    test1: 'Excellent professional… warm, with highly skilled expertise. Recommended for everyone, regardless of age, fitness level or goals.',
    test2: 'Besides being a lovely person, she\'s an excellent professional, attentive and careful with every detail. She has a great ability to give you the best exercise depending on each person\'s needs. Highly recommended!!!',
    test3: 'I\'ve been training with Sabrina for over three years, and I honestly can\'t imagine being this consistent with my workouts without her! Sabrina is an incredible personal trainer. She takes the time to understand your goals and abilities, and creates personalized routines…',
    rev_google: 'Google review · translated from Spanish',
    rev_google_tr: 'Google review',
    tests_more: 'You can read all the reviews on\n    <a href="https://share.google/JMkAfamA5KdgbKmgG" target="_blank" rel="noopener">Google →</a>',
    // CTA
    cta_h2: 'READY TO <em>START?</em>',
    cta_p: 'Send me a message and within 24 hours I\'ll tell you how we can get started — no matter where you are.',
    cta_btn: 'message me on whatsapp',
    // FOOTER
    f_servicios: 'services',
    f_sobre: 'about me',
    f_planes: 'plans',
  }
};

// Guardar el español original (del HTML) para poder volver a él
const i18nEls = document.querySelectorAll('[data-i18n]');
i18nEls.forEach(el => { el.dataset.es = el.innerHTML; });

let currentLang = 'es';

function applyLang(lang) {
  i18nEls.forEach(el => {
    const key = el.dataset.i18n;
    if (lang === 'es') {
      el.innerHTML = el.dataset.es;
    } else if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    } else {
      console.warn('Falta traducción al inglés para:', key);
    }
  });
  const btn = document.getElementById('lang-btn');
  btn.textContent = lang === 'es' ? 'EN' : 'ES';
  btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
  document.documentElement.lang = lang;
  currentLang = lang;
}

document.getElementById('lang-btn').addEventListener('click', () => {
  applyLang(currentLang === 'es' ? 'en' : 'es');
});
