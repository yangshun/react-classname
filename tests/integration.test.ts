import { transformSync } from "@babel/core";
import presetReact from "@babel/preset-react";
import ts from "typescript";
import { describe, expect, it } from "vite-plus/test";

describe("tooling integration", () => {
  it("uses the package jsx-runtime for TypeScript jsxImportSource", () => {
    const result = ts.transpileModule(
      'export const element = <div className={["btn", { active: true }]} />;',
      {
        compilerOptions: {
          jsx: ts.JsxEmit.ReactJSX,
          jsxImportSource: "@yangshun/react-classname",
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2020,
        },
        fileName: "fixture.tsx",
      },
    );

    expect(result.outputText).toContain('from "@yangshun/react-classname/jsx-runtime"');
  });

  it("uses the package jsx-runtime for Babel importSource", () => {
    const result = transformSync(
      'export const element = <div className={["btn", { active: true }]} />;',
      {
        babelrc: false,
        configFile: false,
        filename: "fixture.jsx",
        presets: [
          [
            presetReact,
            {
              runtime: "automatic",
              importSource: "@yangshun/react-classname",
            },
          ],
        ],
      },
    );

    expect(result?.code).toContain('"@yangshun/react-classname/jsx-runtime"');
  });
});
