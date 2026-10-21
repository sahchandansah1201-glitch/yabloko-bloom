/* Public-site analytics. No field values, SQNS records or patient identifiers. */
(() => {
  'use strict';
  const cfg = window.yaclinicTracking;
  if (!cfg || !['new.yaclinic.ru', 'yaclinic.ru', 'www.yaclinic.ru'].includes(location.hostname) || window.yaclinicTrackingLoaded) return;
  window.yaclinicTrackingLoaded = true;
  const metrikaId = /^[1-9][0-9]{5,11}$/.test(String(cfg.metrikaId)) ? Number(cfg.metrikaId) : 0;
  const googleId = /^G-[A-Z0-9]{6,16}$/.test(cfg.googleId || '') ? cfg.googleId : '';
  if (!metrikaId && !googleId) return;
  const storageKey = 'yaclinic.analytics-consent.v1';
  let started = false;
  let choice = '';
  try { choice = localStorage.getItem(storageKey) || ''; } catch (_) { /* Ask again when storage is unavailable. */ }

  // Queries can contain contacts or medical free text. Do not load external tags there.
  const allowedQuery = {
    utm_source: /^(yandex|google|googlemaps|2gis|prodoctorov|vk|telegram|email|yandex_business)$/,
    utm_medium: /^(cpc|organic|referral|social|email|test|maps)$/,
    utm_campaign: /^(?:[0-9]{1,30}|(?:ya|ga|test)_[0-9]{1,30}|glavnaya)$/,
    utm_content: /^(?:[0-9]{1,30}|ad_[0-9]{1,30})$/,
    yclid: /^[0-9]{1,100}$/,
    gclid: /^[A-Za-z0-9_-]{1,300}$/,
    ucterms: /^showcase_section:(kosmetologiya|dermatologiya|trihologiya|udalenie-rodinok|zdorove)$/
  };
  const query = new URLSearchParams(location.search);
  const safeQuery = !location.hash && [...query].every(([key, value]) => allowedQuery[key]?.test(value));
  const observedWidgets = new WeakSet();

  function protect(root) {
    const selector = 'input,textarea,select,[contenteditable="true"],#sqns-booking-widget-root';
    const nodes = [...root.querySelectorAll(selector)];
    if (root.matches?.(selector)) nodes.unshift(root);
    for (const node of nodes) {
      if (node.matches('input,textarea')) node.classList.add('ym-disable-keys');
      else node.classList.add('ym-hide-content');
      if (node.id === 'sqns-booking-widget-root' && node.shadowRoot) {
        protect(node.shadowRoot);
        if (!observedWidgets.has(node.shadowRoot)) {
          const shadow = node.shadowRoot;
          observedWidgets.add(shadow);
          let open = false;
          const update = () => {
            protect(shadow);
            const next = !!shadow.querySelector('[role="dialog"]');
            if (next && !open) event('booking_cta_click');
            open = next;
          };
          new MutationObserver(update).observe(shadow, {childList: true, subtree: true});
          update();
        }
      }
    }
  }
  protect(document);
  const observer = new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType === 1) protect(node);
    }
  });
  observer.observe(document.documentElement, {childList: true, subtree: true});

  function script(src, id) {
    if (document.getElementById(id)) return;
    const node = document.createElement('script');
    node.id = id;
    node.async = true;
    node.referrerPolicy = 'no-referrer';
    node.src = src;
    document.head.appendChild(node);
  }

  function event(name) {
    if (!started) return;
    if (metrikaId) window.ym(metrikaId, 'reachGoal', name);
    if (googleId) window.gtag('event', name, {send_to: googleId});
  }

  function start() {
    if (started || !safeQuery) return;
    protect(document);
    started = true;
    if (metrikaId) {
      window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
      window.ym.l = window.ym.l || Date.now();
      let referer = '';
      try { referer = document.referrer ? new URL(document.referrer).origin + '/' : ''; } catch (_) { /* No referrer. */ }
      window.ym(metrikaId, 'init', {ssr: true, webvisor: true, clickmap: true,
        trackLinks: false, accurateTrackBounce: true, ecommerce: false,
        url: location.origin + location.pathname + location.search, referrer: referer});
      script('https://mc.yandex.ru/metrika/tag.js?id=' + metrikaId, 'yaclinic-metrika-tag');
    }
    if (googleId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {analytics_storage: 'granted', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'});
      window.gtag('js', new Date());
      // Detailed page paths and medical titles stay out of Google Analytics.
      const googlePage = new URL('/analytics/' + cfg.pageType, location.origin);
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
        if (query.has(key)) googlePage.searchParams.set(key, query.get(key));
      }
      const page = googlePage.href;
      window.gtag('config', googleId, {send_page_view: false, page_location: page,
        page_title: 'Яблоко: ' + cfg.pageType, page_referrer: '',
        allow_google_signals: false, allow_ad_personalization_signals: false});
      window.gtag('event', 'page_view', {send_to: googleId, page_location: page,
        page_title: 'Яблоко: ' + cfg.pageType, page_referrer: ''});
      script('https://www.googletagmanager.com/gtag/js?id=' + googleId, 'yaclinic-google-tag');
    }
  }

  const style = document.createElement('style');
  style.textContent = '#yaclinic-analytics-consent{position:fixed;z-index:999999;bottom:16px;left:16px;right:16px;max-width:580px;padding:18px;background:#fff;color:#272b25;border:1px solid #a9b49e;border-radius:12px;box-shadow:0 4px 24px #0002;font:15px/1.45 sans-serif}#yaclinic-analytics-consent[hidden]{display:none}#yaclinic-analytics-consent p{margin:0 0 12px}#yaclinic-analytics-consent button,#yaclinic-analytics-settings{font:inherit;min-height:44px;padding:10px 16px;margin:4px;border:1px solid #586d47;border-radius:7px;background:#fff;color:#263420;cursor:pointer}#yaclinic-analytics-consent button:focus-visible,#yaclinic-analytics-settings:focus-visible{outline:3px solid #304b20;outline-offset:2px}#yaclinic-analytics-settings{display:block;margin:16px auto}';
  document.head.appendChild(style);
  const banner = document.createElement('section');
  banner.id = 'yaclinic-analytics-consent';
  banner.setAttribute('aria-label', 'Статистика сайта');
  const message = document.createElement('p');
  const services = [metrikaId ? 'Яндекс Метрику с Вебвизором' : '', googleId ? 'Google Analytics' : ''].filter(Boolean).join(' и ');
  message.textContent = 'С вашего разрешения используем ' + services + ' для анализа посещений и удобства сайта. Вы можете отказаться.';
  banner.appendChild(message);

  function choose(value) {
    choice = value;
    try { localStorage.setItem(storageKey, value); } catch (_) { /* Applies for this page only. */ }
    banner.hidden = true;
    if (value === 'granted') start();
    else if (started) location.reload(); // New page loads no external tags after refusal.
  }
  for (const [value, text] of [['granted', 'Разрешить аналитику'], ['denied', 'Отказаться']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.addEventListener('click', () => choose(value));
    banner.appendChild(button);
  }
  const settings = document.createElement('button');
  settings.id = 'yaclinic-analytics-settings';
  settings.type = 'button';
  settings.textContent = 'Настройки аналитики';
  settings.addEventListener('click', () => { banner.hidden = false; banner.querySelector('button').focus(); });
  banner.hidden = choice === 'granted' || choice === 'denied';
  document.body.append(banner, settings);
  if (choice === 'granted') start();

  // Widget opening is measured by its dialog above, for all button types.
  document.addEventListener('click', e => {
    if (e.target?.closest?.('a[href^="tel:"]')) event('phone_link_click');
  });
  let scrolled = false;
  window.addEventListener('scroll', () => {
    if (scrolled || !started) return;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (height > 0 && window.scrollY / height >= 0.75) {
      scrolled = true;
      event('scroll_75');
    }
  }, {passive: true});
})();
