// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  {
    ignores: [
      '**/dev/*',
      '**/dist/*',
      '**/tests/*',
      'tsconfig.json',
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      "no-console": "off",
      "no-loss-of-precision": "off",
      "@stylistic/semi": ["error", "always"],
      "@stylistic/no-multiple-empty-lines": ["error", { "max": 2, "maxBOF": 0, "maxEOF": 1 }],
      "@typescript-eslint/no-explicit-any": "error"
    }
  }
);