# Lucas Acosta — Landing Page

Personal-brand landing page for Lucas Acosta, built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- pnpm as package manager

## Local development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and fill in the required values before running the app.

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_LEADS_API_URL` | Endpoint the advisory form posts leads to. |

## Build

```bash
pnpm build
```

## Deployment (Netlify)

This repo is connected to Netlify via GitHub. Build settings live in `netlify.toml`:

- Build command: `pnpm build`
- Runtime: `@netlify/plugin-nextjs`

Set the environment variables above in the Netlify site dashboard (Site configuration → Environment variables) before the first deploy.
