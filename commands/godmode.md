Run the Picasso /godmode command -- the ultimate design transformation pipeline.

Use the Picasso agent (subagent_type: "picasso") to execute the full godmode pipeline:

Phase 1: UNDERSTAND
- Check for .picasso.md config. If not found, run the design interview (ask what we're building, who it's for, aesthetic direction, priorities 1-5 for animations/mobile/a11y/dark mode/performance, constraints).
- Gather context: read all frontend files, find design system, detect component library.

Phase 2: ASSESS
- Run /score to establish the BEFORE score (0-100 with category breakdown).
- Run /roast for the brutally honest assessment.
- Run /audit for full technical audit with severity-ranked findings.
- Run /a11y (axe-core + pa11y + Lighthouse accessibility).
- Run /perf (Lighthouse Core Web Vitals).
- Run /lint-design (find hardcoded colors, spacing violations, font inconsistencies).
- Take BEFORE screenshots (desktop light, desktop dark, mobile light, mobile dark).

Phase 3: PLAN
- Compile all findings into a prioritized fix list (Critical -> High -> Medium -> Low).
- Present the plan: "Found X issues. Fixing all = score ~Y. Proceed?"
- WAIT for user confirmation before proceeding.

Phase 4: FIX
- Execute fixes in priority order: typography, color, spacing, layout, motion, accessibility, interaction, performance, copy.
- Re-verify after each category.

Phase 5: VERIFY
- Run /score again for the AFTER score.
- Take AFTER screenshots.
- Generate before/after comparison.

Phase 6: REPORT
- Show final score comparison with per-category breakdown.
- Show files modified and issues fixed.

If the before score is already 85+, say so and suggest the 3-4 things that would take it to 95+.
