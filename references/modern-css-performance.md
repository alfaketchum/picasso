# Modern CSS & Web Performance Reference

## 1. Modern CSS Features (2024-2025)

### CSS Nesting (Baseline 2024)
Native nesting eliminates preprocessor dependency. Nest with `>`, `&`, and `@media` directly inside rule blocks.

### Cascade Layers (@layer)
Control specificity ordering: `@layer reset, base, components, utilities;` -- later layers win regardless of selector specificity.

### :has() Selector
Style parents based on children:
```css
form:has(:invalid) { border-color: red; }
.card:has(img) { grid-template-rows: auto 1fr; }
body:has(dialog[open]) { overflow: hidden; }
```

### CSS Anchor Positioning
Position elements relative to other elements without JS. Use `anchor-name` on trigger, `position-anchor` + `anchor()` on positioned element.

### @scope
Restrict styles to a DOM subtree with optional lower boundary:
```css
@scope (.card) to (.card-content) {
  h2 { font-size: 1.25rem; }
}
```

### @property (Typed Custom Properties)
Register custom properties with type, initial value, and inheritance. Enables animating custom properties (e.g., gradient angles).

### color-mix()
Blend colors in any color space at runtime. Always specify `in oklch` for perceptual uniformity.

### Logical Properties
Direction-agnostic layouts (LTR/RTL safe): `margin-inline-start`, `padding-block`, `inline-size`, `border-inline-start`.

### Subgrid
Child grids align to parent grid tracks: `grid-template-rows: subgrid` on a child spanning multiple rows.

### Popover API
Native popovers with light-dismiss, no JS: `<button popovertarget="id">` + `<div popover id="id">`.

---

## 2. Core Web Vitals

**Thresholds:** LCP < 2.5s | CLS < 0.1 | INP < 200ms

### LCP (Largest Contentful Paint)
- Preload hero images with `fetchpriority="high"`
- Inline critical CSS, eliminate render-blocking resources
- Use CDN + Brotli compression

### CLS (Cumulative Layout Shift)
- Always set `width`/`height` or `aspect-ratio` on images/video
- Reserve space for ads/embeds with `min-height`
- Use `font-display: optional` (best CLS) or `swap` (best UX)
- Never insert content above the fold after load

### INP (Interaction to Next Paint)
- Provide instant visual feedback, defer heavy work with `scheduler.yield()` or `setTimeout(0)`
- Use `content-visibility: auto` for off-screen DOM
- Avoid layout thrashing: batch reads, then batch writes

---

## 3. Image Optimization

| Format | Best For | vs JPEG |
|--------|----------|---------|
| **AVIF** | Photos, complex images | ~50% smaller |
| **WebP** | Photos, transparency | ~30% smaller |
| **SVG** | Icons, logos, illustrations | Infinitely scalable |
| **PNG** | Screenshots, pixel-precise | Lossless only |

**Rules:** Use `<picture>` with AVIF/WebP sources + JPEG fallback. Never lazy-load above-the-fold (hurts LCP). Use `fetchpriority="high"` on LCP image. Always include `width`/`height`. Use blur-up placeholder for perceived performance.

---

## 4. Font Performance

- Preload primary font: `<link rel="preload" as="font" type="font/woff2" crossorigin>`
- Use `font-display: swap` (body text) or `optional` (best CLS)
- Variable fonts: one file replaces multiple weights (~90KB vs 360KB+)
- Subset with `pyftsubset` or `glyphhanger` (200KB+ down to 15-30KB)
- Use `unicode-range` to load only needed glyphs

---

## 5. Critical CSS & Resource Hints

- Inline above-the-fold CSS (~14KB max) in `<head>`
- Preload remaining stylesheet with `onload="this.rel='stylesheet'"`
- Resource hints: `preconnect` (fonts, APIs), `dns-prefetch` (analytics), `prefetch` (next page), `modulepreload` (app JS)
- Auto-extract with `critical` (npm) or `critters` (webpack/vite)

---

## 6. Tailwind CSS v4

Released January 2025. Rust-based Oxide engine: full builds 3.8x faster, incremental 182x faster.

### Key Changes
- CSS-first config: `@import "tailwindcss"` + `@theme {}` (no `tailwind.config.js`)
- Automatic content detection (respects `.gitignore`)
- Built on `@layer`, `@property`, `color-mix()`
- Container queries: `@sm:`, `@md:` variants
- 3D transforms: `rotate-x-45 transform-3d perspective-distant`
- `@starting-style` for enter/exit transitions
- `not-*` variant: `not-hover:opacity-75`, `not-last:border-b`

---

## 7. Advanced Animation APIs

### View Transitions API
Name elements with `view-transition-name`, style with `::view-transition-old/new`. Trigger with `document.startViewTransition(() => updateDOM())`. CSS-only for MPA: `@view-transition { navigation: auto; }`.

### Scroll-Driven Animations (No JS, Off Main Thread)
Bind animations to scroll or view progress:
```css
.progress-bar { animation: grow linear; animation-timeline: scroll(); }
.reveal { animation: fade-up linear both; animation-timeline: view(); animation-range: entry 0% entry 100%; }
```

### Web Animations API (WAAPI)
`element.animate([keyframes], options)` for programmatic control with `duration`, `easing`, `fill`.

### GSAP ScrollTrigger
For complex scroll-linked animations with `scrub`, `pin`, and timeline control.

---

## Browser Support (Baseline 2025)

| Feature | Chrome | Firefox | Safari |
|---------|--------|---------|--------|
| CSS Nesting | 120+ | 117+ | 17.2+ |
| :has() | 105+ | 121+ | 15.4+ |
| @layer | 99+ | 97+ | 15.4+ |
| Subgrid | 117+ | 71+ | 16+ |
| Anchor Positioning | 125+ | Nightly | No |
| View Transitions (SPA) | 111+ | 144+ | 18+ |
| Scroll-driven Animations | 115+ | Nightly | No |
| Popover API | 114+ | 125+ | 17+ |
| @property | 85+ | 128+ | 15.4+ |
| color-mix() | 111+ | 113+ | 16.2+ |
