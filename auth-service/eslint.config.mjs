import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import sonarjs from "eslint-plugin-sonarjs";
import pluginPromise from "eslint-plugin-promise";
import nodePlugin from "eslint-plugin-n";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  sonarjs.configs.recommended,
  pluginPromise.configs["flat/recommended"],
  eslintPluginUnicorn.configs.recommended,
  nodePlugin.configs["flat/recommended"],

  {
    rules: {
      "unicorn/filename-case": "off",
      "unicorn/no-null": "off",
      "n/no-missing-import": "off",
      "n/no-unpublished-import": "off",
      "n/no-extraneous-import": "off",
    },
  },
]);
