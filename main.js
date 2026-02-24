/* ===================================================
   升國七家長講座 — Interactions
   =================================================== */

(function () {
  'use strict';

  /* --- Sticky nav shadow on scroll --- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Active nav link based on scroll position --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-inner a[href^="#"]');

  const setActiveLink = () => {
    const scrollY = window.scrollY + 120;
    let currentId = '';

    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + currentId
      );
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* --- Smooth scroll for anchor links (fallback for older browsers) --- */
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* --- Mobile hamburger menu --- */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('navMobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is tapped
  mobileLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');

      const href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Update active state in mobile menu too
  const mobileNavLinks = mobileMenu.querySelectorAll('a[href^="#"]');
  const setActiveMobileLink = () => {
    const scrollY = window.scrollY + 120;
    let currentId = '';
    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) currentId = section.id;
    });
    mobileNavLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  };
  window.addEventListener('scroll', setActiveMobileLink, { passive: true });

  /* --- Intersection Observer: reveal on scroll --- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    /* Fallback: just show everything */
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }
})();
