// Static-frontend project: renders the public site with EmDash's data layer,
// live-connected to the deployed backend — no local backend, no snapshot file,
// no Cloudflare adapter. getDb() reads an in-memory database built from the
// backend's /_emdash/api/snapshot (@premium-cms/emdash/db/snapshot-live):
// `astro dev` keeps it refreshed (publish in the admin, reload the page) and
// the platform's container `astro build` renders from one frozen fetch of the
// same source. /_emdash/* on the dev server proxies to the backend, so
// client-side features and the editor session work same-origin.
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "@premium-cms/emdash/astro";
import { readFileSync } from "node:fs";

// `bun run` / `npm run` do not always hand .env to the astro process: load it
// ourselves — only for variables that are not already set.
try {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const m = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env))
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // no .env — the environment must carry the values
}

const backend = (process.env.BACKEND_URL || "").replace(/\/+$/, "");
if (!backend || !process.env.EMDASH_API_TOKEN) {
  throw new Error(
    "BACKEND_URL and EMDASH_API_TOKEN are required — copy .env.example to .env (admins: <site>/_emdash/api/settings/frontend-token).",
  );
}

const database = {
  entrypoint: "@premium-cms/emdash/db/snapshot-live",
  config: {
    url: backend,
    token: process.env.EMDASH_API_TOKEN,
    includeDrafts: ["1", "true"].includes(
      process.env.EMDASH_INCLUDE_DRAFTS || "",
    ),
  },
  type: "sqlite",
  supportsRequestScope: false,
  supportsCoalescing: false,
  supportsCollectionDeletionGuard: false,
};

// On GitHub Pages project sites the URL is <user>.github.io/<repo>, so split
// SITE_URL into the origin (site) and the subpath (base) — otherwise assets are
// linked at /_astro/… and 404. A custom domain sets SITE_URL to the root, so
// base becomes "/" automatically.
const _rawSite = process.env.SITE_URL || "https://example.com";
let _site = _rawSite,
  _base = "/";
try {
  const u = new URL(_rawSite);
  _site = u.origin;
  _base = u.pathname.replace(/\/+$/, "") || "/";
} catch {}

// emdash aliases `use-sync-external-store` to its own ESM shims, which only
// have named exports; `zustand` (via @react-three/fiber) imports the default
// object. Give the shims a matching default export.
const useSyncExternalStoreDefault = {
  name: "premiumcms:use-sync-external-store-default",
  transform(code, id) {
    if (id.endsWith("shims/use-sync-external-store-with-selector.js")) {
      return {
        code: `${code}\nexport default { useSyncExternalStoreWithSelector };`,
        map: null,
      };
    }
    if (id.endsWith("shims/use-sync-external-store.js")) {
      return {
        code: `${code}\nexport default { useSyncExternalStore };`,
        map: null,
      };
    }
    return null;
  },
};

export default defineConfig({
  output: "static",
  site: _site,
  base: _base,
  image: { layout: "constrained", responsiveStyles: true },
  // The dev server forwards backend API calls (forms, commerce, auth, the
  // editor session) to the live instance; ignored by `astro build`.
  vite: {
    server: { proxy: { "/_emdash": { target: backend, changeOrigin: true } } },
    plugins: [tailwindcss(), useSyncExternalStoreDefault],
    // The dev server's dependency optimizer bundles node_modules with its own
    // rolldown pipeline that skips project plugins — register the shim-default
    // plugin there too, or `astro dev` fails on zustand / tunnel-rat.
    optimizeDeps: {
      rolldownOptions: { plugins: [useSyncExternalStoreDefault] },
    },
    // three / ogl / motion are client-only heavy libraries; keep them out of
    // the SSR optimizer so the static build stays fast.
    ssr: { noExternal: ["motion"] },
  },
  integrations: [
    react(),
    emdash({
      database,
      staticFrontend: true,
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 500, 600, 700, 800, 900],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      weights: [400, 500, 600, 700, 800, 900],
      fallbacks: ["monospace"],
    },
    {
      provider: fontProviders.google(),
      name: "Source Serif 4",
      cssVariable: "--font-source-serif",
      weights: [400, 600, 700],
      fallbacks: ["serif"],
    },
  ],
  devToolbar: { enabled: false },
});
