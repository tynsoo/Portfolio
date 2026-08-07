// Scroll-reveal animations
const revealTargets = document.querySelectorAll(
  '.about-text, .about-photo-crop, .education, .skills-col, .section-heading--center, .filter-bar, .project-card, .contact-form'
);

if (revealTargets.length && 'IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

if (navToggle && navbar) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navbar.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navbar.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// Contact form -> mailto
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\n${message}`
    );

    window.location.href = `mailto:tynsolis2209@gmail.com?subject=${subject}&body=${body}`;
  });
}
