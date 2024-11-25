import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { eslintConfigPerttier } from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {
    languageOptions: { globals: globals.browser }
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  },
  eslintConfigPerttier
];