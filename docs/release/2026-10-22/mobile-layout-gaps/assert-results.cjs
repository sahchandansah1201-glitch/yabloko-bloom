const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = name => JSON.parse(fs.readFileSync(`${__dirname}/${name}`, 'utf8'));
const coverage = read('effective-coverage.json');
assert.equal(coverage.length, 219);
assert.equal(new Set(coverage.map(row => row.url)).size, 193);
assert.ok(coverage.every(row => !row.error && row.status === 200 && row.fontsReady && row.scrollComplete && !row.horizontalOverflow));
const after = read('mobile-after-affected.json');
assert.equal(after.length, 10);
assert.ok(after.every(row => row.status === 200 && !row.error && !row.gaps.length && !row.wrappers.length && !row.horizontalOverflow));
assert.equal(after.find(row => row.id === 2403).geometry.promoHeight, 0);
assert.equal(after.filter(row => row.type === 'doctor').length, 9);
const responsive = read('responsive-after.json');
assert.equal(responsive.length, 10);
for (const row of responsive) {
  assert.equal(row.status, 200); assert.ok(row.footer); assert.ok(!row.overflow);
  if (row.url.includes('rozaczeya')) assert.equal(row.promoHeight === 0, row.width <= 767);
  else assert.equal(row.specializationMargin, row.width <= 767 ? '32px' : '80px');
}
const media = read('media-regression.json');
assert.equal(media.length, 6);
assert.ok(media.every(row => row.status === 200 && row.height > 0 && !row.emptyClass && row.footer));
const functional = read('functional-after.json');
assert.deepEqual(functional.map(row => row.width), [390, 1440]);
for (const row of functional) {
  assert.deepEqual(row.states, ['Работа 1 из 3', 'Работа 2 из 3', 'Работа 3 из 3']);
  assert.ok(row.video.time > 0.1 && !row.video.paused);
  assert.ok(row.viewerClosed && row.bookingLoaded && row.bookingClosed && !row.bookingSubmitted);
}
const routes = read('price-route-validation.json');
assert.equal(routes.checked, 539); assert.equal(routes.errors.length, 0);
assert.deepEqual(routes.responseGroups, [{status: 301, location: 'https://new.yaclinic.ru/price/', count: 539}]);
const marker = '// Code Snippets:';
const normalize = name => {const s = fs.readFileSync(`${__dirname}/${name}`, 'utf8'); return s.slice(s.indexOf(marker)).trim();};
assert.equal(normalize('mobile-spacing.php'), normalize('snippet57-active-readback.php'));
console.log('Evidence invariants PASS: 219 addresses / 193 destinations; 539 first-hop price redirects; 10 affected + 10 breakpoint + 6 media page views; gallery and booking at 2 widths; persisted source matches.');
