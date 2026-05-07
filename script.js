// ── STARFIELD ──
const canvas = document.getElementById('starfield');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5,
        a: Math.random(),
        speed: Math.random() * 0.3 + 0.05,
        twinkle: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    const time = Date.now() * 0.001;

    stars.forEach(s => {
      const alpha = (Math.sin(time * s.speed + s.twinkle) + 1) * 0.5 * s.a;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 210, 255, ${alpha})`;
      ctx.fill();
    });

    // Nebula clouds
    const gradient1 = ctx.createRadialGradient(W * 0.8, H * 0.2, 0, W * 0.8, H * 0.2, W * 0.4);
    gradient1.addColorStop(0, 'rgba(30, 80, 180, 0.03)');
    gradient1.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, W, H);

    const gradient2 = ctx.createRadialGradient(W * 0.1, H * 0.7, 0, W * 0.1, H * 0.7, W * 0.3);
    gradient2.addColorStop(0, 'rgba(0, 120, 180, 0.04)');
    gradient2.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(drawStars);
  }

  resize();
  createStars();
  drawStars();
  window.addEventListener('resize', () => { resize(); createStars(); });
}

// ── FLOATING PARTICLES ──
const particlesEl = document.getElementById('particles');
if (particlesEl) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 200;
    const opacity = Math.random() * 0.5 + 0.2;
    p.style.cssText = `
      left: ${left}%;
      width: ${size}px; height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      --drift: ${drift}px;
      opacity: ${opacity};
      background: ${Math.random() > 0.5 ? '#4da6ff' : '#00e5ff'};
      box-shadow: 0 0 ${size * 3}px ${Math.random() > 0.5 ? '#4da6ff' : '#00e5ff'};
    `;
    particlesEl.appendChild(p);
  }
}

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE NAV ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── TYPED TEXT ──
const typedEl = document.getElementById('typed');
if (typedEl) {
  const phrases = [
    'Java Full Stack Engineer',
    'Distributed Systems Architect',
    'React & Spring Boot Developer',
    'AWS & Kafka Specialist',
    'Building systems that scale'
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      typedEl.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      typedEl.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 1000);
}

// ── 3D TILT CARDS ──
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / cy * -12;
    const ry = (x - cx) / cx * 12;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal-section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ── SKILL BARS ANIMATE ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => bar.style.width = w, 100);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-block').forEach(el => skillObserver.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-btn');
    const txt = document.getElementById('submitText');
    if (txt) {
      txt.textContent = 'TRANSMISSION SENT ✓';
      btn.style.background = '#00ff88';
      btn.style.color = '#02020a';
      setTimeout(() => {
        txt.textContent = 'TRANSMIT MESSAGE';
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3500);
    }
  });
}

// ── SHOOTING STARS ──
function shootStar() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  const length = Math.random() * 100 + 50;
  const angle = Math.random() * 0.5 + 0.2;
  let progress = 0;

  function draw() {
    progress += 3;
    if (progress > length + 30) return;
    const tailX = x + Math.cos(angle) * Math.max(0, progress - 30);
    const tailY = y + Math.sin(angle) * Math.max(0, progress - 30);
    const headX = x + Math.cos(angle) * Math.min(progress, length);
    const headY = y + Math.sin(angle) * Math.min(progress, length);
    const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, 'rgba(200, 230, 255, 0.9)');
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(headX, headY);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    requestAnimationFrame(draw);
  }
  draw();
}
setInterval(shootStar, 4000);
setTimeout(shootStar, 1500);
