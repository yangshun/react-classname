import { defineConfig } from "vite-plus";

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "apps/vite/dist",
    rollupOptions: {
      input: "apps/vite/index.html",
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    environment: "node",
  },
  pack: {
    clean: true,
    dts: true,
    entry: {
      index: "src/index.ts",
      "jsx-runtime": "src/jsx-runtime.ts",
      "jsx-dev-runtime": "src/jsx-dev-runtime.ts",
    },
    fixedExtension: false,
    format: ["esm", "cjs"],
    platform: "neutral",
    sourcemap: true,
  },
});
