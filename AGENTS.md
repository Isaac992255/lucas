# AGENTS.md — Lucas Acosta Landing Page

> Auto-loaded by GitHub Copilot when this folder is opened in VS Code.
> Keep this file short. Put evolving detail in `.agents/`.

## Identity
- **Project:** Lucas Acosta Landing Page
- **Type:** Marketing landing page
- **Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Started:** 2026-07-06

## Mandatory protocol for any agent working here
1. At session start, run the `folder-memory` skill: read
   `.agents/PROJECT_STATE.md` and the last 10 entries of
   `.agents/CONVERSATION_LOG.md`.
2. After every response, append a log entry and update the state file
   per `folder-memory` rules.
3. If `.agents/` is missing, create it silently from templates.
4. Language for all memory artifacts: **English**.
5. Memory files are committed to git.

## Pointers
- Living state: `.agents/PROJECT_STATE.md`
- Conversation history: `.agents/CONVERSATION_LOG.md`

## Project-specific rules
- Tone: direct, real, expensive, structured, reliable. Avoid corporate rigidity and generic motivational language.
- Do not use the words "préstamos" or "prestamista" openly due to stigma.
- Brand phrase: "La mente detrás del negocio".
- Hero and flagship offer is 1:1 advisory; entry-level products (ebook, group mentorship) must remain visible.
- Image placeholders are marked with `role="img"` and `aria-label`; replace with actual photos when provided.
