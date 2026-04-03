# Code Typography Reference

---

## 1. Monospace Font Selection

| Font | Ligatures | Style | Best For |
|---|---|---|---|
| JetBrains Mono | Yes | Clean, geometric | General purpose, IDEs |
| Fira Code | Yes | Slightly rounded | Tutorials, docs |
| Source Code Pro | No | Adobe, professional | Enterprise |
| IBM Plex Mono | No | Corporate, legible | Documentation |
| Geist Mono | No | Vercel, modern | Next.js projects |
| Cascadia Code | Yes | Microsoft, playful | Terminals |

Always specify a modern monospace font first, then fallback to `monospace`. Enable ligatures with `font-feature-settings: 'liga' 1, 'calt' 1` for display; disable for editing if users copy code.

---

## 2. Code Block Design

- Background: `var(--surface-1)` with 1px border, 8px radius
- Font size: 0.875rem (14px), line-height: 1.65 (looser than body for readability)
- `overflow-x: auto; tab-size: 2`
- Dark code blocks on light sites: `oklch(0.14 0.02 230)` background
- Line numbers: use CSS counters with `user-select: none` so they don't get copied

---

## 3. Syntax Highlighting Accessibility

Every token color must have **minimum 3:1 contrast** against the code block background. Don't rely on color alone; use font-weight or font-style for emphasis.

| Token Type | Suggested OKLCH (dark bg) | Style |
|---|---|---|
| Keywords | `oklch(0.75 0.15 300)` | bold |
| Strings | `oklch(0.72 0.14 150)` | normal |
| Numbers | `oklch(0.75 0.12 60)` | normal |
| Comments | `oklch(0.50 0.01 230)` | italic |
| Functions | `oklch(0.78 0.10 230)` | normal |
| Variables | `oklch(0.85 0.01 230)` | normal |

---

## 4. Copy-to-Clipboard

Position top-right, show on hover, visual feedback ("Copied" for 2s). Use `navigator.clipboard.writeText()`. Add `aria-label="Copy code"`.

---

## 5. Responsive Code Blocks

- Code: `white-space: pre; overflow-x: auto` (never wrap)
- Terminal output: `white-space: pre-wrap` (wrapping OK)
- Thin scrollbar: 4px height, subtle thumb color
- Below 375px, consider reducing to 12px font size

---

## 6. Inline Code Styling

Subtle distinction from body text: light background, 0.15em/0.4em padding, 4px radius, 0.9em font-size, 1px border. Never use inline code for emphasis; it's for code references (`useState`, `GET /api/users`).

---

## 7. Diff Views

Use color + icon (not color alone, for colorblind users):
- Added: green-tinted background + left border + `+` prefix
- Removed: red-tinted background + left border + `-` prefix + `line-through` + reduced opacity

---

## 8. Terminal Output

Terminal styling should feel distinct from code blocks:
- Darker background: `oklch(0.08 0.01 230)`
- Slight green tint for text: `oklch(0.80 0.01 150)`
- Blue prompt, neutral output, red errors

---

## 9. Common Mistakes

- Code font too large (14px for blocks, 0.9em for inline)
- No horizontal scroll on code blocks
- Syntax colors with < 3:1 contrast (especially comments)
- Color-only diff indication (add +/- markers)
- Copying includes line numbers (use `user-select: none`)
- Same styling for code blocks and terminal (different purposes)
- `font-family: monospace` without named fonts (defaults to Courier New)
- No copy button
