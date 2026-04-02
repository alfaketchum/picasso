# Pre-Ship Design Checklist

Run through before shipping any frontend work. Each item is a concrete pass/fail check, not a guideline.

---

## Typography
- [ ] Primary font is NOT Inter, Roboto, Arial, Helvetica, or system-ui
- [ ] Heading hierarchy is correct (h1 > h2 > h3, no skipping)
- [ ] Body text line-height is 1.5-1.6
- [ ] Large headings have negative letter-spacing (-0.01 to -0.02em)
- [ ] Prose max-width is ~65ch or 640px
- [ ] `tabular-nums` on any data/numbers displayed
- [ ] Font loading is optimized (preload, font-display)

## Color & Contrast
- [ ] No pure black (#000) or pure gray -- neutrals are tinted
- [ ] Body text passes 4.5:1 contrast ratio
- [ ] Large text passes 3:1 contrast ratio
- [ ] UI components pass 3:1 contrast ratio
- [ ] Colors defined in OKLCH (not hex or HSL)
- [ ] Dark mode tested (if applicable)
- [ ] Accent color is not a Tailwind default

## Spatial Design
- [ ] Spacing follows 4px scale consistently
- [ ] Intra-group spacing < inter-group spacing (2:1 ratio)
- [ ] No uniform padding/margin everywhere
- [ ] Layout is NOT just centered columns
- [ ] Cards are not nested within cards

## Depth & Elevation
- [ ] Important elements are visually elevated
- [ ] Shadow hierarchy exists (not same shadow everywhere)
- [ ] Hover states show elevation change where appropriate
- [ ] Dark mode shadows are adjusted (more opacity or border-based)

## Motion & Animation
- [ ] `prefers-reduced-motion` is respected
- [ ] No `transition: all` (specific properties only)
- [ ] Easing is NOT linear or default `ease`
- [ ] Page load has some choreography (staggered reveals)
- [ ] Animations use `transform` and `opacity` only (GPU-composited)

## Interaction
- [ ] All interactive elements have hover, focus, active, disabled states
- [ ] Focus indicators are visible (`:focus-visible`, 2px outline)
- [ ] Touch targets are 44x44px minimum
- [ ] Forms have proper labels (not just placeholders)
- [ ] Error messages are inline and descriptive
- [ ] Destructive actions have confirmation or undo
- [ ] Loading states use skeletons (not just spinners)

## Accessibility
- [ ] Semantic HTML used (`<button>`, `<a>`, `<nav>`, `<main>`, etc.)
- [ ] All images have meaningful alt text (or `alt=""` for decorative)
- [ ] Keyboard navigation works throughout (Tab, Enter, Escape)
- [ ] Skip link exists for main content
- [ ] Page works at 200% zoom
- [ ] Color is not the only means of conveying information

## Responsive
- [ ] Mobile-first CSS (`min-width` queries)
- [ ] Tested on real mobile viewport (not just DevTools)
- [ ] `dvh` used with `vh` fallback for full-height sections
- [ ] Hover effects scoped with `@media (hover: hover)`
- [ ] Safe areas handled for notched devices
- [ ] Tables are scrollable or stacked on mobile

## Performance
- [ ] Hero image has `fetchpriority="high"`
- [ ] Below-fold images have `loading="lazy"`
- [ ] No barrel file imports (direct imports only)
- [ ] Critical CSS is inlined or prioritized
- [ ] Fonts are subsetted and self-hosted where possible
- [ ] SVGs are optimized (svgo)

## Anti-Slop Final Check
- [ ] The 3-Second Test: Would someone identify this as "AI-generated"?
- [ ] The Squint Test: Can you see hierarchy and groupings when blurred?
- [ ] No 3+ AI fingerprints present simultaneously
- [ ] At least ONE memorable design choice exists
- [ ] Design varies between projects (not converging on same look)
