/* eslint-disable  @typescript-eslint/no-unused-vars */
const {
  IMAGE_DIRECTORY,
  IMAGE_KEYS,
  DOCUMENT_DIRECTORY,
  DOCUMENT_KEYS
} = require('../config')
const { extractFilename, getUniqueFilename } = require('../helpers/file-helper')
const { getFileFromRedis } = require('../helpers/redis-helper')
const { generateMarkdown, generateEleventyDataFile } = require('../middleware/generate-documentation')

const {
  processSubmissionData,
  processSubmissionFiles,
  processPersonalData,
  buildComponentPage,
  generateSubmissionRef,
  getDetailsForPrEmail
} = require('./process-subission-data')

jest.mock('../middleware/generate-documentation', () => ({
  generateMarkdown: jest.fn(),
  generateEleventyDataFile: jest.fn()
}))
jest.mock('../helpers/file-helper', () => ({
  extractFilename: jest.fn(),
  getUniqueFilename: jest.fn()
}))
jest.mock('../helpers/redis-helper', () => ({
  getFileFromRedis: jest.fn()
}))
jest.mock('../config', () => {
  const originalConfig = jest.requireActual('../config')
  return {
    ...originalConfig,
    IMAGE_DIRECTORY: 'images',
    IMAGE_KEYS: ['testImage'],
    DOCUMENT_DIRECTORY: 'docs',
    DOCUMENT_KEYS: ['testReport']
  }
})

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
    generateMarkdown.mockReturnValueOnce({
      filename: 'test-component/index.md',
      content: 'index content'
    }).mockReturnValueOnce({
      filename: 'test-component/_overview.md',
      content: 'overview content'
    }).mockReturnValueOnce({
      filename: 'test-component/_designs.md',
      content: 'designs content'
    }).mockReturnValueOnce({
      filename: 'test-component/_accessibility.md',
      content: 'accessibility content'
    }).mockReturnValueOnce({
      filename: 'test-component/_code.md',
      content: 'code content'
    })

    generateEleventyDataFile.mockReturnValue({
      filename: 'test-component/test-component.11tydata.js',
      content: 'export default {}'
    })

    buildComponentPage(req, res, next)

    // expect(req.markdownFilename).toBe('test-filename.md')
    expect(req.markdownContent).toBe(`index content

overview content

designs content

accessibility content

code content

`)
    expect(req.markdown).toStrictEqual({
      'test-component/index.md': 'index content',
      'test-component/_overview.md': 'overview content',
      'test-component/_designs.md': 'designs content',
      'test-component/_accessibility.md': 'accessibility content',
      'test-component/_code.md': 'code content',
      'test-component/test-component.11tydata.js': 'export default {}',
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
        'component-name': { title: 'Test Component' },
        description: { description: 'A test component' },
        '/email': { emailAddress: 'test@example.com' } // This should be filtered out
      }

      extractFilename.mockImplementation((key) => `${key}.txt`)

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

      extractFilename.mockImplementation((key) => `${key}.txt`)

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

  describe('code handling', () => {
    it('should create buffers for code with known language', () => {
      const testCode = '<p>test</p>'
      const expectedBuffer = Buffer.from(testCode).toString('base64')
      req.session = {
        '/component-code-details': {
          componentCodeLanguage: 'HTML',
          componentCode: testCode
        }
      }

      extractFilename.mockImplementation((key) => `${key}.txt`)
      processSubmissionData(req, res, next)

      expect(
        req.submissionData['submissions/test-submission-123/code/example.html']
      ).toEqual({
        buffer: expectedBuffer
      })
    })
    it('should create multiple buffers for code with known languages', () => {
      const testHtml = '<p>test</p>'
      const testCss = 'p { color: red; }'
      const expectedHtmlBuffer = Buffer.from(testHtml).toString('base64')
      const expectedCssBuffer = Buffer.from(testCss).toString('base64')
      req.session = {
        '/component-code-details': {
          componentCodeLanguage: 'HTML',
          componentCode: testHtml
        },
        '/component-code-details/1': {
          componentCodeLanguage: 'CSS',
          componentCode: testCss
        }
      }

      extractFilename.mockImplementation((key) => `${key}.txt`)
      processSubmissionData(req, res, next)

      expect(
        req.submissionData['submissions/test-submission-123/code/example.html']
      ).toEqual({
        buffer: expectedHtmlBuffer
      })
      expect(
        req.submissionData['submissions/test-submission-123/code/example-1.css']
      ).toEqual({
        buffer: expectedCssBuffer
      })
    })
    it('should not create buffers for code with other language', () => {
      req.session = {
        '/component-code-details': {
          componentCodeLanguage: 'other',
          componentCode: 'unknown language'
        }
      }

      extractFilename.mockImplementation((key) => `${key}.txt`)
      processSubmissionData(req, res, next)

      expect(req.submissionData).toEqual({
        'submissions/test-submission-123//component-code-details.txt': {
          componentCode: 'unknown language',
          componentCodeLanguage: 'other'
        }
      })
    })
  })

  describe('markdown file handling', () => {
    it('should place .md files in docs/components/ directory', () => {
      req.session = {}
      req.markdown = { 'component-name.md': 'markdown content' }

      extractFilename.mockImplementation((key) => `${key}`)

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

      extractFilename.mockImplementation((key) => `${key.slice(1)}.txt`)
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

      extractFilename.mockImplementation((key) => `${key.slice(1)}.txt`)
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

      extractFilename.mockImplementation((key) => `${key.slice(1)}.txt`)
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

      extractFilename.mockImplementation((key) => `${key.slice(1)}.txt`)
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

      extractFilename.mockImplementation((key) => `${key.slice(1)}.txt`)
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
      const originalData = { nested: { value: 'test' } }
      req.session = { '/component-data': originalData }

      extractFilename.mockImplementation((key) => `${key.slice(1)}.txt`)
      processSubmissionData(req, res, next)

      const submissionDataValue =
        req.submissionData[
          `submissions/${req.submissionRef}/component-data.txt`
        ]

      // Should be equal but not the same reference
      expect(submissionDataValue).toEqual(originalData)
      expect(submissionDataValue).not.toBe(originalData)
    })
  })
})
describe('processSubmissionFiles', () => {
  let req

  beforeEach(() => {
    jest.clearAllMocks()

    req = {
      session: {},
      submissionRef: 'test-submission-123'
    }

    // Default mocks
    getUniqueFilename.mockImplementation((originalname, _existingFilenames) => {
      return originalname // Simple implementation for most tests
    })
  })

  describe('basic functionality', () => {
    it('should return empty object when no files in session', async () => {
      req.session = {
        regularData: 'some value',
        otherData: { prop: 'value' }
      }

      const result = await processSubmissionFiles(req)

      expect(result).toEqual({})
      expect(getFileFromRedis).not.toHaveBeenCalled()
    })

    it('should skip filtered session keys', async () => {
      const filteredKeys = [
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
        req.session[key] = {
          componentImage: {
            redisKey: 'file:test-key'
          }
        }
      })

      const result = await processSubmissionFiles(req)

      expect(result).toEqual({})
      expect(getFileFromRedis).not.toHaveBeenCalled()
    })
  })

  describe('image file processing', () => {
    it('should process image files correctly', async () => {
      const mockBuffer = Buffer.from('image content')
      getFileFromRedis.mockResolvedValue({
        buffer: mockBuffer,
        originalname: 'test-image.png'
      })
      getUniqueFilename.mockReturnValue('test-image.png')

      req.session = {
        '/component-image': {
          testImage: {
            redisKey: 'file:image-123'
          }
        }
      }

      const result = await processSubmissionFiles(req)

      expect(getFileFromRedis).toHaveBeenCalledWith('file:image-123')
      expect(getUniqueFilename).toHaveBeenCalledWith(
        'test-image.png',
        expect.any(Set)
      )
      expect(result).toEqual({
        '/component-image': {
          path: 'images/test-submission-123/test-image.png',
          buffer: mockBuffer.toString('base64')
        }
      })
    })

    it('should handle multiple component images', async () => {
      const mockBuffer1 = Buffer.from('image 1')
      const mockBuffer2 = Buffer.from('image 2')

      getFileFromRedis
        .mockResolvedValueOnce({
          buffer: mockBuffer1,
          originalname: 'image1.jpg'
        })
        .mockResolvedValueOnce({
          buffer: mockBuffer2,
          originalname: 'image2.png'
        })

      getUniqueFilename
        .mockReturnValueOnce('image1.jpg')
        .mockReturnValueOnce('image2.png')

      req.session = {
        '/component-image-1': {
          testImage: {
            redisKey: 'file:image-1'
          }
        },
        '/component-image-2': {
          testImage: {
            redisKey: 'file:image-2'
          }
        }
      }

      const result = await processSubmissionFiles(req)

      expect(getFileFromRedis).toHaveBeenCalledTimes(2)
      expect(result).toEqual({
        '/component-image-1': {
          path: 'images/test-submission-123/image1.jpg',
          buffer: mockBuffer1.toString('base64')
        },
        '/component-image-2': {
          path: 'images/test-submission-123/image2.png',
          buffer: mockBuffer2.toString('base64')
        }
      })
    })
  })

  describe('document file processing', () => {
    it('should process document files correctly', async () => {
      const mockBuffer = Buffer.from('report content')
      getFileFromRedis.mockResolvedValue({
        buffer: mockBuffer,
        originalname: 'accessibility-report.pdf'
      })
      getUniqueFilename.mockReturnValue('accessibility-report.pdf')

      req.session = {
        '/accessibility-report': {
          testReport: {
            redisKey: 'file:report-456'
          }
        }
      }

      const result = await processSubmissionFiles(req)

      expect(getFileFromRedis).toHaveBeenCalledWith('file:report-456')
      expect(result).toEqual({
        '/accessibility-report': {
          path: 'docs/test-submission-123/accessibility-report.pdf',
          buffer: mockBuffer.toString('base64')
        }
      })
    })
  })

  describe('unique filename handling', () => {
    it('should track existing filenames to ensure uniqueness', async () => {
      const mockBuffer1 = Buffer.from('content1')
      const mockBuffer2 = Buffer.from('content2')

      getFileFromRedis
        .mockResolvedValueOnce({
          buffer: mockBuffer1,
          originalname: 'duplicate.txt'
        })
        .mockResolvedValueOnce({
          buffer: mockBuffer2,
          originalname: 'duplicate.txt'
        })

      getUniqueFilename
        .mockReturnValueOnce('duplicate.txt')
        .mockReturnValueOnce('duplicate-1.txt')

      req.session = {
        '/file-1': {
          testImage: {
            redisKey: 'file:test1'
          }
        },
        '/file-2': {
          testImage: {
            redisKey: 'file:test2'
          }
        }
      }

      await processSubmissionFiles(req)

      // Verify that getUniqueFilename was called with the same Set instance
      const calls = getUniqueFilename.mock.calls
      expect(calls).toHaveLength(2)
      expect(calls[0][1]).toBe(calls[1][1]) // Same Set instance
      expect(calls[0][1]).toBeInstanceOf(Set)
    })
  })
})
