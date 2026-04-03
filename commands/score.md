Run the Picasso /score command -- quantified design quality score.

Use the Picasso agent to score the current project's frontend design on a 0-100 scale.

MANDATORY FIRST STEP -- Gather visual evidence before scoring:

1. Take screenshots: `npx playwright screenshot http://localhost:PORT /tmp/picasso-score-desktop.png --viewport-size=1440,900` (and mobile at 375,812)
2. Use the Read tool to VIEW the screenshot files before scoring visual categories
3. If screenshots fail, tell the user and score only code-auditable categories (mark visual categories as "N/A - no screenshot")

If a Figma URL is provided, run /figma first to extract design tokens, then proceed with those as ground truth.

ANTI-HALLUCINATION RULES:
- Visual categories (Typography appearance, Color in practice, Spacing rhythm, Anti-Slop visual check) MUST be scored from screenshots, not code alone
- Code-auditable categories (a11y violations via axe, transition:all grep, prefers-reduced-motion grep) can be scored from code
- Never claim "this looks like X" without viewing a screenshot

Categories:
- Typography (0-15): font choice, type scale, max-width, line-height, letter-spacing
- Color (0-15): no pure black/gray, OKLCH usage, tinted neutrals, 60-30-10, semantics
- Spacing (0-10): consistent 4px scale, Gestalt grouping
- Accessibility (0-20): axe-core violations, focus-visible, semantic HTML, alt text, reduced-motion
- Motion (0-10): no transition:all, stagger pattern, reduced-motion, no bounce
- Responsive (0-10): works at 375px, touch targets, no horizontal scroll
- Performance (0-10): Lighthouse perf score mapped 0-100 -> 0-10
- Anti-Slop (0-10): deductions for each AI-slop fingerprint detected (-2 each)

Output format with visual bars and top fixes for maximum point improvement.
