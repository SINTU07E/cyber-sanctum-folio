# Hosting on GitHub Pages (Static Export)

This project is built with TanStack Start (SSR-capable). A static export is
supported for simple, marketing-style deploys such as GitHub Pages.

## Build locally

```bash
# Root domain (user/org site or custom domain)
STATIC_BUILD=1 bun run build

# Project site at https://<user>.github.io/<repo>/
STATIC_BUILD=1 BASE_PATH=/<repo>/ bun run build
```

Output is written to `dist/`. Upload that folder to any static host.

## Deploy via GitHub Actions

A workflow is included at `.github/workflows/deploy-pages.yml`.

1. Push the repo to GitHub.
2. Go to **Settings → Pages** and set **Source = GitHub Actions**.
3. For a project site, add a repository variable `BASE_PATH` set to `/<repo>/`
   (Settings → Secrets and variables → Actions → Variables). Skip this for
   user/org sites or custom domains.
4. Push to `main` — the workflow builds and publishes automatically.

## What may break on a static host

Anything that needs a server at request time will not work:

- **Server functions** (`createServerFn`) — RPC endpoints do not exist at
  runtime. Contact form submissions, protected reads, and any code with
  `.handler()` return no data.
- **Server routes** under `src/routes/api/**` — webhooks, cron endpoints,
  and public APIs are not deployed.
- **Lovable Cloud / Supabase auth writes done through server middleware**
  (`requireSupabaseAuth`). Client-side Supabase calls (browser
  `@/integrations/supabase/client`) still work if you keep RLS policies
  correct, but nothing that relied on the service-role key on the server
  will function.
- **Environment secrets** — `process.env.*` values are unavailable. Only
  `import.meta.env.VITE_*` values are baked in at build time.
- **Dynamic routes** — only `/` is prerendered by the current config. Add
  more entries to `tanstackStart.pages` in `vite.config.ts` to prerender
  additional paths (e.g. `{ path: "/about", prerender: { enabled: true } }`).
- **Fresh data on load** — everything is a snapshot from build time until
  the next deploy.
- **Deep-link refresh** relies on `404.html` (added by the workflow) to
  re-serve the SPA shell; some hosts other than GitHub Pages need a similar
  fallback rule.

## What still works

- All client-side UI, animations, routing, theming.
- Anything backed by a public third-party API called directly from the
  browser (with a `VITE_` key or public endpoint).
- Client-side Supabase queries against tables with public RLS policies.
