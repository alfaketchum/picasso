# Responsive Design Reference

---

## 1. Breakpoints

Use content-driven breakpoints, not device-driven. Sensible defaults:

| Breakpoint | Width | Target |
|---|---|---|
| (none) | Base | Mobile first, no media query |
| sm | 640px | Large phones / small tablets |
| md | 768px | Tablets |
| lg | 1024px | Laptops / desktops |
| xl | 1280px | Large desktops |
| 2xl | 1536px | Ultrawide |

When a layout breaks before reaching a named breakpoint, add a custom one. The content dictates the breakpoint. Avoid more than 5-6 total.

---

## 2. Mobile-First Approach

Start with single-column, stacked layout. Add complexity at wider breakpoints. Base styles = mobile. `@media (min-width)` = enhancements.

---

## 3. Fluid Design

Use `clamp()` for font sizes, padding, and gaps that scale smoothly. Combine with CSS custom properties so all spacing tokens scale together:

```css
:root {
  --space-s: clamp(0.5rem, 1.5vw, 0.75rem);
  --space-m: clamp(1rem, 3vw, 1.5rem);
  --space-l: clamp(1.5rem, 5vw, 3rem);
}
h1 { font-size: clamp(1.75rem, 4vw + 0.5rem, 3.5rem); }
```

---

## 4. Dynamic Viewport Units

| Unit | Meaning | Use when |
|------|---------|----------|
| `svh` | Small viewport height (browser chrome visible) | Smallest guaranteed visible area |
| `lvh` | Large viewport height (chrome hidden) | Largest possible area |
| `dvh` | Dynamic viewport height (updates live) | Hero/section should always fill visible area |

Always declare a `vh` fallback before the `dvh` value. Use `100dvh` for full-screen heroes and sticky footer layouts.

---

## 5. Container Queries

For component-level responsiveness (when the component's width, not the viewport, determines layout). Essential for reusable components in different layout contexts.

```css
.card-container { container-type: inline-size; container-name: card; }
@container card (min-width: 400px) { .card { grid-template-columns: 200px 1fr; } }
@container card (min-width: 700px) { .card { grid-template-columns: 240px 1fr 180px; } }
```

When the sidebar is open and the main area shrinks, container query grids automatically drop columns without viewport media queries.

---

## 6. Touch Targets

- Minimum: 44x44px (WCAG) or 48x48px (Material)
- If visual element is smaller, extend hit area with padding or `::before { inset: -12px; }`
- Ensure at least 8px space between adjacent touch targets

---

## 7. Responsive Typography

- Mobile: smaller ratio (1.2) with 15-16px base
- Desktop: larger ratio (1.25-1.333) with 16-18px base
- Headings should scale more aggressively than body text

---

## 8. Navigation Patterns

| Viewport | Pattern |
|---|---|
| Mobile (< 768px) | Hamburger, bottom tab bar, or slide-out drawer |
| Tablet (768-1024px) | Collapsed sidebar or icon-only nav |
| Desktop (> 1024px) | Full sidebar, top nav bar, or mega-menu |

---

## 9. Images

Use `srcset` and `sizes` for responsive images. Use `loading="lazy"` for below-the-fold. Set `aspect-ratio` to prevent layout shift. Use `<picture>` with AVIF/WebP sources.

---

## 10. Responsive Tables

| Pattern | When to Use |
|---|---|
| Horizontal scroll wrapper | Data-dense tables where column relationships matter (financial, comparison) |
| Stacked cards on mobile | User-facing lists where each row is an independent record (orders, contacts) |

For scroll wrapper: add `overflow-x: auto` with scroll shadow hints. For stacked cards: use `data-label` attributes on `<td>` elements and `td::before { content: attr(data-label); }` on mobile.

---

## 11. Print Styles

For pages with substantive content (articles, invoices, dashboards):
- Hide nav, sidebar, toolbar, footer with `display: none !important`
- Reset to white background, black text, 12pt
- Use `break-after: avoid` on headings, `break-inside: avoid` on tables/cards
- Show link URLs: `a[href^="http"]::after { content: " (" attr(href) ")"; }`

---

## 12. Progressive Enhancement

Use `@supports` for modern layouts with graceful fallbacks:
- Flexbox fallback, then `@supports (grid-template-rows: subgrid)` for aligned cards
- `@supports (container-type: inline-size)` for container queries
- `@supports (backdrop-filter: blur(10px))` for frosted glass

---

## 13. Landscape and Orientation

- Landscape phones have very little vertical space (under 400px). No full-height heroes or tall modals.
- Use `@media (orientation: landscape) and (max-height: 500px)` for landscape phone overrides
- Virtual keyboards consume even more vertical space in landscape

---

## 14. Common Mistakes

- **Hiding content on mobile**: Use progressive disclosure (expand/collapse) instead of `display: none`
- **Unguarded `vw` text**: Always use `clamp()` with a minimum
- **Horizontal overflow**: Test at 320px. Common culprits: tables, pre/code, fixed-width images, long URLs
- **Fixed elements hogging viewport**: Header + bottom bar + cookie banner can take half the screen
- **Not testing real widths**: 375px (iPhone SE), 390px (modern iPhone), 360px (Android), 320px (stress test)
- **Ignoring safe areas**: Use `env(safe-area-inset-*)` for edge-to-edge layouts
- **Breakpoint-only thinking**: If 3+ media queries for one component, switch to container queries or fluid sizing
- **Hover states on touch**: Use `@media (hover: hover)` to scope hover effects
- **Z-index wars**: Establish a z-index scale in custom properties
- **Viewport-height with virtual keyboards**: Use `100dvh` or `visualViewport` resize events
