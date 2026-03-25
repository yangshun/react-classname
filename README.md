# reclassify

`reclassify` allows you to construct `className` strings directly in JSX without using libraries like [`clsx`](https://github.com/lukeed/clsx) and [`classNames`](https://github.com/Jedwatson/classnames).

```jsx
// Before:
<button className={
  clsx(["btn", ["btn-primary", { "btn-disabled": false }], { "is-active": true }])
}>
  Save
</button>

// After:
<button className={
  // No need for clsx
  ["btn", ["btn-primary", { "btn-disabled": false }], { "is-active": true }]
}>
  Save
</button>
```

It constructs `className` strings for intrinsic elements only. Custom components keep their declared `className` prop types.

## Why use this

- **No imports needed**: You no longer have to import `clsx` or `classnames` in every file, the JSX runtime handles classname construction automatically for all intrinsic elements.
- **Type-safe**: TypeScript knows that `className` on intrinsic elements accepts arrays, objects, and nested combinations. No `as string` casts or loose typing.
- **Drop-in setup**: One `tsconfig.json` change (`jsxImportSource`) and your entire app is covered. No Babel plugins, no wrappers, no HOCs. It's also backwards-compatible.
- **Familiar syntax**: If you've used `clsx`, `classnames`, Vue's `:class`, or Svelte's `class:` directive, the array/object pattern already feels natural.

## Install

```bash
npm install reclassify # Requires React >= 17 (automatic JSX runtime)
```

## Usage

```jsx
<div className="plain-string" /> // Good ol' strings
<div className={["btn", "btn-primary"]} /> // Arrays
<div className={{ active: true, disabled: false }} /> // Objects
<div className={["btn", { active: isActive }, ["nested"]]} /> // Arrays containing objects
```

There are two common ways to use `reclassify`, depending on whether you are using TypeScript or Babel to compile:

### TypeScript

Set `jsxImportSource` when using the automatic JSX runtime:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "reclassify"
  }
}
```

You can also opt in per file:

```tsx
/** @jsxImportSource reclassify */
```

They will type-check cleanly.

### Babel

Configure `@babel/preset-react` with the automatic runtime and `importSource`:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "reclassify"
      }
    ]
  ]
}
```

## How it works

Under the hood, `reclassify` is a custom JSX runtime for React that lets you pass arrays and objects as `className` on intrinsic elements.

When you set `jsxImportSource: "reclassify"` or Babel `importSource: "reclassify"`, your JSX compiles against `reclassify`'s runtime instead of React's default runtime. This is similar to how [Preact](https://preactjs.com/) works.

By default, `reclassify` uses `clsx` for className string construction.

At runtime, `reclassify` wraps React's `jsx`, `jsxs`, and `jsxDEV` functions and checks each element before it is created:

1. If the element is an intrinsic element like `<div>` or `<button>`, `reclassify` looks at its `className`.
   1. If `className` is already a string, the props are passed through unchanged.
   2. If `className` is an array, object, or other supported value, `reclassify` calls `classify()` to turn it into the final string React expects.
2. If you called `configure({ fn })`, `classify` points to your provided function and `reclassify` uses it instead of the default `clsx`-based implementation.

Custom components are not rewritten. They keep their existing `className` prop contract unless they call `classify()` themselves.

On the type side, `reclassify` also widens `className` for intrinsic JSX elements so TypeScript accepts the same array/object values that the runtime can classify.

Once configured, intrinsic elements accept arrays and objects for `className` with full TypeScript support — no type errors:

## Custom construction

If you want to replace the built-in class construction function, before your app starts rendering JSX, call `configure()` once with your custom implementation. It returns a function that restores the previous construction function.

Here's an example using the `cn` util commonly-found in shadcn projects.

```ts
import { configure } from "reclassify";
import { cn } from "@/lib/utils";

const restore = configure({ fn: cn });

// Later, if needed (e.g. in tests):
restore();
```

If you want to use `tailwind-merge` directly, compose it with `defaultClassify()` so `reclassify` still handles arrays and objects before Tailwind class conflict resolution runs:

```ts
import { configure, defaultClassify, type ClassValue } from "reclassify";
import { twMerge } from "tailwind-merge";

configure({
  fn(value: ClassValue) {
    return twMerge(defaultClassify(value));
  },
});

// <div className={["px-2", "px-4", { "text-sm": false, "text-lg": true }]}>
// => <div className="px-4 text-lg">
```

### Where to call `configure()`

`configure()` changes `reclassify`'s internal construction function, which is stored at the module level (app-wide mutable state), so call it during startup rather than per component:

- Client-side rendering / SPAs (e.g. default Vite): Call it in your main entry module before `render()`
- Server-side rendering (e.g. Next.js): Call it in the earliest server entry and earliest client entry that render JSX (e.g. root layout component)

If your custom function wants to build on the default behavior, you can import `defaultClassify` and use it:

```ts
import { configure, defaultClassify, type ClassValue } from "reclassify";

configure({
  fn(value: ClassValue) {
    const constructed = defaultClassify(value);
    return constructed ? `custom ${constructed}` : "custom";
  },
});
```

### Manual construction

If you want the same behavior in custom components, the underlying function can be imported via `classify`:

```ts
import { classify } from "reclassify";

classify(["btn", 42, { active: true, disabled: false }, ["nested"]]);
// => "btn 42 active nested"
```

If a custom `fn` function is provided via `configure()`, the imported `classify` function points to that.

## Supported values

- Non-empty strings are kept as-is. Empty strings are dropped.
- Truthy numbers are stringified and kept.
- Arrays are flattened depth-first.
- Objects contribute keys whose values are truthy.
- Standalone falsy values like `false`, `0`, `""`, `null`, `undefined`, and `NaN` are ignored.

## Workspace development

This repository uses [Vite+](https://viteplus.dev/) (`vp`) on top of a pnpm workspace. [Get started with Vite+ here](https://viteplus.dev/guide/).

The publishable library stays at the root, with example apps in `apps/vite` and `apps/next`.

Useful commands:

- `vp pack` builds the library package.
- `vp test` runs the library test suite.
- `vp check` runs formatting, linting, and type-aware checks.
- `vp run dev` runs the library watcher with the Vite example app.
- `vp run dev:next` runs the library watcher with the Next.js example app.
- `vp run build:vite` typechecks and builds the Vite example app.
- `vp run build:next` builds the Next.js example app.
- `vp run build:examples` builds both example apps.
- `vp run check` runs the library validation plus both example app smoke tests.

## Examples

Examples can be found in `apps/`:

- `apps/vite`: The Vite app demonstrates intrinsic `className` arrays and objects directly in JSX, plus a custom component that opts into the same pattern with `classify`.
- `apps/next`: The Next.js app shows the same API through a framework setup using `jsxImportSource: "reclassify"` in `tsconfig.json`.

Both apps consume `reclassify` through the workspace package itself rather than importing source files from outside their own package directories.

## License

MIT
