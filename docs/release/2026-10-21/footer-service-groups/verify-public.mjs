import assert from 'node:assert/strict';

const origin = 'https://new.yaclinic.ru';
const groups = [
  ['Косметология', 'kosmetologiya'],
  ['Дерматология', 'dermatologiya'],
  ['Трихология', 'trihologiya'],
  ['Здоровье', 'zdorove'],
  ['Удаление родинок', 'udalenie-rodinok'],
];
const paths = [
  '/',
  '/doctor/',
  '/doctor/mariya-pavlyuk/',
  '/services/udalenie-rodinok/',
  ...groups.map(([, slug]) => `/services/?ucterms=showcase_section:${slug}`),
];

// HTTP checks use no browser session, authentication or cookies.
for (const path of paths) {
  const response = await fetch(new URL(path, origin), {
    redirect: 'follow',
    signal: AbortSignal.timeout(30_000),
  });
  assert.equal(response.status, 200, `${path}: HTTP status`);
  assert.equal(new URL(response.url).origin, origin, `${path}: origin`);
  const html = await response.text();
  const menu = html.match(/<ul id="menu-1-61bfc43"[^>]*>[\s\S]*?<\/ul>/)?.[0];
  assert.ok(menu, `${path}: shared footer service menu`);
  const links = Array.from(menu.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g));
  assert.equal(links.length, 5, `${path}: five footer groups`);
  for (let index = 0; index < groups.length; index += 1) {
    const [title, slug] = groups[index];
    assert.equal(links[index][1], `/services/?ucterms=showcase_section:${slug}`, `${path}: ${title} URL`);
    assert.equal(links[index][2].trim(), title, `${path}: ${title} label and order`);
  }
  console.log(JSON.stringify({ path, status: response.status, groups: links.length, result: 'PASS' }));
}
