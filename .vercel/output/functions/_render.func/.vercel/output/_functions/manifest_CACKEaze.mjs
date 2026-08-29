import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CiMY4z8V.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_CfySysqY.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/WEB%20SITES/VERACE%20studio/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"calendar/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/calendar","isIndex":false,"type":"page","pattern":"^\\/calendar\\/?$","segments":[[{"content":"calendar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/calendar.astro","pathname":"/calendar","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contatti/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contatti","isIndex":false,"type":"page","pattern":"^\\/contatti\\/?$","segments":[[{"content":"contatti","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contatti.astro","pathname":"/contatti","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"cookie/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cookie","isIndex":false,"type":"page","pattern":"^\\/cookie\\/?$","segments":[[{"content":"cookie","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookie.astro","pathname":"/cookie","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"fondi-europei/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/fondi-europei","isIndex":false,"type":"page","pattern":"^\\/fondi-europei\\/?$","segments":[[{"content":"fondi-europei","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fondi-europei.astro","pathname":"/fondi-europei","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"magazine/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/magazine","isIndex":true,"type":"page","pattern":"^\\/magazine\\/?$","segments":[[{"content":"magazine","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/magazine/index.astro","pathname":"/magazine","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"partnership/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/partnership","isIndex":false,"type":"page","pattern":"^\\/partnership\\/?$","segments":[[{"content":"partnership","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/partnership.astro","pathname":"/partnership","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"progetti/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/progetti","isIndex":false,"type":"page","pattern":"^\\/progetti\\/?$","segments":[[{"content":"progetti","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/progetti.astro","pathname":"/progetti","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"team/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/team","isIndex":false,"type":"page","pattern":"^\\/team\\/?$","segments":[[{"content":"team","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/team.astro","pathname":"/team","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/newsletter","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/newsletter\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"newsletter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/newsletter.ts","pathname":"/api/newsletter","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://fondazioneverace.eu","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/WEB SITES/VERACE studio/src/pages/studio/[...index].astro",{"propagation":"none","containsHead":true}],["C:/WEB SITES/VERACE studio/src/components/AudioWelcomePlayer.astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/layouts/ArticleLayout.astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/magazine/articolo/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/magazine/articolo/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/calendar.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/calendar@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/contatti.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/contatti@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/cookie.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/cookie@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/fondi-europei.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/fondi-europei@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/magazine/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/magazine/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/partnership.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/partnership@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/privacy.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/privacy@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/progetti.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/progetti@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/progetti/progetto/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/progetti/progetto/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/WEB SITES/VERACE studio/src/pages/team.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/team@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/calendar@_@astro":"pages/calendar.astro.mjs","\u0000@astro-page:src/pages/contatti@_@astro":"pages/contatti.astro.mjs","\u0000@astro-page:src/pages/cookie@_@astro":"pages/cookie.astro.mjs","\u0000@astro-page:src/pages/fondi-europei@_@astro":"pages/fondi-europei.astro.mjs","\u0000@astro-page:src/pages/magazine/index@_@astro":"pages/magazine.astro.mjs","\u0000@astro-page:src/pages/partnership@_@astro":"pages/partnership.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/progetti/progetto/[slug]@_@astro":"pages/progetti/progetto/_slug_.astro.mjs","\u0000@astro-page:src/pages/progetti@_@astro":"pages/progetti.astro.mjs","\u0000@astro-page:src/pages/studio/[...index]@_@astro":"pages/studio/_---index_.astro.mjs","\u0000@astro-page:src/pages/api/newsletter@_@ts":"pages/api/newsletter.astro.mjs","\u0000@astro-page:src/pages/magazine/articolo/[slug]@_@astro":"pages/magazine/articolo/_slug_.astro.mjs","\u0000@astro-page:src/pages/team@_@astro":"pages/team.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/WEB SITES/VERACE studio/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_CACKEaze.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CmRBoSKu.js","/astro/hoisted.js?q=1":"_astro/hoisted.B27liyUm.js","/astro/hoisted.js?q=2":"_astro/hoisted.2EqL4v4i.js","/astro/hoisted.js?q=4":"_astro/hoisted.XiMz-mro.js","/astro/hoisted.js?q=6":"_astro/hoisted.xwIWqcVu.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/resources2.mjs":"_astro/resources2.DbN95BOs.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/resources4.mjs":"_astro/resources4.Bq6ETrw9.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/resources.mjs":"_astro/resources.DivtMtir.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/resources5.mjs":"_astro/resources5.BaztMg6q.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/resources3.mjs":"_astro/resources3.DyiINrjO.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.mjs":"_astro/ViteDevServerStopped.Cz7knrcA.js","C:/WEB SITES/VERACE studio/node_modules/sanity/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.B4h43bmy.js","C:/WEB SITES/VERACE studio/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.DwMvLTT6.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/resources6.mjs":"_astro/resources6.CmDt89vH.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/index.mjs":"_astro/index.BqgckQSA.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/index2.mjs":"_astro/index2.SdqW6CHk.js","@astrojs/react/client.js":"_astro/client.BpqiNVPU.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/index3.mjs":"_astro/index3.Ci2qRV-h.js","C:/WEB SITES/VERACE studio/node_modules/@sanity/eventsource/browser.mjs":"_astro/browser.BWYA7nvK.js","C:/WEB SITES/VERACE studio/node_modules/sanity/lib/_chunks-es/VideoPlayer.mjs":"_astro/VideoPlayer.DlOqgRao.js","/astro/hoisted.js?q=3":"_astro/hoisted.u5qB0n6p.js","/astro/hoisted.js?q=5":"_astro/hoisted.BWiIRfR9.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/calendar.vd0n0ger.css","/_astro/_slug_.BDwqG94i.css","/favicon.svg","/robots.txt","/site.webmanifest","/audio/Kid Cudi - Erase Me - Main.mp3","/images/verace-og.jpg","/logos/Verace_Loghi_Vettoriale.ai","/logos/Verace_Logo_Bianco.png","/logos/Verace_Logo_Nero.png","/logos/Verace_Logo_Verde.png","/pdf/sample-financial-report-2025.pdf","/pdf/sample-project-presentation.pdf","/fonts/FontPopulista-Regular.otf","/fonts/Unica77LL-Medium.otf","/_astro/browser.BWYA7nvK.js","/_astro/client.BpqiNVPU.js","/_astro/client.D3jKyhMH.js","/_astro/hoisted.2EqL4v4i.js","/_astro/hoisted.B27liyUm.js","/_astro/hoisted.BWiIRfR9.js","/_astro/hoisted.CmRBoSKu.js","/_astro/hoisted.u5qB0n6p.js","/_astro/hoisted.XiMz-mro.js","/_astro/hoisted.xwIWqcVu.js","/_astro/index.BqgckQSA.js","/_astro/index2.SdqW6CHk.js","/_astro/index3.Ci2qRV-h.js","/_astro/refractor.DwMvLTT6.js","/_astro/resources.DivtMtir.js","/_astro/resources2.DbN95BOs.js","/_astro/resources3.DyiINrjO.js","/_astro/resources4.Bq6ETrw9.js","/_astro/resources5.BaztMg6q.js","/_astro/resources6.CmDt89vH.js","/_astro/stegaEncodeSourceMap.B4h43bmy.js","/_astro/VideoPlayer.DlOqgRao.js","/_astro/ViteDevServerStopped.Cz7knrcA.js","/articles/AL CINESE/AlCineseDaLuigi_2024.pdf","/articles/AL CINESE/corpo del testo.txt","/articles/AL CINESE/IMG_1271 copia.jpg","/articles/AL CINESE/IMG_1271 copia.webp","/articles/AL CINESE/IMG_4846.jpg","/articles/AL CINESE/IMG_4846.webp","/articles/MEMORIE/corpo del testo.txt","/articles/MEMORIE/IMG_9747.jpg","/articles/MEMORIE/IMG_9747.webp","/articles/MEMORIE/IMG_9754.jpg","/articles/MEMORIE/IMG_9754.webp","/articles/MEMORIE/IMG_9811.jpg","/articles/MEMORIE/IMG_9811.webp","/articles/MEMORIE/MEMORIE DEL SOTTOSUOLO.pdf","/articles/MEMORIE/_.jpg","/articles/MEMORIE/_.webp","/projects/LA BELA/IMG_4931.webp","/projects/LA BELA/IMG_4934.webp","/projects/LA BELA/IMG_4947.webp","/projects/LA BELA/IMG_5003.webp","/projects/LA BELA/IMG_5110.webp","/projects/LA BELA/IMG_5146.webp","/projects/LA BELA/la bela description.txt","/projects/SCUOLA DI TERRITORIO/scuola di territorio description.txt","/projects/SCUOLA DI TERRITORIO/ST_2026-22.jpg","/projects/SCUOLA DI TERRITORIO/ST_2026-22.webp","/projects/SCUOLA DI TERRITORIO/ST_2026-30.jpg","/projects/SCUOLA DI TERRITORIO/ST_2026-30.webp","/projects/SCUOLA DI TERRITORIO/ST_2026-48.jpg","/projects/SCUOLA DI TERRITORIO/ST_2026-48.webp","/projects/SCUOLA DI TERRITORIO/ST_2026-83.jpg","/projects/SCUOLA DI TERRITORIO/ST_2026-83.webp","/projects/SCUOLA DI TERRITORIO/ST_2026-86.jpg","/projects/SCUOLA DI TERRITORIO/ST_2026-86.webp","/projects/VIAGGI DOMENICALI MINIMI/2_2_POST_DEFINITIVI_VIAGGIDOMENICALI-04.webp","/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-14.webp","/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-15.webp","/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-16.webp","/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-17.webp","/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-18.webp","/projects/VIAGGI DOMENICALI MINIMI/viaggi domenicali minimi description.txt","/calendar/index.html","/contatti/index.html","/cookie/index.html","/fondi-europei/index.html","/magazine/index.html","/partnership/index.html","/privacy/index.html","/progetti/index.html","/team/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"wHQrOLs0FT/tVy0TjDlFiijgpa/xOKJks/tBQEc8x5Q=","experimentalEnvGetSecretEnabled":false});

export { manifest };
