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
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_CSP_REPORT_URI: process.env.SENTRY_CSP_REPORT_URI || '',
  ALLOWED_EMAIL_DOMAINS: [
    'justice.gov.uk',
    'cica.gov.uk',
    'hmcts.net',
    'publicguardian.gov.uk'
  ],
  HTML_SANITIZATION_OPTIONS: {
    allowedTags: [
      // Document structure
      'html',
      'head',
      'body',
      'title',
      'base',
      'link',
      'meta',
      // 'style',

      // Sections
      'header',
      'nav',
      'main',
      'section',
      'article',
      'aside',
      'footer',
      'address',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'hgroup',

      // Grouping content
      'div',
      'p',
      'pre',
      'blockquote',
      'ol',
      'ul',
      'menu',
      'li',
      'dl',
      'dt',
      'dd',
      'figure',
      'figcaption',
      'hr',

      // Text-level semantics
      'a',
      'em',
      'strong',
      'small',
      's',
      'cite',
      'q',
      'dfn',
      'abbr',
      'ruby',
      'rt',
      'rp',
      'data',
      'time',
      'code',
      'var',
      'samp',
      'kbd',
      'sub',
      'sup',
      'i',
      'b',
      'u',
      'mark',
      'bdi',
      'bdo',
      'span',
      'br',
      'wbr',

      // Edits
      'ins',
      'del',

      // Embedded content
      'img',
      'video',
      'audio',
      'video',
      'audio',
      // 'picture', 'source', 'iframe', 'embed', 'object', 'param',
      // 'track', 'map', 'area', 'svg', 'math',

      // Tabular data
      'table',
      'caption',
      'colgroup',
      'col',
      'tbody',
      'thead',
      'tfoot',
      'tr',
      'td',
      'th',

      // Forms
      'form',
      'label',
      'input',
      'button',
      'select',
      'datalist',
      'optgroup',
      'option',
      'textarea',
      'output',
      'progress',
      'meter',
      'fieldset',
      'legend',

      // Interactive elements
      'details',
      'summary',
      'dialog',

      // Scripting
      'noscript',
      'template',
      'slot'
      // script, canvas
    ],
    allowedAttributes: {
      '*': [
        'abbr',
        'accept',
        'accept-charset',
        'accesskey',
        'action',
        'allow',
        'alt',
        'as',
        'autocapitalize',
        'autocomplete',
        'blocking',
        'charset',
        'cite',
        'class',
        'color',
        'cols',
        'colspan',
        'content',
        'contenteditable',
        'coords',
        'crossorigin',
        'data',
        'datetime',
        'decoding',
        'dir',
        'dirname',
        'download',
        'draggable',
        'enctype',
        'enterkeyhint',
        'fetchpriority',
        'for',
        'form',
        'formaction',
        'formenctype',
        'formmethod',
        'formtarget',
        'headers',
        'height',
        'hidden',
        'high',
        'href',
        'hreflang',
        'http-equiv',
        'id',
        'imagesizes',
        'imagesrcset',
        'inputmode',
        'integrity',
        'is',
        'itemid',
        'itemprop',
        'itemref',
        'itemtype',
        'kind',
        'label',
        'lang',
        'list',
        'loading',
        'low',
        'max',
        'maxlength',
        'media',
        'method',
        'min',
        'minlength',
        'name',
        'nonce',
        'optimum',
        'pattern',
        'ping',
        'placeholder',
        'popover',
        'popovertarget',
        'popovertargetaction',
        'poster',
        'preload',
        'referrerpolicy',
        'rel',
        'rows',
        'rowspan',
        'sandbox',
        'scope',
        'shape',
        'size',
        'sizes',
        'slot',
        'span',
        'spellcheck',
        'src',
        'srcdoc',
        'srclang',
        'srcset',
        'start',
        'step',
        'style',
        'tabindex',
        'target',
        'title',
        'translate',
        'type',
        'usemap',
        'value',
        'width',
        'wrap'
      ]
    } // allow all attributes (on every tag for simplicity) except on-* event handlers
  },
  COMPONENT_FORM_PAGES: {
    email: {
      title: 'Verify that you work for MoJ',
      fields: {
        emailAddress: {
          label: 'Enter your MoJ email address'
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
          hint: 'If you have code in more than one language, add another code block.'
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
          hint: 'Set the sharing permissions so that it can be viewed and copied.'
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
        teamName: {
          label: 'What team were you in when this component was created?'
        },
        shareYourDetails: {
          label: 'Displaying your details on the component page (optional)',
          hint: 'Adding your details to the component enables other users to contact you (or your team).'
        }
      },
      showOnCya: true,
      removable: false
    },
    'check-your-answers': {}
  },
  IMAGE_DIRECTORY: 'assets/images',
  DOCUMENT_DIRECTORY: 'assets/files',
  IMAGE_KEYS: ['componentImage'],
  DOCUMENT_KEYS: [],
  ADD_NEW_COMPONENT_ROUTE: '/contribute/add-new-component',
  MAX_ADD_ANOTHER: 10,
  GITHUB_ISSUE_ASSIGNEE_USERNAMES: ['chrispymm', 'helennickols', 'murrlipp'],
  SESSION_KEYS_TO_IGNORE: [
    'cookie',
    'csrfToken',
    '/email', // don't commit personal data
    'emailDomainAllowed',
    'emailToken',
    'started',
    'verified'
  ],
  CHECK_YOUR_ANSWERS_LABEL_OVERRIDES: {
    'component-code-details': {
      title: 'Code block',
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
  },
  MESSAGES: {
    emailVerificationSuccess: {
      type: 'success',
      title: 'Your email address has been confirmed',
      text: 'You can now submit a component'
    },
    componentImageUploaded: (filename) => {
      return {
        type: 'success',
        text: `File ‘${filename}’ has been uploaded.`
      }
    },
    componentImageRemoved: (filename) => {
      return {
        type: 'success',
        text: `File ‘${filename}’ has been removed.`
      }
    },
    componentCodeAdded: (number) => {
      return {
        type: 'success',
        text: `Code block ${number} added`
      }
    }
  }
}

module.exports = config
