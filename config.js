const config = {
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com',
  GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN || 'your-default-github-token',
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER || 'your-default-repo-owner',
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME || 'your-default-repo-name',
  NOTIFY_PR_TEMPLATE: process.env.NOTIFY_PR_TEMPLATE || '',
  NOTIFY_SUBMISSION_TEMPLATE: process.env.NOTIFY_SUBMISSION_TEMPLATE || '',
  NOTIFY_EMAIL: process.env.NOTIFY_EMAIL || 'your-email',
  NOTIFY_TOKEN: process.env.NOTIFY_TOKEN || 'your-default-repo-token',
  NOTIFY_EMAIL_RETRY_MS:
    parseInt(process.env.NOTIFY_EMAIL_RETRY_MS, 10) || 5000,
  NOTIFY_EMAIL_MAX_RETRIES:
    parseInt(process.env.NOTIFY_EMAIL_MAX_RETRIES, 10) || 5,
  APP_PORT: parseInt(process.env.APP_PORT, 10) || 3001,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_AUTH_TOKEN: process.env.REDIS_AUTH_TOKEN,
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key',
  ENV: process.env.ENV || 'development',
  COMPONENT_FORM_PAGES: {
    'component-details': {},
    'component-image': {},
    'accessibility-findings': {},
    'add-external-audit': {
      '/accessibility-findings': {
        hasComponentBeenTestedExternalAccessibility: 'yes'
      }
    },
    'add-internal-audit': {
      '/accessibility-findings': { hasComponentBeenTestedInternalAudit: 'yes' }
    },
    'add-assistive-tech': {
      '/accessibility-findings': {
        hasComponentBeenTestedUsingAssistiveTechnology: 'yes'
      }
    },
    prototype: {},
    'prototype-url': { '/prototype': { componentPrototypeUrl: 'yes' } },
    'component-code': {},
    'component-code-details': {
      '/component-code': { componentCodeAvailable: 'yes' }
    },
    figma: {},
    'figma-link': { '/figma': { figmaUrl: 'yes' } },
    'your-details': {},
    'check-your-answers': {}
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
  },
  ADD_NEW_COMPONENT_ROUTE: '/contribute/add-new-component',
  MAX_ADD_ANOTHER: 10,
  ACRONYMS_TO_UPPERCASE: ['url'],
  CHECK_YOUR_ANSWERS_LABEL_MAPPING: {
    componentOverview: 'Component description',
    howIsTheComponentUsed: 'How the component is being used in your service',
    accessibilityReport: 'Audit report',
    externalOrganisation: 'External accessibility audit supplier',
    internalOrganisation: 'Internal accessibility audit supplier',
    issuesDiscovered: 'Issues discovered during the audit',
    prototypeUrl: 'Prototype link',
    prototypeUrlAdditionalInformation: 'Additional information',
    componentCode: 'Code',
    componentCodeUsage: 'Code usage',
    componentCodeLanguage: 'Code language',
    figmaLink: 'Prototype link',
    figmaLinkAdditionalInformation: 'Additional information',
    shareYourDetails: 'Share your details on the component page',
    componentImage: 'Supporting file'
  },
  CHECK_YOUR_ANSWERS: {
    forms: [
      'component-details',
      'component-image',
      'add-external-audit',
      'add-internal-audit',
      'add-assistive-tech',
      ['prototype', 'prototype-url'],
      ['figma', 'figma-link'],
      ['component-code', 'component-code-details'],
      'your-details'
    ],
    canRemoveStatic: [
      '/accessibility-findings',
      '/prototype-url',
      '/figma-link',
      '/component-code-details',
      '/add-external-audit',
      '/add-internal-audit',
      '/add-assistive-tech'
    ],
    canRemoveMultiples: [
      '/component-image',
      '/prototype-url',
      '/figma-link',
      '/component-code-details'
    ],
    ignoreFields: [
      'componentPrototypeUrl',
      'figmaUrl',
      'componentCodeAvailable'
    ]
  },
  SHARE_YOUR_DETAILS: {
    addNameToComponentPage: 'Add name and email address to component page',
    addTeamNameWhenRequested: 'Only share name and email when requested',
    doNotSharePersonalDetails: 'Do not share personal details'
  }
}

module.exports = config
