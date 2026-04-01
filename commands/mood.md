Run the Picasso /mood command -- generate a design system from a word.

Use the Picasso agent to generate a complete design system from the mood word: $ARGUMENTS

Map the mood to design tokens:
- Color palette (5-7 OKLCH values)
- Font pairing (display + body + mono)
- Border radius scale
- Shadow style
- Motion intensity
- Spacing density

Generate both .picasso.md and DESIGN.md from the mood.

Common moods: cyberpunk, cottage, brutalist, luxury, editorial, playful, corporate, dark-tech, warm-saas, minimal. Also accepts combinations like "brutalist-banking" or "warm-editorial".

If no mood word is provided, ask the user for one.
