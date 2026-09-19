const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? 'Закрыть' : 'Меню';
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Меню';
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const webhookUrl = 'https://hook.eu1.make.com/zqnio8l4f5q1t1imhbvxjkxmpc3wmslh';

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const payload = {
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      message: form.elements.message.value.trim(),
      consent: document.getElementById('consent').checked,
      source: 'favor-sibir.ru'
    };

    if (!payload.name || !payload.phone || !payload.message || !payload.consent) {
      formStatus.textContent = 'Заполните все поля и подтвердите согласие.';
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Отправляем…';
    formStatus.textContent = '';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      formStatus.textContent = 'Обращение отправлено. Мы свяжемся с вами.';
    } catch (error) {
      formStatus.innerHTML = 'Не удалось отправить форму. Напишите напрямую в <a href="https://t.me/Favor_sibir" target="_blank" rel="noreferrer">Telegram</a>.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Направить обращение';
    }
  });
}
