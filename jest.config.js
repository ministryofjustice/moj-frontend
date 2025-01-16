const config = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
  },
  setupFilesAfterEnv: ["./jest.setup.js", "jest-sinon"],
  // See: https://github.com/sinonjs/sinon/issues/2522#issuecomment-1612555284
  moduleNameMapper: {
    sinon: "<rootDir>/node_modules/sinon/pkg/sinon.js",
  },
};
module.exports = config;
