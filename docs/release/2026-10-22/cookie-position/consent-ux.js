/* Staging-only consent presentation. Existing consent and tracker logic stays unchanged. */
(() => {
  'use strict';
  if (location.hostname !== 'yaclinic.ru') return;
  const banner = document.getElementById('yaclinic-analytics-consent');
  const settings = document.getElementById('yaclinic-analytics-settings');
  const footer = document.getElementById('menu-1-e744bd7');
  if (!banner || !settings || !footer || banner.dataset.cookieUx === '1') return;
  const buttons = [...banner.querySelectorAll('button')];
  const message = banner.querySelector('p');
  if (buttons.length !== 2 || !message) return;
  banner.dataset.cookieUx = '1';

  const title = document.createElement('h2');
  title.id = 'yaclinic-cookie-title';
  title.textContent = 'Cookie на сайте';
  banner.setAttribute('aria-labelledby', title.id);
  banner.removeAttribute('aria-label');
  banner.prepend(title);
  message.textContent = 'С вашего согласия мы используем cookie, чтобы понимать, как пользуются сайтом, и делать его удобнее.';
  buttons[0].textContent = 'Принять';
  buttons[1].textContent = 'Только необходимые';
  const actions = document.createElement('div');
  actions.className = 'yaclinic-cookie-actions';
  actions.append(...buttons); // Move the original controls, preserving their consent listeners.

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = 'Подробнее о cookie';
  const providers = document.createElement('p');
  const cfg = window.yaclinicTracking || {};
  const services = [cfg.metrikaId ? 'Яндекс Метрику с Вебвизором' : '', cfg.googleId ? 'Google Analytics' : ''].filter(Boolean).join(' и ');
  providers.textContent = 'Используем ' + services + ' для статистики посещений и оценки удобства сайта.';
  const recording = document.createElement('p');
  recording.textContent = 'Вебвизор позволяет просматривать последовательность действий на страницах: нажатия и прокрутку.';
  const choice = document.createElement('p');
  choice.textContent = 'При выборе «Только необходимые» необязательная аналитика не запускается. Изменить выбор можно через «Настройки cookie» в подвале.';
  details.append(summary, providers);
  if (cfg.metrikaId) details.append(recording);
  details.append(choice);
  banner.append(actions, details);

  settings.textContent = 'Настройки cookie';
  settings.classList.add('elementor-item');
  settings.setAttribute('aria-controls', banner.id);
  const item = document.createElement('li');
  item.className = 'menu-item yaclinic-cookie-settings-item';
  item.append(settings);
  footer.append(item);
  let openedFromSettings = false;
  settings.addEventListener('click', () => { openedFromSettings = true; });
  for (const button of buttons) button.addEventListener('click', () => {
    if (openedFromSettings) settings.focus();
    openedFromSettings = false;
  });

  const style = document.createElement('style');
  style.id = 'yaclinic-cookie-ux-style';
  style.textContent = `
#yaclinic-analytics-consent{box-sizing:border-box;position:fixed;z-index:10000;top:auto;left:16px;right:auto;bottom:16px;width:calc(100% - 32px);max-width:480px;max-height:calc(100dvh - 48px);overflow-y:auto;padding:18px 20px;background:#fff;color:#30342d;border:1px solid #d9dfd3;border-radius:14px;box-shadow:0 4px 18px #26342014;font-family:inherit;font-size:14px;line-height:1.5}
#yaclinic-analytics-consent h2{margin:0 0 6px;font-family:inherit;font-size:16px;font-weight:600;line-height:1.35;color:inherit}
#yaclinic-analytics-consent p{margin:0 0 12px;font-size:14px;line-height:1.5}
#yaclinic-analytics-consent .yaclinic-cookie-actions{display:flex;gap:10px;align-items:stretch;margin:0 0 10px}
#yaclinic-analytics-consent .yaclinic-cookie-actions button{flex:1;min-height:44px;margin:0;padding:10px 12px;border:1px solid #789657;border-radius:8px;background:#fff;color:#344b25;box-shadow:none;font-family:inherit;font-size:14px;font-weight:500;line-height:1.3;text-transform:none;white-space:normal}
#yaclinic-analytics-consent .yaclinic-cookie-actions button:hover{background:#f0f5eb}
#yaclinic-analytics-consent summary{width:fit-content;min-height:32px;padding:3px 0;color:#466c2e;font-size:13px;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
#yaclinic-analytics-consent details[open] summary{margin-bottom:8px}
#yaclinic-analytics-consent details p{font-size:13px}
#yaclinic-analytics-settings{position:static;display:inline-flex;align-items:center;width:100%;min-height:44px;margin:0;padding:8px 0;border:0;border-radius:0;background:none;box-shadow:none;color:inherit;font:inherit;text-align:left;text-transform:none;cursor:pointer}
#yaclinic-analytics-settings:hover{text-decoration:underline;text-underline-offset:3px;background:none;color:#5a8f2e}
#yaclinic-analytics-consent button:focus-visible,#yaclinic-analytics-consent summary:focus-visible,#yaclinic-analytics-settings:focus-visible{outline:2px solid #466c2e;outline-offset:3px}
@media(max-width:767px){#yaclinic-analytics-consent{left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));width:auto;max-width:none;max-height:calc(100dvh - 190px);padding:14px 16px}body:not(.home) #yaclinic-analytics-consent,body.home.yaclinic-hero-actions-passed #yaclinic-analytics-consent{bottom:calc(88px + env(safe-area-inset-bottom,0px))}#yaclinic-analytics-consent .yaclinic-cookie-actions{flex-direction:column;gap:8px}#yaclinic-analytics-settings{min-height:48px}}
`;
  document.head.append(style);
})();
