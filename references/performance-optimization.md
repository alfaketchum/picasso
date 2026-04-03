# Performance Optimization Reference

React/Next.js performance rules based on Vercel's guidance. Organized by priority.

---

## Priority 1 - CRITICAL: Eliminating Waterfalls

Waterfalls are the single biggest performance killer. Every sequential `await` that could be parallel is wasted time.

### Rules
- Use `Promise.all()` for independent fetches (total time = max instead of sum)
- Start fetches immediately, defer `await` until the value is needed (fire-and-forget pattern)
- Use `better-all` when some fetches depend on others but you still want maximum parallelism
- Wrap independent data-loading sections in their own `<Suspense>` boundary so they stream independently (don't let one slow component block the whole page)

---

## Priority 2 - CRITICAL: Bundle Size

### Avoid Barrel File Imports
Barrel files (`index.ts` re-exports) pull in entire modules. Cost: 200-800ms of parse time.

```typescript
// BAD: Imports entire icon library through barrel file
import { ChevronDown } from '@/components/icons';
// GOOD: Direct import from source file
import { ChevronDown } from '@/components/icons/ChevronDown';
```

Configure detection: `optimizePackageImports` in `next.config.js` for known barrel-heavy packages.

### Dynamic Imports
- Use `next/dynamic` for heavy components (editors, charts, maps) with `loading` fallback
- Use `ssr: false` for client-only libraries
- Defer non-critical third-party scripts (analytics, error tracking, chat widgets) via dynamic import + `<Suspense fallback={null}>`

### Preload on User Intent
Start loading a route or component on hover/focus instead of on click. Use `router.prefetch(href)` on `onMouseEnter`/`onFocus`. For heavy components, call the dynamic import function on hover, render on click.

### Conditional Module Loading
Only `import()` heavy modules when the feature path is actually taken (e.g., load `xlsx` only when user picks XLSX format).

---

## Priority 3 - HIGH: Server-Side Performance

### Rules
- Use `React.cache()` for per-request deduplication (multiple components calling the same function = one execution per request)
- Use `LRUCache` for cross-request caching (config, feature flags, static content) with TTL
- Let each Server Component fetch its own data; React deduplicates and parallelizes automatically
- Minimize serialization at RSC boundaries: pass only primitive/minimal data from Server to Client Components

---

## Priority 4 - MEDIUM-HIGH: Client-Side Data

### Rules
- Use SWR or React Query for deduplication, caching, and revalidation (multiple components calling the same hook = one network request)
- Set `revalidateOnFocus: false` and `dedupingInterval` to control refetch behavior
- Deduplicate global event listeners with `useSyncExternalStore` instead of per-component `addEventListener`

---

## Priority 5 - MEDIUM: Re-render Optimization

### Rules
- Isolate state to the component that owns it; don't let a parent re-render siblings that don't use the state
- Depend on primitives in `useEffect` deps, not objects (`user.id` not `user`)
- Subscribe to derived booleans via `useSyncExternalStore` (e.g., `isMobile` not `width`)
- Use lazy state initialization: `useState(() => expensiveComputation())` not `useState(expensiveComputation())`
- Use `React.memo` + `useCallback` for expensive child components (skip if React Compiler is enabled)
- Use `useTransition` for non-urgent updates (search results filtering, large list re-renders)

---

## Priority 6 - MEDIUM: Rendering Performance

### Rules
- Use `content-visibility: auto` with `contain-intrinsic-size` for off-screen DOM (10x faster initial render for long pages)
- Hoist static JSX outside component functions (created once, reused forever)
- Use an inline `<script>` in `<head>` for theme/auth/locale to prevent hydration mismatch
- Optimize SVG precision: `npx svgo --precision=1 --multipass` reduces file size 20-40%
- Use React 19+ `<Activity>` to preserve state/DOM when hiding tab panels instead of unmounting
- Use explicit boolean checks for conditional rendering (`count > 0 ?` not `count &&` which can render "0")

---

## Priority 7 - LOW-MEDIUM: JavaScript Performance

### Rules
- Build `Map` indexes for O(1) lookups instead of `.find()` on arrays
- Use `Set` for membership checks instead of `.includes()` on arrays
- Combine `.filter().map().sort()` into a single loop when arrays have 1000+ items
- Cache `localStorage` reads in memory; read once, write-through on set
- Use `toSorted()`, `toReversed()`, `toSpliced()`, `with()` for immutable array operations (React-safe, no mutation)

---

## Quick Reference: When to Optimize What

| Symptom | Check First |
|---------|------------|
| Slow page load (3s+) | Priority 1: waterfalls in data fetching |
| Large JS bundle (500KB+) | Priority 2: barrel imports, dynamic imports |
| Slow server response | Priority 3: caching, parallel fetching |
| Stale data, extra requests | Priority 4: SWR, deduplication |
| Janky typing/scrolling | Priority 5: re-render isolation, useTransition |
| Slow initial paint | Priority 6: content-visibility, hydration |
| Slow interactions on large lists | Priority 7: Maps, Sets, combined iterations |
