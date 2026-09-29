/**
 * ============================================================
 *  public/js/main.js — Interaksi sisi klien
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Navbar scroll ---------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  const onScroll = () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 50);
    if (scrollProgress) {
      const pct = (y / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollProgress.style.width = pct + '%';
    }
    if (backToTop) {
      backToTop.classList.toggle('hidden', y <= 400);
      backToTop.classList.toggle('flex', y > 400);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- 2. Theme toggle ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');
  const syncThemeIcon = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (sunIcon) sunIcon.classList.toggle('hidden', !isDark);
    if (moonIcon) moonIcon.classList.toggle('hidden', isDark);
  };
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', !isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      syncThemeIcon();
    });
  }
  syncThemeIcon();

  /* ---------- 3. Mobile menu (slide-in panel) ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobilePanel = document.getElementById('mobile-panel');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const burgerIcon = document.getElementById('icon-burger');
  const closeIcon = document.getElementById('icon-close');

  const toggleMobileMenu = (open) => {
    if (mobilePanel) mobilePanel.classList.toggle('active', open);
    if (mobileOverlay) mobileOverlay.classList.toggle('active', open);
    if (burgerIcon) burgerIcon.classList.toggle('hidden', open);
    if (closeIcon) closeIcon.classList.toggle('hidden', !open);
    if (menuToggle) menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isActive = mobilePanel && mobilePanel.classList.contains('active');
      toggleMobileMenu(!isActive);
    });
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }
  document.querySelectorAll('#mobile-panel a').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  /* ---------- 4. Scroll reveal (IntersectionObserver) ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const bar = entry.target.querySelector('.skill-bar-fill');
          if (bar && bar.dataset.level) {
            bar.style.width = bar.dataset.level + '%';
          }
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- 5. Count-up animation ---------- */
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutQuart(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  /* ---------- 6. Particles in hero ---------- */
  const particlesContainer = document.getElementById('hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const dot = document.createElement('div');
      dot.className = 'particle';
      const size = Math.random() * 2 + 1;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.setProperty('--tx', (Math.random() * 80 - 40) + 'px');
      dot.style.setProperty('--ty', (Math.random() * 80 - 40) + 'px');
      dot.style.animation = `particleFloat ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite`;
      dot.style.opacity = 0;
      particlesContainer.appendChild(dot);
    }
  }

  /* ---------- 7. 3D Dotted Globe ---------- */
  const globeCanvas = document.getElementById('globe');
  if (globeCanvas) {
    const ctx = globeCanvas.getContext('2d');
    const wrap = document.getElementById('globe-wrap');
    let W, H, R, focalLength;
    let angleY = 0;
    const tiltX = 0.3;
    const speedY = 0.0025;
    let mouseX = 0, mouseY = 0, targetMX = 0, targetMY = 0;

    const NUM_DOTS = 1000;
    const THRESHOLD = 0.12;

    const dots = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < NUM_DOTS; i++) {
      const t = i / NUM_DOTS;
      const phi = Math.acos(1 - 2 * t);
      const theta = goldenAngle * i;
      const flickerSpeed = 0.5 + Math.random() * 2;
      const flickerOffset = Math.random() * Math.PI * 2;
      dots.push({ phi, theta, flickerSpeed, flickerOffset });
    }

    function resize() {
      const lg = window.matchMedia('(min-width:1024px)').matches;
      const md = window.matchMedia('(min-width:640px)').matches;
      const size = lg ? 500 : md ? 350 : 280;
      const dpr = window.devicePixelRatio || 1;
      globeCanvas.width = size * dpr;
      globeCanvas.height = size * dpr;
      globeCanvas.style.width = size + 'px';
      globeCanvas.style.height = size + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = size;
      H = size;
      R = size * 0.38;
      focalLength = size * 0.6;
    }
    resize();
    window.addEventListener('resize', resize);

    if (wrap) {
      wrap.style.pointerEvents = 'auto';
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        targetMX = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        targetMY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      });
      wrap.addEventListener('mouseleave', () => { targetMX = 0; targetMY = 0; });
    }

    function project(x, y, z) {
      const scale = focalLength / (focalLength + z);
      return { x: W / 2 + x * scale, y: H / 2 + y * scale, scale };
    }

    function drawGlobe(time) {
      ctx.clearRect(0, 0, W, H);
      angleY += speedY;
      mouseX += (targetMX - mouseX) * 0.04;
      mouseY += (targetMY - mouseY) * 0.04;

      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);

      const projected = [];

      for (let i = 0; i < NUM_DOTS; i++) {
        const d = dots[i];
        const x0 = R * Math.sin(d.phi) * Math.cos(d.theta);
        const y0 = R * Math.cos(d.phi);
        const z0 = R * Math.sin(d.phi) * Math.sin(d.theta);

        const x1 = x0 * cosY - z0 * sinY;
        const z1 = x0 * sinY + z0 * cosY;
        const y1 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const p = project(x1 + mouseX, y1 + mouseY, z2);
        const depth = (z2 + R) / (2 * R);
        const flicker = 0.6 + 0.4 * Math.sin(time * 0.001 * d.flickerSpeed + d.flickerOffset);

        projected.push({ x: p.x, y: p.y, z: z2, depth, scale: p.scale, flicker, idx: i });
      }

      projected.sort((a, b) => a.z - b.z);

      const maxDist = R * THRESHOLD;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        if (a.z < -R * 0.3) continue;

        for (let j = i + 1; j < projected.length && j < i + 20; j++) {
          const b = projected[j];
          if (b.z < -R * 0.3) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist * a.scale) {
            const lineAlpha = 0.06 * a.depth * b.depth;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(249,115,22,${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      for (const p of projected) {
        if (p.z < -R * 0.3) continue;
        const alpha = 0.15 + 0.85 * p.depth * p.flicker;
        const size = Math.max(0.8, 2 * p.scale);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${alpha})`;
        ctx.fill();
      }

      for (let ring = 0; ring < 2; ring++) {
        const ringAngle = angleY * (ring === 0 ? 0.7 : -0.5) + ring * Math.PI * 0.5;
        const ringTilt = tiltX + (ring === 0 ? 0.3 : -0.2);
        const ringR = R * (1.2 + ring * 0.15);
        ctx.beginPath();
        ctx.ellipse(
          W / 2 + mouseX, H / 2 + mouseY,
          ringR, ringR * 0.3,
          ringTilt, 0, Math.PI * 2
        );
        ctx.strokeStyle = `rgba(249,115,22,${0.06 - ring * 0.02})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      requestAnimationFrame(drawGlobe);
    }
    requestAnimationFrame(drawGlobe);
  }

  /* ---------- 7. Typing effect ---------- */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    let roles = [];
    try { roles = JSON.parse(typedEl.dataset.roles || '[]'); } catch (e) { roles = []; }
    let roleIndex = 0, charIndex = 0, deleting = false;

    const type = () => {
      const current = roles[roleIndex % roles.length];
      if (!current) return;
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) { deleting = true; setTimeout(type, 1600); }
        else setTimeout(type, 90);
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) { deleting = false; roleIndex++; setTimeout(type, 350); }
        else setTimeout(type, 45);
      }
    };
    setTimeout(type, 600);
  }

  /* ---------- 8. Alert dismiss ---------- */
  document.querySelectorAll('[data-close-alert]').forEach(btn => {
    btn.addEventListener('click', () => {
      const alert = btn.closest('#form-alert');
      if (alert) alert.remove();
    });
  });
});
