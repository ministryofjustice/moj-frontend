module.exports = {
  extends: ['standard', 'prettier'],
  ignorePatterns: [
    'package/**',

    // Enable dotfile linting
    '!.*',
    'node_modules',
    'node_modules/.*'
  ],
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:jest/style',
        'plugin:jest-dom/recommended',
        'plugin:jsdoc/recommended-typescript-flavor',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic',
        'prettier'
      ],
      files: [
        '**/*.{cjs,js,mjs}',

        // Check markdown `*.md` contains valid code blocks
        // https://www.npmjs.com/package/eslint-plugin-markdown#user-content-advanced-configuration
        '**/*.md/*.{cjs,js,mjs}'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest'
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'jsdoc',
        'n',
        'promise',
        'jest',
        'jest-dom'
      ],
      rules: {
        // Check import or require statements are A-Z ordered
        'import/order': [
          'error',
          {
            alphabetize: { order: 'asc' },
            'newlines-between': 'always'
          }
        ],

        // Check for valid formatting
        'jsdoc/check-line-alignment': [
          'warn',
          'never',
          {
            wrapIndent: '  '
          }
        ],

        // JSDoc blocks can use `@preserve` to prevent removal
        'jsdoc/check-tag-names': [
          'warn',
          {
            definedTags: ['preserve']
          }
        ],

        // JSDoc blocks are optional by default
        'jsdoc/require-jsdoc': 'off',

        // Require hyphens before param description
        // Aligns with TSDoc style: https://tsdoc.org/pages/tags/param/
        'jsdoc/require-hyphen-before-param-description': 'warn',

        // JSDoc @param required in (optional) blocks but
        // @param description is not necessary by default
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-param-type': 'error',
        'jsdoc/require-param': 'off',

        // JSDoc @returns is optional
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-returns': 'off',

        // Maintain new line after description
        'jsdoc/tag-lines': [
          'warn',
          'never',
          {
            startLines: 1
          }
        ],

        // Ignore `@ministryofjustice/frontend` exports as ESLint can run
        // before output from `npm run build:package` is available
        'import/no-unresolved': [
          'error',
          { ignore: ['@ministryofjustice/frontend'] }
        ],
        'n/no-missing-import': [
          'error',
          { allowModules: ['@ministryofjustice/frontend'] }
        ],
        'n/no-missing-require': [
          'error',
          { allowModules: ['@ministryofjustice/frontend'] }
        ],

        // Automatically use template strings
        'no-useless-concat': 'error',
        'prefer-template': 'error',

        // Flow control – avoid continue and else blocks after return statements
        // in if statements
        'no-continue': 'error',
        'no-else-return': 'error',

        // Avoid hard to read multi assign statements
        'no-multi-assign': 'error',

        // Prefer rules that are type aware
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ]
      },
      settings: {
        jsdoc: {
          // Allows us to use type declarations that exist in our dependencies
          mode: 'typescript'
        }
      }
    },
    {
      // CommonJS modules allow require statements
      files: ['**/*.{cjs,js}'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      // ES modules mandatory file extensions
      files: ['**/*.mjs'],
      rules: {
        'import/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
            pattern: {
              cjs: 'always',
              js: 'always',
              mjs: 'always'
            }
          }
        ]
      }
    },
    {
      files: ['**/*.spec.{cjs,js,mjs}', 'jest.config.*', 'jest.setup.*'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      env: {
        'jest/globals': true
      },
      plugins: ['jest'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off'
      }
    },
    {
      // Add plugin for markdown `*.md` code blocks. Its config is in the new
      // "flat" format, so we need to use the legacy config
      extends: ['plugin:markdown/recommended-legacy'],
      files: ['**/*.md'],
      plugins: ['markdown'],
      processor: 'markdown/markdown'
    },
    {
      files: ['**/docs/**/*.{cjs,js,mjs}', '**/*.md/*.{cjs,js,mjs}', 'init.js'],
      env: {
        browser: true
      }
    },
    {
      files: [
        '**/examples/**/*.{cjs,js,mjs}',
        '**/*.md/*.{cjs,js,mjs}',
        'init.js'
      ],
      rules: {
        // Ignore unused example code
        '@typescript-eslint/no-unused-vars': 'off',
        'no-new': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-useless-constructor': 'off',

        // Ignore paths to example modules
        'import/no-absolute-path': 'off',
        'import/no-unresolved': 'off',
        'n/no-missing-import': 'off'
      }
    }
  ],
  root: true
}
