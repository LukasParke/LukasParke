import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const path = process.argv[2] ?? 'README.md';
const markdown = await readFile(path, 'utf8');
assert(!/\{[{%]/.test(markdown), 'Profile contains unrendered template expressions');
assert(markdown.includes('## Projects'), 'Project section is missing');
assert(markdown.includes('## Recent writing'), 'Writing section is missing');
assert(markdown.includes('prefers-reduced-motion: reduce'), 'Static reduced-motion source is missing');

const sources = markdown.match(/<!-- profile-data: posts=(\d+) community=(\d+) -->/);
assert(sources, 'Missing data-source receipt');
assert(Number(sources[1]) > 0, 'Dev.to returned no posts; retain the previously published profile');
assert(Number(sources[2]) > 0, 'GitHub returned no community entries; retain the previously published profile');

const catalog = markdown.match(/<!-- project-catalog: projects=(\d+) groups=(\d+) source=([^ ]+) -->/);
assert(catalog, 'Missing repository-catalog receipt');
assert(Number(catalog[1]) > 0 && Number(catalog[2]) > 0, 'Repository snapshot produced an empty catalog');
assert(Number.isFinite(Date.parse(catalog[3])), 'Invalid repository snapshot date');
const projects = [...markdown.matchAll(/<!-- project: ([^ ]+) -->/g)].map((match) => match[1]);
assert.equal(projects.length, Number(catalog[1]), 'A project was dropped from the topic groups');
assert.equal(new Set(projects).size, projects.length, 'A project was duplicated across topic groups');
assert(projects.every((project) => /^LukasParke\/[A-Za-z0-9_.-]+$/i.test(project)), 'Catalog includes an unexpected repository owner');
assert(projects.includes('LukasParke/diffler'), 'Diffler is missing from the catalog');
assert(markdown.includes('Browse the same projects by language'), 'Language index is missing');

const assets = [...markdown.matchAll(/(?:src|srcset)="([^"]+)"/g)].map((match) => new URL(match[1]));
const expected = new Set(['readme.png', 'readme.webp', 'readme.gif', 'languages.png', 'languages.webp', 'languages.gif']);
assert.equal(assets.length, expected.size, 'Expected PNG/WebP/GIF sources for both profile cards');
for (const asset of assets) {
  assert.equal(asset.origin, 'https://lukasparke.github.io', 'Unexpected asset host');
  assert(asset.pathname.startsWith('/diffler/'), 'Unexpected asset directory');
  const filename = asset.pathname.split('/').at(-1);
  assert(expected.delete(filename), `Unexpected or duplicated asset: ${filename}`);
}
assert.equal(expected.size, 0, 'A card format is missing');

await Promise.all(assets.map(async (asset) => {
  const response = await fetch(asset, {method: 'HEAD', signal: AbortSignal.timeout(20000)});
  assert(response.ok, `${asset.pathname} returned HTTP ${response.status}`);
  const format = asset.pathname.split('.').at(-1);
  assert.equal(response.headers.get('content-type')?.split(';')[0], `image/${format}`, `${asset.pathname} has an unexpected content type`);
}));

console.log(`Profile validated: ${projects.length} projects in ${catalog[2]} topic groups, ${sources[1]} posts, ${sources[2]} community links, and ${assets.length} live card assets.`);
