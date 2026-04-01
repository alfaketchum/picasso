# Picasso

The ultimate AI design skill + agent for producing distinctive, production-grade frontend interfaces.

Picasso is two things:
1. **A skill** (knowledge base) -- 13 reference files covering every dimension of frontend design
2. **An agent** (autonomous design engineer) -- proactively audits your frontend code, catches AI-slop aesthetics, validates accessibility, enforces design systems, and auto-fixes issues

## Install

### Option 1: npx (Recommended)

```bash
# Install skill + agent to current project
npx picasso-skill

# Install globally (all Claude Code projects)
npx picasso-skill --global

# Skill only (no agent)
npx picasso-skill --skill-only

# Install for Cursor
npx picasso-skill --cursor

# Install for Codex
npx picasso-skill --codex

# Custom path
npx picasso-skill --path ./my-skills
```

### Option 2: One-Liner (no npm needed)

```bash
# Project-specific (skill + agent)
git clone https://github.com/viperrcrypto/picasso.git /tmp/picasso && mkdir -p .claude/skills .claude/agents && cp -r /tmp/picasso/skills/picasso .claude/skills/picasso && cp /tmp/picasso/agents/picasso.md .claude/agents/picasso.md && rm -rf /tmp/picasso

# Global
git clone https://github.com/viperrcrypto/picasso.git /tmp/picasso && mkdir -p ~/.claude/skills ~/.claude/agents && cp -r /tmp/picasso/skills/picasso ~/.claude/skills/picasso && cp /tmp/picasso/agents/picasso.md ~/.claude/agents/picasso.md && rm -rf /tmp/picasso
```

### Option 3: Manual

```bash
git clone https://github.com/viperrcrypto/picasso.git
cp -r picasso/skills/picasso ~/.claude/skills/picasso
cp picasso/agents/picasso.md ~/.claude/agents/picasso.md
```

### Option 4: Claude.ai (Consumer)

Upload `skills/picasso/SKILL.md` as a Custom Skill in Claude.ai settings. Upload the reference files alongside it for full coverage.

## Skill + Agent: What's the Difference?

| | Skill | Agent |
|---|---|---|
| **What it is** | Static knowledge base (13 reference files) | Autonomous design engineer |
| **How it works** | Loaded into context when designing | Runs as a sub-process with its own tools |
| **When it runs** | When you ask for design help | Proactively after any frontend code change |
| **Can audit code** | Only when you ask | Automatically |
| **Can run axe-core** | No | Yes |
| **Can screenshot pages** | No | Yes (via Playwright) |
| **Can auto-fix issues** | No | Yes |
| **Can enforce design system** | No | Yes (greps for token violations) |

## What's Inside

```
skills/picasso/
  SKILL.md                          # Main skill file (knowledge base)
  references/
    typography.md                   # Type systems, font pairing, scales, OpenType
    color-and-contrast.md           # OKLCH, tinted neutrals, dark mode, a11y
    spatial-design.md               # Spacing scales, grids, visual hierarchy
    motion-and-animation.md         # Easing, staggering, text morphing, reduced motion
    interaction-design.md           # Forms, focus, loading, empty states, errors
    responsive-design.md            # Mobile-first, fluid, container queries, dvh/svh
    sensory-design.md               # UI sounds, haptic feedback, multi-sensory
    react-patterns.md               # React 19, Tailwind v4, Server Actions, dark mode
    anti-patterns.md                # What NOT to do (the most important file)
    design-system.md                # DESIGN.md generation, theming, tokens (OKLCH)
    generative-art.md               # p5.js, SVG, Canvas 2D, noise, seeded randomness
    component-patterns.md           # Standard naming, taxonomy, state matrix
    accessibility.md                # ARIA, keyboard nav, screen readers, WCAG 2.2

agents/
  picasso.md                        # Autonomous design auditor agent
```

## Agent Commands

The Picasso agent responds to these commands:

| Command | What the agent does |
|---|---|
| `/audit` | Full 5-phase design audit with severity scoring (report only) |
| `/critique` | UX-focused review: hierarchy, clarity, emotional resonance |
| `/polish` | Auto-fix all issues found in audit (smallest safe changes) |
| `/redesign` | Aggressive audit + fix + re-audit cycle |
| `/simplify` | Strip unnecessary complexity |
| `/animate` | Add purposeful motion (staggered reveals, hover states) |
| `/bolder` | Amplify timid designs (contrast, type size, hierarchy) |
| `/quieter` | Tone down aggressive designs (saturation, shadows, whitespace) |
| `/normalize` | Replace hardcoded values with design system tokens |
| `/theme` | Generate or apply a theme |
| `/stitch` | Generate a complete DESIGN.md from the current codebase |
| `/harden` | Add error handling, loading states, empty states |
| `/a11y` | Accessibility-only audit (axe-core, ARIA, contrast, keyboard) |

## Agent Audit Checklist

The agent checks for:

- **AI-Slop Detection** -- Inter/Roboto fonts, purple gradients, centered everything, uniform card grids, pure black/gray
- **Typography** -- Font choice, type scale, max-width, line height, weight
- **Color** -- OKLCH usage, tinted neutrals, 60-30-10 rule, semantic colors
- **Spacing** -- Consistent scale, Gestalt grouping, breathing room
- **Accessibility** -- axe-core checks, focus indicators, ARIA, contrast ratios, semantic HTML
- **Motion** -- No transition:all, no bounce easing, reduced-motion support
- **Responsive** -- Mobile-first, 375px readability, touch targets, lazy loading
- **Interaction** -- Labels, descriptive buttons, loading states, error handling

## Configurable Settings

Three dials (1-10) control the design output:

| Setting | Low (1-3) | Mid (4-6) | High (7-10) |
|---|---|---|---|
| **DESIGN_VARIANCE** | Clean, centered, conventional | Considered asymmetry | Avant-garde, overlapping, unconventional |
| **MOTION_INTENSITY** | Hover states and fades only | Staggered reveals, scroll-triggered | Magnetic cursors, parallax, complex choreography |
| **VISUAL_DENSITY** | Spacious, luxury | Balanced whitespace | Dense dashboards, data-heavy |

## Sources

Built on 18+ sources including [Anthropic's official skills](https://github.com/anthropics/skills), [Impeccable](https://github.com/pbakaus/impeccable), [Taste Skill](https://github.com/Leonxlnx/taste-skill), [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md), [Component Gallery](https://component.gallery/), [Torph](https://torph.lochie.me/), [Soundcn](https://github.com/kapishdima/soundcn), [Vercel agent-skills](https://github.com/vercel-labs/agent-skills), and more.

## The Non-Negotiables

1. No design should look like AI made it.
2. Every design must have a clear aesthetic point of view.
3. Match implementation complexity to vision.
4. Text is always a design element.
5. Every detail matters.

## License

MIT
