const config = {
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || 'your-default-github-token',
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER || 'your-default-repo-owner',
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME || 'your-default-repo-name',
  NOTIFY_TEMPLATE: process.env.NOTIFY_TEMPLATE || '',
  NOTIFY_EMAIL: process.env.NOTIFY_EMAIL || 'your-email',
  NOTIFY_TOKEN: process.env.NOTIFY_TOKEN || 'your-default-repo-token',
  APP_PORT: process.env.APP_PORT || 3001,
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  ENV: process.env.ENV || 'development',
  COMPONENT_FORM_PAGES: [
    'component-details',
    'accessibility-findings',
    'accessibility-findings-more',
    'prototype',
    'prototype-url',
    'component-code',
    'component-code-details',
    'component-image',
      'additional-information',
    'your-details',
    'check-your-answers',

  ],
  COMPONENT_FORM_PAGES_OPTIONS: {
    'accessibility-findings': {
      'hasComponentBeenTestedForAccessibility': {
        'yes': 'accessibility-findings-more',
        'no': 'prototype'
      }
    },
    'prototype': {
      'componentPrototypeUrl': {
        'yes': 'prototype-url',
        'no': 'component-screenshot'
      }
    },
    'component-code': {
      'componentCodeAvailable': {
          'yes': 'component-code-details',
          'no': 'component-image'
      }
    }
  }
}

module.exports = config
