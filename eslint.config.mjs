import prettier from 'eslint-plugin-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/*.js', '**/*.js.map', '**/*.d.ts', '**/node_modules/', '**/dist/'],
    files: ['src/**/*.tsx', 'src/**/*.ts', 'eslint.config.mjs'],
  },
  ...compat.extends('prettier'),
  {
    plugins: {
      prettier,
      '@typescript-eslint': tsPlugin,
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',
    },

    rules: {
      '@typescript-eslint/indent': 'off',
      'import/extensions': 'off',
      'react/jsx-filename-extension': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      'no-underscore-dangle': [
        'error',
        {
          allowAfterThis: true,
        },
      ],

      'no-console': [
        'error',
        {
          allow: ['error'],
        },
      ],

      'max-len': [
        'error',
        {
          code: 120,
        },
      ],

      'prettier/prettier': [
        'error',
        {
          printWidth: 120,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          semi: true,
          jsxBracketSameLine: false,
        },
      ],
    },
  },
];
