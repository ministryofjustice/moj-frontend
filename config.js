const {APP_PORT} = require("./config");
const config = {
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || 'your-default-github-token',
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER || 'your-default-repo-owner',
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME || 'your-default-repo-name',
  APP_PORT: process.env.APP_PORT || 3001,
  ENV: process.env.ENV || 'development',
  COMPONENT_FORM_PAGES: [
    'component-details',
    'component-image',
    'your-details',
    'check-your-answers'
  ]
};

module.exports = config;
