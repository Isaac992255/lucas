# PROJECT_STATE.md

> Living snapshot of the project. Keep < 200 lines. Move history to
> `CONVERSATION_LOG.md`. English only. Committed to git.

## Goal
Build a high-converting personal-brand landing page for Lucas Acosta, positioning him as an expensive, structured, and reliable business advisor who teaches people how to lend, negotiate, and close like professionals. The page must feel editorial and premium while clearly guiding visitors from entry-level products to the flagship 1:1 advisory offer.

## Scope
- **In scope:**
  - Hero section with two-column layout (photo + headline/CTA).
  - Mindset/value-proposition section with problem, shift, and skills.
  - Products/programs section with four pricing tiers.
  - Personal story section with two photos and narrative arc.
  - Contact/footer CTA section.
  - Responsive design, scroll reveal animations, accessibility basics.
- **Out of scope:**
  - Actual payment/checkout integration.
  - Backend form handling.
  - Image assets (placeholders until client provides photos).

## Current status
- **Working:** Full landing page v1.1 complete. Hero (`components/hero-lucas.tsx`) optimized after header removal: vertically centered two-column layout, reduced top padding, image converted to a fully rounded circular crop (`rounded-full`, `aspect-square`, `max-w-md`) with a subtle ring and soft primary shadow — no border frame. Story component (`components/story.tsx`) fully redesigned (2026-07-08) as an immersive storytelling experience: parallax images via `motion/react`, gradient seams between sections (light↔dark), sticky narrative leaders on desktop, arco cromático secondary→primary, editorial offset images in Parte 2, `/lucas-vida-nueva-exitosa.jpeg` moved to Parte 3 (bookend with Parte 1). Hero enhanced (2026-07-08) with performance-first motion: `motion/react` staggered entry, mouse-following radial spotlight (CSS custom properties + rAF), slow drifting gradient blobs, and subtle Ken Burns on the circular portrait; all guarded by `useReducedMotion()` and `prefers-reduced-motion`. Mindset section (`components/mindset.tsx`) refined (2026-07-08): both problem and skills blocks now share the warm secondary (orange) accent for numbers, decorative lines, carets, and hover states; warning icons replaced by 01–05 numbering in the problem list for visual congruence with the skills accordion. Multicolor gradient seam removed and replaced by a whitespace scroll break plus a more pronounced stagger/delay on the skills list reveal to signal the problem→solution transition as the user scrolls. Mindset further unified with hero (2026-07-08) by replicating the exact same spotlight, drifting blobs, and `motion/react` staggered entry on the section headline so both sections share the same visual thread. Hero and Mindset wrapped in a shared `AtmosphericShell` component (2026-07-08): single mouse-following spotlight and single drifting blob canvas spans both sections, eliminating the visible dividing line between Hero and Mindset. Refactored (2026-07-08) so `HeroLucas` and `Mindset` no longer contain their own `AtmosphericShell`; the shared shell now lives in `app/page.tsx`, guaranteeing one contiguous dark canvas. New `Testimonials` section (`components/testimonials.tsx`) added (2026-07-08) between Products and Story: 5 video testimonials (`public/testimonios/1.mp4`–`5.mp4`) in a hover-to-expand horizontal layout on desktop (inspired by the Framer reference) and scroll-snap horizontal cards on mobile; each card uses `<video muted loop playsInline>`, gradient overlay, quote/name/role reveal, and `useReducedMotion()` guard. Wrapped in `AtmosphericShell` for visual continuity with dark sections. Updated (2026-07-08) to show only the first 3 videos by default with the remaining 2 behind a "Ver más" expander, and to keep a playing video running (with audio) after hover ends unless the user explicitly pauses it or clicks another video. Mindset spacing and hierarchy refined (2026-07-08): section padding reduced, headline centered and scaled to stay clearly below the hero h1. All copy preserved char-for-char. Zero lint errors.
- **In progress:** V2.0 visual redesign planned. `docs/v2-redesign-plan.md` contains the full 10-phase implementation plan applying taste-skill anti-slop framework.
- **Not started:** Remaining V2.0 phases, payment links, form backend, analytics, SEO metadata refinement.

## Recent fix
- 2026-07-09: Pushed copy-only updates (no code logic changes) to `origin/main` (commit `abd7046`): hero headline/sub rewrite, mindset skill wording, removed ebook tier from `products.tsx`, story wording tweaks, testimonial names/roles/videos updated with real data. `pnpm build` verified green before push.
- 2026-07-09: Fixed production bug (deployed on Netlify) where the advisory form always showed "Falta configurar la URL del servidor de leads." — root cause: `NEXT_PUBLIC_LEADS_API_URL` lives only in `.env.local`, which is gitignored and never reaches Netlify's build. Fixed in `lib/submit-lead.ts` by hardcoding the known lead-mailer URL as `FALLBACK_API_URL` (safe since `NEXT_PUBLIC_*` vars are exposed to the browser anyway — not a secret), still overridable via the env var if the endpoint ever changes. `pnpm build` verified green; pushed to `origin/main` (github.com/Isaac992255/lucas) to trigger a Netlify redeploy.
- 2026-07-09: Repo prepared and pushed to GitHub (`github.com/Isaac992255/lucas`, `main` branch) for Netlify deployment. Added `.gitignore` (Next.js standard + `/graphify-out/`, `LUCAS-CEREBRO.md`, unused `/imagenes/` and root `/testimonios/`), `netlify.toml` (pnpm build + `@netlify/plugin-nextjs`), and updated `README.md`. Authenticated `gh` CLI as `Isaac992255` (repo owner) after discovering other logged-in accounts lacked push access. **Next: connect the GitHub repo in Netlify's UI and set `NEXT_PUBLIC_LEADS_API_URL` env var there** (gitignored `.env.local` won't carry over).
- 2026-07-09: Wired `components/advisory-form-dialog.tsx` to the real leads backend (previously UX-only). Added `lib/submit-lead.ts` with `submitLead()` (fetch POST + typed `LeadPayload`/`LeadResponse`). Added `formType` prop (`asesoria` | `mentoria` | `curso`) to `AdvisoryFormDialog`, defaulted from `variant` but explicitly overridden in `components/products.tsx` for the Mentoría and Curso CTAs so each submits the correct `formType`. On submit failure the dialog now shows an inline red error box instead of silently succeeding. API endpoint stored in `NEXT_PUBLIC_LEADS_API_URL` (`.env.local`, gitignored; `.env.example` added as reference) pointing to `https://lead-mailer-224870988029.southamerica-east1.run.app/leads`. CORS on that server is currently `*` — server owner said to restrict it to the production domain once known. `pnpm build` verified green.
- 2026-07-09: Improved mobile-only UX/UI of `components/advisory-form-dialog.tsx`: 16px input font-size to prevent iOS zoom-on-focus, sticky header (drag handle + title/close/progress) and sticky footer nav (Atrás/Siguiente/Enviar) inside the mobile bottom sheet so key controls stay reachable while scrolling/keyboard is open, bigger close-button touch target, and safe-area bottom padding. All changes gated behind `sm:` resets — desktop layout untouched, per explicit request.
- 2026-07-09: Built a responsive popup application form (`components/advisory-form-dialog.tsx`, `AdvisoryFormDialog`) wired to the "Llamada 1:1 conmigo" hero CTA and the "Aplicar a la asesoría" featured-product CTA. 3-step wizard (Radix Dialog + motion/react + react-hook-form/zod) matching the requested field structure, with conditional fields, animated progress, contrast-enhancing dark overlay, and a success state. No backend submission wired yet (UX-only, per request).
- 2026-07-09: Moved the play/pause button to the center of the mobile testimonial card in `components/testimonials.tsx`. It was previously positioned at the top-right corner; now it uses `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` to sit centered on the video, matching the desktop card placement. All other card behavior and styling left unchanged.
- 2026-07-09: Restored `ScrollReveal` animations to original behavior. Removed the temporary `SCROLL_REVEAL_ENABLED` flag in `components/scroll-reveal.tsx`; the component again uses `IntersectionObserver` with opacity/translate reveal on scroll.
- 2026-07-08: Fixed testimonial videos rendering invisible (audio-only) in `components/testimonials.tsx`. Root cause: `isLoaded` React state never flipped true (relied solely on `onLoadedData`, plus an unconditional `currentTime = 0` reset on mount aborted the initial fetch). Fixed by also listening to `onCanPlay`/`onPlaying` and guarding the reset with `readyState > 0`. Verified live via browser automation. "Ver más testimonios" button was already functionally correct.
- 2026-07-08: Fixed the 2 extra testimonial cards (revealed by "Ver más testimonios") rendering at 0x0 size (invisible). Root cause: `ExtraVideoCard`'s outer div relied only on `max-w-[260px] mx-auto` with no explicit width; inside a `flex-col` container with `mx-auto`, stretch is disabled and all its children are `position: absolute` (no intrinsic content size), so width resolved to 0 and `aspect-[9/16]` produced height 0. Fixed by adding `w-full` alongside `max-w-[260px]`. Verified live via browser automation (cards now measure 260x462px).

## Architecture / stack
- Next.js 16 App Router (static export ready).
- React 19 + TypeScript.
- Tailwind CSS 4 with custom design tokens in `app/globals.css`.
- shadcn/ui base components (Button) customized for the brand.
- Local `Sentient` display font + `Geist Mono` body font.

## Open decisions
- [ ] Final CTA destination for product cards (payment links, Calendly, form).
- [ ] Whether to add a contact form in the footer or keep email/social only.
- [ ] Backend/destination for the new advisory application popup form (API route, email, CRM/WhatsApp integration) — currently UX-only, no submission wired.

## Resolved decisions
- 2026-07-07 Added real images for the hero (`/hero.jpeg`) and story sections (`/progreso-inicios.jpeg` and `/lucas-ahora.jpeg`) copied from `imagenes/` into Next.js `public/` directory.
- 2026-07-06 Chose dark editorial aesthetic with antique gold (#c9a227) and terracotta (#a85c46) accents to convey premium credibility without generic "AI slop" looks.
- 2026-07-06 Kept existing `Sentient` + `Geist Mono` font pairing for distinctive typography.
- 2026-07-06 Used CSS-only noise overlay and Intersection Observer scroll reveals for performant motion.

## Next steps
1. Implement V2.0 redesign Phase 1: Install Motion + Phosphor, remove Lucide.
2. Implement V2.0 redesign Phase 2-10 per `docs/v2-redesign-plan.md`.
3. Wire CTA buttons to real destinations (payment/checkout, booking link, waitlist form).
4. Add analytics and refine meta/OG tags.

## Blockers
None.

## Overrides of parent
None.

## Cross-cutting changes from children
None.

