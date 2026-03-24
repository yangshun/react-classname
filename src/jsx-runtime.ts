import type * as React from "react";
import * as ReactJSXRuntime from "react/jsx-runtime";
import type { WidenedIntrinsicElements } from "./jsx-types";
import { normalizeIntrinsicProps } from "./runtime-shared";

export const Fragment = ReactJSXRuntime.Fragment;

export const jsx: typeof ReactJSXRuntime.jsx = (type, props, key) =>
  ReactJSXRuntime.jsx(type, normalizeIntrinsicProps(type, props), key);

export const jsxs: typeof ReactJSXRuntime.jsxs = (type, props, key) =>
  ReactJSXRuntime.jsxs(type, normalizeIntrinsicProps(type, props), key);

export namespace JSX {
  export type ElementType = React.JSX.ElementType;
  export interface Element extends React.JSX.Element {}
  export interface ElementClass extends React.JSX.ElementClass {}
  export interface ElementAttributesProperty
    extends React.JSX.ElementAttributesProperty {}
  export interface ElementChildrenAttribute
    extends React.JSX.ElementChildrenAttribute {}
  export type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<
    C,
    P
  >;
  export interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T>
    extends React.JSX.IntrinsicClassAttributes<T> {}
  export interface IntrinsicElements extends WidenedIntrinsicElements {}
}
