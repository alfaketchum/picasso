# Color and Contrast Reference

---

## 1. Color Space

Use OKLCH for perceptually uniform color. Unlike HSL, OKLCH ensures colors at the same lightness value actually appear equally bright.

```css
/* OKLCH: lightness (0-1), chroma (0-0.4), hue (0-360) */
--accent: oklch(0.65 0.25 25);        /* vibrant red-orange */
--accent-hover: oklch(0.60 0.28 25);  /* darker, more saturated */
--accent-muted: oklch(0.75 0.08 25);  /* same hue, much less chroma */
```

Adjust lightness for tints/shades, chroma for saturation, hue for variation.

---

## 2. Palette Construction

### The 60-30-10 Rule
- 60% dominant (surface/background)
- 30% secondary (cards, sections, supporting elements)
- 10% accent (CTAs, active states, highlights)

### Building a Palette
1. Start with the accent color (brand or action color)
2. Derive surface color: very low chroma version of the accent hue
3. Build neutral scale: tinted toward the accent hue (never pure gray)
4. Add semantic layer: success (green), warning (amber), error (red), info (blue)
5. Generate dark mode by inverting the lightness scale, not the colors

### Token Structure
```css
:root {
  /* Surfaces */
  --surface-0: oklch(0.99 0.005 80);   /* page bg */
  --surface-1: oklch(0.97 0.008 80);   /* card bg */
  --surface-2: oklch(0.94 0.01 80);    /* elevated/hover */
  --surface-3: oklch(0.90 0.012 80);   /* active/selected */
  /* Text */
  --text-primary: oklch(0.15 0.02 80);
  --text-secondary: oklch(0.40 0.02 80);
  --text-tertiary: oklch(0.55 0.015 80);
  /* Accent */
  --accent: oklch(0.55 0.25 30);
  --accent-hover: oklch(0.50 0.28 30);
  --accent-subtle: oklch(0.92 0.04 30);
  /* Borders */
  --border: oklch(0.88 0.01 80);
  --border-strong: oklch(0.78 0.015 80);
  /* Semantic */
  --success: oklch(0.55 0.18 145);
  --warning: oklch(0.65 0.18 70);
  --error: oklch(0.55 0.22 25);
}
```

---

## 3. Tinted Neutrals

Never use pure gray. Always tint neutrals toward the dominant hue.

- **Warm neutrals** (amber/brown): editorial, luxury, organic brands
- **Cool neutrals** (blue/slate): tech, data, professional tools
- **Neutral neutrals** (accent hue, very low chroma): most versatile

```css
--text-primary: oklch(0.25 0.015 260);  /* cool-tinted dark, not #333 */
--surface-bg: oklch(0.97 0.005 260);    /* cool-tinted light, not #f5f5f5 */
```

---

## 4. Dark Mode

Dark mode is not "invert everything." Rules:

1. Surface colors get darker but retain hue tint
2. Text: never pure white (use oklch lightness 0.93-0.97)
3. Accent colors need a lightness bump (+0.05 to +0.10) to maintain contrast
4. Replace shadows with subtle inner glows or border effects
5. Elevation goes lighter (higher surfaces = lighter), opposite of light mode
6. Images may need `filter: brightness(0.9)`

---

## 5. Accessibility

### Contrast Requirements (WCAG 2.2)
- Normal text (<24px or <18.66px bold): **4.5:1** minimum
- Large text (>=24px or >=18.66px bold): **3:1** minimum
- UI components and graphical objects: **3:1** minimum
- Focus indicators: **3:1** against adjacent colors

### Quick Heuristic
OKLCH lightness difference of 0.40+ between text and background usually passes AA. For precise checking, use APCA when possible.

### Color Blindness
Never use color as the only information channel. Pair with icons, patterns, or text labels. Test with deuteranopia/protanopia simulator.

---

## 6. CSS Variables Pattern

Define all colors as CSS custom properties. Group by function, not color name.

```css
/* Good: semantic naming */
--color-surface: ...; --color-text: ...; --color-accent: ...;
/* Bad: literal naming */
--blue: ...; --dark-gray: ...; --light-blue: ...;
```

For component overrides, use local custom properties that reference global tokens.

---

## 7. Curated Color Palettes

Ten tested OKLCH palettes. Each includes surface, text, accent, border, and semantic tokens. Copy the one that fits your domain, adjust chroma and hue to taste.

| # | Name | Vibe | Good For |
|---|------|------|----------|
| 1 | Warm Terracotta | Earthy, grounded | Lifestyle, wellness, real estate |
| 2 | Forest Green | Natural, trustworthy | Fintech, health, environmental |
| 3 | Amber Gold | Premium, confident | Finance, luxury SaaS, productivity |
| 4 | Coral Salmon | Warm, energetic | Social apps, creative tools, food |
| 5 | Deep Teal | Calm, authoritative | Health tech, enterprise, legal |
| 6 | Slate Blue | Professional, systematic | Project management, B2B SaaS |
| 7 | Burgundy | Sophisticated, editorial | Wine/food, publishing, fashion |
| 8 | Sage | Soft, restorative | Wellness, meditation, journaling |
| 9 | Charcoal + Orange | Bold, industrial | Dev tools, gaming, analytics |
| 10 | Monochrome B&W | Stark, typographic | Portfolios, photography, editorial |

### Example: Warm Terracotta
```css
:root {
  --surface-0: oklch(0.98 0.008 55);  --surface-1: oklch(0.95 0.012 55);
  --text-primary: oklch(0.18 0.025 55); --text-secondary: oklch(0.42 0.02 55);
  --accent: oklch(0.58 0.16 45);  --accent-hover: oklch(0.52 0.18 45);
  --accent-subtle: oklch(0.93 0.04 45); --border: oklch(0.87 0.015 55);
  --success: oklch(0.55 0.16 155); --warning: oklch(0.68 0.16 75); --error: oklch(0.55 0.20 25);
}
```

All 10 palettes follow this same token structure. To use a different palette, change the hue and chroma values while keeping the lightness relationships consistent. For monochrome, accent is near-black; CTAs use fill weight (solid black button, white text).

---

## 8. Wide Gamut Colors (P3)

Display P3 covers ~25% more visible colors than sRGB. Supported on modern Apple devices and most OLED screens.

### Progressive Enhancement
OKLCH values automatically map to the widest gamut available. Pushing chroma beyond ~0.15-0.20 often enters P3 territory. Override for wide gamut:

```css
@media (color-gamut: p3) {
  :root { --accent: oklch(0.65 0.27 35); /* higher chroma for P3 */ }
}
```

### When to Use P3
- Hero gradients, accent splashes where vibrancy matters
- Success/error states that need to pop
- Brand colors designed in P3

### When NOT to Use P3
- Body text, borders, surfaces (negligible perceptual difference)

---

## 9. `light-dark()` CSS Function

Returns one of two values depending on `color-scheme`. Eliminates duplicate variable declarations for simple color flips.

```css
:root { color-scheme: light dark; }
.surface { background: light-dark(oklch(0.97 0.005 260), oklch(0.17 0.012 260)); }
```

Use for simple flips (surfaces, text, borders). For complex theme differences, use `[data-theme="dark"]` selectors. Baseline since March 2024.

---

## 10. `color-mix()` for Runtime Blending

Blend colors at runtime without intermediate tokens. Always use `in oklch` for perceptually uniform results.

```css
.btn:hover { background: color-mix(in oklch, var(--accent), black 15%); }
.surface-tinted { background: color-mix(in oklch, var(--accent), white 92%); }
.btn:disabled { background: color-mix(in oklch, var(--accent), var(--surface-0) 60%); }
```

---

## 11. Common Mistakes

- Using pure black (#000) for text (use tinted near-black)
- Gray text on colored backgrounds (low contrast)
- Applying opacity for lighter colors (use chroma reduction instead)
- Too many accent colors (one primary, one secondary max)
- Forgetting to test dark mode after building light mode
- Full saturation on large surfaces (eye strain; reserve full chroma for small accents)
- No hover/focus states with visible color change
- Using `color-mix(in srgb)` instead of `color-mix(in oklch)` (muddier results)
