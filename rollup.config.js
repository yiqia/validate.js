import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
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
  plugins: [typescript()],
};
