'use strict'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { FlatCompat } = require('@eslint/eslintrc')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluginVue = require('eslint-plugin-vue')
const eslintrc = new FlatCompat({
  baseDirectory: __dirname
})

module.exports = [
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
      '.git',
      '.vscode',
      'scripts/*',
      'vite.config.ts',
      '.json'
    ]
  },
  ...pluginVue.configs['flat/recommended'],
  ...eslintrc.extends(
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript'
  ),
  {
    files: ['electron/**/*.ts'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      parser: require('@typescript-eslint/parser'),
    },
    rules: {
      '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'args': 'all',
          'argsIgnorePattern': '^_',
          'caughtErrors': 'all',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true
        }
      ],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'spaced-comment': ['error', 'always', {
        'line': {
          'markers': ['/'],
          'exceptions': ['-', '+']
        },
        'block': {
          'markers': ['!'],
          'exceptions': ['*'],
          'balanced': true
        }
      }]
    }
  },
  {
    files: ['src/**/*.ts', 'src/**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: require('vue-eslint-parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: require('@typescript-eslint/parser'),
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'args': 'all',
          'argsIgnorePattern': '^_',
          'caughtErrors': 'all',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true
        }
      ],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'vue/multi-word-component-names': 'off',
      'camelcase': 'off',
      'vue/no-unused-vars': ['error', {
        'ignorePattern': '^_'
      }],
      // 要求在单行中，每个属性占据一行
      'vue/max-attributes-per-line': ['error', {
        'singleline': {
          'max': 1
        },
        'multiline': {
          'max': 1
        }
      }],
      'vue/html-indent': ['error', 'tab', {
        'attribute': 1,
        'baseIndent': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true,
        'ignores': []
      }],
      'vue/max-len': ['error', {
        'code': 240,
        'template': 240,
        'tabWidth': 2,
        'comments': 240,
        'ignorePattern': '',
        'ignoreComments': false,
        'ignoreTrailingComments': false,
        'ignoreUrls': false,
        'ignoreStrings': false,
        'ignoreTemplateLiterals': false,
        'ignoreRegExpLiterals': true,
        'ignoreHTMLAttributeValues': false,
        'ignoreHTMLTextContents': false,
      }],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1 }],
      'spaced-comment': ['error', 'always', {
        'line': {
          'markers': ['/'],
          'exceptions': ['-', '+']
        },
        'block': {
          'markers': ['!'],
          'exceptions': ['*'],
          'balanced': true
        }
      }]
    }
  }

]
