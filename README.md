# SaaSTEMLY — site repository

The SaaSTEMLY company website (landing, About, Portfolio, Blog, FAQ, Contact,
Terms / Privacy / License) as a PremiumCMS site: an Astro frontend plus the
content the CMS keeps in git. Ported from the Next.js `saastemlysaastarter`
app — same React/shadcn components, Payload admin replaced by the PremiumCMS
admin, no login / e-commerce.

- `src/` — Astro pages + React components (Tailwind v4, `motion`, lucide).
- `seed/` — collection schema, menus and site settings (applied on every roll).
- `content/` — the entries, one JSON file each; saving in the admin commits here.
- `.agents/skills/site-conventions/SKILL.md` — the full map and the rules.

The platform builds the site in a container on every push and serves
`static/main`; pull requests get a preview at `https://<site>--pr-<N>.premium-cms.com`.

## Local development

`bun dev` serves the Astro frontend locally against the **live** instance — no
local backend, no snapshot file. `astro dev` live-connects the same way the
platform's builds and previews do: EmDash reads an in-memory database kept
fresh from the backend's `/_emdash/api/snapshot`, and `/_emdash/*` requests
are proxied to the backend (http://localhost:4321).

```sh
bun install
node bin/snapshot-to-sqlite.mjs https://<site>.premium-cms.com snapshot.db   # env EMDASH_PREVIEW_SECRET
SITE_URL=https://<domain> bunx astro build                                    # → dist/
bun run check:cf                                                              # JSON + astro check
```

A site admin gets the token (and the ready-made `env` block) from
`https://beta.saastemly.com/_emdash/api/settings/frontend-token` while signed in; rotate it there
too. It reads content, schema and the snapshot (drafts included) and nothing
else — still, treat it like a password and never commit `.env`. Content is
live: publish in the admin and reload the page. `EMDASH_INCLUDE_DRAFTS=1
bun dev` renders drafts too.
