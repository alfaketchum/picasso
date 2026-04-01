Run the Picasso /score command -- quantified design quality score.

Use the Picasso agent to score the current project's frontend design on a 0-100 scale.

Categories:
- Typography (0-15): font choice, type scale, max-width, line-height, letter-spacing
- Color (0-15): no pure black/gray, OKLCH usage, tinted neutrals, 60-30-10, semantics
- Spacing (0-10): consistent 4px scale, Gestalt grouping
- Accessibility (0-20): axe-core violations, focus-visible, semantic HTML, alt text, reduced-motion
- Motion (0-10): no transition:all, stagger pattern, reduced-motion, no bounce
- Responsive (0-10): works at 375px, touch targets, no horizontal scroll
- Performance (0-10): Lighthouse perf score mapped 0-100 -> 0-10
- Anti-Slop (0-10): deductions for AI-slop fingerprints (-2 each)

Output format with visual bars and top fixes for maximum point improvement.
