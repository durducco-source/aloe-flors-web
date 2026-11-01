/* =========================================================
   ALOE FLORS · Interacciones de la web
   ---------------------------------------------------------
   Para cambiar el número de WhatsApp o el horario, edita
   el objeto CONFIG de aquí abajo (y los textos visibles en
   index.html).
   ========================================================= */

const CONFIG = {
  whatsapp: '34695670120',          // número con prefijo de país, sin "+" ni espacios
  // Horario para el indicador "Abierto ahora / Cerrado".
  // 0 = domingo, 1 = lunes … 6 = sábado. Tramos en formato 'HH:MM-HH:MM'.
  hours: {
    0: [],
    1: [],
    2: ['09:30-13:00', '17:00-20:00'],
    3: ['09:30-13:00', '17:00-20:00'],
    4: ['09:30-13:00', '17:00-20:00'],
    5: ['09:30-13:00', '17:00-20:00'],
    6: ['09:30-13:00']
  }
};

document.documentElement.classList.remove('no-js');

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => window.matchMedia('(min-width: 861px)').matches;

/* ---------- Enlaces de WhatsApp con mensaje ---------- */
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
$$('[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa); });

/* ---------- Intro y carga ---------- */
const finishIntro = () => document.body.classList.add('is-loaded');
let introShown = false;
try { introShown = sessionStorage.getItem('aloe-intro') === '1'; sessionStorage.setItem('aloe-intro', '1'); } catch (e) { /* sin almacenamiento */ }
if (reduceMotion || introShown) {
  finishIntro();
} else {
  window.addEventListener('load', () => setTimeout(finishIntro, 700));
  setTimeout(finishIntro, 2600); // seguridad si algún recurso tarda
}

/* ---------- Cabecera, barra de progreso y botón flotante ---------- */
const header = $('[data-header]');
const bar = $('.progress span');
const waFloat = $('.wa-float');
let lastY = 0;
let ticking = false;
const onScroll = () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('is-solid', y > 60);
  header.classList.toggle('is-hidden', y > 600 && y > lastY && !document.body.classList.contains('menu-open'));
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  waFloat.classList.toggle('is-visible', y > window.innerHeight * 0.5);
  lastY = y;
  ticking = false;
};
window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
onScroll();

/* ---------- Menú móvil ---------- */
const burger = $('.burger');
const menu = $('#mobile-menu');
const setMenu = (open) => {
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('menu-open', open);
  document.body.classList.toggle('is-locked', open);
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
  } else {
    menu.classList.remove('is-open');
    setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 700);
  }
};
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
$$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));

/* ---------- Enlace activo en el menú ---------- */
const navLinks = $$('.nav a');
const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
const navObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === `#${e.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => navObs.observe(s));

/* ---------- Aparición al hacer scroll ---------- */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
// Escalonado entre elementos hermanos
$$('.reveal').forEach((el) => {
  const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
  const i = sibs.indexOf(el);
  if (i > 0) el.style.setProperty('--rd', `${Math.min(i, 6) * 0.08}s`);
  revealObs.observe(el);
});

/* ---------- Cita dividida palabra a palabra ---------- */
$$('[data-split]').forEach((el) => {
  let n = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.style.setProperty('--d', n++);
          inner.textContent = part;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        walk(child);
      }
    });
  };
  walk(el);
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { el.classList.add('is-in'); obs.disconnect(); }
  }, { threshold: 0.3 }).observe(el);
});

/* ---------- Parallax suave ---------- */
const parallax = $$('[data-parallax]');
if (!reduceMotion && parallax.length) {
  const run = () => {
    const vh = window.innerHeight;
    parallax.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const speed = parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2) - vh / 2) * speed}px, 0)`;
    });
  };
  window.addEventListener('scroll', () => requestAnimationFrame(run), { passive: true });
  run();
}

/* ---------- Vídeo de portada ---------- */
const heroMain = $('[data-hero-main]');
const heroBg = $('[data-hero-bg]');
const soundBtn = $('[data-hero-sound]');
if (heroMain) {
  // El fondo desenfocado sólo se carga en escritorio
  if (heroBg && isDesktop() && !reduceMotion) {
    heroBg.src = heroMain.currentSrc || heroMain.getAttribute('src');
    heroBg.play().catch(() => {});
    heroMain.addEventListener('play', () => { heroBg.currentTime = heroMain.currentTime; heroBg.play().catch(() => {}); });
  }
  if (reduceMotion) heroMain.pause();
  soundBtn.addEventListener('click', () => {
    heroMain.muted = !heroMain.muted;
    if (!heroMain.muted) heroMain.play().catch(() => {});
    soundBtn.setAttribute('aria-pressed', String(!heroMain.muted));
    $('use', soundBtn).setAttribute('href', heroMain.muted ? '#i-mute' : '#i-sound');
    $('span', soundBtn).textContent = heroMain.muted ? 'Activar sonido' : 'Silenciar';
  });
  // Pausa los vídeos de portada cuando no se ven (ahorra batería y datos)
  new IntersectionObserver(([e]) => {
    [heroMain, heroBg].forEach((v) => {
      if (!v || !v.src) return;
      if (e.isIntersecting && !reduceMotion) v.play().catch(() => {}); else v.pause();
    });
  }, { threshold: 0.05 }).observe($('.hero'));
}

/* ---------- Vídeos que se reproducen al verse ---------- */
const autoVideos = $$('[data-autoplay]');
const autoObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting && !reduceMotion) { v.preload = 'auto'; v.play().catch(() => {}); } else { v.pause(); }
  });
}, { threshold: 0.35 });
autoVideos.forEach((v) => autoObs.observe(v));

/* ---------- Carrusel de composiciones ---------- */
const slider = $('[data-slider]');
if (slider) {
  const step = () => (slider.querySelector('.card')?.getBoundingClientRect().width || 300) + 24;
  $$('[data-slide]').forEach((b) => b.addEventListener('click', () => {
    slider.scrollBy({ left: step() * Number(b.dataset.slide), behavior: reduceMotion ? 'auto' : 'smooth' });
  }));
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); slider.scrollBy({ left: step(), behavior: 'smooth' }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); slider.scrollBy({ left: -step(), behavior: 'smooth' }); }
  });
  // Arrastrar con el ratón (en táctil se usa el desplazamiento nativo)
  let down = false; let startX = 0; let startLeft = 0; let moved = false;
  slider.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; startX = e.clientX; startLeft = slider.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) { moved = true; slider.classList.add('is-drag'); }
    slider.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    slider.classList.remove('is-drag');
  });
  slider.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
}

/* ---------- Filtros de galería ---------- */
const chips = $$('[data-filter]');
const galleryItems = $$('[data-gallery] figure');
chips.forEach((chip) => chip.addEventListener('click', () => {
  chips.forEach((c) => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-selected', String(c === chip)); });
  const f = chip.dataset.filter;
  galleryItems.forEach((it) => it.classList.toggle('is-hidden', f !== 'all' && it.dataset.cat !== f));
}));

/* ---------- Visor de imágenes ---------- */
const lb = $('[data-lightbox]');
const lbImg = $('[data-lb-img]');
const lbCap = $('[data-lb-cap]');
let lbList = [];
let lbIndex = 0;
let lastFocus = null;
const lbShow = (i) => {
  lbIndex = (i + lbList.length) % lbList.length;
  const item = lbList[lbIndex];
  const img = $('img', item);
  lbImg.src = item.dataset.lb;
  lbImg.alt = img ? img.alt : '';
  const cap = $('figcaption', item);
  lbCap.textContent = cap ? cap.textContent.replace(/\s+/g, ' ').trim() : (img ? img.alt : '');
};
const lbOpen = (item) => {
  const group = item.closest('[data-gallery], [data-slider]');
  lbList = $$('[data-lb]', group).filter((el) => !el.classList.contains('is-hidden'));
  lastFocus = document.activeElement;
  lbShow(lbList.indexOf(item));
  lb.hidden = false;
  document.body.classList.add('is-locked');
  requestAnimationFrame(() => lb.classList.add('is-open'));
  $('[data-lb-close]', lb).focus();
};
const lbClose = () => {
  lb.classList.remove('is-open');
  document.body.classList.remove('is-locked');
  setTimeout(() => { lb.hidden = true; lbImg.removeAttribute('src'); }, 400);
  if (lastFocus) lastFocus.focus();
};
$$('[data-lb]').forEach((item) => {
  item.tabIndex = 0;
  item.setAttribute('role', 'button');
  item.addEventListener('click', () => lbOpen(item));
  item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbOpen(item); } });
});
$('[data-lb-close]', lb).addEventListener('click', lbClose);
$$('[data-lb-step]', lb).forEach((b) => b.addEventListener('click', () => lbShow(lbIndex + Number(b.dataset.lbStep))));
lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });
// Deslizar en móvil
let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
});

/* ---------- Visor de vídeo ---------- */
const vm = $('[data-vmodal]');
const vmVideo = $('[data-vm-video]');
const vmOpen = (btn) => {
  lastFocus = btn;
  vmVideo.src = btn.dataset.video;
  vmVideo.setAttribute('aria-label', btn.dataset.title || 'Vídeo');
  vm.hidden = false;
  document.body.classList.add('is-locked');
  if (heroMain) heroMain.pause();
  requestAnimationFrame(() => vm.classList.add('is-open'));
  vmVideo.play().catch(() => {});
  $('[data-vm-close]', vm).focus();
};
const vmClose = () => {
  vmVideo.pause();
  vm.classList.remove('is-open');
  document.body.classList.remove('is-locked');
  setTimeout(() => { vm.hidden = true; vmVideo.removeAttribute('src'); vmVideo.load(); }, 400);
  if (lastFocus) lastFocus.focus();
};
$$('[data-video]').forEach((b) => b.addEventListener('click', () => vmOpen(b)));
$('[data-vm-close]', vm).addEventListener('click', vmClose);
vm.addEventListener('click', (e) => { if (e.target === vm) vmClose(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!lb.hidden) lbClose();
    if (!vm.hidden) vmClose();
    if (document.body.classList.contains('menu-open')) setMenu(false);
  }
  if (!lb.hidden && e.key === 'ArrowRight') lbShow(lbIndex + 1);
  if (!lb.hidden && e.key === 'ArrowLeft') lbShow(lbIndex - 1);
});

/* ---------- Horario: día actual y "Abierto ahora" ---------- */
(() => {
  const state = $('[data-open-state]');
  const table = $('[data-hours]');
  if (!state || !table) return;
  // Hora local de Lloret de Mar (Europa/Madrid), aunque el visitante esté en otro país
  let now;
  try {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    now = { day: days[get('weekday')], min: Number(get('hour')) % 24 * 60 + Number(get('minute')) };
  } catch (e) {
    const d = new Date();
    now = { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
  }
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const open = (CONFIG.hours[now.day] || []).some((r) => {
    const [a, b] = r.split('-').map(toMin);
    return now.min >= a && now.min < b;
  });
  state.textContent = open ? 'Abierto ahora' : 'Ahora cerrado';
  state.classList.add(open ? 'is-open' : 'is-closed');
  const row = $(`tr[data-day="${now.day}"]`, table);
  if (row) row.classList.add('is-today');
})();

/* ---------- Formulario de pedido por WhatsApp ---------- */
const form = $('[data-order]');
if (form) {
  const err = $('[data-form-error]', form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.nombre.value.trim();
    const msg = form.mensaje.value.trim();
    form.nombre.classList.toggle('is-invalid', !name);
    form.mensaje.classList.toggle('is-invalid', !msg);
    if (!name || !msg) { err.hidden = false; (name ? form.mensaje : form.nombre).focus(); return; }
    err.hidden = true;
    let fecha = '';
    if (form.fecha.value) {
      const [y, m, d] = form.fecha.value.split('-');
      fecha = `${d}/${m}/${y}`;
    }
    const lines = [
      `Hola Aloe Flors, soy ${name}.`,
      `Ocasión: ${form.ocasion.value}`,
      fecha ? `Fecha: ${fecha}` : null,
      `Entrega: ${form.entrega.value}`,
      '',
      msg
    ].filter((l) => l !== null);
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
  });
  // La fecha no puede ser anterior a hoy
  const today = new Date();
  form.fecha.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

/* ---------- Mapa: se carga al acercarse (página más rápida) ---------- */
const mapFrame = $('.map iframe');
if (mapFrame) {
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { mapFrame.src = mapFrame.dataset.src; obs.disconnect(); }
  }, { rootMargin: '400px' }).observe(mapFrame);
}

/* ---------- Año del pie ---------- */
const year = $('[data-year]');
if (year) year.textContent = new Date().getFullYear();
