/**
 * Restormel ESLint flat config.
 * Uses Next.js flat config directly (no FlatCompat) to avoid circular ref in config validator.
 */
import { createRequire } from "node:module";
import security from "eslint-plugin-security";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const require = createRequire(import.meta.url);
const nextConfig = require("eslint-config-next/core-web-vitals");

const eslintConfig = [
  ...nextConfig,
  {
    plugins: {
      security,
    },
    rules: {
      ...security.configs.recommended.rules,
      "security/detect-object-injection": "warn",
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
