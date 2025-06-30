const config = {
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com',
  GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN || 'your-default-github-token',
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER || 'your-default-repo-owner',
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME || 'your-default-repo-name',
  NOTIFY_PR_TEMPLATE: process.env.NOTIFY_PR_TEMPLATE || '',
  NOTIFY_SUBMISSION_TEMPLATE: process.env.NOTIFY_SUBMISSION_TEMPLATE || '',
  NOTIFY_VERIFICATION_TEMPLATE: process.env.NOTIFY_VERIFICATION_TEMPLATE || '',
  NOTIFY_EMAIL: process.env.NOTIFY_EMAIL || 'your-email',
  NOTIFY_TOKEN: process.env.NOTIFY_TOKEN || 'your-default-repo-token',
  NOTIFY_EMAIL_RETRY_MS:
    parseInt(process.env.NOTIFY_EMAIL_RETRY_MS, 10) || 5000,
  NOTIFY_EMAIL_MAX_RETRIES:
    parseInt(process.env.NOTIFY_EMAIL_MAX_RETRIES, 10) || 5,
  APP_URL: process.env.APP_URL,
  APP_PORT: parseInt(process.env.APP_PORT, 10) || 3001,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_AUTH_TOKEN: process.env.REDIS_AUTH_TOKEN,
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key',
  ENV: process.env.ENV || 'development',
  ALLOWED_EMAIL_DOMAINS: ['justice.gov.uk'],
  COMPONENT_FORM_PAGES: {
    'email': {
      title: 'Enter your email address',
      fields: {
        emailAddress: {
          label: 'Email address',
          hint: 'Enter an email address ending @justice.gov.uk'
        }
      },
      showOnCya: false,
      removable: false
    },
    'component-details': {
      title: 'Component details',
      fields: {
        componentName: {
          label: 'What’s the name of the component?'
        },
        componentOverview: {
          label: 'Describe the component'
        },
        howIsTheComponentUsed: {
          label: 'How is the component being used?'
        }
      },
      showOnCya: true,
      removable: false
    },
    'component-image': {
      title: 'Component image',
      fields: {
        componentImage: {
          label: 'Upload a file',
          hint: 'The file must be a JPG, BMP, PNG, TIF or PDF, and smaller than 10MB.'
        }
      },
      showOnCya: true,
      removable: false
    },
    'accessibility-findings': {
      title: 'Accessibility findings',
      fields: {
        hasComponentBeenTestedExternalAccessibility: {
          label:
            'Has the component been tested in an external accessibility audit?',
          hint: 'This would be from a third party organisation.'
        },
        hasComponentBeenTestedInternalAudit: {
          label: 'Has the component been reviewed internally?',
          hint: 'This would be within UK Government.'
        },
        hasComponentBeenTestedUsingAssistiveTechnology: {
          label: 'Has the component been tested with assistive technology?',
          hint: 'This could be with screen reader software or an adaptive keyboard.'
        }
      },
      showOnCya: false,
      removable: false
    },
    'add-external-audit': {
      title: 'External accessibility audit',
      fields: {
        externalOrganisation: {
          label: 'Which organisation did the external accessibility audit?'
        },
        auditDate: {
          label: 'When was the audit?',
          hint: 'For example, 13 8 2024'
        },
        issuesDiscovered: {
          label: 'Enter details about issues discovered by the external audit'
        }
      },
      conditions: {
        '/accessibility-findings': {
          hasComponentBeenTestedExternalAccessibility: 'yes'
        }
      },
      showOnCya: true,
      removable: true
    },
    'add-internal-audit': {
      title: 'Internal accessibility review',
      fields: {
        internalOrganisation: {
          label: 'What team did the internal accessibility review?'
        },
        auditDate: {
          label: 'When was the review?',
          hint: 'For example, 13 8 2024'
        },
        issuesDiscovered: {
          label: 'Enter details about issues discovered by the internal review'
        }
      },
      conditions: {
        '/accessibility-findings': {
          hasComponentBeenTestedInternalAudit: 'yes'
        }
      },
      showOnCya: true,
      removable: true
    },
    'add-assistive-tech': {
      title: 'Testing with assistive technology',
      fields: {
        testingDate: {
          label: 'When was the component tested with assistive technology?',
          hint: 'For example, 13 8 2024'
        },
        issuesDiscovered: {
          label:
            'Enter details about issues discovered by the assistive technology testing'
        }
      },
      conditions: {
        '/accessibility-findings': {
          hasComponentBeenTestedUsingAssistiveTechnology: 'yes'
        }
      },
      showOnCya: true,
      removable: true
    },
    'component-code': {
      title: 'Component code',
      fields: {
        componentCodeAvailable: {
          label: 'Do you have code for the component?'
        }
      },
      showOnCya: false,
      removable: false
    },
    'component-code-details': {
      title: 'Component code details',
      fields: {
        componentCodeLanguage: {
          label: 'Select the code language',
          hint: 'If you have code in 2 or more languages you can add another code example.'
        },
        componentCodeLanguageOther: {
          label: 'Enter the code language'
        },
        componentCodeUsage: {
          label: 'How do you use the code? (optional)',
          hint: 'Include anything that helps users add the code to their service.'
        },
        componentCode: {
          label: 'Add the code',
          hint: 'Add the code for the component only (not the full page) without any personally identifiable or sensitive information.'
        }
      },
      conditions: {
        '/component-code': { componentCodeAvailable: 'yes' }
      },
      showOnCya: true,
      removable: true
    },
    figma: {
      title: 'Figma design',
      fields: {
        figmaUrl: {
          label: 'Do you have a Figma link for the component?'
        }
      },
      showOnCya: false,
      removable: false
    },
    'figma-link': {
      title: 'Figma design details',
      fields: {
        figmaLink: {
          label: 'Add a link to a Figma design file showing the component',
          hint: 'Set the sharing permissions so that it can be viewed.'
        },
        figmaLinkAdditionalInformation: {
          label: 'Add information about the Figma design file (optional)',
          hint: 'This might include the password for a protected file, or a link expiry date.'
        }
      },
      conditions: {
        '/figma': { figmaUrl: 'yes' }
      },
      showOnCya: true,
      removable: true
    },
    'your-details': {
      title: 'Your details',
      fields: {
        fullName: {
          label: 'Full name'
        },
        emailAddress: {
          label: 'Email address'
        },
        teamName: {
          label: 'What team were you in when this component was created?'
        },
        shareYourDetails: {
          label: 'Displaying your details on the component page',
          hint: 'Adding your details to the component enables other users to contact you (or your team) to collaborate on the component. This is optional.'
        }
      },
      showOnCya: true,
      removable: false
    },
    'check-your-answers': {}
  },
  ADD_NEW_COMPONENT_ROUTE: '/contribute/add-new-component',
  MAX_ADD_ANOTHER: 10,
  ACRONYMS_TO_UPPERCASE: ['url'],
  CHECK_YOUR_ANSWERS_LABEL_OVERRIDES: {
    'component-code-details': {
      title: 'Code sample',
      fields: {
        componentCodeUsage: 'Usage',
        componentCodeLanguage: 'Language',
        componentCodeLanguageOther: 'Language',
        componentCode: 'Code'
      }
    }
  },
  SHARE_YOUR_DETAILS: {
    addNameToComponentPage: 'add my name to the component page',
    addTeamNameToComponentPage: 'add my team name to the component page'
  }
}

module.exports = config
