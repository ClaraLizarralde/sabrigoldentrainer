
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
