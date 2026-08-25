/* ============================================================
   Priyank Solanki — portfolio
   Behaviour only. All styling lives in index.html.
   ============================================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mobile menu ---------- */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  const setMenu = (open) => {
    navMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    const [a, b, c] = hamburger.querySelectorAll('span');
    a.style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    b.style.opacity = open ? '0' : '';
    c.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  };

  hamburger.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('open'));
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });
}

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((section) => navObserver.observe(section));
}

/* ---------- Project filter ---------- */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

/* ---------- Toolkit flip cards — tap toggles on touch ---------- */
document.querySelectorAll('.flip').forEach((flip) => {
  flip.addEventListener('click', () => flip.classList.toggle('flipped'));
  flip.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip.classList.toggle('flipped');
    }
  });
});

/* ---------- Count up the stat tiles ---------- */
const counters = document.querySelectorAll('[data-count]');

if (counters.length && !reduceMotion) {
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if (Number.isNaN(target)) return;

        const duration = 1100;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => countObserver.observe(el));
} else {
  counters.forEach((el) => {
    el.textContent = el.dataset.count + (el.dataset.suffix || '');
  });
}

/* ---------- Scroll reveal ---------- */
const revealTargets = document.querySelectorAll(
  '.section-head, .intro-text, .stat-tile, .tl-row, .project-card, .flip, .why-item, .cred-row, .contact-grid > div'
);

if (revealTargets.length && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}
