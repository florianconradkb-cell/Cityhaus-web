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
});
