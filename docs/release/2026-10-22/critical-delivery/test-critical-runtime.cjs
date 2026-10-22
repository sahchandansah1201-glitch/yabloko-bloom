const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const loaderFile = process.env.YC_LOADER || process.argv[2] || path.join(__dirname, 'booking-lazy-before.js');
const runtimeFile = process.env.YC_RUNTIME || path.join(__dirname, '../production-fixes-2026-10-22/booking-widget-46f635bfbf2e.js');
const loader = fs.readFileSync(loaderFile, 'utf8');
const runtime = fs.readFileSync(runtimeFile, 'utf8');
const bootstrapUrl = '/wp-json/sqns-integration/v1/booking/bootstrap';

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function setup() {
  const calls = [], fetchResult = deferred(), delivered = [];
  class Target {
    constructor() { this.listeners = {}; }
    addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
    dispatchEvent(event) { for (const fn of this.listeners[event.type] || []) fn(event); }
  }
  class Element extends Target {
    constructor(tag) { super(); this.tag = tag; this.dataset = {}; this.style = {}; this.isConnected = true; this.nodes = {}; }
    setAttribute() {}
    focus() { this.focused = true; }
    closest() { return this.trigger || null; }
    querySelector(selector) { return this.nodes[selector] ||= new Element(); }
    appendChild(node) {
      (this.children ||= []).push(node);
      if (node.tag === 'script') calls.push({ type: 'script', src: node.src });
    }
    remove() { this.removed = true; }
    showModal() { this.open = true; }
    close() { this.open = false; }
  }
  const document = new Target();
  document.body = new Element('body'); document.head = new Element('head');
  document.activeElement = new Element(); document.createElement = tag => new Element(tag);
  const context = {
    document, Element, Number, Promise, clearTimeout() {}, setTimeout() { return 1; },
    CustomEvent: class { constructor(type, data) { this.type = type; this.detail = data.detail; } },
    fetch(url, options) { calls.push({ type: 'fetch', url, options }); return fetchResult.promise; },
    window: { ycBookingLazy: { src: '/widget-ready.js', bootstrapUrl } },
  };
  context.window.fetch = context.fetch;
  vm.runInNewContext(loader, context);
  return {
    context, document, Element, calls, fetchResult, delivered,
    open(detail) { document.dispatchEvent({ type: 'sqns:open-booking', detail }); },
    ready() {
      const handler = event => delivered.push(event.detail);
      document.addEventListener('sqns:open-booking', handler);
      document.dispatchEvent({ type: 'sqns:booking-ready', detail: handler });
    },
    dialog() { return document.body.children?.at(-1); },
  };
}

function bootstrapFunction(shared) {
  // Execute only the actual bootstrap adapter; React/DOM are outside this unit test.
  const start = runtime.search(/function\s+fb\s*\(/);
  assert.ok(start >= 0, 'the known bootstrap adapter must remain present');
  const open = runtime.indexOf('{', start);
  let depth = 1, end = open + 1;
  for (; end < runtime.length && depth; end++) {
    if (runtime[end] === '{') depth++;
    else if (runtime[end] === '}') depth--;
  }
  assert.equal(depth, 0, 'bootstrap adapter braces must be complete');
  const requests = [], normal = { services: [{ id: 2 }] };
  const context = {
    window: { ycBookingBootstrap: shared },
    Promise,
    uo(route) { requests.push(route); return Promise.resolve(normal); },
  };
  vm.runInNewContext(runtime.slice(start, end) + ';this.callBootstrap=fb;', context);
  return { context, requests, normal, call: () => context.callBootstrap() };
}

test('no bootstrap request or script download occurs before a booking intent', () => {
  const s = setup();
  assert.deepEqual(s.calls, []);
  assert.equal(s.context.window.ycBookingBootstrap, undefined);
});

test('first intent starts public bootstrap GET while the widget script is still loading', async () => {
  const s = setup();
  const detail = { source: 'service', serviceId: 770, doctorId: 734 };
  s.open(detail);
  const request = s.calls.find(x => x.type === 'fetch');
  assert.ok(request, 'bootstrap must not wait for the widget ready event');
  assert.equal(request.url, bootstrapUrl);
  assert.equal(request.options?.method || 'GET', 'GET');
  assert.ok(s.calls.some(x => x.type === 'script'), 'script must also load without waiting for bootstrap');
  assert.equal(s.delivered.length, 0, 'widget is not ready yet');
  const payload = { services: [{ id: 770 }] };
  s.fetchResult.resolve({ ok: true, json: async () => payload });
  assert.deepEqual(await s.context.window.ycBookingBootstrap, payload);
  s.ready();
  assert.deepEqual(s.delivered, [detail]);
});

test('repeated taps share one bootstrap GET and script and preserve the latest full context', () => {
  const s = setup();
  s.open({ source: 'header' });
  const latest = { source: 'group', serviceGroupId: 1789, serviceId: 770, doctorId: 734, start: 'first-step' };
  s.open(latest);
  assert.equal(s.calls.filter(x => x.type === 'fetch').length, 1);
  assert.equal(s.calls.filter(x => x.type === 'script').length, 1);
  s.ready();
  assert.deepEqual(s.delivered, [latest]);
});

test('hidden additions trigger neither bootstrap GET nor widget download', () => {
  const s = setup(), trigger = new s.Element(), target = new s.Element();
  target.trigger = trigger;
  trigger.dataset = { bookingSource: 'service', bookingRoute: 'hidden', serviceId: '99' };
  s.document.dispatchEvent({ type: 'click', target, preventDefault() {} });
  assert.deepEqual(s.calls, []);
});

test('closing during download prevents a late modal without discarding focus recovery', () => {
  const s = setup();
  s.open({ source: 'doctor', doctorId: 734 });
  s.dialog().querySelector('[data-close]').dispatchEvent({ type: 'click' });
  s.ready();
  assert.deepEqual(s.delivered, []);
  assert.equal(s.document.activeElement.focused, true);
});

test('failed overlapping bootstrap is handled as a safe fallback, not an unhandled rejection', async () => {
  const s = setup();
  s.open({ source: 'header' });
  const shared = s.context.window.ycBookingBootstrap;
  assert.ok(shared && typeof shared.then === 'function', 'loader must expose the pending bootstrap promise');
  s.fetchResult.reject(new Error('synthetic network failure'));
  assert.equal(await shared, null, 'loader handles failure so the widget can use its ordinary GET');
});

test('widget consumes a successful shared bootstrap once and preserves its ordinary GET afterward', async () => {
  const payload = { services: [{ id: 770 }], doctors: [{ id: 734 }] };
  const s = bootstrapFunction(Promise.resolve(payload));
  assert.deepEqual(await s.call(), payload);
  assert.deepEqual(s.requests, []);
  assert.equal(await s.call(), s.normal);
  assert.deepEqual(s.requests, ['/booking/bootstrap']);
});

test('widget falls back to its ordinary GET for null or rejected prefetched data', async () => {
  for (const shared of [Promise.resolve(null), Promise.reject(new Error('synthetic failure'))]) {
    // Keep the RED baseline's unused promise from leaking into other test cases.
    shared.catch(() => {});
    const s = bootstrapFunction(shared);
    assert.equal(await s.call(), s.normal);
    assert.deepEqual(s.requests, ['/booking/bootstrap']);
  }
});
