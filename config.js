const config = {
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com',
  GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN || 'your-default-github-token',
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER || 'your-default-repo-owner',
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME || 'your-default-repo-name',
  NOTIFY_PR_TEMPLATE: process.env.NOTIFY_PR_TEMPLATE || '',
  NOTIFY_SUBMISSION_TEMPLATE: process.env.NOTIFY_SUBMISSION_TEMPLATE || '',
  NOTIFY_EMAIL: process.env.NOTIFY_EMAIL || 'your-email',
  NOTIFY_TOKEN: process.env.NOTIFY_TOKEN || 'your-default-repo-token',
  APP_PORT: process.env.APP_PORT || 3001,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_AUTH_TOKEN: process.env.REDIS_AUTH_TOKEN || 'your-redis-token',
  SESSION_SECRET: process.env.session_secret || 'your-secret-key',
  ENV: process.env.ENV || 'development',
  COMPONENT_FORM_PAGES: {
    'component-details': {},
    'component-image': {},
    'accessibility-findings': {},
    'add-external-audit': { '/accessibility-findings': {hasComponentBeenTestedExternalAccessibility: 'yes' } },
    'add-internal-audit': { '/accessibility-findings': {hasComponentBeenTestedInternalAudit: 'yes'} },
    'add-assistive-tech': { '/accessibility-findings': {hasComponentBeenTestedUsingAssistiveTechnology: 'yes'}},
    'prototype': {},
    'prototype-url': { '/prototype': {componentPrototypeUrl: 'yes'} },
    'figma': {},
    'figma-link': { '/figma': {figmaUrl: 'yes'} },
    'component-code': {},
    'component-code-details': { '/component-code': {componentCodeAvailable: 'yes' } },
    'your-details': {},
    'check-your-answers': {}
  },
  COMPONENT_FORM_HIDDEN_FIELDS: {
    'add-external-audit': {
      '/accessibility-findings': [
        'hasComponentBeenTestedInternalAudit',
        'hasComponentBeenTestedUsingAssistiveTechnology'
      ]
    },
    'add-internal-audit': {
      '/accessibility-findings': [
        'hasComponentBeenTestedInternalAudit',
        'hasComponentBeenTestedUsingAssistiveTechnology'
      ]
    },
    'add-assistive-tech': {
      '/accessibility-findings': [
        'hasComponentBeenTestedUsingAssistiveTechnology'
      ]
    }
  },
  COMPONENT_FORM_PAGES_OPTIONS: {
    'accessibility-findings': {
      hasComponentBeenTestedExternalAccessibility: {
        yes: 'add-external-audit',
        no: {
          hasComponentBeenTestedInternalAudit: {
            yes: 'add-internal-audit',
            no: {
              hasComponentBeenTestedUsingAssistiveTechnology: {
                yes: 'add-assistive-tech',
                no: 'prototype'
              }
            }
          }
        }
      }
    },
    'add-external-audit': {
      hasComponentBeenTestedInternalAudit: {
        yes: 'add-internal-audit',
        no: {
          hasComponentBeenTestedUsingAssistiveTechnology: {
            yes: 'add-assistive-tech',
            no: 'prototype'
          }
        }
      }
    },
    'add-internal-audit': {
      hasComponentBeenTestedUsingAssistiveTechnology: {
        yes: 'add-assistive-tech',
        no: 'prototype'
      }
    },
    prototype: {
      componentPrototypeUrl: {
        yes: 'prototype-url',
        no: 'component-code'
      }
    },
    'component-code': {
      componentCodeAvailable: {
        yes: 'component-code-details',
        no: 'component-image'
      }
    },
    figma: {
      figmaUrl: {
        yes: 'figma-link',
        no: 'your-details'
      }
    }
  }
}

module.exports = config
