# PremiumCMS static frontend

This repo is the **Astro frontend + seed** for a PremiumCMS site. The public
site is a **static build on GitHub Pages** — the Astro frontend is never hosted
on Cloudflare. Only the backend (admin panel + REST API + media) runs on
Cloudflare.

On every push / content-publish, GitHub Actions:
1. fetches a content **snapshot** from the backend (`bin/snapshot-to-sqlite.mjs`),
2. builds the site to static HTML against that snapshot (`astro.config.static.mjs`),
3. applies `seed.json` to the backend (`bin/apply-seed.mjs`),
4. deploys `dist/` to GitHub Pages.

Secrets (set by the platform): `BACKEND_URL`, `SITE_URL`, `EMDASH_PREVIEW_SECRET`,
`SEED_SECRET`.

## Local development

`bun dev` serves the Astro frontend locally against the **live** instance — no
local backend. It pulls the site's content snapshot with the frontend API token,
then runs `astro dev` from it (http://localhost:4321).

```sh
cp .env.example .env   # fill in EMDASH_API_TOKEN
bun install
bun dev
```

A site admin gets the token (and the ready-made `env` block) from
`https://beta.saastemly.com/_emdash/api/settings/frontend-token` while signed in; rotate it there
too. It reads content, schema and the snapshot (drafts included) and nothing
else — still, treat it like a password and never commit `.env`. Re-run
`bun dev` to pick up new content; `EMDASH_INCLUDE_DRAFTS=1 bun dev` includes
drafts.
