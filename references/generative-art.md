# Generative Art Reference

## 1. Philosophy

Generative art is intentional design expressed through algorithms. Randomness is a tool, not the goal. The artist defines the system, its constraints, and its parameter space. The algorithm explores that space. Every output should feel curated, as if the artist chose it from a thousand variations.

The quality bar: a viewer should not think "a computer made this." They should think "someone designed this." The difference is in constraint. Unconstrained randomness produces noise. Constrained randomness produces beauty.

Three principles:
- **Parameterize everything.** Every magic number becomes a parameter. This lets you explore the design space systematically.
- **Seed everything.** Reproducibility is non-negotiable. A good output must be recoverable.
- **Curate ruthlessly.** Generate hundreds of variations. Ship the best five. The algorithm is a collaborator, not the artist.

---

## 2. Core Patterns

### Flow Field
Particles follow angles derived from Perlin noise, accumulating into organic density maps.
```javascript
const angle = noise(p.x * noiseScale, p.y * noiseScale) * TAU * 2;
p.x += cos(angle) * speed;
p.y += sin(angle) * speed;
```

### Particle System
Class-based particles with position, velocity, acceleration, lifespan, and lifecycle management. Use `p5.Vector` or plain `{x, y}` objects. Always wrap coordinates at edges.

### Single-File HTML Scaffold
All generative art ships as a single HTML file with p5.js from CDN. Include: seed display, prev/next/random buttons, export PNG button.

---

## 3. SVG Generative Art

SVG output is resolution-independent and ideal for print, plotters, and crisp digital display.

- Build SVG strings programmatically; use `<polygon>`, `<path>`, `<circle>` elements
- For smooth organic curves, use cubic bezier path commands (`C`) with noise-influenced control points
- Export via `Blob` + `URL.createObjectURL` + click-triggered download

---

## 4. Noise Functions

### Perlin vs Simplex

| Property | Perlin | Simplex |
|---|---|---|
| Dimensions | Works well in 2D-3D | Scales cleanly to 4D+ |
| Artifacts | Grid-aligned directional artifacts | No directional bias |
| Performance | Moderate | Faster in higher dimensions |
| Use case | p5.js `noise()` default | Preferred for custom implementations |

### Noise Scale Guide

| Scale | Effect | Use Case |
|---|---|---|
| 0.001-0.005 | Very smooth, continent-like | Large flow fields, terrain |
| 0.005-0.02 | Gentle undulation | Particle paths, soft gradients |
| 0.02-0.1 | Visible texture | Surface detail, displacement |
| 0.1-0.5 | High frequency, gritty | Texture overlay, grain |

### Layering
Combine noise at different scales: base form (4 octaves) + medium texture + fine grain, weighted (e.g., 0.7 / 0.2 / 0.1). Use fractal noise (multi-octave with lacunarity and persistence) for organic detail.

---

## 5. Color in Generative Art

Use OKLCH for all generative color work. Its perceptual uniformity means programmatic palette generation produces visually coherent results, unlike HSL where "equal" lightness values look uneven.

### Palette Strategies
- **Analogous**: hues clustered within a 30-degree spread
- **Complementary**: base hue + base+180, with lightness/chroma variations
- **Triadic**: base + base+120 + base+240

### Color from Noise
Map noise values to hue ranges for smooth organic transitions: `lerp(hueMin, hueMax, noiseValue)`.

### Background and Contrast
Dark backgrounds with luminous strokes produce the best generative art contrast. Use near-black with a slight hue tint (`oklch(0.08 0.015 260)`), never pure `#000000`.

---

## 6. Seeded Randomness

Every generative piece must be reproducible. Same seed, same output. Always.

- Use Mulberry32 or similar fast 32-bit PRNG for custom seeds
- In p5.js, call `randomSeed(seed)` and `noiseSeed(seed)` in `setup()`
- Provide seed navigation UI: prev, next, random buttons
- Store seed in URL params for sharing specific outputs

---

## 7. Animation vs Static

### When to Animate
- The piece explores temporal evolution (particles finding equilibrium, growth systems)
- Real-time interactivity adds meaning (mouse-reactive fields, audio-reactive visuals)
- The animation reveals the process (watching the flow field build creates wonder)

### When to Stay Static
- The final composition is the point (print-quality output)
- The algorithm is computationally expensive (reaction-diffusion, deep recursion)
- The piece will be exported as PNG/SVG

For animated pieces, render a fixed frame count then stop and enable export.

---

## 8. Performance

### Rules
- Pre-render static/expensive layers to an offscreen canvas, then composite with `drawImage`
- Batch draw calls: one `beginPath()` with many `lineTo()` calls, one `stroke()` (not per-particle)
- Always use `requestAnimationFrame`, never `setInterval`/`setTimeout`
- On retina screens, set canvas dimensions to `logicalSize * devicePixelRatio` and `ctx.scale(dpr, dpr)`

---

## 9. Common Mistakes

- Using `Math.random()` without seeding (unreproducible outputs)
- Hardcoding canvas dimensions instead of deriving from container/aspect ratio
- Forgetting to wrap particle coordinates at edges
- Calling `background()` every frame in trail-accumulation pieces
- Using HSL for programmatic color generation (perceptually uneven)
- Animating when the piece should be static (wasting battery/CPU)
- Not providing seed navigation UI
- Rendering at 1x on retina displays (blurry output)
- One `beginPath/stroke` per particle instead of batching (kills frame rate)
- Noise scale of 1.0 (produces white noise; useful scales are 0.001-0.1)
- Random RGB values for palettes (muddy, clashing; use OKLCH)
- Shipping without an export button
