# React Patterns Reference

---

## 1. Component Architecture

### Server vs. Client Components
Default to Server Components. Add `'use client'` only when the component needs:
- Event handlers (onClick, onChange, etc.)
- useState, useEffect, useRef, or other hooks
- Browser APIs (window, document, navigator)
- Third-party libraries that use hooks or browser APIs

### File Organization
Colocate related files. Components, styles, tests, and types in the same directory:
```
components/user-card/
  user-card.tsx, user-card.test.tsx, types.ts
```

### Naming
- Components: PascalCase (`UserCard`)
- Files: kebab-case (`user-card.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth`)
- Event handlers: `handle` + event (`handleSubmit`)
- Boolean props: `is`/`has`/`should` prefix (`isLoading`)

### Export Patterns
- **Default export**: page/route and layout components
- **Named export**: everything else

---

## 2. React 19 Features

### The `use` Hook
Read promises and context directly in render. Works inside conditionals/loops unlike other hooks.

### `useActionState` for Form Actions
Manages form state, pending status, and server action results in one hook. Pair with `<form action={formAction}>`.

### `useFormStatus` for Submission State
Access parent form's pending state from child components (e.g., a submit button).

### `useOptimistic` for Instant Feedback
Show optimistic state while async action completes. Call `addOptimistic(value)` before `await`; renders instantly, reverts on error.

### React Compiler
When enabled, auto-memoizes components, hooks, and expressions. Remove manual `React.memo`, `useMemo`, `useCallback`. Check project's `react-compiler` config first.

---

## 3. State Management

### Where State Lives
1. **URL state**: filters, pagination, search queries (`searchParams`)
2. **Server state**: API data (server components or React Query/SWR)
3. **Local state**: form inputs, UI toggles (`useState`)
4. **Shared local state**: needed by siblings (lift to parent or context)
5. **Global state**: rarely needed (auth, theme, feature flags)

### Rules
- Do not store derived state. Compute during render.
- Do not sync state between sources. Pick one source of truth.
- Prefer `useReducer` when next state depends on previous state or 3+ related variables.

---

## 4. Performance

### Rendering
- With React Compiler: skip manual memoization
- Without: `React.memo` for frequently re-rendered components with stable props; `useMemo` for expensive computations; `useCallback` for callbacks to memoized children
- Use stable, unique `key` props (never array indices for reorderable lists)

### Code Splitting
Use `React.lazy` + `Suspense` for client components. Next.js App Router also provides automatic route-level splitting.

### Virtualization
For lists with 100+ items: `@tanstack/virtual` or `react-window`.

### Image Optimization
`next/image` or `loading="lazy"` with explicit `width`/`height`. Always set `aspect-ratio`.

---

## 5. Composition Patterns

### Compound Components
Share implicit state through context (`<Select>`, `<Select.Trigger>`, `<Select.Item>`). Parent holds state, children consume via context.

### Slot Pattern
Flexible composition through named children (`header`, `children`, `footer` as props). Avoids rigid trees.

---

## 6. Data Fetching & Mutations

### Server Components (preferred for reads)
`async` component, `await fetch()` directly. No hooks needed.

### Server Actions (preferred for mutations)
Define in `'use server'` file, call from client via form `action`. Handles serialization, error boundaries, progressive enhancement. Prefer over API route handlers.

### Client-Side
Always wrap data-fetching components in `<ErrorBoundary>` + `<Suspense>`.

---

## 7. Styling & Tailwind v4

### Tailwind v4 Changes
- **No `tailwind.config.js`**: configuration in CSS via `@theme` directive
- **New import**: `@import "tailwindcss"` instead of `@tailwind base/components/utilities`
- **CSS variables for all tokens**: auto-exposed as `--color-blue-500`, `--spacing-4`, etc.

```css
@import "tailwindcss";
@theme {
  --color-brand: #6366f1;
  --font-display: "Inter", sans-serif;
  --breakpoint-3xl: 1920px;
}
```

### Best Practices
- Use core utility classes; extract repeated patterns into component variants, not `@apply`
- CSS variables for theme values, Tailwind utilities for everything else
- Never exceed ~10 utility classes on a single element; extract a component

### Semantic HTML
Use the right element: `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, `<a>`.

---

## 8. Dark Mode Toggle

Three parts:
1. **Blocking script** in `<head>` to read localStorage/system preference and set `data-theme` before paint (prevents flash)
2. **`useTheme` hook** with `useState`, `useCallback`, and system preference listener
3. **CSS variables** that flip under `[data-theme="dark"]`

---

## 9. Common Mistakes

- Using `useEffect` for derived state (compute during render)
- Putting everything in global state (most state is local or server-derived)
- Using `index` as `key` for dynamic lists
- Wrapping every component in `React.memo` (let React Compiler handle it)
- Using `any` in TypeScript
- Fetching in `useEffect` when a server component would suffice
- Not using Suspense boundaries (whole page flashes instead of parts)
- Prop drilling through 5+ levels (use composition or context)
- API route handlers for mutations when Server Actions are simpler
- Not using `useOptimistic` for actions needing instant feedback
- Manual memoization when React Compiler is enabled
- Using `@tailwind` directives or `tailwind.config.js` in Tailwind v4 (use `@import "tailwindcss"` and `@theme`)
