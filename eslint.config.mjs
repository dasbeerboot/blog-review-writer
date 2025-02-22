import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
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
)
