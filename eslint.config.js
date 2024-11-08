import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2025
      }
    },
    rules: {
      indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'consistent-this': ['error', 'self'],
      'func-names': 'error', // избегаем анонимных функций
      'no-constant-condition': 'error',
      'max-lines': ['error', { max: 200, skipComments: true, skipBlankLines: true }], // декомпозируем большие компоненты
      'max-depth': ['error', 4], // избегаем колбэк-хэлла
      'id-length': [
        'warn',
        { min: 2, max: 45, properties: 'never', exceptions: ['_', 'a', 'b', 'i', 'e'] }
      ],
      'nonblock-statement-body-position': 'error',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'prefer-destructuring': 'off',
      'no-implied-eval': 'error',
      'no-throw-literal': 'error',
      'no-return-await': 'error',
      'no-confusing-arrow': ['error'],
      'template-curly-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'space-before-blocks': ['error', 'always'],
      'no-whitespace-before-property': ['error'],
      'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 2 }],
      'max-statements-per-line': ['error', { max: 1 }],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Prefer named exports'
        }
      ] // предпочитаем именованный экспорт
    }
  }
]
