const config = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "https://design-patterns.service.juice.gov.uk/",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};
module.exports = config;
