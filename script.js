/* ================================================================
   SHAM SWEETS — Minimal Premium Bakery
   JavaScript
   ================================================================ */

'use strict';

/* --- Navbar scroll state --- */
(function () {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* --- Hamburger + mobile drawer --- */
(function () {
  var btn    = document.getElementById('hamburger');
  var drawer = document.getElementById('mobile-drawer');

  function open() {
    drawer.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    drawer.classList.contains('open') ? close() : open();
  });

  /* Close when clicking a nav link */
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', close);
  });

  /* Close when tapping blank area inside drawer (background tap) */
  drawer.addEventListener('click', function (e) {
    if (e.target === drawer) close();
  });

  /* Close on outside click (desktop) */
  document.addEventListener('click', function (e) {
    if (drawer.classList.contains('open') &&
        !btn.contains(e.target) &&
        !drawer.contains(e.target)) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();

/* --- Scroll reveal (IntersectionObserver) --- */
(function () {
  var els = document.querySelectorAll('.reveal');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();

/* --- Smooth scroll --- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* --- Newsletter visual feedback --- */
function handleNewsletter(e) {
  e.preventDefault();
  var input  = e.target.querySelector('input');
  var button = e.target.querySelector('button');
  var orig   = button.innerHTML;

  button.innerHTML = '&#10003;';
  button.disabled  = true;
  input.value      = '';

  setTimeout(function () {
    button.innerHTML = orig;
    button.disabled  = false;
  }, 3000);
}
