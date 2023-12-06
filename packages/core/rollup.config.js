import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/moment.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/moment.esm.js",
      format: "esm",
    },
    {
      name: "Moment",
      file: "dist/bundle.umd.js",
      format: "umd",
      globals: {},
    },
  ],
  plugins: [typescript(), del({ targets: "dist/*" })],
  external: [],
};
