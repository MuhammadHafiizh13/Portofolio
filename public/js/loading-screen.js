/**
 * ============================================================
 *  public/js/loading-screen.js — Logika Loading Screen
 * ============================================================
 */

(function () {
  'use strict';

  const DURATION = 3000;
  const TEXT_DELAY_NAME = 300;
  const TEXT_DELAY_SUB = 500;
  const POST_COMPLETE = 500;

  const screen = document.getElementById('loading-screen');
  const nameEl = document.getElementById('loading-name');
  const subtitleEl = document.getElementById('loading-subtitle');
  const fillEl = document.getElementById('loading-progress-fill');
  const percentEl = document.getElementById('loading-percent');

  if (!screen) return;

  document.body.classList.add('is-loading');

  let startTime = null;
  let rafId = null;

  setTimeout(() => { nameEl.classList.add('is-visible'); }, TEXT_DELAY_NAME);
  setTimeout(() => { subtitleEl.classList.add('is-visible'); }, TEXT_DELAY_SUB);

  function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    const percent = Math.round(progress * 100);

    fillEl.style.width = percent + '%';
    percentEl.textContent = percent + '%';

    if (progress < 1) {
      rafId = requestAnimationFrame(animateProgress);
    } else {
      setTimeout(exitLoading, POST_COMPLETE);
    }
  }

  function exitLoading() {
    screen.classList.add('is-exiting');
    setTimeout(() => {
      screen.style.display = 'none';
      document.body.classList.remove('is-loading');
    }, 800);
  }

  rafId = requestAnimationFrame(animateProgress);
})();
