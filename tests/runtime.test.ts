import type { ReactElement } from "react";
import { describe, expect, it } from "vite-plus/test";
import * as ReactJSXRuntime from "react/jsx-runtime";
import { jsx, jsxs } from "../src/jsx-runtime";
import { jsxDEV } from "../src/jsx-dev-runtime";

type ElementWithClassName = ReactElement<{
  className?: unknown;
  id?: string;
}>;

describe("jsx runtime wrappers", () => {
  it("normalizes intrinsic jsx className values", () => {
    const element = jsx("div", {
      className: ["btn", { active: true, disabled: false }, 0],
    }) as ElementWithClassName;

    expect(element.props.className).toBe("btn active 0");
  });

  it("normalizes intrinsic jsxs className values", () => {
    const element = jsxs("div", {
      className: ["stack", ["gap-sm"], { surface: true }],
      children: ["a", "b"],
    }) as ElementWithClassName;

    expect(element.props.className).toBe("stack gap-sm surface");
  });

  it("normalizes intrinsic jsxDEV className values", () => {
    const element = jsxDEV(
      "div",
      {
        className: [{ card: true }, ["raised"]],
      },
      undefined,
      false,
      {
        fileName: "runtime.test.ts",
        lineNumber: 1,
        columnNumber: 1,
      },
      undefined,
    ) as ElementWithClassName;

    expect(element.props.className).toBe("card raised");
  });

  it("leaves custom component className values unchanged", () => {
    const className = ["btn", { active: true }] as const;
    const Component = () => null;
    const element = jsx(Component, { className }) as ElementWithClassName;

    expect(element.props.className).toBe(className);
  });

  it("preserves props identity for no-op intrinsic string values", () => {
    const props = {
      className: "btn",
      id: "hero",
    };

    const element = jsx("div", props) as ElementWithClassName;
    const reactElement = ReactJSXRuntime.jsx("div", props) as ElementWithClassName;

    expect(element.props).toBe(props);
    expect(reactElement.props).toBe(props);
  });
});
