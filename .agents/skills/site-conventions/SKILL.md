---
name: site-conventions
description: How this PremiumCMS site repository is laid out and what a change to it must respect. Read before editing anything in this repo.
---

# Site conventions

This repository is a PremiumCMS site: an Astro frontend plus the content the
CMS keeps in git. The platform builds it in a container on every push and
serves the result from `static/<branch>`; pull requests get a preview.

It is the SaaSTEMLY company brochure site (landing, About, Portfolio, Blog,
FAQ, Contact, Terms / Privacy / License), ported from the Next.js
`saastemlysaastarter` app. There is no login and no e-commerce on the
frontend.

## Layout

- `src/` — the Astro frontend. Match the existing style: tabs, double quotes,
  one component per file.
  - `src/layouts/Site.astro` — the only layout: fixed scroll-aware header,
    footer, dark mode (`<html data-theme>` + `theme` cookie), SEO head.
    Navigation comes from the CMS menus `primary`, `footer_resources`,
    `footer_legal`; title / tagline / social links from Site settings.
  - `src/pages/` — one Astro page per route. Pages only load data
    (`src/lib/content.ts`) and hand it to React components.
  - `src/components/` — React (shadcn-style, Tailwind v4, `motion`,
    `lucide-react`). `ui/` are the primitives, `landing/` the home sections,
    `noir/` the shared page chrome, `pages/` whole-page ports (About,
    Contact), `blog/` the post cards. `Beams`/`Silk` (three.js) and `Aurora`
    (ogl) are WebGL backgrounds loaded client-only via `React.lazy` inside
    `<ClientOnly>` + `<WebGLBoundary>`. `link.tsx` / `image.tsx` are plain
    `<a>` / `<img>` stand-ins for the Next.js `Link` / `Image` the components
    were written against.
  - `src/lib/content.ts` — typed, never-throwing loaders over the
    collections; add a field here when you add it to a collection.
  - `src/styles/global.css` — Tailwind + the design tokens ("tangerine"
    scheme). Retheme by editing the `:root` / `html[data-theme="dark"]`
    variables.
- `seed/` — the site's schema as JSON (collections, menus, settings,
  `.schemas/`). Applied by the platform on every roll (update-on-conflict).
  Change the JSON, never hand-edit generated ids; keep `seed/.schemas/`
  untouched. Every collection here is `storage: "git"`.
- `content/` — the git-backed entries, one file per entry
  (`content/<collection>/<slug>.json`, shape `{ slug, status, createdAt,
  updatedAt, publishedAt, data }`). Saving in the admin commits here; edits
  in a PR are fine. `content/emdash-forms/forms/contact.json` is the Forms
  plugin definition behind the contact form (submissions stay in the DB:
  Forms → Submissions in the admin).
- `public/team`, `public/projects`, `public/logo` — photos and screenshots
  referenced by path from content entries.
- `bin/`, `tests/ci/`, `tests/preview/` — platform tooling, synced from the
  template. Do not edit; put project checks in `check:cf` / `test:cf` /
  `test:preview:cf` scripts instead.
- `.agents/skills/` — skills like this one, loaded by the issue agent.
  `.mcp.json` — extra MCP servers the agent may use.

## Content model

| Collection     | Route(s)                   | Notes |
| -------------- | -------------------------- | ----- |
| `home`         | `/`                        | one entry `home`: hero, marquee, services, stats, engagement models, section headings, closing CTA |
| `about`        | `/about`                   | one entry `about`: mission, stats, values, timeline, CTA |
| `contact`      | `/contact`                 | one entry `contact`: page copy + contact cards |
| `team`         | `/about`, `/` (flagged)    | `order` sorts, `home_page` picks the four on the landing page |
| `projects`     | `/portfolio`, `/` (flagged)| "one per line" text fields for tags / technologies / features / results |
| `testimonials` | `/`                        | first by `order` is the featured quote |
| `faq`          | `/faq`, `/` (first six)    | `is_active` hides an entry |
| `posts`        | `/blogs`, `/blogs/<slug>`  | Portable Text body; a future `publish_date` shows as "Coming soon" |
| `pages`        | `/<slug>`                  | long-form pages (terms, privacy, license) in the legal layout |

Icons in `home.services`, `home.engagement_models` and `about.values` are
lucide names from `src/components/icon-map.ts`; keep that list and the
`validation.options` in the collection JSON in sync.

## Rules for changes

- Keep JSON valid (`npm run check:cf` parses every file under `seed/` and
  `content/`, then runs `astro check`).
- Do not add dependencies unless the issue asks for one; `bun install` must
  keep working.
- Never edit `static/*` branches or anything under `dist/`.
- Public pages are rendered from the content snapshot; a content change belongs
  in `content/` (or the schema in `seed/`), a presentation change in `src/`.
- Components copied from the Next.js app use `type` imports for types
  (`verbatimModuleSyntax`); keep new files the same.

Field slugs are `snake_case` (the CMS rejects anything else); the loaders in
`src/lib/content.ts` read them by camelCase name and translate.
