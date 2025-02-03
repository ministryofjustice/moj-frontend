module.exports = {
  overrides: [
    {
      files: ['moj/**/*.{cjs,js,mjs}'],
      excludedFiles: ['**/*.spec.{cjs,js,mjs}'],
      parserOptions: {
        // Note: Allow ES2015 for import/export syntax
        ecmaVersion: '2015'
      },
      plugins: ['es-x'],
      extends: ['plugin:es-x/restrict-to-es2015', 'prettier'],
      env: {
        browser: true
      },
      rules: {
        // ES modules include ES2016 '[].includes()' coverage
        // https://browsersl.ist/#q=supports+es6-module+and+not+supports+array-includes
        'es-x/no-array-prototype-includes': 'off',

        // ES modules include ES2017 'Object.entries()' coverage
        // https://browsersl.ist/#q=supports+es6-module+and+not+supports+object-entries
        'es-x/no-object-entries': 'off',

        // JSDoc blocks are optional but must be valid
        'jsdoc/require-jsdoc': [
          'error',
          {
            enableFixer: false,
            require: {
              FunctionDeclaration: false
            }
          }
        ],

        // JSDoc @param types are mandatory for JavaScript
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-param-type': 'error',
        'jsdoc/require-param': 'off',

        // JSDoc @returns is optional
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-returns': 'off'
      }
    }
  ]
}
