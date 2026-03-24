import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    index: "src/index.ts",
    "jsx-runtime": "src/jsx-runtime.ts",
    "jsx-dev-runtime": "src/jsx-dev-runtime.ts"
  },
  fixedExtension: false,
  format: ["esm", "cjs"],
  platform: "neutral",
  sourcemap: true
});
