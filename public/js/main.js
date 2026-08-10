/**
 * ============================================================
 *  public/js/main.js — Interaksi sisi klien (Vanilla JS)
 * ------------------------------------------------------------
 *  Berisi:
 *   1. Toggle mode terang/gelap (tombol di navbar)
 *   2. Menu mobile (hamburger)
 *   3. Navbar shadow saat scroll
 *   4. Progress bar scroll + tombol kembali ke atas
 *   5. Animasi "reveal" saat elemen masuk layar
 *   6. Progress bar keahlian (halaman Tentang)
 *   7. Efek ketikan (typing effect) di hero
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- 1. Toggle mode terang/gelap ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');

  // Sinkronkan ikon dengan tema saat ini
  const syncThemeIcon = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (sunIcon) sunIcon.classList.toggle('hidden', !isDark);
    if (moonIcon) moonIcon.classList.toggle('hidden', isDark);
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('theme', next); // simpan pilihan pengguna
      syncThemeIcon();
    });
  }
  syncThemeIcon();

  /* ---------- 2. Menu mobile (hamburger) ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerIcon = document.getElementById('icon-burger');
  const closeIcon = document.getElementById('icon-close');

  const toggleMobileMenu = (open) => {
    mobileMenu.classList.toggle('hidden', !open);
    burgerIcon.classList.toggle('hidden', open);
    closeIcon.classList.toggle('hidden', !open);
    menuToggle.setAttribute('aria-expanded', String(open));
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      toggleMobileMenu(isHidden);
    });

    // Tutup menu otomatis saat salah satu link diklik
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });
  }

  /* ---------- 3. Navbar shadow saat scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScrollNavbar = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  /* ---------- 4. Progress bar scroll + tombol kembali ke atas ---------- */
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  const onScrollPage = () => {
    // Progress bar
    if (scrollProgress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      scrollProgress.style.width = percent + '%';
    }
    // Tombol kembali ke atas
    if (backToTop) {
      const show = window.scrollY > 400;
      backToTop.classList.toggle('hidden', !show);
      backToTop.classList.toggle('flex', show);
    }
  };

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 5. Animasi "reveal" saat elemen terlihat ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Isi progress bar keahlian saat terlihat
          const bar = entry.target.querySelector('.skill-bar-fill');
          if (bar && bar.dataset.level) {
            bar.style.width = bar.dataset.level + '%';
          }
          revealObserver.unobserve(entry.target); // animasi cukup sekali
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ---------- 6. Efek ketikan (typing effect) di hero ---------- */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    let roles = [];
    try {
      roles = JSON.parse(typedEl.dataset.roles || '[]');
    } catch (e) {
      roles = [];
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = roles[roleIndex % roles.length];
      if (!current) return;

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 1600); // jeda setelah kata selesai
        } else {
          setTimeout(type, 90);
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex++;
          setTimeout(type, 350);
        } else {
          setTimeout(type, 45);
        }
      }
    };

    setTimeout(type, 600);
  }

  /* ---------- 7. Tutup notifikasi (alert) ---------- */
  document.querySelectorAll('[data-close-alert]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const alert = btn.closest('#form-alert');
      if (alert) alert.remove();
    });
  });

  /* ---------- Gabungkan listener scroll ---------- */
  const onScroll = () => {
    onScrollNavbar();
    onScrollPage();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // jalankan sekali saat halaman dimuat
});
