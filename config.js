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
      }
    },
    'component-image': {
      title: 'Component image',
      fields: {
        componentImage: {
          label: 'Upload a file',
          hint: 'The file must be a JPG, BMP, PNG, TIF or PDF, and smaller than 10MB.'
        }
      }
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
      }
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
      }
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
      }
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
      }
    },
    prototype: {
      title: 'Prototype',
      fields: {
        componentPrototypeUrl: {
          label: 'Do you have a prototype link?',
          hint: 'For example to the GOV.UK Prototype Kit, Figma, Sketch, Mural or Miro.'
        }
      }
    },
    'prototype-url': {
      title: 'Prototype details',
      fields: {
        prototypeUrl: {
          label: 'Add the prototype link',
          hint: 'For example, to the GOV.UK Prototype Kit, Figma, Sketch, Mural or Miro. '
        },
        prototypeUrlAdditionalInformation: {
          label: 'Add more information about the prototype (optional)',
          hint: 'Enter any relevant information, for example a username, password or link expiry date.'
        }
      },
      conditions: {
        '/prototype': { componentPrototypeUrl: 'yes' }
      }
    },
    'component-code': {
      title: 'Component code',
      fields: {
        componentCodeAvailable: {
          label: 'Do you have code for the component?'
        }
      }
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
      }
    },
    figma: {
      title: 'Figma design',
      fields: {
        figmaUrl: {
          label: 'Do you have a Figma link for the component?'
        }
      }
    },
    'figma-link': {
      title: 'Figma design details',
      fields: {
        figmaLink: {
          label: 'Add a link to the Figma design file',
          hint: 'Set the sharing permissions so that it can be viewed.'
        },
        figmaLinkAdditionalInformation: {
          label: 'Add information about the Figma design file (optional)',
          hint: 'This might include the password for a protected file, or a link expiry date.'
        }
      },
      conditions: {
        '/figma': { figmaUrl: 'yes' }
      }
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
          label: 'Sharing your contact details on the component page',
          hint: 'Adding your details to the component enables other users to contact you (or your team) to collaborate on the component.\r\nSelect all that apply'
        }
      }
    },
    'check-your-answers': {}
  },
  ADD_NEW_COMPONENT_ROUTE: '/contribute/add-new-component',
  MAX_ADD_ANOTHER: 10,
  ACRONYMS_TO_UPPERCASE: ['url'],
  CHECK_YOUR_ANSWERS_LABEL_OVERRIDES: {
    // componentOverview: 'Component description',
    // howIsTheComponentUsed: 'How the component is being used in your service',
    // accessibilityReport: 'Audit report',
    // externalOrganisation: 'External accessibility audit supplier',
    // internalOrganisation: 'Internal accessibility audit supplier',
    // issuesDiscovered: 'Issues discovered during the audit',
    // prototypeUrl: 'Prototype link',
    // prototypeUrlAdditionalInformation: 'Additional information',
    // componentCode: 'Code',
    // componentCodeUsage: 'Code usage',
    // componentCodeLanguage: 'Code language',
    // componentCodeLanguageOther: 'Other code language',
    // figmaLink: 'Prototype link',
    // figmaLinkAdditionalInformation: 'Additional information',
    // shareYourDetails: 'Share your details on the component page',
    // componentImage: 'Supporting file'
  },
  CHECK_YOUR_ANSWERS: {
    sections: [
      {
        title: 'Component details',
        data: ['component-details', 'component-image']
      },
      {
        title: 'External accessibility audit',
        data: [
          {
            'accessibility-findings': {
              includeFields: ['hasComponentBeenTestedExternalAccessibility']
            }
          },
          'add-external-audit'
        ]
      },
      {
        title: 'Internal accessibility review',
        data: [
          {
            'accessibility-findings': {
              includeFields: ['hasComponentBeenTestedInternalAudit']
            }
          },
          'add-internal-audit'
        ]
      },
      {
        title: 'Assistive technology testing',
        data: [
          {
            'accessibility-findings': {
              includeFields: ['hasComponentBeenTestedUsingAssistiveTechnology']
            }
          },
          'add-assistive-tech'
        ]
      },
      { title: 'Prototype', data: ['prototype', 'prototype-url'] },
      { title: 'Figma', data: ['figma', 'figma-link'] },
      { title: 'Code', data: ['component-code', 'component-code-details'] },
      { title: 'Your details', data: ['your-details'] }
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
      // '/component-image',
      '/prototype-url',
      '/figma-link',
      '/component-code-details'
    ],
    ignoreFields: []
  },
  SHARE_YOUR_DETAILS: {
    addNameToComponentPage: 'add my name to the component page',
    addTeamNameToComponentPage: 'add my team name to the component page'
  }
}

module.exports = config
