import { describe, expect, it } from "vite-plus/test";
import { cx, configure, defaultClassify } from "./index";

describe("defaultClassify", () => {
  it("returns strings unchanged", () => {
    expect(defaultClassify("btn primary")).toBe("btn primary");
  });

  it("keeps truthy number tokens while dropping zero", () => {
    expect(defaultClassify(0)).toBe("");
    expect(defaultClassify(42)).toBe("42");
  });

  it("flattens nested arrays depth-first", () => {
    expect(defaultClassify(["btn", ["primary", ["focus"]], "wide"])).toBe("btn primary focus wide");
  });

  it("includes object keys with truthy values", () => {
    expect(
      defaultClassify({
        btn: true,
        primary: 1,
        disabled: false,
      }),
    ).toBe("btn primary");
  });

  it("supports mixed values while ignoring falsy entries", () => {
    expect(
      defaultClassify([
        "btn",
        0,
        false,
        null,
        undefined,
        { active: true, hidden: false },
        ["nested", { ready: 1 }],
      ]),
    ).toBe("btn active nested ready");
  });

  it("preserves object and array order", () => {
    expect(
      defaultClassify(["first", { second: true, third: true }, ["fourth", { fifth: true }]]),
    ).toBe("first second third fourth fifth");
  });

  it("supports class keys containing spaces", () => {
    expect(
      defaultClassify({
        "btn primary": true,
        hidden: false,
      }),
    ).toBe("btn primary");
  });

  it("returns an empty string when no class names are enabled", () => {
    expect(defaultClassify(false)).toBe("");
    expect(defaultClassify([null, undefined, false, { hidden: 0 }])).toBe("");
  });

  it("matches documented clsx falsy handling", () => {
    expect(defaultClassify([true, false, "", null, undefined, 0, Number.NaN])).toBe("");
  });

  it("drops empty strings", () => {
    expect(defaultClassify("")).toBe("");
    expect(defaultClassify(["btn", "", "primary"])).toBe("btn primary");
  });

  it("returns an empty string for null and undefined", () => {
    expect(defaultClassify(null)).toBe("");
    expect(defaultClassify(undefined)).toBe("");
  });
});

describe("cx", () => {
  it("uses the default construction function when unconfigured", () => {
    expect(cx(["btn", { active: true }])).toBe("btn active");
  });

  it("uses the configured construction function", () => {
    const restore = configure({
      cx: (value) => `configured:${defaultClassify(value)}`,
    });

    try {
      expect(cx(["btn", { active: true }])).toBe("configured:btn active");
    } finally {
      restore();
    }

    expect(cx(["btn", { active: true }])).toBe("btn active");
  });

  it("keeps defaultClassify stable while configured", () => {
    const restore = configure({
      cx: () => "configured",
    });

    try {
      expect(defaultClassify(["btn", { active: true }])).toBe("btn active");
      expect(cx(["btn", { active: true }])).toBe("configured");
    } finally {
      restore();
    }
  });

  it("restores nested configuration in LIFO order", () => {
    const restoreOuter = configure({
      cx: (value) => `outer:${defaultClassify(value)}`,
    });
    const restoreInner = configure({
      cx: (value) => `inner:${defaultClassify(value)}`,
    });

    try {
      expect(cx(["btn"])).toBe("inner:btn");
    } finally {
      restoreInner();
    }

    try {
      expect(cx(["btn"])).toBe("outer:btn");
    } finally {
      restoreOuter();
    }

    expect(cx(["btn"])).toBe("btn");
  });
});
