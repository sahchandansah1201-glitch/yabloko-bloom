(function () {
  'use strict';
  var config = window.ycBookingLazy;
  if (!config || !config.src || window.ycBookingLazyInstalled) return;
  window.ycBookingLazyInstalled = true;
  var ready = false, script = null, pending = null, dialog = null, timeout = null;
  var returnFocus = null;

  function close() {
    pending = null;
    if (dialog) { dialog.close(); dialog.remove(); dialog = null; }
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  }
  function show(error) {
    if (!dialog) {
      returnFocus = document.activeElement;
      dialog = document.createElement('dialog');
      dialog.setAttribute('aria-label', 'Онлайн-запись');
      dialog.style.cssText = 'max-width:calc(100vw - 32px);width:380px;border:1px solid #ddd;border-radius:16px;padding:24px;color:#333;background:#fff;font:16px/1.5 Inter,system-ui,sans-serif';
      dialog.innerHTML = '<button type="button" data-close aria-label="Закрыть" style="float:right;min-width:44px;min-height:44px">×</button><p role="status" aria-live="polite"></p><button type="button" data-retry hidden style="min-height:48px;padding:8px 16px">Попробовать снова</button><p data-help hidden>Можно позвонить: <a href="tel:+79184128585">+7 (918) 412-85-85</a></p>';
      dialog.querySelector('[data-close]').addEventListener('click', close);
      dialog.querySelector('[data-retry]').addEventListener('click', load);
      dialog.addEventListener('cancel', function (event) { event.preventDefault(); close(); });
      document.body.appendChild(dialog);
      dialog.showModal();
    }
    dialog.querySelector('[role="status"]').textContent = error
      ? 'Не удалось загрузить онлайн-запись. Попробуйте снова.' : 'Загружаем онлайн-запись…';
    dialog.querySelector('[data-retry]').hidden = !error;
    dialog.querySelector('[data-help]').hidden = !error;
  }
  function fail() {
    clearTimeout(timeout);
    if (script) { script.remove(); script = null; }
    if (pending) show(true);
  }
  function load() {
    if (ready || !pending) return;
    show(false);
    if (script) return; // Repeated taps keep the latest context, not another download.
    script = document.createElement('script');
    script.src = config.src;
    script.async = true;
    script.onerror = fail;
    document.head.appendChild(script);
    timeout = setTimeout(fail, 30000);
  }
  document.addEventListener('sqns:booking-ready', function (event) {
    if (typeof event.detail !== 'function') return;
    ready = true;
    clearTimeout(timeout);
    var context = pending;
    // Closing while the bundle downloads must not open a late modal.
    if (!context) return;
    close();
    // Deliver to the installed handler without counting a second user intent.
    event.detail({detail: context});
  });
  document.addEventListener('sqns:open-booking', function (event) {
    if (ready || !event.detail) return;
    pending = event.detail;
    load();
  });
  // Same context contract as the existing small trigger, installed in the head.
  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;
    var trigger = target.closest('[data-booking-source]');
    if (!trigger) return;
    event.preventDefault();
    if (trigger.dataset.bookingRoute === 'hidden') return;
    var source = trigger.dataset.bookingSource;
    if (['header', 'doctor', 'service', 'group'].indexOf(source) < 0) return;
    function id(value) { var number = Number(value || ''); return Number.isFinite(number) && number > 0 ? number : undefined; }
    document.dispatchEvent(new CustomEvent('sqns:open-booking', {detail: {
      source: source,
      doctorId: id(trigger.dataset.doctorId),
      serviceId: id(trigger.dataset.serviceId),
      serviceGroupId: id(trigger.dataset.serviceGroupId),
      start: trigger.dataset.bookingStart === 'first-step' ? 'first-step' : undefined
    }}));
  }, true);
})();
