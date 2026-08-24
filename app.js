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
       navMenu.classList.toggle('active', open);
       hamburger.setAttribute('aria-expanded', String(open));
       hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
       const [a, b, c] = hamburger.querySelectorAll('span');
       a.style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
       b.style.opacity = open ? '0' : '';
       c.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
     };
   
     hamburger.addEventListener('click', () => {
       setMenu(!navMenu.classList.contains('active'));
     });
   
     navMenu.querySelectorAll('.nav-link').forEach((link) => {
       link.addEventListener('click', () => setMenu(false));
     });
   
     document.addEventListener('keydown', (e) => {
       if (e.key === 'Escape') setMenu(false);
     });
   }
   
   /* ---------- Active nav link on scroll ---------- */
   const sections = document.querySelectorAll('section[id]');
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
   
   /* ---------- Count up the milestone numbers ---------- */
   const achievementNumbers = document.querySelectorAll('.achievement-number');
   
   if (achievementNumbers.length && !reduceMotion) {
     const countObserver = new IntersectionObserver(
       (entries, observer) => {
         entries.forEach((entry) => {
           if (!entry.isIntersecting) return;
           const el = entry.target;
           const final = el.textContent;
           const digits = parseInt(final.replace(/\D/g, ''), 10);
           if (Number.isNaN(digits)) return;
   
           const suffix = final.replace(/[0-9]/g, '');
           const duration = 900;
           const start = performance.now();
   
           const tick = (now) => {
             const progress = Math.min((now - start) / duration, 1);
             const eased = 1 - Math.pow(1 - progress, 3);
             el.textContent = Math.round(digits * eased) + suffix;
             if (progress < 1) requestAnimationFrame(tick);
             else el.textContent = final;
           };
           requestAnimationFrame(tick);
           observer.unobserve(el);
         });
       },
       { threshold: 0.5 }
     );
     achievementNumbers.forEach((el) => countObserver.observe(el));
   }
   
   /* ---------- Scroll reveal ---------- */
   const revealTargets = document.querySelectorAll(
     '.section-head, .mini-card, .edu-row, .skill-group, .project-card, .experience-card, .achievement-card, .contact-grid > div'
   );
   
   if (revealTargets.length && !reduceMotion) {
     const revealObserver = new IntersectionObserver(
       (entries, observer) => {
         entries.forEach((entry) => {
           if (!entry.isIntersecting) return;
           entry.target.classList.add('fade-in');
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