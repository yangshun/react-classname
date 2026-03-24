import { describe, expect, it } from "vite-plus/test";
import { clsx } from "react-classname";

describe("clsx", () => {
  it("returns strings unchanged", () => {
    expect(clsx("btn primary")).toBe("btn primary");
  });

  it("keeps number tokens including zero", () => {
    expect(clsx(0)).toBe("0");
    expect(clsx(42)).toBe("42");
  });

  it("flattens nested arrays depth-first", () => {
    expect(clsx(["btn", ["primary", ["focus"]], "wide"])).toBe("btn primary focus wide");
  });

  it("includes object keys with truthy values", () => {
    expect(
      clsx({
        btn: true,
        primary: 1,
        disabled: false,
      }),
    ).toBe("btn primary");
  });

  it("supports mixed values while ignoring falsy entries", () => {
    expect(
      clsx([
        "btn",
        0,
        false,
        null,
        undefined,
        { active: true, hidden: false },
        ["nested", { ready: 1 }],
      ]),
    ).toBe("btn 0 active nested ready");
  });

  it("preserves object and array order", () => {
    expect(clsx(["first", { second: true, third: true }, ["fourth", { fifth: true }]])).toBe(
      "first second third fourth fifth",
    );
  });

  it("supports class keys containing spaces", () => {
    expect(
      clsx({
        "btn primary": true,
        hidden: false,
      }),
    ).toBe("btn primary");
  });

  it("returns an empty string when no class names are enabled", () => {
    expect(clsx(false)).toBe("");
    expect(clsx([null, undefined, false, { hidden: 0 }])).toBe("");
  });
});
