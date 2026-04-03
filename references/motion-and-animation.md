# Motion and Animation Reference

## Table of Contents
1. Principles
2. Easing Functions
3. Duration Guidelines
4. Staggered Reveals
5. Text Morphing
6. Reduced Motion
7. Common Mistakes
8. Performance

---

## 1. Principles

Motion serves three purposes: feedback (confirming an action), orientation (showing where something went), and delight (making the interface feel alive). If an animation does not serve one of these, remove it.

### Priority of Animation Investment
1. Page load choreography (highest impact, seen by everyone)
2. State transitions (tabs, modals, accordions)
3. Hover/focus states
4. Scroll-triggered reveals
5. Loading states and skeletons
6. Micro-interactions (button press effects, toggle animations)

Invest time in this order. A well-choreographed page load does more than fifty micro-interactions.

---

## 2. Easing Functions

### Use These
```css
/* Named exponential curves — graduated drama for arrivals */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);     /* standard arrivals */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);     /* smooth arrivals */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);       /* dramatic arrivals */

/* Shorthand alias — default to expo for most cases */
--ease-out: var(--ease-out-expo);

/* Standard ease-in: elements departing */
--ease-in: cubic-bezier(0.55, 0.085, 0.68, 0.53);

/* Standard ease-in-out: elements transforming in place */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Spring-like (subtle): natural deceleration */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

Use `--ease-out-quart` for routine UI (tooltips, dropdowns), `--ease-out-quint` for smooth page reveals, and `--ease-out-expo` for dramatic hero entrances. Having three named curves lets you dial drama without reaching for custom values.

### Never Use
- `linear` for UI animations (looks mechanical)
- `ease` (the CSS default is mediocre)
- `bounce` / elastic easing with visible oscillation (looks dated and gimmicky). Subtle single-pass overshoot (like `--ease-spring` above) is acceptable.
- Spring animations with multiple bounces (too playful for most UIs)

---

## 3. Duration Guidelines

| Type | Duration | Why |
|---|---|---|
| Hover state change | 100-150ms | Must feel instant |
| Button press | 80-120ms | Tactile response |
| Tooltip appear | 150-200ms | Quick but not jarring |
| Fade in/out | 150-250ms | Smooth perception |
| Slide/expand | 200-350ms | Visible movement |
| Page transition | 300-500ms | Substantial change |
| Complex choreography | 400-800ms total | Entrance sequence |

Rule of thumb: if the user is waiting for it, it should be fast (under 200ms). If the user is watching it, it can be slower (200-500ms).

---

## 4. Staggered Reveals

The most impactful animation pattern. Elements enter one after another with increasing delay.

### CSS-Only Pattern
```css
.reveal-item {
  opacity: 0;
  transform: translateY(12px);
  animation: reveal 0.5s var(--ease-out) forwards;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-item:nth-child(1) { animation-delay: 0ms; }
.reveal-item:nth-child(2) { animation-delay: 60ms; }
.reveal-item:nth-child(3) { animation-delay: 120ms; }
.reveal-item:nth-child(4) { animation-delay: 180ms; }
.reveal-item:nth-child(5) { animation-delay: 240ms; }
```

### Key Parameters
- **Stagger interval**: 40-80ms between items (shorter for many items, longer for few)
- **Translate distance**: 8-16px (subtle is better)
- **Do not stagger more than 6-8 items**. After that, group them.

### React with Motion Library
```jsx
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};
```

---

## 5. Text Morphing

For animated text transitions (changing labels, counters, status updates), use **Torph** (dependency-free).

### Installation
```
npm i torph
```

### Usage
```jsx
import { TextMorph } from 'torph/react';

// Automatically animates between text values
<TextMorph>{status}</TextMorph>

// Works with any dynamic text
<button>
  <TextMorph>{isLoading ? "Processing..." : `Buy for $${price}`}</TextMorph>
</button>
```

Torph morphs individual characters with smooth enter/exit animations. It works with React, Vue, Svelte, and vanilla TypeScript.

### When to Use
- Tab labels that change on selection
- Button text that updates (Add to Cart -> Added!)
- Counter values that increment
- Status indicators that cycle through states
- Any text that changes in response to user action

---

## 6. Reduced Motion

Always respect the user's motion preference:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This does not mean removing all visual feedback. Opacity changes (fades) are still acceptable. Remove translation, scaling, and rotation animations.

---

## 7. Common Mistakes

- Animating everything on the page (creates visual noise, reduces perceived performance)
- Using `animation-duration: 0` for reduced motion (some browsers behave unexpectedly; use 0.01ms)
- Bounce/elastic easing on UI elements (acceptable only in game-like or toy-like contexts)
- Animating layout properties (width, height, top, left) instead of transforms (causes layout thrashing)
- Forgetting `will-change` on frequently animated elements (or overusing it on everything)
- Staggering 20+ items with visible delays (group them or animate the container)
- Using `transition: all 0.3s` (animates properties you did not intend; be explicit about which properties to transition)

---

## 8. Performance

### Compositor-Only Properties

Only two CSS properties can be animated without triggering layout or paint: **transform** and **opacity**. Everything else causes reflow.

| Property | Layout | Paint | Composite | Animate? |
|---|---|---|---|---|
| `transform` | No | No | Yes | **Yes** |
| `opacity` | No | No | Yes | **Yes** |
| `filter` | No | Yes | Yes | Carefully |
| `background-color` | No | Yes | No | Avoid |
| `width`, `height` | Yes | Yes | No | **Never** |
| `top`, `left` | Yes | Yes | No | **Never** |
| `margin`, `padding` | Yes | Yes | No | **Never** |
| `border-radius` | No | Yes | No | Avoid |

```css
/* Good: compositor-only */
.slide-in {
  transform: translateX(-100%);
  opacity: 0;
  transition: transform 300ms var(--ease-out), opacity 300ms var(--ease-out);
}
.slide-in.active {
  transform: translateX(0);
  opacity: 1;
}

/* Bad: triggers layout on every frame */
.slide-in-bad {
  left: -100%;
  transition: left 300ms ease;
}
```

### Will-Change Best Practices

`will-change` promotes an element to its own compositor layer. This speeds up animation but consumes GPU memory.

Rules:
- Add `will-change` BEFORE the animation starts (e.g., on hover, not in the animation itself).
- Remove it AFTER the animation completes.
- Never use `will-change: all` -- it promotes everything.
- Never apply it to more than 10 elements simultaneously.
- Don't put it in your stylesheet permanently.

```js
// Good: apply before, remove after
element.addEventListener('mouseenter', () => {
  element.style.willChange = 'transform';
});
element.addEventListener('transitionend', () => {
  element.style.willChange = 'auto';
});
```

```css
/* Acceptable: for elements that are ALWAYS animated (e.g., loading spinners) */
.spinner { will-change: transform; }

/* Bad: permanent will-change on static elements */
.card { will-change: transform, opacity; } /* don't do this */
```

### Layout Thrashing

Reading layout properties then writing them in a loop forces the browser to recalculate layout on every iteration.

```js
// BAD: layout thrashing (read-write-read-write)
elements.forEach(el => {
  const height = el.offsetHeight;    // READ -- forces layout
  el.style.height = height + 10 + 'px'; // WRITE -- invalidates layout
});

// GOOD: batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight); // all reads first
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px'; // all writes after
});
```

Properties that trigger forced layout when read: `offsetHeight`, `offsetWidth`, `getBoundingClientRect()`, `scrollTop`, `clientHeight`, `getComputedStyle()`.

### IntersectionObserver vs Scroll Events

| | `scroll` event | IntersectionObserver |
|---|---|---|
| Performance | Fires every pixel, blocks main thread | Async, fires on threshold crossing |
| Throttling | Manual (requestAnimationFrame) | Built-in |
| Use case | Scroll-linked animation (position) | Visibility detection (enter/exit) |
| Recommendation | Almost never | Almost always |

```js
// Good: IntersectionObserver for reveal animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  },
  { threshold: 0.1 }
);
```

For scroll-linked animations where you need exact scroll position, use the Scroll-Driven Animations API:

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.scroll-reveal {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### Web Animations API

For complex JS-driven animations, use WAAPI instead of manual `requestAnimationFrame`:

```js
element.animate(
  [
    { transform: 'translateY(20px)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ],
  {
    duration: 300,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards'
  }
);
```

Benefits over CSS: programmable, cancellable, can read progress, can reverse.

### Performance Measurement

```js
// Measure animation frame rate
let frames = 0;
let lastTime = performance.now();

function countFrames() {
  frames++;
  const now = performance.now();
  if (now - lastTime >= 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(countFrames);
}
requestAnimationFrame(countFrames);
```

Chrome DevTools:
1. Performance tab: Record, interact with animations, Stop
2. Look for long frames (> 16ms) in the flame chart
3. Rendering tab: Paint flashing (green = repaint, should be minimal)
4. Rendering tab: Layer borders (orange = composited layers)

Target: 60fps = 16.67ms per frame. If ANY frame takes > 33ms, users perceive jank.

### Testing on Low-End Devices

Your M-series Mac is not representative. Test with:
- **Chrome DevTools CPU throttling:** Performance tab, CPU, 6x slowdown
- **Network throttling:** Slow 3G preset to test loading animations
- **Real device:** Test on a 3-year-old Android phone if possible

If an animation stutters at 6x CPU throttle, reduce:
1. Number of concurrent animations
2. Element count being animated
3. Complexity of each animation

### Contain Property

`contain` tells the browser what NOT to recalculate when an element changes.

```css
/* Isolate layout/paint to this element */
.card {
  contain: layout paint;
}

/* Full isolation -- best for off-screen or independent components */
.widget {
  contain: strict; /* = size + layout + paint + style */
}

/* Content containment -- layout + paint + style (most common) */
.list-item {
  contain: content;
}
```

Use `contain: content` on repeated elements (list items, cards) to prevent layout changes from propagating to siblings.

### Performance Common Mistakes

- **Animating `width`/`height`/`top`/`left`.** Use `transform: translate/scale` instead.
- **`will-change` on everything.** Max 10 elements. Remove after animation completes.
- **`addEventListener('scroll')` for visibility.** Use IntersectionObserver.
- **Reading layout properties in animation loops.** Batch reads before writes.
- **Testing only on fast hardware.** Use Chrome CPU throttling at 6x.
- **No frame budget awareness.** 16ms per frame. If your JS takes 20ms, you drop frames.
- **CSS `transition: all`.** Transitions every property including layout triggers.
- **Forgetting `contain` on repeated elements.** One card's layout change recalculates the entire list.
- **`requestAnimationFrame` without cancellation.** Always store the ID and `cancelAnimationFrame` on cleanup.
