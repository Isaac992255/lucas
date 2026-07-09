# Lucas Acosta Landing Page - V2.0 Visual Redesign Plan

> Source: [taste-skill](https://github.com/Leonxlnx/taste-skill) anti-slop framework applied to the existing v1.0 build.
> Content and copy are LOCKED. This plan is visual-only. No copy changes.

---

## 1. Design Read (taste-skill Section 0)

**"Reading this as: personal-brand advisory landing for aspiring street entrepreneurs, with a dark-tech / editorial / street-credible language, leaning toward Tailwind v4 + Motion (framer-motion successor) + GSAP ScrollTrigger for one pinned section."**

This is NOT luxury, NOT corporate, NOT "warm artisan." Lucas is street, direct, credible, systematic. The visual language must feel like a well-oiled machine: dark, sharp, fast, no bullshit.

---

## 2. Dial Configuration

| Dial | Value | Rationale |
|------|-------|-----------|
| **DESIGN_VARIANCE** | 8 | Asymmetric layouts, broken grid moments, massive whitespace contrasted with dense data. Matches Lucas's "pillo" identity - unconventional but structured. |
| **MOTION_INTENSITY** | 7 | Fluid scroll-reveals, staggered entries with spring physics, one scroll-pinned section (products). No infinite loops, no gratuitous parallax. Every animation motivated. |
| **VISUAL_DENSITY** | 3 | Art gallery spacing. Expensive, clean. Lucas positions himself as premium advisory (USD 1k-3k), not a cheap course seller. Let the page breathe. |

---

## 3. V1.0 Audit (taste-skill Section 11.B)

### Brand tokens to PRESERVE
- Dark background palette (#0a0a0a, #0f0f0f) - correct, not pure black
- Gold accent (#c9a227) - established as brand color, keep it
- Red alert accent (#d44a3c) - works for "filter/danger" identity
- Noise overlay (CSS texture) - adds depth, keep but optimize
- Geist Mono as body font - fits the "systematic" brand
- Copy voice - LOCKED, do not touch

### Patterns to RETIRE (taste-skill violations found)

| # | Issue | Rule Violated | Fix |
|---|-------|---------------|-----|
| 1 | **Eyebrow on every section** (6/6 sections have `uppercase tracking` labels) | Eyebrow Restraint: max ceil(6/3) = 2 eyebrows | Keep only on Hero + Products. Remove from Mindset, Story, Footer, Social Proof. |
| 2 | **Em-dash in quote attribution** (`— Lucas`) | Section 9.G: complete em-dash ban | Replace with ` - Lucas` or line break + smaller name |
| 3 | **Locale strip under hero image** (`Zona Norte · Buenos Aires · Argentina`) | Section 9.F: locale strips banned for 99% of briefs | Remove entirely. Location info belongs in footer contact only. |
| 4 | **Section numbering on problems** (`01, 02, 03...`) | Section 9.F: section-number eyebrows banned | Remove numbers. Let the content speak. |
| 5 | **Three equal stat columns** (social proof strip) | Section 9.C: three-equal-columns is generic AI layout | Redesign as asymmetric bento or left-aligned stacked metrics |
| 6 | **Repetitive section layout** (all sections = eyebrow + 4/8 grid) | Section-Layout-Repetition Ban: min 4 different layout families | Diversify: full-width quote, sticky-stack, asymmetric split, masonry |
| 7 | **Hero subtext 38 words** (exceeds 20-word max) | Section 4.7: subtext max 20 words, max 4 lines | Trim to core message. Move detail to mindset section. |
| 8 | **Lucide icons** | Section 3.C: Lucide discouraged as default | Switch to Phosphor Icons |
| 9 | **Sentient serif as primary display** | Section 4.1: serif very discouraged as default | **OVERRIDE JUSTIFIED:** Lucas's brand is editorial/premium advisory. Sentient stays. But pair with a strong sans for body/labels instead of full-serif everywhere. |
| 10 | **Decorative frame corners on images** (border-l border-t) | Section 9.F: no pills/labels overlaid on images | Remove decorative corners. Let images be raw, street-credible. |
| 11 | **No Motion library** (only CSS keyframes) | Section 5: Motion required for MOTION_INTENSITY 7 | Install `motion` package, implement proper scroll-reveals and spring physics |
| 12 | **Products as 2x2 equal grid** | Section 9.C: avoid uniform card grids | Redesign as tiered vertical progression or featured-card + sidebar list |

### Current dial reading of v1.0
- DESIGN_VARIANCE: 5 (decent hero split, but repetitive patterns across sections)
- MOTION_INTENSITY: 3 (CSS-only fade-up, no physics, no scroll-driven)
- VISUAL_DENSITY: 3 (well-spaced, keep this)

---

## 4. Architecture Plan (section-by-section)

### 4.1 Navigation (keep simple, refine)
- Height: 64px, single line
- Logo left, 4 nav items right, no hamburger on desktop
- Add `backdrop-blur` on scroll (glassmorphism appropriate for dark-tech aesthetic)
- Active link indicator: gold underline with spring animation
- **No changes to labels** (El sistema, Programas, Mi historia, Contacto)

### 4.2 Hero Section - REDESIGN (Asymmetric Split)
**Layout family:** Asymmetric Split Hero (taste-skill Section 10)

Current: 5/7 grid split (image left, text right)
New: **7/5 grid split** (text dominant left, image bleeds right edge)

Changes:
- Text takes 7 cols, image takes 5 cols
- Image: remove grayscale filter, remove decorative corners, let it be raw and colored. Full-bleed to right edge (no container constraint on image).
- Remove locale strip below image
- **Trim subtext** from 38 words to ~18 words: "Yo arranqué con 250 mil pesos y un Excel. Hoy opero tranquilo. Te enseño el sistema."
- CTA: single primary button, remove secondary link
- Remove eyebrow? No - hero is the ONE place an eyebrow is justified. Keep "Las cosas que nadie te va a decir".
- Add `motion` entry animation: headline word-by-word stagger with spring physics

**Hero Stack (max 4):**
1. Eyebrow (keep)
2. Headline (keep: "Hay plata en todos lados. Despiértense.")
3. Subtext (trimmed to 18 words)
4. CTA (single button)

### 4.3 Social Proof - REDESIGN (Asymmetric Metrics)
**Layout family:** Left-aligned stacked metrics with oversized numbers

Current: three centered equal columns
New: 
- Full-width section, no elevated background
- Metrics arranged as large display numbers stacked vertically on left (3 col) with a single supporting sentence on right (9 col)
- Numbers: `font-sentient text-6xl md:text-8xl font-extralight`
- Labels inline to the right of each number, not below
- No eyebrow (removed per restraint rule)
- Separated by thin gold lines, not borders

### 4.4 Mindset Section - REDESIGN (Full-width + Zig-zag)
**Layout family:** Full-width editorial quote + varied content blocks

Current: eyebrow + 4/8 grid problems + quote + skills
New structure:
- **Remove eyebrow** (per restraint rule)
- Section headline: full-width, massive (text-5xl to text-7xl), left-aligned
- **Problems block:** NOT a numbered list. Instead: a 2-column card grid (no borders, just spacing + bold problem text). No `01, 02, 03` numbering.
- **Quote block:** Full-width, centered, oversized italic Sentient. Attribution: line break + small mono name (no em-dash)
- **Skills block:** Horizontal scroll-snap pills OR 3-col cards with icon + title + description. Different layout family from problems.

### 4.5 Products Section - REDESIGN (Featured + Stack)
**Layout family:** Featured card hero + vertical list

Current: 2x2 uniform grid with border cards
New:
- **Featured product (Asesoria 1 a 1):** full-width card, massive, dominant. Background: subtle gradient from background to elevated. Larger typography, bigger CTA.
- **Secondary products (Ebook, Mentoria, Curso):** stacked vertically as a clean list with `border-t` separators (NOT individual card containers). Each row: name + price + short description + arrow link. Clean, dense, scannable.
- Consider scroll-pinned sticky-stack for the 3 secondary products (GSAP Section 5.A canonical skeleton) - user scrolls through, each product sticks and reveals the next.
- No eyebrow (already used 1: hero). Products section gets a headline only.

### 4.6 Story Section - REDESIGN (Scroll-driven narrative)
**Layout family:** Mixed - full-width text + asymmetric images

Current: eyebrow + zigzag grid with images
New:
- **Remove eyebrow** (per restraint rule)
- Lead with the headline full-width, massive
- Images: remove grayscale, remove decorative corners. Raw, colored, full-bleed or offset.
- Break the zigzag pattern: use ONE large image (full-width, aspect 16:9 crop) followed by text block, then second image offset to one side (5-col on a 12-col grid, asymmetric)
- Closing statement: keep centered but increase font size, add scroll-triggered reveal with opacity fade

### 4.7 Footer/CTA Section - REFINE
**Layout family:** Split CTA (left headline, right action)

Current: centered CTA + social links + anti-scam notice
New:
- Left side: headline "Dejá de perder plata por confiado. Blindate." (already good)
- Right side: CTA button + Instagram link
- Anti-scam notice: move below, smaller, less prominent (still important but not the CTA focus)
- Remove eyebrow (per restraint rule)
- Add a subtle top-gradient transition from the story section

---

## 5. Typography System (v2.0)

| Role | Font | Weight | Size | Notes |
|------|------|--------|------|-------|
| Display / Headlines | Sentient | Extralight (200) | text-4xl to text-7xl | **Justified serif use:** editorial premium advisory. Keep. |
| Body / Descriptions | Geist Mono | Regular (400) | text-sm to text-base | Systematic, clean, readable |
| Labels / Metadata | Geist Mono | Regular (400) | text-xs | Uppercase tracking only where eyebrow is justified |
| Prices / Numbers | Sentient | Extralight (200) | text-2xl to text-6xl | Display numbers for impact |
| CTA buttons | Geist Mono | Medium (500) | text-sm | Uppercase tracking, strong |

Key changes:
- Stop using `font-mono text-xs uppercase tracking-[0.2em]` as default for ALL labels. Reserve it for max 2 eyebrows.
- Use sentence-case for most section sub-labels
- Headlines: add `text-wrap: balance` for cleaner line breaks

---

## 6. Color System (v2.0 - refined, not replaced)

| Token | Current | v2.0 | Change |
|-------|---------|------|--------|
| --background | #0a0a0a | #0a0a0a | Keep |
| --background-elevated | #0f0f0f | #111111 | Slightly lighter for better differentiation |
| --foreground | #f0ece4 | #eae6de | Slightly warmer, less stark |
| --foreground-muted | #7a7570 | #6b6560 | Slightly darker for better contrast ratio |
| --primary (gold) | #c9a227 | #c9a227 | Keep - established brand |
| --accent (red) | #d44a3c | #c43a2c | Slightly desaturated per taste-skill 4.2 |
| --border | #1f1f1f | #1a1a1a | Subtler |

**Consistency lock:** Gold (#c9a227) is the ONLY accent used for emphasis, CTAs, and highlights across the ENTIRE page. Red (#c43a2c) is reserved ONLY for "danger/filter" semantic contexts (the problems list, anti-scam warnings). Never mix them for the same purpose.

---

## 7. Motion System (v2.0)

### Install
```bash
pnpm add motion gsap @gsap/react
```

### Motion Map

| Section | Animation | Library | Motivation |
|---------|-----------|---------|------------|
| Hero headline | Word-by-word spring stagger | Motion | Hierarchy: draw attention to the value prop |
| Hero image | Scale from 1.05 to 1 + opacity | Motion | Storytelling: image reveals as content lands |
| Social proof numbers | Count-up on viewport entry | Motion (useInView + animate) | Feedback: numbers feel alive, credible |
| Mindset problems | Staggered fade-in from left | Motion whileInView | Hierarchy: sequential reading order |
| Products (secondary) | Sticky-stack scroll | GSAP ScrollTrigger | Storytelling: reveals products as user progresses |
| Story images | Parallax offset (subtle, 20px) | Motion useScroll + useTransform | Depth: images feel layered, not flat |
| Footer CTA | Scale-in on viewport entry | Motion whileInView | Attention: final conversion moment |

### Reduced motion
- ALL animations wrapped with `useReducedMotion()` check
- Fallback: instant render, no motion, no spring
- CSS: `@media (prefers-reduced-motion: reduce)` kills all keyframes

### Forbidden patterns (enforced)
- NO `window.addEventListener('scroll')` 
- NO `useState` for continuous values (scroll position, mouse)
- NO infinite loop animations
- NO parallax on more than 2 elements per viewport

---

## 8. Icon Migration

```bash
pnpm remove lucide-react
pnpm add @phosphor-icons/react
```

| Current (Lucide) | New (Phosphor) | Context |
|------------------|----------------|---------|
| ArrowDownRight | ArrowDownRight | Hero CTA |
| ArrowRight | ArrowRight | Product links |
| BookOpen | BookOpen | Ebook product |
| Users | UsersThree | Mentoria product |
| GraduationCap | Certificate | Curso product |
| Crown | Crown | Asesoria product |

Standardize `weight="light"` across all Phosphor icons (matches Sentient extralight aesthetic).

---

## 9. Layout Diversity Audit (v2.0)

Taste-skill requires min 4 different layout families across 6+ sections.

| Section | v1.0 Layout Family | v2.0 Layout Family | Different? |
|---------|--------------------|--------------------|------------|
| Hero | Asymmetric split (5/7) | Asymmetric split (7/5 reversed) | Same family, different config |
| Social Proof | Three-equal-columns | Left-aligned stacked metrics | YES - new |
| Mindset | Split header (4/8 grid) | Full-width editorial + card grid | YES - new |
| Products | 2x2 uniform grid | Featured hero + vertical list / sticky-stack | YES - new |
| Story | Zigzag split (alternating) | Mixed: full-width + asymmetric offset | YES - new |
| Footer | Centered stack | Split CTA (left headline, right action) | YES - new |

**Result: 5 different layout families across 6 sections.** Passes the rule.

---

## 10. Pre-Flight Checklist Targets (before shipping v2.0)

- [ ] ZERO em-dashes anywhere on the page
- [ ] Max 2 eyebrows total (Hero + 1 more max)
- [ ] No section-numbering on lists
- [ ] No locale strip under images
- [ ] No decorative image corners/frames
- [ ] Color consistency: gold = emphasis, red = danger only
- [ ] Shape consistency: all-sharp corners (0 radius) for cards/CTAs, consistent
- [ ] Hero subtext max 20 words
- [ ] Hero fits viewport without scroll to CTA
- [ ] No three-equal-column patterns
- [ ] No duplicate CTA intent (audit all "Aplicar" buttons)
- [ ] Motion motivated for every animation
- [ ] Reduced motion honors `prefers-reduced-motion`
- [ ] Mobile collapse explicit for every section
- [ ] All icons from Phosphor, consistent weight
- [ ] No Lucide imports remaining
- [ ] Content density: no section with > 25-word sub-paragraphs

---

## 11. Implementation Order (priority for maximum impact, minimum risk)

| Phase | Task | Impact | Risk | Est. files |
|-------|------|--------|------|------------|
| **Phase 1** | Install Motion + Phosphor, remove Lucide | Foundation | Low | package.json, all components |
| **Phase 2** | Fix taste-skill violations (eyebrows, em-dash, locale strip, numbering, image corners) | High | Low | hero-lucas, mindset, story, products |
| **Phase 3** | Redesign Social Proof section (asymmetric metrics) | Medium | Low | page.tsx (inline section) |
| **Phase 4** | Redesign Hero (reverse split, trim subtext, Motion entry) | High | Medium | hero-lucas.tsx |
| **Phase 5** | Redesign Mindset (remove eyebrow, diversify layouts) | High | Medium | mindset.tsx |
| **Phase 6** | Redesign Products (featured + stack/sticky-scroll) | High | High | products.tsx, new GSAP component |
| **Phase 7** | Redesign Story (break zigzag, raw images) | Medium | Medium | story.tsx |
| **Phase 8** | Redesign Footer CTA (split layout) | Low | Low | footer-lucas.tsx |
| **Phase 9** | Motion polish pass (springs, stagger, scroll-driven) | High | Medium | all animated components |
| **Phase 10** | Pre-flight check audit + fix | Critical | Low | all files |

---

## 12. Dependencies

```json
{
  "add": [
    "motion",
    "gsap", 
    "@gsap/react",
    "@phosphor-icons/react"
  ],
  "remove": [
    "lucide-react"
  ]
}
```

---

## 13. Files to create/modify

### New files
- `components/sticky-stack.tsx` - GSAP sticky-stack component (taste-skill 5.A canonical)
- `components/motion-wrapper.tsx` - Motion scroll-reveal replacement for current CSS-only ScrollReveal

### Modified files
- `app/globals.css` - Refined tokens, remove decorative utilities
- `app/page.tsx` - New social proof layout
- `components/hero-lucas.tsx` - Full redesign
- `components/mindset.tsx` - Full redesign
- `components/products.tsx` - Full redesign
- `components/story.tsx` - Full redesign
- `components/footer-lucas.tsx` - Layout change
- `components/header.tsx` - Add backdrop-blur on scroll
- `components/scroll-reveal.tsx` - Replace with Motion-based implementation

### Delete
- `components/scroll-reveal.tsx` (replaced by motion-wrapper)

---

## 14. Reference: taste-skill key rules applied

| Rule | Application |
|------|-------------|
| Eyebrow Restraint (max sections/3) | 2 eyebrows for 6 sections |
| Em-dash ban (Section 9.G) | Zero em-dashes, use ` - ` or line breaks |
| Section-Layout-Repetition Ban | 5 different layout families |
| Hero Stack Discipline (max 4 elements) | Eyebrow + Headline + Subtext (trimmed) + CTA |
| Hero subtext max 20 words | Trim from 38 to ~18 |
| Color Consistency Lock | Gold = emphasis everywhere, Red = danger only |
| Shape Consistency Lock | All-sharp (radius 0) for everything |
| Motion Motivated | Every animation justified in one sentence |
| No AI Tells | No three-equal-columns, no locale strips, no section numbering |
| Serif Override | Justified: editorial premium advisory + street credibility |
| Icon library | Phosphor (light weight, consistent) |
| No decorative image overlays | Raw photos, no corners/frames |

---

## 15. Brand Alignment Check

The visual redesign must reinforce Lucas's brand identity from LUCAS-CEREBRO.md:

| Brand trait | Visual expression |
|-------------|-------------------|
| Direct, criollo, sin vueltas | Sharp corners, no rounded softness, no gradients-for-decoration |
| Sistema y orden | Monospace labels, grid discipline, mathematical spacing |
| Premium pero calle | Dark theme + gold accent (expensive) + raw unfiltered photos (street) |
| Transparencia radical | Full-bleed images (no decorative filters), metrics displayed large |
| Autoridad sin violencia | Sharp typography, confident spacing, no aggressive red everywhere |
| Observador y pillo | Asymmetric layouts that feel intentional, not predictable |

**The page should feel like opening a well-organized leather case full of cash: dark, structured, expensive, real.**
