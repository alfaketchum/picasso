# Picasso

The ultimate AI design skill for producing distinctive, production-grade frontend interfaces.

Picasso consolidates best practices from 18+ sources into a single comprehensive skill that covers every dimension of frontend design: typography, color systems, spatial composition, motion, interaction patterns, responsive design, sound, haptics, icons, generative art, theming, React architecture, component taxonomy, configurable design intensity, and an exhaustive anti-patterns library.

## Install

### Option 1: npx (Recommended)

Works with Claude Code, Cursor, Codex, and any agent that reads skill files:

```bash
# Install to current project (Claude Code)
npx picasso-skill

# Install globally (all Claude Code projects)
npx picasso-skill --global

# Install for Cursor
npx picasso-skill --cursor

# Install for Codex
npx picasso-skill --codex

# Install to .agents/skills/
npx picasso-skill --agents

# Custom path
npx picasso-skill --path ./my-skills
```

### Option 2: One-Liner (no npm needed)

```bash
# Project-specific
git clone https://github.com/viperrcrypto/picasso.git /tmp/picasso && mkdir -p .claude/skills && cp -r /tmp/picasso/skills/picasso .claude/skills/picasso && rm -rf /tmp/picasso

# Global (all projects)
git clone https://github.com/viperrcrypto/picasso.git /tmp/picasso && cp -r /tmp/picasso/skills/picasso ~/.claude/skills/picasso && rm -rf /tmp/picasso
```

### Option 3: Manual

```bash
git clone https://github.com/viperrcrypto/picasso.git
cp -r picasso/skills/picasso ~/.claude/skills/picasso
```

### Option 4: Claude.ai (Consumer)

Upload `skills/picasso/SKILL.md` as a Custom Skill in Claude.ai settings. Upload the reference files alongside it for full coverage.

## What's Inside

```
skills/picasso/
  SKILL.md                          # Main skill file
  references/
    typography.md                   # Type systems, font pairing, scales, OpenType
    color-and-contrast.md           # OKLCH, tinted neutrals, dark mode, a11y
    spatial-design.md               # Spacing scales, grids, visual hierarchy
    motion-and-animation.md         # Easing, staggering, text morphing, reduced motion
    interaction-design.md           # Forms, focus, loading, empty states, errors
    responsive-design.md            # Mobile-first, fluid, container queries
    sensory-design.md               # UI sounds, haptic feedback
    react-patterns.md               # Server/client components, state, performance
    anti-patterns.md                # What NOT to do (the most important file)
    design-system.md                # DESIGN.md generation, theming, tokens
    generative-art.md               # Algorithmic art, p5.js, SVG, canvas, seeded randomness
    component-patterns.md           # Standard naming, taxonomy, state matrix
    accessibility.md                # ARIA, keyboard nav, screen readers, WCAG 2.2
```

## Configurable Settings

Three dials (1-10) control the design output:

| Setting | Low (1-3) | Mid (4-6) | High (7-10) |
|---|---|---|---|
| **DESIGN_VARIANCE** | Clean, centered, conventional | Considered asymmetry | Avant-garde, overlapping, unconventional |
| **MOTION_INTENSITY** | Hover states and fades only | Staggered reveals, scroll-triggered | Magnetic cursors, parallax, complex choreography |
| **VISUAL_DENSITY** | Spacious, luxury | Balanced whitespace | Dense dashboards, data-heavy |

## 21 Commands

| Command | Effect |
|---|---|
| `/audit` | Technical quality check: a11y, performance, responsive |
| `/critique` | UX design review: hierarchy, clarity, resonance |
| `/polish` | Final pass: spacing, transitions, copy refinement |
| `/simplify` | Strip to essence |
| `/animate` | Add purposeful motion |
| `/bolder` | Amplify timid designs |
| `/quieter` | Tone down aggressive designs |
| `/normalize` | Align with design system standards |
| `/theme` | Generate or apply a theme |
| `/sound` | Add UI sound effects |
| `/haptics` | Add haptic feedback |
| `/redesign` | Audit existing project, fix systematically |
| `/soft` | Premium soft aesthetic preset |
| `/minimalist` | Editorial minimalism preset |
| `/brutalist` | Raw mechanical aesthetic preset |
| `/stitch` | Generate Google Stitch DESIGN.md |
| `/clarify` | Improve unclear UX copy |
| `/harden` | Error handling, i18n, edge cases |
| `/colorize` | Introduce strategic color |
| `/delight` | Add moments of joy |
| `/extract` | Pull into reusable components |

## Sources

Built on 18+ sources including [Anthropic's official skills](https://github.com/anthropics/skills), [Impeccable](https://github.com/pbakaus/impeccable), [Taste Skill](https://github.com/Leonxlnx/taste-skill), [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md), [Component Gallery](https://component.gallery/), [Torph](https://torph.lochie.me/), [Soundcn](https://github.com/kapishdima/soundcn), [Vercel agent-skills](https://github.com/vercel-labs/agent-skills), and more. See the full attribution list in the skill file.

## The Non-Negotiables

1. No design should look like AI made it.
2. Every design must have a clear aesthetic point of view.
3. Match implementation complexity to vision.
4. Text is always a design element.
5. Every detail matters.

## License

MIT
