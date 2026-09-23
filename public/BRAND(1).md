# Alkwiti — Brand Reference

Extracted from the live codebase (`tailwind.config.ts`, `app/globals.css`, `lib/site.ts`, `app/layout.tsx`, `components/Logo.tsx`) and the brand direction in `MASTER WEBSITE GENERATION PROMPT — ALKWITY.COM.md`.

Every value below is what the site actually ships, not an aspiration. Assets are copied into `brand/logo/` so this document is portable on its own.

---

## 1. Identity

| Field | Value |
| --- | --- |
| Brand name | Alkwiti |
| Domain | alkwiti.com |
| URL | https://alkwiti.com |
| Logo tagline | Trade Without Borders |
| Positioning line | Global procurement, sourced smarter. |
| Geographic line | Source globally. Deliver globally. |
| Contact | hello@alkwiti.com |
| Description | Alkwiti helps businesses source electronic products, components and equipment from capable manufacturers and suppliers worldwide. |
| SEO title | Alkwiti \| Global Procurement & Electronics Sourcing |
| Title template | `%s \| Alkwiti` |
| Locale | en_US |

Note on spelling: the original brief used "Alkwity". The shipped brand is **Alkwiti** (see `scripts/rename-brand.mjs`). Use Alkwiti everywhere.

---

## 2. Logo

### Files

| File | Use | Size |
| --- | --- | --- |
| `brand/logo/alkwiti-logo-light-bg.png` | Light backgrounds (dark wordmark) | 400 × 252, 20 KB |
| `brand/logo/alkwiti-logo-dark-bg.png` | Dark backgrounds (light wordmark) | 400 × 252, 20 KB |
| `brand/logo/alkwiti-logo-light-bg-master-2060.png` | Print / large-format master | 2060 × 2060 |
| `brand/logo/alkwiti-logo-dark-bg-master-2060.png` | Print / large-format master | 2060 × 2060 |
| `brand/logo/alkwiti-icon.svg` | Favicon / app icon, standalone mark | 48 × 48 viewBox, scalable |

All PNGs are 32-bit RGBA with transparency. The masters are square with generous transparent padding; the 400 × 252 versions are alpha-trimmed for web (`scripts/trim-logos.mjs`, `sharp().trim({ threshold: 10 })`). Web aspect ratio is **1.587 : 1**.

### Composition

A wireframe globe in brand orange, wrapped by two heavy arrows that form an open circular loop (arrow head top-right, arrow head bottom-left) suggesting continuous two-way trade. The wordmark **ALKWITI** sits over the lower-right of the globe in a bold condensed sans, with **TRADE WITHOUT BORDERS** in letterspaced caps beneath it, right-aligned to the wordmark.

- Light-bg variant: near-black wordmark, arrows and tagline; orange globe.
- Dark-bg variant: near-white wordmark, arrows and tagline; orange globe (unchanged).

The icon SVG is a simplified derivative: a `#111111` rounded square (10px radius on 48px), a white circular arrow, and three orange globe meridians.

### Usage rules

- Pick the variant by background, not by preference. `light` = for light backgrounds. `dark` = for dark backgrounds. This naming trips people up.
- Size by height only, width auto. Shipped sizes: header `h-9` (36px) → `md:h-10` (40px); footer `h-12` (48px) on ink.
- Minimum height 32px. Below that the tagline stops being legible; use `alkwiti-icon.svg` instead.
- Clear space: at least the cap height of the wordmark on all sides.
- Never recolor, rotate, add effects to, or place the full logo on a busy photo or a mid-tone background. Ink or paper only.
- Alt text: `Alkwiti, Trade Without Borders`. Link label: `Alkwiti home`.

### Reference implementation

```tsx
import logoLight from "@/public/logo-alkwiti-light.png"; // dark wordmark
import logoDark from "@/public/logo-alkwiti-dark.png";   // light wordmark

<Image
  src={variant === "light" ? logoLight : logoDark}
  alt="Alkwiti, Trade Without Borders"
  className="h-9 w-auto"
  sizes="180px"
  priority
/>
```

---

## 3. Color

One restrained system: near-black, warm white, cool grey, single orange accent. No secondary hues.

### Tokens

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#111111` | Primary text, dark sections, primary buttons |
| `ink-900` | `#151515` | |
| `ink-800` | `#1d1d1f` | |
| `ink-700` | `#2a2a2d` | Primary button hover |
| `ink-600` | `#3a3a3f` | |
| `paper` | `#fafafa` | Page background, text on ink |
| `paper-warm` | `#f6f5f2` | Hero and alternating section background |
| `accent` | `#e67e22` | CTAs, sequence numbers, active states, highlights |
| `accent-600` | `#d06f1a` | Accent button hover |
| `accent-700` | `#b45f14` | Darker accent (AA-safe on white) |
| `accent-soft` | `#f4a460` | Accent on dark backgrounds |
| `line` | `#e6e5e2` | Hairlines, card and input borders |
| `line-dark` | `#26262a` | Borders on ink |
| `mute` | `#6b6b70` | Body copy, secondary text |
| `mute-light` | `#9a9a9f` | Decorative / disabled only |

On dark sections, text uses white at opacity rather than a grey token: `text-white/60` for body, `text-white/40` for footer labels, `border-white/10` to `border-white/20` for lines.

### CSS variables

```css
:root {
  --ink: #111111;
  --ink-700: #2a2a2d;
  --paper: #fafafa;
  --paper-warm: #f6f5f2;
  --accent: #e67e22;
  --accent-600: #d06f1a;
  --accent-700: #b45f14;
  --accent-soft: #f4a460;
  --line: #e6e5e2;
  --line-dark: #26262a;
  --mute: #6b6b70;
  --mute-light: #9a9a9f;
}
```

### Accent discipline

Accent is reserved for CTAs, important numbers, interactive diagrams, active states, and small highlights. It is never a background for large areas and never used for body text.

### Contrast (computed, WCAG 2.1)

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `ink` on `paper` | 18.1 : 1 | AAA |
| `mute` on `paper` | 5.1 : 1 | AA |
| `accent` on `ink` | 6.6 : 1 | AA |
| `accent-700` on white | 4.6 : 1 | AA |
| white on `accent` | 2.9 : 1 | **Fails AA** |
| `accent` on `paper` | 2.9 : 1 | Non-text / decorative only |
| `mute-light` on `paper` | 2.7 : 1 | Decorative only |

The shipped `.btn-accent` is white text on `#e67e22` at 2.9 : 1, which does not meet AA for text. If you reuse this system and need compliance, switch that button to `accent-700` (`#b45f14`) as the fill, or use `ink` text on accent. Flagging it rather than silently reproducing it.

---

## 4. Typography

- Typeface: **Inter**, loaded via `next/font/google`, `subsets: ["latin"]`, `display: "swap"`, exposed as `--font-inter`.
- Stack: `var(--font-inter), system-ui, sans-serif`.
- Feature settings on `body`: `"cv02", "cv03", "cv04", "cv11"` (single-storey alternates, straight-tail characters).
- Rendering: `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`.
- Weights in use: 400 body, 500 nav and buttons, 600 headings, eyebrows and numbers. No 700+.

### Scale

| Element | Classes |
| --- | --- |
| H1 (page hero) | `text-4xl sm:text-5xl md:text-6xl` · `font-semibold` · `leading-[1.05]` · `tracking-tightest` |
| H2 (section) | `text-3xl sm:text-4xl md:text-[2.75rem]` · `font-semibold` · `leading-[1.08]` · `tracking-tight` |
| H2 (on ink) | `text-3xl sm:text-4xl md:text-5xl` |
| Lead paragraph | `text-lg md:text-xl` · `leading-relaxed` · `text-mute` |
| Body | `text-base` · `leading-relaxed` |
| Small / meta | `text-sm` · `text-mute` |
| Eyebrow | `text-2xs` (0.6875rem) · `font-semibold` · `uppercase` · `tracking-[0.18em]` · `text-mute` |
| Stat number | `text-4xl md:text-5xl` · `font-semibold` · `tracking-tight` |

Custom values: `fontSize.2xs = 0.6875rem`, `letterSpacing.tightest = -0.045em`.

Headings use `text-balance`; paragraphs use `text-pretty`. Both are defined as utilities in `globals.css`.

---

## 5. Layout & shape

- Container: `max-w-content` = **1200px**, `px-6 sm:px-8`, centered. Class: `.container-x`.
- Prose measure: `max-w-prose2` = **68ch**.
- Section rhythm: `py-14 sm:py-20 md:py-28`.
- Radii: `rounded-full` for buttons, pills and icon buttons; `rounded-2xl` for cards. Nothing in between.
- Borders: 1px `line`, used as structure rather than decoration.
- Card shadow appears on hover only: `0 20px 50px -24px rgba(17,17,17,0.28)`.
- Minimum interactive target: 44px (`h-11 w-11` on the menu button).

### Signature texture

A 56px technical grid, near-invisible, layered behind heroes and dark CTA bands.

```css
.grid-texture {
  background-image:
    linear-gradient(to right, rgba(17, 17, 17, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17, 17, 17, 0.04) 1px, transparent 1px);
  background-size: 56px 56px;
}
/* .grid-texture-dark: same geometry, rgba(255, 255, 255, 0.05) */
```

Dark CTA sections add a single accent glow: `bg-accent/20 blur-[120px]` on a 384px circle, offset right.

---

## 6. Components

| Class | Definition |
| --- | --- |
| `.btn` | `inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200` |
| `.btn-primary` | `bg-ink px-6 py-3 text-paper hover:bg-ink-700` |
| `.btn-accent` | `bg-accent px-6 py-3 text-white hover:bg-accent-600` |
| `.btn-ghost` | `border border-line px-6 py-3 text-ink hover:border-ink hover:bg-ink hover:text-paper` |
| `.btn-ghost-dark` | `border border-white/20 px-6 py-3 text-paper hover:border-white hover:bg-white hover:text-ink` |
| `.card` | `rounded-2xl border border-line bg-white p-7 transition-all duration-300` |
| `.card-hover:hover` | `border-ink/15 -translate-y-1` + soft shadow |
| `.eyebrow` | small caps label; `.eyebrow-accent::before` prepends a 24 × 1px accent rule |
| `.hairline` | `border-t border-line` |

Larger CTA buttons scale up to `px-7 py-3.5 text-base`.

---

## 7. Motion

- Reveal: `opacity 0 → 1`, `translateY(18px) → 0`, `0.7s cubic-bezier(0.22, 1, 0.36, 1)`, triggered on scroll. Content is visible by default so it never depends on JS.
- Named animations: `fade-up` (0.7s, same easing), `pulse-node` (3s ease-in-out infinite, for network diagram nodes).
- Transitions: 200ms on buttons, 300ms on cards and header state.
- `prefers-reduced-motion: reduce` disables reveals, smooth scroll, and clamps all animation and transition durations to 0.001ms.

No parallax, no constant movement, no loading theatrics.

---

## 8. Voice

Confident, intelligent, concise B2B. Precise, calm, technical, international, transparent, human, sophisticated.

Say what Alkwiti actually does instead of claiming quality:

> We evaluate suppliers across price, quality, capability and reliability before recommending a sourcing path.

Avoid: revolutionary, disruptive, game-changing, world-class, cutting-edge, next-generation, and commitment-to-excellence filler.

Do not position Alkwiti as a company that finds cheap products. The line is:

> We optimize for the right supplier — not simply the cheapest quote.

Never position it as a middleman, trading company, commodity broker, freight forwarder, consumer electronics store, or generic China sourcing agent. Premium experience does not mean premium pricing.

### Approved phrases

- Global procurement, sourced smarter.
- Source globally. Deliver globally.
- Trade Without Borders.
- From requirement to reliable supply.
- Procurement without unnecessary layers.
- The right balance of price, quality and reliability.
- Tell us what you need. We'll find the right sourcing path.

### Core visual and verbal sequence

**REQUIREMENT → SUPPLIER INTELLIGENCE → VERIFIED SUPPLY → PROCUREMENT**

Rendered as numbered pills (`01`–`04`) with accent-colored numerals rather than arrows, so the sequence survives wrapping.

### Evaluation dimensions

Price · Quality · Reliability · Capability. These four recur across the site as the supplier evaluation matrix.

---

## 9. Accessibility baseline

- Focus ring: `ring-2 ring-accent ring-offset-2 ring-offset-paper` on all interactive elements.
- Skip link to `#main`, visible on focus, `bg-ink text-paper`.
- Selection: `bg-accent/20 text-ink`.
- Scrollbar chrome is hidden while scrolling stays fully functional via wheel, touch, keyboard and anchors.
- `overflow-x: clip` on body rather than `hidden`, so `position: sticky` descendants keep working.
- `overflow-wrap: break-word` so part numbers and URLs wrap instead of forcing horizontal scroll.

---

## 10. Portable token block

```json
{
  "brand": { "name": "Alkwiti", "domain": "alkwiti.com", "tagline": "Trade Without Borders", "positioning": "Global procurement, sourced smarter." },
  "color": {
    "ink": "#111111", "ink700": "#2a2a2d",
    "paper": "#fafafa", "paperWarm": "#f6f5f2",
    "accent": "#e67e22", "accent600": "#d06f1a", "accent700": "#b45f14", "accentSoft": "#f4a460",
    "line": "#e6e5e2", "lineDark": "#26262a",
    "mute": "#6b6b70", "muteLight": "#9a9a9f"
  },
  "font": { "family": "Inter", "fallback": "system-ui, sans-serif", "features": "cv02, cv03, cv04, cv11", "weights": [400, 500, 600] },
  "radius": { "card": "1rem", "button": "9999px" },
  "layout": { "maxWidth": "1200px", "gutter": "1.5rem / 2rem", "sectionPadding": "3.5rem / 5rem / 7rem", "gridTexture": "56px" },
  "motion": { "easing": "cubic-bezier(0.22, 1, 0.36, 1)", "reveal": "0.7s", "ui": "0.2s" }
}
```
