gsap.registerPlugin(ScrollTrigger, TextPlugin);

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
})();

const tl = gsap.timeline({ delay: 0.3 });

  const nameEl = document.getElementById('heroName');
  const nameText = nameEl.textContent.trim();
  
  nameEl.innerHTML = nameText.split(' ').map(word => {
    const chars = word.split('').map(c => `<span class="char">${c}</span>`).join('');
    return `<span style="display:inline-block; white-space:nowrap;">${chars}</span>`;
  }).join(' ');

tl.to('#navbar', { y: 0, duration: 0.8, ease: 'power3.out' })
  .to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
  .to('#heroName', { opacity: 1, duration: 0.01 }, '-=0.1')
  .from('#heroName .char', {
    opacity: 0,
    y: 80,
    rotationX: -60,
    stagger: 0.06,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, '-=0.1')
  .to('#heroSubtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
  .to('#heroCta', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  .to('#heroScroll', { opacity: 1, duration: 0.5 }, '-=0.2');

gsap.utils.toArray('.reveal').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true
    }
  });
});

document.querySelectorAll('.skill-bar-fill').forEach(bar => {
  const target = bar.dataset.width + '%';
  ScrollTrigger.create({
    trigger: bar,
    start: 'top 90%',
    once: true,
    onEnter: () => gsap.to(bar, { width: target, duration: 1.4, ease: 'power3.out', delay: 0.2 })
  });
});

ScrollTrigger.create({
  start: 100,
  onUpdate: self => {
    const nav = document.getElementById('navbar');
    nav.style.background = self.progress > 0
      ? 'rgba(11,11,14,0.85)'
      : 'rgba(11,11,14,0.6)';
  }
});

document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    gsap.to(card, {
      rotationY: dx * 8,
      rotationX: -dy * 6,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 600
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotationY: 0, rotationX: 0, scale: 1,
      duration: 0.6, ease: 'elastic.out(1, 0.5)',
      transformPerspective: 600
    });
  });
});

document.addEventListener('mousemove', e => {
  const xPct = (e.clientX / window.innerWidth - 0.5) * 30;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 20;
  gsap.to('.orb-1', { x: xPct, y: yPct, duration: 1.5, ease: 'power2.out' });
  gsap.to('.orb-2', { x: -xPct * 0.6, y: -yPct * 0.6, duration: 2, ease: 'power2.out' });
});

gsap.to('#home', {
  backgroundPositionY: '30%',
  ease: 'none',
  scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true }
});

gsap.from('.portfolio-grid .card', {
  opacity: 0,
  y: 50,
  stagger: 0.12,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.portfolio-grid',
    start: 'top 80%',
    once: true
  }
});

gsap.utils.toArray('.section-divider').forEach(d => {
  gsap.from(d, {
    scaleX: 0,
    transformOrigin: 'left',
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: d, start: 'top 90%', once: true }
  });
});