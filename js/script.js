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

// Contact form -> Web3Forms (emails straight to your inbox, no backend needed)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.classList.remove('is-success', 'is-error');
    }

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      });
      const data = await res.json();

      if (data.success) {
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = 'Thanks! Your message has been sent.';
          formStatus.classList.add('is-success');
        }
      } else {
        if (formStatus) {
          formStatus.textContent = data.message || 'Something went wrong. Please try again.';
          formStatus.classList.add('is-error');
        }
      }
    } catch (err) {
      if (formStatus) {
        formStatus.textContent = 'Could not reach the server. Please try again later.';
        formStatus.classList.add('is-error');
      }
    } finally {
      submitBtn.disabled = false;
    }
  });
}
