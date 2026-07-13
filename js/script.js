document.addEventListener('DOMContentLoaded', function () {
  var langLinks = document.querySelectorAll('.lang-switch a');
  var storedLang = localStorage.getItem('cityhaus-lang');
  var defaultLang = translations[storedLang] ? storedLang : 'de';

  function applyLanguage(lang) {
    if (!translations[lang]) {
      return;
    }

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    langLinks.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('data-lang') === lang);
    });

    localStorage.setItem('cityhaus-lang', lang);
  }

  langLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      applyLanguage(link.getAttribute('data-lang'));
    });
  });

  applyLanguage(defaultLang);

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var recipient = contactForm.getAttribute('data-recipient');
      var name = contactForm.querySelector('#cf-name').value;
      var email = contactForm.querySelector('#cf-email').value;
      var message = contactForm.querySelector('#cf-message').value;

      var subject = encodeURIComponent('Anfrage über die Cityhaus-Website von ' + name);
      var body = encodeURIComponent(message + '\n\n---\n' + name + '\n' + email);

      window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
    });
  }

  document.querySelectorAll('.accordion-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      toggle.closest('.accordion-item').classList.toggle('is-open');
    });
  });

  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-locked', isOpen);
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-locked');
      });
    });
  }

  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        lightboxImg.src = thumb.getAttribute('data-full');
        lightboxImg.alt = thumb.querySelector('img').alt;
        lightbox.classList.add('is-open');
        document.body.classList.add('nav-locked');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.classList.remove('nav-locked');
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });
  }
});
