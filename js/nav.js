// Highlight active nav link
document.addEventListener('DOMContentLoaded', function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === page) a.classList.add('active');
  });

  // Hamburger toggle
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Nav scroll shadow
  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav-scrolled', window.scrollY > 10);
  }, { passive: true });

  // Scroll reveal for cards and grids
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.pillar, .value-card, .step-col, .contact-card, .accept-item, ' +
      '.term-card, .tip-item, .faq-item, .story-quote, .check-row, .contact-row'
    );

    revealEls.forEach(function (el) {
      el.classList.add('animate-up');
      var siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter(function (s) {
            return s.classList.contains('animate-up');
          })
        : [];
      var idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.09, 0.36) + 's';
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }
});
