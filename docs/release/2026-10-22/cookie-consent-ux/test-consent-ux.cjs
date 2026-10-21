const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('/Users/istokdmgmail.com/Documents/Direct_Yabloko/apps/yaclinic-dashboard/node_modules/jsdom');
const original = fs.readFileSync(__dirname + '/clinic-tracking-before.js', 'utf8');
const patchPath = __dirname + '/consent-ux.js';
const patch = fs.existsSync(patchPath) ? fs.readFileSync(patchPath, 'utf8') : '';

function page(choice, url = 'https://new.yaclinic.ru/') {
  const dom = new JSDOM('<!doctype html><html><head></head><body><input value="SYNTHETIC_PRIVATE_CANARY"><div id="sqns-booking-widget-root"></div><ul id="menu-1-e744bd7"><li><a href="/private-police/">Политика</a></li></ul></body></html>', {url, runScripts:'outside-only'});
  const w = dom.window;
  w.yaclinicTracking = {metrikaId:'123456789',googleId:'G-TEST123456',pageType:'home'};
  if (choice) w.localStorage.setItem('yaclinic.analytics-consent.v1', choice);
  w.eval(original);
  w.eval(patch);
  const button = text => [...w.document.querySelectorAll('button')].find(el => el.textContent === text);
  const click = text => { assert.ok(button(text), `button ${text} exists`); button(text).click(); };
  return {dom,w,button,click,banner:w.document.getElementById('yaclinic-analytics-consent')};
}

test('approved title, copy and two clear choices replace the old labels', () => {
  const p = page();
  assert.equal(p.banner.querySelector('h2')?.textContent, 'Cookie на сайте');
  assert.match(p.banner.textContent, /С вашего согласия мы используем cookie, чтобы понимать, как пользуются сайтом, и делать его удобнее\./);
  assert.deepEqual([...p.banner.querySelectorAll('button')].map(el=>el.textContent), ['Принять','Только необходимые']);
  assert.equal(p.banner.hidden, false);
  p.dom.window.close();
});

test('no external tag before choice or after necessary-only selection', () => {
  const p = page();
  assert.equal(p.w.document.querySelectorAll('script[src]').length, 0);
  p.click('Только необходимые');
  assert.equal(p.w.localStorage.getItem('yaclinic.analytics-consent.v1'), 'denied');
  assert.equal(p.w.document.querySelectorAll('script[src]').length, 0);
  assert.equal(p.banner.hidden, true);
  p.dom.window.close();
});

test('compact heading and button typography are valid CSS', () => {
  const p = page();
  assert.equal(p.w.getComputedStyle(p.banner.querySelector('h2')).fontSize, '16px');
  assert.equal(p.w.getComputedStyle(p.button('Принять')).fontSize, '14px');
  p.dom.window.close();
});

test('acceptance starts both providers once even after reopening settings', () => {
  const p = page();
  p.click('Принять');
  assert.equal(p.w.localStorage.getItem('yaclinic.analytics-consent.v1'), 'granted');
  p.click('Настройки cookie');
  assert.equal(p.banner.hidden, false);
  p.click('Принять');
  assert.equal(p.w.document.querySelectorAll('script[src]').length, 2);
  assert.equal(p.w.ym.a.filter(c=>c[1]==='init').length, 1);
  assert.equal(p.w.dataLayer.filter(c=>c[0]==='event'&&c[1]==='page_view').length, 1);
  p.dom.window.close();
});

test('existing granted and denied choices retain their meaning without asking again', () => {
  for (const choice of ['granted','denied']) {
    const p = page(choice);
    assert.equal(p.banner.hidden, true);
    assert.equal(p.w.document.querySelectorAll('script[src]').length, choice==='granted'?2:0);
    assert.equal(p.w.localStorage.getItem('yaclinic.analytics-consent.v1'), choice);
    p.dom.window.close();
  }
});

test('settings are a native keyboard-operable control in the shared legal footer', () => {
  const p = page('denied');
  const settings = p.button('Настройки cookie');
  assert.ok(settings?.closest('#menu-1-e744bd7'));
  p.click('Настройки cookie');
  assert.equal(p.w.document.activeElement.textContent, 'Принять');
  p.click('Только необходимые');
  assert.equal(p.w.document.activeElement, settings);
  p.dom.window.close();
});

test('provider and session-recording details are available before choosing', () => {
  const p = page();
  const details = p.banner.querySelector('details');
  assert.equal(details?.querySelector('summary')?.textContent, 'Подробнее о cookie');
  assert.equal(details.open, false);
  for (const text of ['Яндекс Метрику с Вебвизором','Google Analytics','нажатия и прокрутку','Только необходимые']) assert.ok(details.textContent.includes(text));
  details.open = true;
  assert.equal(p.w.document.querySelectorAll('script[src]').length, 0);
  p.dom.window.close();
});

test('field protection and booking host exclusion remain intact', () => {
  const p = page();
  assert.ok(p.w.document.querySelector('input').classList.contains('ym-disable-keys'));
  assert.ok(p.w.document.getElementById('sqns-booking-widget-root').classList.contains('ym-hide-content'));
  p.click('Принять');
  assert.ok(!JSON.stringify([...p.w.ym.a,...p.w.dataLayer]).includes('SYNTHETIC_PRIVATE_CANARY'));
  p.dom.window.close();
});

test('UI enhancement is idempotent and does not change production pages', () => {
  const p = page();
  p.w.eval(patch);
  assert.equal(p.banner.querySelectorAll('details').length, 1);
  assert.equal(p.w.document.querySelectorAll('#yaclinic-analytics-settings').length, 1);
  p.dom.window.close();
  const prod = page(undefined,'https://yaclinic.ru/');
  assert.ok(prod.button('Разрешить аналитику'));
  assert.equal(prod.banner.querySelector('details'), null);
  prod.dom.window.close();
});

test('unrecognized query data still blocks vendor loading after acceptance', () => {
  const p = page(undefined,'https://new.yaclinic.ru/?s=SYNTHETIC_PRIVATE_CANARY');
  p.click('Принять');
  assert.equal(p.w.document.querySelectorAll('script[src]').length, 0);
  p.dom.window.close();
});
