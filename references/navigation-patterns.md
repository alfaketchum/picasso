# Navigation Patterns Reference

---

## 1. Breadcrumb Systems

Use `<nav aria-label="Breadcrumb">` with `<ol>`. Mark current page with `aria-current="page"` (not a link). Separators get `aria-hidden="true"`. Show 3-5 levels max; truncate middle on mobile.

---

## 2. Sidebar and Drawer Navigation

Desktop: fixed sidebar, 240-280px width. Mobile: off-canvas drawer with overlay.

Active state: background tint + accent color text (not bold weight, which shifts text width).

```css
.nav-item { padding: 7px 12px; border-radius: 6px; transition: background 100ms; }
.nav-item:hover { background: oklch(1 0 0 / 0.04); }
.nav-item.active { background: oklch(0.65 0.15 230 / 0.1); color: var(--accent); }
```

Section labels: 10px, uppercase, `tracking-[0.12em]`, muted color. Group related items.

---

## 3. Tab Navigation vs Button Groups

| Pattern | Purpose | ARIA | Selection |
|---------|---------|------|-----------|
| Tabs | Switch views of SAME content | `role="tablist"` / `role="tab"` / `aria-selected` | One always active |
| Button groups | Trigger independent actions | `role="group"` / `aria-pressed` | Multiple or none active |

Decision: clicking switches what you see = tabs. Clicking does something = button group.

---

## 4. Mobile Bottom Bar vs Hamburger

| Criteria | Bottom Bar | Hamburger |
|----------|------------|-----------|
| Destinations | 3-5 primary | 6+ items |
| App type | Mobile-first app | Marketing/content site |
| Frequency | Frequent switching | Infrequent navigation |

Bottom bar: `position: fixed; bottom: 0; height: 56px; padding-bottom: env(safe-area-inset-bottom);`

---

## 5. Sticky Headers

Keep slim: 48-56px height. Hide on scroll-down, reveal on scroll-up (track `scrollY` delta). Use `backdrop-filter: blur(12px)` with semi-transparent background. Add `{ passive: true }` to scroll listener.

---

## 6. Mega Menus

For sites with 20+ navigation items. Full-width panel with 4-column grid is preferred. Keep hover delay at 200-300ms to prevent accidental opens.

**Alternatives**: Command+K palette, two-level sidebar, card-based navigation page.

---

## 7. Skip Links

First focusable element on the page. Visually hidden until focused:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content" tabindex="-1">
```

```css
.skip-link { position: absolute; top: -100%; z-index: 100; }
.skip-link:focus { top: 0; }
```

---

## 8. Common Mistakes

- Hamburger as the only mobile navigation (bottom bar is better for primary destinations)
- Active state using `font-weight: bold` (shifts text width; use background/color)
- Sidebar over 300px wide (240-280px is ideal)
- Sticky header over 64px (48-56px max)
- No `aria-current="page"` on breadcrumbs
- Tabs without `role="tablist"`/`role="tab"`
- Mega menu without hover delay
- No skip link
- Bottom bar without `safe-area-inset-bottom`
