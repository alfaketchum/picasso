Run the Picasso /preset command -- apply a curated design preset.

Use the Picasso agent to apply the named preset: $ARGUMENTS

Available presets: linear, stripe, vercel, notion, raycast, editorial, luxury, brutalist, dark-tech, warm-saas, cyberpunk, cottage, minimal, playful.

Steps:
1. Load the preset from style-presets.md reference
2. Generate .picasso.md + DESIGN.md from the preset
3. Update CSS variables / Tailwind config to match
4. Update font imports
5. Show a summary of what was applied

If no preset name is provided, list all available presets and ask the user to pick.
