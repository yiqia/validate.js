import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "./dist/validate.js",
      format: "es",
    },
    {
      file: "./dist/validate.cjs.js",
      format: "cjs",
    },

    {
      file: "./dist/validate.iife.js",
      format: "iife",
    },
  ],
  plugins: [
    resolve(),
    babel({ exclude: "node_modules/**", babelHelpers: "bundled" }),
    // terser(),
  ],
};
