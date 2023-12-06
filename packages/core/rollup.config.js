import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import { dts } from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        format: "esm",
      },
    ],
    plugins: [typescript(), del({ targets: "dist/*" }), terser()],
    external: [],
  },
  {
    // 生成一个单独的 index.d.ts
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
