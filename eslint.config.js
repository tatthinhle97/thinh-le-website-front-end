import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import react from 'eslint-plugin-react'
import {defineConfig} from 'eslint/config'

export default defineConfig([
  // Generated
  {ignores: ['dist']},
  // Generated
  {files: ['**/*.{js,mjs,cjs,jsx}'], plugins: {js}, extends: ['js/recommended']},
  // Generated + modified
  {files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 2020, // Generated
      globals: {...globals.browser, ...globals.node}, // Generated
      parserOptions: {
        ecmaVersion: 'latest', // Generated
        ecmaFeatures: {jsx: true}, // Generated
        sourceType: 'module' // Generated
      }
    }
  },
  // Generated
  react.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic/jsx': stylisticJsx,
      '@stylistic/js': stylisticJs
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', {varsIgnorePattern: '^[A-Z_]'}],
      'react-refresh/only-export-components': [
        'warn',
        {allowConstantExport: true}
      ],
      // Forget to return in callback functions (e.g. map, filter, ...)
      'array-callback-return': 'error',
      // Use await in loop
      'no-await-in-loop': 'error',
      'no-duplicate-imports': 'error',
      // Use `` for `${var}`
      'no-template-curly-in-string': 'warn',
      'no-unassigned-vars': 'error',
      'no-use-before-define': 'error',
      '@stylistic/js/indent': [1, 2],
      '@stylistic/js/semi': [1, 'never'],
      '@stylistic/js/max-len': [1, {
        'code': 120,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignorePattern': '^import .*'
      }],
      '@stylistic/js/arrow-spacing': [1],
      '@stylistic/js/array-bracket-spacing': [1, 'never'],
      '@stylistic/js/block-spacing': [1],
      '@stylistic/js/comma-spacing': [1],
      '@stylistic/js/key-spacing': [1],
      '@stylistic/js/no-multi-spaces': [1],
      '@stylistic/js/keyword-spacing': [1],
      '@stylistic/js/computed-property-spacing': [1],
      '@stylistic/js/eol-last': [1, 'always'],
      '@stylistic/js/quotes': [1, 'single'],
      '@stylistic/js/space-in-parens': [1],
      '@stylistic/js/jsx-quotes': [1, 'prefer-single'],
      '@stylistic/js/comma-dangle': [1, 'never'],
      '@stylistic/js/no-multiple-empty-lines': [1, {'max': 1}],
      '@stylistic/js/no-trailing-spaces': [1],
      '@stylistic/js/object-curly-spacing': [1],
      '@stylistic/js/rest-spread-spacing': [1],
      '@stylistic/js/space-infix-ops': [1],
      '@stylistic/js/switch-colon-spacing': [1],
      '@stylistic/js/template-curly-spacing': [1],
      'sort-imports': [1, {
        'ignoreCase': true,
        'ignoreDeclarationSort': true,
        'ignoreMemberSort': false,
        'allowSeparatedGroups': false
      }],
      '@stylistic/js/dot-location': [1, 'property'],
      '@stylistic/js/function-call-spacing': [1, 'never'],
      '@stylistic/js/space-before-blocks': [1, 'always'],
      '@stylistic/jsx/jsx-indent-props': [1, 2],
      '@stylistic/jsx/jsx-curly-spacing': [1],
      '@stylistic/jsx/jsx-equals-spacing': [1],
      '@stylistic/jsx/jsx-props-no-multi-spaces': [1],
      '@stylistic/jsx/jsx-tag-spacing': [1, {
        'beforeClosing': 'never'
      }],
      '@stylistic/jsx/jsx-closing-bracket-location': [1, 'after-props'],
      '@stylistic/jsx/jsx-curly-newline': [1]
    }
  },
  {
    plugins: {
      react
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off'
    }
  }
])
