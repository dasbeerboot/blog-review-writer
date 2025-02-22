import eslint from '@eslint/js'
import * as tseslint from '@typescript-eslint/eslint-plugin'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      'prefer-const': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      next: {
        rootDir: '.',
      },
    },
  },
]
