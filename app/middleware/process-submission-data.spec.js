const { generateMarkdown } = require('../middleware/generate-documentation')

const {
  processSubmissionData,
  processSubmissionFiles,
  processPersonalData,
  buildComponentPage,
  generateSubmissionRef,
  getDetailsForPrEmail,
  extractFilename
} = require('./process-subission-data')

jest.mock('../middleware/generate-documentation', () => ({
  generateMarkdown: jest.fn()
}))

describe('generateSubmissionRef', () => {
  let req, res, next
  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
    jest.clearAllMocks()
  })
  it('generates a ref using the current date', () => {
    const date = new Date('2025-05-14')
    jest.useFakeTimers().setSystemTime(date)
    generateSubmissionRef(req, res, next)
    expect(req.submissionRef).toBe('submission-1747180800000')
    expect(next).toHaveBeenCalled()
  })
})

describe('buildComponentPage', () => {
  let req, res, next
  beforeEach(() => {
    console.log('beforeEach')
    req = {}
    res = {}
    next = jest.fn()
    jest.clearAllMocks()
  })
  it('adds the generated doc to the request', () => {
    generateMarkdown.mockReturnValue({
      filename: 'test-filename.md',
      content: 'markdown content'
    })
    buildComponentPage(req, res, next)

    expect(req.markdownFilename).toBe('test-filename.md')
    expect(req.markdownContent).toBe('markdown content')
    expect(req.markdown).toStrictEqual({
      'test-filename.md': 'markdown content'
    })
    expect(next).toHaveBeenCalled()
  })
})

describe('processPersonalData', () => {
  let req, res, next
  beforeEach(() => {
    req = { session: {} }
    res = {}
    next = jest.fn()
    jest.clearAllMocks()
  })
  it('sets fullname and teamname if no data in session', () => {
    processPersonalData(req, res, next)

    expect(req.session['/your-details']).toStrictEqual({
      fullName: 'Not shared',
      teamName: 'Not shared'
    })
    expect(next).toHaveBeenCalled()
  })

  it('excludes personal data by default', () => {
    req.session['/your-details'] = {
      fullName: 'Frodo Baggins',
      teamName: 'The Fellowship'
    }

    processPersonalData(req, res, next)

    expect(req.session['/your-details']).toStrictEqual({
      fullName: 'Not shared',
      teamName: 'Not shared'
    })
    expect(next).toHaveBeenCalled()
  })

  it('adds name if permission given', () => {
    req.session['/your-details'] = {
      fullName: 'Frodo Baggins',
      teamName: 'The Fellowship',
      shareYourDetails: ['addNameToComponentPage']
    }

    processPersonalData(req, res, next)

    expect(req.session['/your-details'].fullName).toBe('Frodo Baggins')
    expect(req.session['/your-details'].teamName).toBe('Not shared')
    expect(next).toHaveBeenCalled()
  })

  it('adds team name if permission given', () => {
    req.session['/your-details'] = {
      fullName: 'Frodo Baggins',
      teamName: 'The Fellowship',
      shareYourDetails: ['addTeamNameToComponentPage']
    }

    processPersonalData(req, res, next)

    expect(req.session['/your-details'].fullName).toBe('Not shared')
    expect(req.session['/your-details'].teamName).toBe('The Fellowship')
    expect(next).toHaveBeenCalled()
  })

  it('adds name and team name if permission given', () => {
    req.session['/your-details'] = {
      fullName: 'Frodo Baggins',
      teamName: 'The Fellowship',
      shareYourDetails: ['addNameToComponentPage', 'addTeamNameToComponentPage']
    }

    processPersonalData(req, res, next)

    expect(req.session['/your-details'].fullName).toBe('Frodo Baggins')
    expect(req.session['/your-details'].teamName).toBe('The Fellowship')
    expect(next).toHaveBeenCalled()
  })

  it('preserves other data in your details object', () => {
    req.session['/your-details'] = {
      fullName: 'Frodo Baggins',
      teamName: 'The Fellowship',
      shareYourDetails: [
        'addNameToComponentPage',
        'addTeamNameToComponentPage'
      ],
      otherKey: 'extraValue'
    }

    processPersonalData(req, res, next)

    expect(req.session['/your-details']).toStrictEqual({
      fullName: 'Frodo Baggins',
      teamName: 'The Fellowship',
      shareYourDetails: [
        'addNameToComponentPage',
        'addTeamNameToComponentPage'
      ],
      otherKey: 'extraValue'
    })
    expect(next).toHaveBeenCalled()
  })
})

describe('getDetailsForPrEmail', () => {
  let req, res, next
  beforeEach(() => {
    req = { session: {} }
    res = {}
    next = jest.fn()
  })
  it('fails gracefully', () => {
    getDetailsForPrEmail(req, res, next)
    expect(req.detailsForPrEmail).toStrictEqual({
      componentName: 'Unnamed component',
      email: undefined,
      name: undefined,
      team: undefined
    })
    expect(next).toHaveBeenCalled()
  })
  it('adds the details from the session to the request', () => {
    req.session['/your-details'] = {
      fullName: 'Frodo Baggins',
      teamName: 'The Fellowship'
    }
    req.session['/component-details'] = {
      componentName: 'Test component'
    }
    req.session['/email'] = {
      emailAddress: 'test@email.com'
    }
    getDetailsForPrEmail(req, res, next)
    expect(req.detailsForPrEmail).toStrictEqual({
      componentName: 'Test component',
      email: 'test@email.com',
      name: 'Frodo Baggins',
      team: 'The Fellowship'
    })
    expect(next).toHaveBeenCalled()
  })
})

describe('extractFilename', () => {
  it('handles starting slash', () => {
    expect(extractFilename('/your-details')).toBe('your-details.txt')
  })
  it('handles no starting slash', () => {
    expect(extractFilename('your-details')).toBe('your-details.txt')
  })
  it('handles subpages', () => {
    expect(extractFilename('/component-code/2')).toBe('component-code-2.txt')
  })
  it('handles extension already present', () => {
    expect(extractFilename('component-image.md')).toBe('component-image.md')
  })
})

describe('processSubmissionData', () => {
  let req, res, next
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    req = {
      session: {},
      markdown: {},
      submissionFiles: {},
      submissionRef: 'test-submission-123'
    }
    res = {}
    next = jest.fn()
  })

  describe('basic functionality', () => {
    it('should call next() after processing', () => {
      processSubmissionData(req, res, next)
      expect(next).toHaveBeenCalledTimes(1)
    })

    it('should add submissionData property to req object', () => {
      processSubmissionData(req, res, next)
      expect(req.submissionData).toBeDefined()
      expect(typeof req.submissionData).toBe('object')
    })
  })

  describe('data filtering', () => {
    it('should exclude filtered keys from session data', () => {
      const filteredKeys = [
        '/componentImage',
        'cookie',
        'csrfToken',
        '/email',
        'emailDomainAllowed',
        'emailToken',
        'started',
        'verified'
      ]

      req.session = {}
      filteredKeys.forEach((key) => {
        req.session[key] = 'some value'
      })

      processSubmissionData(req, res, next)

      // Check that none of the filtered keys appear in submissionData
      const submissionDataKeys = Object.keys(req.submissionData)
      filteredKeys.forEach((filteredKey) => {
        expect(
          submissionDataKeys.some((key) => key.includes(filteredKey))
        ).toBe(false)
      })
    })

    it('should include non-filtered keys from session data', () => {
      req.session = {
        '/component-name': { title: 'Test Component' },
        '/description': { description: 'A test component' },
        '/email': { emailAddress: 'test@example.com' } // This should be filtered out
      }

      processSubmissionData(req, res, next)

      expect(
        req.submissionData[
          `submissions/${req.submissionRef}/component-name.txt`
        ]
      ).toStrictEqual({ title: 'Test Component' })
      expect(
        req.submissionData[`submissions/${req.submissionRef}/description.txt`]
      ).toStrictEqual({ description: 'A test component' })

      // Email should not be present
      const keys = Object.keys(req.submissionData)
      expect(keys.some((key) => key.includes('email'))).toBe(false)
    })
  })

  describe('session and markdown data merging', () => {
    it('should merge session and markdown data', () => {
      req.session = { sessionKey: { sessionKey: 'session value' } }
      req.markdown = { markdownKey: { markdownKey: 'markdown value' } }

      processSubmissionData(req, res, next)

      expect(
        req.submissionData[`submissions/${req.submissionRef}/sessionKey.txt`]
      ).toStrictEqual({ sessionKey: 'session value' })
      expect(
        req.submissionData[`submissions/${req.submissionRef}/markdownKey.txt`]
      ).toStrictEqual({ markdownKey: 'markdown value' })
    })
  })

  describe('file handling', () => {
    it('should handle submission files with buffer data', () => {
      const testBuffer = Buffer.from('test file content')
      req.session = { fileKey: 'some data' }
      req.submissionFiles = {
        fileKey: {
          path: 'uploads/test-file.txt',
          buffer: testBuffer
        }
      }

      processSubmissionData(req, res, next)

      expect(req.submissionData['docs/uploads/test-file.txt']).toEqual({
        buffer: testBuffer
      })
    })
  })

  describe('markdown file handling', () => {
    it('should place .md files in docs/components/ directory', () => {
      req.session = {}
      req.markdown = { 'component-name.md': 'markdown content' }

      processSubmissionData(req, res, next)

      expect(req.submissionData['docs/components/component-name.md']).toBe(
        'markdown content'
      )
    })
  })

  describe('component code handling', () => {
    it('should handle JavaScript component code', () => {
      req.session = {
        '/component-code-details': {
          componentCodeLanguage: 'javascript',
          componentCode: 'console.log("Hello World");'
        }
      }

      processSubmissionData(req, res, next)

      const expectedCode = Buffer.from('console.log("Hello World");').toString(
        'base64'
      )
      expect(
        req.submissionData[`submissions/${req.submissionRef}/code/example.js`]
      ).toEqual({
        buffer: expectedCode
      })
    })

    it('should handle Nunjucks component code', () => {
      req.session = {
        '/component-code-details': {
          componentCodeLanguage: 'nunjucks',
          componentCode: '{% extends "layout.njk" %}'
        }
      }

      processSubmissionData(req, res, next)

      const expectedCode = Buffer.from('{% extends "layout.njk" %}').toString(
        'base64'
      )
      expect(
        req.submissionData[`submissions/${req.submissionRef}/code/example.njk`]
      ).toEqual({
        buffer: expectedCode
      })
    })

    it('should handle component code with example numbers', () => {
      req.session = {
        '/component-code-details/2': {
          componentCodeLanguage: 'javascript',
          componentCode: 'const example2 = true;'
        }
      }

      processSubmissionData(req, res, next)

      const expectedCode = Buffer.from('const example2 = true;').toString(
        'base64'
      )
      expect(
        req.submissionData[`submissions/${req.submissionRef}/code/example-2.js`]
      ).toEqual({
        buffer: expectedCode
      })
    })

    it('should not create code files for "other" language', () => {
      req.session = {
        '/component-code-details': {
          componentCodeLanguage: 'other',
          componentCode: 'some other code'
        }
      }

      processSubmissionData(req, res, next)

      // Should not create a code file, but should still create the data file
      const codeFileExists = Object.keys(req.submissionData).some((key) =>
        key.includes('/code/')
      )
      expect(codeFileExists).toBe(false)

      expect(
        req.submissionData[
          `submissions/${req.submissionRef}/component-code-details.txt`
        ]
      ).toEqual({
        componentCodeLanguage: 'other',
        componentCode: 'some other code'
      })
    })

    it('should handle case-insensitive "other" language check', () => {
      req.session = {
        '/component-code-details': {
          componentCodeLanguage: 'OTHER',
          componentCode: 'some other code'
        }
      }

      processSubmissionData(req, res, next)

      const codeFileExists = Object.keys(req.submissionData).some((key) =>
        key.includes('/code/')
      )
      expect(codeFileExists).toBe(false)
      expect(
        req.submissionData[
          `submissions/${req.submissionRef}/component-code-details.txt`
        ]
      ).toEqual({
        componentCodeLanguage: 'OTHER',
        componentCode: 'some other code'
      })
    })
  })

  describe('data cloning', () => {
    it('should clone session data objects to avoid mutation', () => {
      const originalData = { nested: { value: 'test' } };
      req.session = { '/component-data': originalData };

      processSubmissionData(req, res, next);

      const submissionDataValue = req.submissionData[`submissions/${req.submissionRef}/component-data.txt`];

      // Should be equal but not the same reference
      expect(submissionDataValue).toEqual(originalData);
      expect(submissionDataValue).not.toBe(originalData);
    });
  });
})
