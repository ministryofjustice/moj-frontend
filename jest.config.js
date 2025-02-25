module.exports = {
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/package/',
    '<rootDir>/public/'
  ],

  setupFilesAfterEnv: ['./jest.setup.js', 'jest-sinon'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.spec.{js,mjs}'],

  // Enable Babel transforms until Jest supports ESM and `import()`
  // See: https://jestjs.io/docs/ecmascript-modules
  transform: {
    '^.+\\.(js|mjs)$': ['babel-jest', { rootMode: 'upward' }]
  },

  // Enable Babel transforms for ESM-only node_modules
  // See: https://jestjs.io/docs/ecmascript-modules
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${['sinon'].join('|')}/)`
  ]
}
