const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(process.argv[2] || __dirname + '/booking-lazy.js', 'utf8');
let checks = 0;
function check(name, test) { test(); checks++; console.log('PASS', name); }
function setup() {
  class Target {
    constructor() { this.listeners = {}; }
    addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
    dispatchEvent(event) { for (const fn of this.listeners[event.type] || []) fn(event); }
  }
  class Element extends Target {
    constructor() { super(); this.dataset = {}; this.style = {}; this.isConnected = true; this.nodes = {}; }
    setAttribute() {} focus() { this.focused = true; }
    closest() { return this.trigger || null; }
    querySelector(selector) { return this.nodes[selector] ||= new Element(); }
    appendChild(node) { node.parent = this; (this.children ||= []).push(node); }
    remove() { this.removed = true; }
    showModal() { this.open = true; }
    close() { this.open = false; }
  }
  const document = new Target(); document.body = new Element(); document.head = new Element();
  document.activeElement = new Element(); document.createElement = () => new Element();
  const context = { document, Element, Number, clearTimeout() {}, setTimeout() { return 1; },
    CustomEvent: class { constructor(type, data) { this.type = type; this.detail = data.detail; } },
    window: { ycBookingLazy: { src: '/widget-ready.js' } } };
  vm.runInNewContext(source, context);
  const seen = [];
  function open(detail) { document.dispatchEvent({type: 'sqns:open-booking', detail}); }
  function ready() {
    // The real bundle installs its open handler before announcing ready.
    const handler = e => seen.push(e.detail);
    document.addEventListener('sqns:open-booking', handler);
    document.dispatchEvent({type: 'sqns:booking-ready', detail: handler});
  }
  return { context, document, Element, open, ready, seen,
    dialog: () => document.body.children?.at(-1), script: () => document.head.children?.at(-1) };
}
check('no widget download before intent', () => { const s=setup(); assert.equal(s.script(),undefined); });
check('first click preserves service and doctor until React is ready', () => {
  const s=setup(); const detail={source:'service',serviceId:770,doctorId:87};
  s.open(detail); assert.equal(s.dialog().open,true); s.ready();
  assert.deepEqual(s.seen,[detail]); assert.equal(s.dialog().open,false);
});
check('repeated clicks download once, newest intent wins', () => {
  const s=setup(); s.open({serviceId:1}); s.open({serviceId:2});
  assert.equal(s.document.head.children.length,1); s.ready(); assert.equal(s.seen[0].serviceId,2);
});
check('close during download prevents late opening and restores focus', () => {
  const s=setup(); s.open({source:'header'}); s.dialog().querySelector('[data-close]').dispatchEvent({type:'click'});
  s.ready(); assert.equal(s.seen.length,0); assert.equal(s.document.activeElement.focused,true);
});
check('retry after network error retains chosen service', () => {
  const s=setup(); s.open({source:'service',serviceId:7}); s.script().onerror();
  assert.equal(s.dialog().querySelector('[data-retry]').hidden,false);
  s.dialog().querySelector('[data-retry]').dispatchEvent({type:'click'});
  assert.equal(s.document.head.children.length,2); s.ready(); assert.equal(s.seen[0].serviceId,7);
});
check('trigger keeps all routing attributes and prevents link navigation', () => {
  const s=setup(), trigger=new s.Element(), target=new s.Element(); target.trigger=trigger;
  trigger.dataset={bookingSource:'group',serviceGroupId:'1789',doctorId:'87',bookingStart:'first-step'};
  let cancelled=false; s.document.dispatchEvent({type:'click',target,preventDefault(){cancelled=true;}});
  s.ready(); assert.equal(cancelled,true); assert.equal(s.seen[0].serviceGroupId,1789);
  assert.equal(s.seen[0].doctorId,87); assert.equal(s.seen[0].start,'first-step');
});
check('hidden consumables never open booking', () => {
  const s=setup(), trigger=new s.Element(), target=new s.Element(); target.trigger=trigger;
  trigger.dataset={bookingSource:'service',bookingRoute:'hidden'};
  s.document.dispatchEvent({type:'click',target,preventDefault(){}}); assert.equal(s.script(),undefined);
});
check('delivery does not count another user intent', () => {
  const s=setup(); let count=0;
  s.document.addEventListener('sqns:open-booking',()=>count++);
  s.open({source:'header'}); s.ready(); assert.equal(count,1); assert.equal(s.seen.length,1);
});
check('after initialization later clicks use the original handler', () => {
  const s=setup(); s.ready(); s.open({source:'doctor',doctorId:5});
  assert.equal(s.seen[0].doctorId,5); assert.equal(s.dialog(),undefined);
});
console.log(`BOOKING_LAZY_${checks}_CHECKS_OK`);
