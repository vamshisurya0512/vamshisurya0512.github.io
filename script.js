// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE NAV TOGGLE
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ADD REVEAL CLASS TO SECTIONS
document.querySelectorAll('.current-card, .project-card, .timeline-item, .value-card, .skill-category, .project-full-card, .small-project-card, .contact-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = '#00c896';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// SKILL BARS ANIMATE ON SCROLL
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.width;
    }
  });
}, { threshold: 0.5 });
skillFills.forEach(el => skillObserver.observe(el));

// CURSOR GLOW EFFECT
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(26,140,255,0.04) 0%, transparent 70%);
  border-radius: 50%; pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%); transition: opacity 0.3s;
`;
document.body.appendChild(cursor);
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
