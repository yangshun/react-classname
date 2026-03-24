# react-classname

`react-classname` is an automatic JSX runtime for React that lets intrinsic elements accept Vue- and Svelte-style `className` values directly in JSX.

```tsx
/** @jsxImportSource react-classname */

const element = (
  <button
    className={[
      "btn",
      ["btn-primary", { "btn-disabled": false }],
      { "is-active": true }
    ]}
  >
    Save
  </button>
);
```

It normalizes intrinsic elements only. Custom components keep their declared `className` prop types unless they call `clsx` themselves.

## Install

```bash
pnpm add react-classname react
```

## Usage

### TypeScript and tsconfig

Set `jsxImportSource` when using the automatic JSX runtime:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react-classname"
  }
}
```

Works for both Vite and Next.js apps.

You can also opt in per file:

```tsx
/** @jsxImportSource react-classname */
```

### Babel

Configure `@babel/preset-react` with the automatic runtime and `importSource`:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "react-classname"
      }
    ]
  ]
}
```

### Manual normalization

If you want the same behavior in custom components, call the helper yourself:

```ts
import { clsx } from "react-classname";

clsx([
  "btn",
  0,
  { active: true, disabled: false },
  ["nested"]
]);
// => "btn 0 active nested"
```

## Supported values

- Strings are kept as-is.
- Numbers are stringified and kept, including `0`.
- Arrays are flattened depth-first.
- Objects contribute keys whose values are truthy.
- `false`, `true`, `null`, and `undefined` are ignored when they appear as values.

## Workspace development

This repository is a pnpm workspace. The publishable library stays at the root, with example apps in `apps/vite` and `apps/next`.

```bash
pnpm install
pnpm dev
```

Useful commands:

- `pnpm build` builds the library with `tsdown`.
- `pnpm test` runs the library test suite.
- `pnpm typecheck` typechecks the library source.
- `pnpm dev` runs the library watcher with the Vite example app.
- `pnpm dev:next` runs the library watcher with the Next.js example app.
- `pnpm build:vite` typechecks and builds the Vite example app.
- `pnpm build:next` builds the Next.js example app.
- `pnpm build:examples` builds both example apps.
- `pnpm check` runs the library validation plus both example app smoke tests.

The Vite app demonstrates intrinsic `className` arrays and objects directly in JSX, plus a custom component that opts into the same pattern with `clsx`.
The Next.js app shows the same API through a framework setup using `jsxImportSource: "react-classname"` in `tsconfig.json`.
Both apps consume `react-classname` through the workspace package itself rather than importing source files from outside their own package directories.
