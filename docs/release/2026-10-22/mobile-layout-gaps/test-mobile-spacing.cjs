const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(`${__dirname}/mobile-spacing.php`, 'utf8');
const script = source.match(/<script id="yc-mobile-empty-promo">([\s\S]*?)<\/script>/)[1];
let checks = 0;

function run({background = 'none', images = [], players = [], links = [], missing = false} = {}) {
  let hidden = null;
  const frame = missing ? null : {
    querySelectorAll: selector => selector === 'img' ? images : selector.startsWith('video') ? players : links,
  };
  const column = {
    querySelector: () => frame,
    classList: {toggle: (name, value) => {assert.equal(name, 'yc-empty-mobile-promo'); hidden = value;}},
  };
  vm.runInNewContext(script, {
    document: {querySelector: () => column},
    getComputedStyle: () => ({backgroundImage: background}),
  });
  return hidden;
}
const media = (src, decorative = false) => ({getAttribute: () => src, closest: () => decorative ? {} : null});
for (const [name, input, expected] of [
  ['empty frame', {}, true],
  ['decorative play icon is not content', {images: [media('play.svg', true)]}, true],
  ['background photo survives', {background: 'url("photo.webp")'}, false],
  ['ordinary photo survives', {images: [media('photo.webp')]}, false],
  ['empty image source does not reserve space', {images: [media('')]}, true],
  ['video survives', {players: [media('video.mp4')]}, false],
  ['manually assigned video link survives', {links: [media('/video.mp4')]}, false],
  ['empty video link is not content', {links: [media('')]}, true],
  ['placeholder video link is not content', {links: [media('#')]}, true],
  ['missing frame is a no-op', {missing: true}, null],
]) {
  assert.equal(run(input), expected, name); checks++;
}
assert.equal((source.match(/'new\.yaclinic\.ru' !== wp_parse_url/g) || []).length, 2); checks++;
assert.match(source, /@media \(max-width: 767px\)/); checks++;
assert.match(source, /body\.postid-2403/); checks++;
assert.match(source, /get_field\('hero_media', 2403\)/); checks++;
assert.doesNotMatch(source, /update_post_meta|wp_update_post|DELETE|fetch\(/); checks++;
console.log(`${checks} checks PASS`);
