import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import security from "eslint-plugin-security";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Next.js Configs (Keep these managed by compat)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Restormel Security Config (Manually Constructed)
  // We extract ONLY the rules to avoid the "Circular JSON" crash
  {
    plugins: {
      security,
    },
    rules: {
      // Spread the recommended rules directly
      ...security.configs.recommended.rules,
      
      // Optional: Add custom overrides here if needed
      "security/detect-object-injection": "warn", // Often too noisy, setting to warn
    },
  },

  // 3. Prettier last: disables ESLint formatting rules that conflict with Prettier
  eslintConfigPrettier,
];

export default eslintConfig;
