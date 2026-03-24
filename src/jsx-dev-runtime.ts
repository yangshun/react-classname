import type * as React from "react";
import * as ReactJSXDevRuntime from "react/jsx-dev-runtime";
import type { WidenedIntrinsicElements } from "./jsx-types";
import { normalizeIntrinsicProps } from "./runtime-shared";

export const Fragment = ReactJSXDevRuntime.Fragment;

export const jsxDEV: typeof ReactJSXDevRuntime.jsxDEV = (
  type,
  props,
  key,
  isStaticChildren,
  source,
  self,
) =>
  ReactJSXDevRuntime.jsxDEV(
    type,
    normalizeIntrinsicProps(type, props),
    key,
    isStaticChildren,
    source,
    self,
  );

export namespace JSX {
  export type ElementType = React.JSX.ElementType;
  export interface Element extends React.JSX.Element {}
  export interface ElementClass extends React.JSX.ElementClass {}
  export interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
  export interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
  export type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
  export interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> {}
  export interface IntrinsicElements extends WidenedIntrinsicElements {}
}
