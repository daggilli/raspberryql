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
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/type-generic-spacing": ["error"],
      "@stylistic/space-before-function-paren": ["error",
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/rest-spread-spacing": ["error", "never"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "error"
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    }
  }
);