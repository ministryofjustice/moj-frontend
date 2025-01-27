const config = {
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || 'your-default-github-token',
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER || 'your-default-repo-owner',
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME || 'your-default-repo-name',
  NOTIFY_TEMPLATE: process.env.NOTIFY_TEMPLATE || '',
  NOTIFY_EMAIL: process.env.NOTIFY_EMAIL || 'your-email',
  NOTIFY_TOKEN: process.env.NOTIFY_TOKEN || 'your-default-repo-token',
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
