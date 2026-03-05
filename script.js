/* ================================================================
   SHAM SWEETS — Premium Levantine Patisserie
   Enhanced JavaScript v2
   ================================================================ */

'use strict';

/* --- Preloader --- */
(function () {
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () { preloader.classList.add('done'); }, 800);
  });
  setTimeout(function () { preloader.classList.add('done'); }, 3000);
})();

/* --- Scroll progress bar --- */
(function () {
  var bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight) * 100 + '%';
  }, { passive: true });
})();

/* --- Navbar scroll state --- */
(function () {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* --- Hamburger + mobile drawer --- */
(function () {
  var btn = document.getElementById('hamburger');
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

  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', close);
  });

  drawer.addEventListener('click', function (e) {
    if (e.target === drawer) close();
  });

  document.addEventListener('click', function (e) {
    if (drawer.classList.contains('open') &&
      !btn.contains(e.target) && !drawer.contains(e.target)) {
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
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

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

/* --- Hero parallax --- */
(function () {
  var heroBg = document.querySelector('.hero-bg-img');
  if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var scrolled = window.scrollY;
        if (scrolled < window.innerHeight * 1.2) {
          heroBg.style.transform = 'translateY(' + (scrolled * 0.25) + 'px) scale(1.05)';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* --- (custom cursor removed) --- */

/* --- (newsletter removed — contact form covers this) --- */

/* --- Contact form feedback --- */
function handleContactForm() {
  var name = document.getElementById('cf-name');
  var email = document.getElementById('cf-email');
  var message = document.getElementById('cf-message');
  var btn = document.querySelector('.btn-submit');

  /* Simple validation */
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    /* Highlight empty fields */
    [name, email, message].forEach(function (field) {
      if (!field.value.trim()) {
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.15)';
        setTimeout(function () {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }, 2000);
      }
    });
    return;
  }

  /* Success state */
  var origHTML = btn.innerHTML;
  btn.innerHTML = '<span>✓ Gesendet!</span>';
  btn.classList.add('success');
  btn.disabled = true;

  /* Clear form */
  name.value = '';
  email.value = '';
  message.value = '';
  var subject = document.getElementById('cf-subject');
  if (subject) subject.selectedIndex = 0;

  setTimeout(function () {
    btn.innerHTML = origHTML;
    btn.classList.remove('success');
    btn.disabled = false;
  }, 3000);
}

/* --- Reviews carousel — drag to scroll --- */
(function () {
  var carousel = document.querySelector('.reviews-carousel');
  if (!carousel) return;

  var isDown = false, startX = 0, scrollLeft = 0;

  carousel.addEventListener('mousedown', function (e) {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', function () { isDown = false; });
  carousel.addEventListener('mouseup', function () { isDown = false; });
  carousel.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
})();

/* --- Active nav link highlight --- */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
})();