import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_ByuhQ_K6.mjs';
import { manifest } from './manifest_CACKEaze.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/newsletter.astro.mjs');
const _page2 = () => import('./pages/calendar.astro.mjs');
const _page3 = () => import('./pages/contatti.astro.mjs');
const _page4 = () => import('./pages/cookie.astro.mjs');
const _page5 = () => import('./pages/fondi-europei.astro.mjs');
const _page6 = () => import('./pages/magazine/articolo/_slug_.astro.mjs');
const _page7 = () => import('./pages/magazine.astro.mjs');
const _page8 = () => import('./pages/partnership.astro.mjs');
const _page9 = () => import('./pages/privacy.astro.mjs');
const _page10 = () => import('./pages/progetti/progetto/_slug_.astro.mjs');
const _page11 = () => import('./pages/progetti.astro.mjs');
const _page12 = () => import('./pages/studio/_---index_.astro.mjs');
const _page13 = () => import('./pages/team.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/newsletter.ts", _page1],
    ["src/pages/calendar.astro", _page2],
    ["src/pages/contatti.astro", _page3],
    ["src/pages/cookie.astro", _page4],
    ["src/pages/fondi-europei.astro", _page5],
    ["src/pages/magazine/articolo/[slug].astro", _page6],
    ["src/pages/magazine/index.astro", _page7],
    ["src/pages/partnership.astro", _page8],
    ["src/pages/privacy.astro", _page9],
    ["src/pages/progetti/progetto/[slug].astro", _page10],
    ["src/pages/progetti.astro", _page11],
    ["src/pages/studio/[...index].astro", _page12],
    ["src/pages/team.astro", _page13],
    ["src/pages/index.astro", _page14]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "4d6e2564-72b7-41a0-8678-73c212e46f20",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
