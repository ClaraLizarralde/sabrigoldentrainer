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

// ── FADE IN ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.07 });
document.querySelectorAll('.fade').forEach(el => obs.observe(el));

// ── LANGUAGE SWITCHER ──
const translations = {
  es: {
    // NAV
    nav_servicios: 'servicios',
    nav_planes: 'planes',
    nav_sobre: 'sobre mí',
    nav_opiniones: 'opiniones',
    nav_contacto: 'contacto',
    // SWIPE
    swipe_sub: 'sabrigoldtrainer.fit · CABA · Buenos Aires',
    // HERO
    hero_eyebrow: 'Profe de Educación Física · Buenos Aires',
    hero_h1: 'ENTRENÁ<br><span class="yellow">DONDE</span><br><span class="stroke">ESTÉS.</span>',
    hero_tagline: '"Acá nos superamos siempre — tus objetivos al alcance de tu mano"',
    hero_desc: 'Soy Sabri. Personal trainer con modalidad híbrida — presencial, online, en tu casa, en el parque, en el gym. Con lo que tenés y en el nivel que necesitás.',
    btn_escribir: 'escribirme',
    btn_planes: 'ver planes →',
    // STATS
    stat_alumnos: 'alumnos',
    stat_exp: 'años de exp.',
    stat_idiomas: 'idiomas',
    stat_modalidad: 'online + presencial',
    stat_modalidad_lbl: 'modalidad híbrida',
    // DIFERENCIAL
    diferencial: 'ENTRENÁ <em>DONDE</em> ESTÉS,<br>CON LO QUE <em>TENGAS.</em>',
    // MODALIDAD
    sec00: '00 /',
    sec00_title: 'modalidad & zonas',
    mod_title: 'Modalidad',
    zonas_title: 'Zonas',
    // SERVICIOS
    sec01: '01 /',
    sec01_title: 'servicios',
    serv1_name: 'Personal Training',
    serv1_desc: 'Plan 100% personalizado — fuerza, resistencia, composición corporal. Adaptado a tu nivel, tu objetivo y tu vida.',
    serv1_badge: 'presencial / online',
    serv2_name: 'Alto Rendimiento',
    serv2_desc: 'Para deportistas que quieren ir un paso más. Método, seguimiento, resultados concretos. Experiencia en competencia.',
    serv2_badge: 'especialización',
    serv3_name: 'Entrenamiento Online',
    serv3_desc: 'Evaluación + rutina mensual + videos demostrativos + seguimiento. Desde cualquier parte del mundo, en tu idioma.',
    serv3_badge: '🌍 remoto global',
    serv4_name: 'RCP & Primeros Auxilios',
    serv4_desc: 'Instructora certificada (Argentina, Brasil, EE.UU. — Red Cross). Cursos para personas, familias e instituciones.',
    serv4_badge: "certificación int'l",
    serv5_name: 'Pausas Activas',
    serv5_desc: 'Movilidad y activación para empresas y colegios. Dinámica, cercana y con impacto real en el equipo.',
    serv5_badge: 'empresas · colegios',
    serv6_name: 'Guardavidas',
    serv6_desc: 'Habilitada en Argentina, Brasil y EE.UU. Para natatorios, clubes y eventos. También instructora de guardavidas.',
    serv6_badge: 'triple certificación',
    // SOBRE MÍ
    sec02: '02 /',
    sec02_title: 'sobre mí',
    sobre_slogan: 'Crea hábitos, suma vida.',
    sobre_p1: 'Soy Sabri — profe de Educación Física apasionada por el movimiento. Trabajé con personas de todas las edades, niveles y culturas: desde quien nunca pisó un gym hasta deportistas de competencia, empresas y adultos mayores.',
    sobre_p2: '<strong>Mi misión es simple: ofrecerte entrenamiento personalizado que se adapte a tus objetivos y tu estilo de vida — sea online o presencial, con programación y guía 1 a 1.</strong>',
    sobre_p3: 'Mi visión es construir una comunidad líder en entrenamiento híbrido (presencial + online) con proyección internacional. Sin límites generacionales ni idiomáticos.',
    // PLANES
    sec03: '03 /',
    sec03_title: 'planes',
    plan1_tag: 'para empezar',
    plan1_name: 'BÁSICO ONLINE',
    plan1_freq: 'por mes',
    plan1_i1: 'Evaluación online',
    plan1_i2: 'Rutina mensual (imágenes)',
    plan1_i3: 'Plan personalizado',
    plan1_i4: 'Seguimiento por WhatsApp',
    plan1_btn: 'consultar →',
    plan2_tag: '+ completo',
    plan2_name: 'ONLINE PRO',
    plan2_freq: 'por mes',
    plan2_i1: 'Evaluación online',
    plan2_i2: 'Rutina mensual + videos explicativos',
    plan2_i3: 'Seguimiento semanal',
    plan2_i4: 'Videollamadas de seguimiento',
    plan2_i5: 'Ajustes ilimitados',
    plan2_btn: 'lo quiero →',
    plan3_tag: 'videollamada',
    plan3_name: 'VIRTUAL LIVE',
    plan3_freq: 'por mes',
    plan3_i1: 'Evaluación online',
    plan3_i2: 'Rutina mensual personalizada',
    plan3_i3: 'Clases por videollamada (X/semana)',
    plan3_i4: 'Seguimiento continuo',
    plan3_btn: 'consultar →',
    plan4_tag: '100% presencial',
    plan4_name: 'PRESENCIAL',
    plan4_freq: 'por mes',
    plan4_i1: 'Evaluación presencial',
    plan4_i2: 'Plan mensual personalizado',
    plan4_i3: 'Clases presenciales (X/semana)',
    plan4_i4: 'A domicilio, parque o gym',
    plan4_i5: 'Seguimiento continuo',
    plan4_btn: 'consultar →',
    // TESTIMONIOS
    sec04: '04 /',
    sec04_title: 'opiniones',
    test1: 'Empecé sin saber nada de entrenamiento y Sabri me guió desde cero. En 3 meses noté cambios increíbles, tanto físicos como en mi energía diaria.',
    test1_name: 'Laura M.',
    test1_meta: 'presencial · 6 meses',
    test2: 'El plan online es perfecto para mi ritmo de vida. Tengo todo organizado y cuando tengo dudas siempre me contesta rápido. Recomendadísima.',
    test2_name: 'Gonzalo R.',
    test2_meta: 'online · 4 meses',
    test3: 'Las pausas activas fueron un antes y un después para nuestro equipo. Muy dinámica, cercana y profesional. Ya la volvimos a contratar.',
    test3_name: 'Valeria P.',
    test3_meta: 'empresas · pausas activas',
    // CTA
    cta_h2: '¿ARRAN<em>CAMOS?</em>',
    cta_p: 'Mandame un mensaje y en menos de 24 horas te cuento cómo empezamos — sin importar dónde estés.',
    cta_btn: 'escribirme por whatsapp',
    // FOOTER
    f_servicios: 'servicios',
    f_planes: 'planes',
    f_sobre: 'sobre mí',
    f_wa: 'whatsapp',
  },
  en: {
    nav_servicios: 'services',
    nav_planes: 'plans',
    nav_sobre: 'about me',
    nav_opiniones: 'reviews',
    nav_contacto: 'contact',
    swipe_sub: 'sabrigoldtrainer.fit · Buenos Aires · Worldwide',
    hero_eyebrow: 'Physical Education Teacher · Buenos Aires',
    hero_h1: 'TRAIN<br><span class="yellow">ANY</span><br><span class="stroke">WHERE.</span>',
    hero_tagline: '"We always push further — your goals, within reach"',
    hero_desc: 'I\'m Sabri. A personal trainer with a hybrid approach — in-person, online, at your home, in the park, at the gym. With what you have, at the level you need.',
    btn_escribir: 'message me',
    btn_planes: 'see plans →',
    stat_alumnos: 'students',
    stat_exp: 'years exp.',
    stat_idiomas: 'languages',
    stat_modalidad: 'online + in-person',
    stat_modalidad_lbl: 'hybrid training',
    diferencial: 'TRAIN <em>WHERE</em> YOU ARE,<br>WITH <em>WHAT YOU HAVE.</em>',
    sec00: '00 /',
    sec00_title: 'modality & zones',
    mod_title: 'Modality',
    zonas_title: 'Areas',
    sec01: '01 /',
    sec01_title: 'services',
    serv1_name: 'Personal Training',
    serv1_desc: '100% personalized plan — strength, endurance, body composition. Adapted to your level, your goal and your lifestyle.',
    serv1_badge: 'in-person / online',
    serv2_name: 'High Performance',
    serv2_desc: 'For athletes who want to go further. Method, tracking, concrete results. Competition experience.',
    serv2_badge: 'specialization',
    serv3_name: 'Online Training',
    serv3_desc: 'Assessment + monthly routine + demo videos + coaching. From anywhere in the world, in your language.',
    serv3_badge: '🌍 global remote',
    serv4_name: 'CPR & First Aid',
    serv4_desc: 'Certified instructor (Argentina, Brazil, USA — Red Cross). Courses for individuals, families and organizations.',
    serv4_badge: "int'l certification",
    serv5_name: 'Active Breaks',
    serv5_desc: 'Mobility and activation for companies and schools. Dynamic, personal and with real impact on the team.',
    serv5_badge: 'companies · schools',
    serv6_name: 'Lifeguard',
    serv6_desc: 'Certified in Argentina, Brazil and the USA. For pools, clubs and events. Also a lifeguard instructor.',
    serv6_badge: 'triple certification',
    sec02: '02 /',
    sec02_title: 'about me',
    sobre_slogan: 'Build habits, add life.',
    sobre_p1: 'I\'m Sabri — a Physical Education teacher passionate about movement. I\'ve worked with people of all ages, levels and cultures: from first-timers to competitive athletes, corporations and seniors.',
    sobre_p2: '<strong>My mission is simple: offer you personalized training that fits your goals and your lifestyle — online or in-person, with 1-on-1 programming and coaching.</strong>',
    sobre_p3: 'My vision is to build a leading hybrid training community (in-person + online) with international reach. No generational or language barriers.',
    sec03: '03 /',
    sec03_title: 'plans',
    plan1_tag: 'to get started',
    plan1_name: 'BASIC ONLINE',
    plan1_freq: 'per month',
    plan1_i1: 'Online assessment',
    plan1_i2: 'Monthly routine (images)',
    plan1_i3: 'Personalized plan',
    plan1_i4: 'WhatsApp coaching',
    plan1_btn: 'inquire →',
    plan2_tag: 'most complete',
    plan2_name: 'ONLINE PRO',
    plan2_freq: 'per month',
    plan2_i1: 'Online assessment',
    plan2_i2: 'Monthly routine + video demos',
    plan2_i3: 'Weekly check-in',
    plan2_i4: 'Video call coaching',
    plan2_i5: 'Unlimited adjustments',
    plan2_btn: 'I want this →',
    plan3_tag: 'video call',
    plan3_name: 'VIRTUAL LIVE',
    plan3_freq: 'per month',
    plan3_i1: 'Online assessment',
    plan3_i2: 'Personalized monthly routine',
    plan3_i3: 'Live video call sessions (X/week)',
    plan3_i4: 'Continuous coaching',
    plan3_btn: 'inquire →',
    plan4_tag: '100% in-person',
    plan4_name: 'IN-PERSON',
    plan4_freq: 'per month',
    plan4_i1: 'In-person assessment',
    plan4_i2: 'Personalized monthly plan',
    plan4_i3: 'In-person sessions (X/week)',
    plan4_i4: 'At home, park or gym',
    plan4_i5: 'Continuous coaching',
    plan4_btn: 'inquire →',
    sec04: '04 /',
    sec04_title: 'reviews',
    test1: 'I started knowing nothing about training and Sabri guided me from scratch. In 3 months I noticed incredible changes, both physically and in my daily energy.',
    test1_name: 'Laura M.',
    test1_meta: 'in-person · 6 months',
    test2: 'The online plan is perfect for my pace of life. Everything is organized and whenever I have questions she always responds quickly. Highly recommended.',
    test2_name: 'Gonzalo R.',
    test2_meta: 'online · 4 months',
    test3: 'The active breaks were a before and after for our team. Very dynamic, approachable and professional. We hired her again.',
    test3_name: 'Valeria P.',
    test3_meta: 'corporate · active breaks',
    cta_h2: 'LET\'S <em>START?</em>',
    cta_p: 'Send me a message and within 24 hours I\'ll tell you how we begin — no matter where you are.',
    cta_btn: 'message me on whatsapp',
    f_servicios: 'services',
    f_planes: 'plans',
    f_sobre: 'about me',
    f_wa: 'whatsapp',
  }
};

let currentLang = 'es';

function applyLang(lang) {
  const t = translations[lang];
  // NAV links
  document.querySelector('[data-i18n="nav_servicios"]').textContent = t.nav_servicios;
  document.querySelector('[data-i18n="nav_planes"]').textContent = t.nav_planes;
  document.querySelector('[data-i18n="nav_sobre"]').textContent = t.nav_sobre;
  document.querySelector('[data-i18n="nav_opiniones"]').textContent = t.nav_opiniones;
  document.querySelector('[data-i18n="nav_contacto"]').textContent = t.nav_contacto;
  // All data-i18n text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.innerHTML !== undefined && t[key].includes('<')) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
  // HTML content nodes
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  // Update lang button label
  const btn = document.getElementById('lang-btn');
  btn.textContent = lang === 'es' ? 'EN' : 'ES';
  btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
  // Update html lang
  document.documentElement.lang = lang;
  currentLang = lang;
}

document.getElementById('lang-btn').addEventListener('click', () => {
  applyLang(currentLang === 'es' ? 'en' : 'es');
});