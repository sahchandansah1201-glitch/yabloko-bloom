const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const file = process.argv[2] || 'after-browser.json';
const rows = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'before-browser.json'), 'utf8'));
assert.equal(rows.length, 16, 'four sources at four viewport widths');
for (const row of rows) {
  const original = before.find(x => x.width === row.width && x.source === row.source);
  assert.ok(row.gap >= 0 && row.gap <= 80, `${row.width}px ${row.source}: footer gap ${row.gap}px`);
  assert.ok(row.wrapperExtra <= 1, 'wrapper must follow actual review height');
  assert.equal(row.horizontalOverflow, false, 'no horizontal overflow');
  assert.equal(row.panelVisible, true, 'review panel is visible');
  assert.equal(row.footerVisible, true, 'footer is visible');
  assert.equal(row.settingsInFooter, true, 'cookie settings stay in the footer');
  assert.equal(row.panelTextHash, original.panelTextHash, 'review text unchanged at this width');
  assert.equal(row.linkCount, original.linkCount, 'review links retained');
  assert.equal(row.nativePanel, original.nativePanel, 'native source panel retained');
}
const originalCode = fs.readFileSync(path.join(__dirname, 'snippet-31-before.php'), 'utf8');
const patchedCode = fs.readFileSync(path.join(__dirname, 'snippet-31-after.php'), 'utf8');
const rule = '@media(max-width:767px){body.page-id-6 .elementor-6 .elementor-element-48f6d12>.e-con-inner{display:block}}';
assert.equal(patchedCode.replace(rule, ''), originalCode, 'only one mobile display rule may change');
const readback = fs.readFileSync(path.join(__dirname, 'snippet-31-readback.php'), 'utf8');
const normalize = text => text.slice(text.indexOf('// Stage homepage only.')).trim();
assert.equal(normalize(readback), normalize(patchedCode), 'persisted code matches the intended patch');
console.log(`PASS: ${rows.length} browser states, content preserved, exact persisted source.`);
