const assert=require('node:assert/strict');
const rows=JSON.parse(require('node:fs').readFileSync(process.argv[2],'utf8'));
assert.ok(rows.length>=1);
for(const r of rows){
  assert.ok(r.initial.gap<=20,`${r.width}: banner should be near lower edge on home first screen, got ${r.initial.gap}`);
  assert.ok(r.stable,`${r.width}: banner must remain until choice`);
  assert.equal(r.vendors,0,'no analytics before choice');
  assert.equal(r.hit.coveredByCookie,false,`${r.width}: cookie must not cover booking`);
  assert.ok(r.scrolled.barNotCovered,`${r.width}: phone and booking bar must stay available`);
  assert.ok(r.denied.bannerHidden&&r.denied.vendors===0,'denied choice survives reload');
  assert.ok(r.reopened,'settings can reopen consent');
}
console.log(`Cookie geometry, persistence, booking layers and necessary-only checks PASS in ${rows.length} viewport cases.`);
