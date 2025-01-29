module.exports = {
  env: {
    browser: 1
  },
  extends: ['standard', 'prettier'],
  globals: {
    MOJFrontend: 'readonly',
    $: 'readonly'
  },
  ignorePatterns: ['package/**/*', 'node_modules', 'node_modules/.*'],
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        // 'plugin:jest/style',
        // 'plugin:jest-dom/recommended',
        // 'plugin:jsdoc/recommended-typescript-flavor',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        'prettier'
      ],
      files: ['**/*.{cjs,js,mjs}'],
      parserOptions: {
        ecmaVersion: 'latest'
      },
      // plugins: ['import', 'jsdoc', 'n', 'promise', 'jest', 'jest-dom'],
      plugins: ['import', 'jsdoc', 'n', 'promise'],
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

        // JSDoc @param required in (optional) blocks but
        // @param description is not necessary by default
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-param': 'error',

        // Require hyphens before param description
        // Aligns with TSDoc style: https://tsdoc.org/pages/tags/param/
        'jsdoc/require-hyphen-before-param-description': 'warn',

        // Maintain new line after description
        'jsdoc/tag-lines': [
          'warn',
          'never',
          {
            startLines: 1
          }
        ],

        // Automatically use template strings
        'no-useless-concat': 'error',
        'prefer-template': 'error',

        // Flow control – avoid continue and else blocks after return statements
        // in if statements
        'no-continue': 'error',
        'no-else-return': 'error',

        // Avoid hard to read multi assign statements
        'no-multi-assign': 'error'
      },
      settings: {
        // jsdoc: {
        //   // Allows us to use type declarations that exist in our dependencies
        //   mode: 'typescript',
        //   tagNamePreference: {
        //     // TypeDoc doesn't understand '@abstract' but '@virtual'
        //     abstract: 'virtual'
        //   }
        // }
      }
    },
    {
      // Extensions required for ESM import
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
      files: ['**/*.spec.{cjs,js,mjs}'],
      env: {
        jest: true
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
      // Check markdown `*.md` contains valid code blocks
      // https://www.npmjs.com/package/eslint-plugin-markdown#user-content-advanced-configuration
      files: ['**/*.md/*.js'],
      rules: {
        quotes: ['error', 'double'],
        // Ignore unused example code
        'no-new': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',

        // Ignore paths to example modules
        'import/no-unresolved': 'off',
        'n/no-missing-import': 'off'
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    }
  ],
  parserOptions: {
    // project: './tsconfig.json'
  },
  root: true
}
