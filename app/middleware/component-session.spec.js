const ApplicationError = require('../helpers/application-error')

// Mocked modules
const { sanitize } = require('express-xss-sanitizer')
const redis = require('../helpers/redis-client')
const { getHashedUrl } = require('../helpers/url-helper')
const { getNextPage, getPreviousPage } = require('../helpers/page-navigation')
const { getAnswersForSection } = require('../helpers/check-your-answers')
const getCurrentFormPages = require('../helpers/form-pages')
const { MAX_ADD_ANOTHER: maxAddAnother } = require('../config')
const { getSchema } = require('../schema/schemas')

// Functions under test
const {
  setNextPage,
  setCurrentFormPages,
  validateFormData,
  saveSession,
  getFormDataFromSession,
  getRawSessionText,
  canAddAnother,
  getBackLink,
  getFormSummaryListForRemove,
  removeFromSession,
  sessionStarted,
  sessionVerified,
  validateFormDataFileUpload,
  validateComponentImagePage,
  saveFileToRedis,
  clearSkippedPageData,
  checkEmailDomain,
  validatePageParams,
  setCsrfToken,
  xssComponentCode,
  setSuccessMessage,
  getPageData,
  getTemplate
} = require('./component-session.js')

// Initialize mocks
jest.mock('express-xss-sanitizer')
jest.mock('../helpers/redis-client', () => ({
  set: jest.fn()
}))
jest.mock('../helpers/url-helper', () => ({
  getHashedUrl: jest.fn()
}))
jest.mock('../helpers/page-navigation', () => ({
  getNextPage: jest.fn(),
  getPreviousPage: jest.fn()
}))
jest.mock('../config', () => {
  const original = jest.requireActual('../config')
  return {
    ...original,
    MAX_ADD_ANOTHER: 3
  }
})
jest.mock('../helpers/check-your-answers', () => ({
  getAnswersForSection: jest.fn()
}))
jest.mock('../helpers/form-pages', () => jest.fn())
jest.mock('../schema/schemas', () => ({
  getSchema: jest.fn()
}))


describe('setCurrentFormPages', () => {
  it('sets the formPages key on the request', () => {
    const req = { url: '/component-details', session: {} }
    const res = {}
    const next = jest.fn()

    setCurrentFormPages(req, res, next)

    expect(req).toHaveProperty('formPages')
    expect(next).toHaveBeenCalled()
  })
})

describe('getPageData', () => {
  it('should return the data from formConfig', () => {
    const pageData = {
      title: 'Verify that you work for MoJ',
      fields: {
        emailAddress: {
          label: 'Enter your justice.gov.uk email address'
        }
      },
      showOnCya: false,
      removable: false
    }

    const result = getPageData({ params: { page: 'email' } })

    expect(result).toStrictEqual(pageData)
  })
  it('should return an empty object if the page does not exist', () => {
    const result = getPageData({ params: { page: 'not-a-page' } })

    expect(result).toStrictEqual({})
  })
})

describe('getTemplate', () => {
  test('it should return the template name from the page param', () => {
    const result = getTemplate({ params: { page: 'email' } })

    expect(result).toBe('email')
  })
  test('it should return the template name from the path param', () => {
    const result = getTemplate({ params: {}, path: '/email' })

    expect(result).toBe('email')
  })
  test('it should return error if page does not exist', () => {
    const result = getTemplate({ params: { page: 'not-a-page' } })

    expect(result).toBe('error')
  })
})

describe('checkEmailDomain', () => {
  test('allows justice.gov.uk', () => {
    const req = { body: { emailAddress: 'test.user@justice.gov.uk' } }
    const next = jest.fn()
    checkEmailDomain(req, {}, next)

    expect(req).toHaveProperty('emailDomainAllowed')
    expect(req.emailDomainAllowed).toBe(true)
    expect(next).toHaveBeenCalled()
  })
  test('disallows digital.justice.gov.uk', () => {
    const req = { body: { emailAddress: 'test.user@digital.justice.gov.uk' } }
    const next = jest.fn()
    checkEmailDomain(req, {}, next)

    expect(req).toHaveProperty('emailDomainAllowed')
    expect(req.emailDomainAllowed).toBe(false)
    expect(next).toHaveBeenCalled()
  })
  test('disallows non gov email', () => {
    const req = { body: { emailAddress: 'bob@gmail.com' } }
    const next = jest.fn()
    checkEmailDomain(req, {}, next)

    expect(req).toHaveProperty('emailDomainAllowed')
    expect(req.emailDomainAllowed).toBe(false)
    expect(next).toHaveBeenCalled()
  })
})

describe('setNextPage', () => {
  let req, res, next
  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
    jest.clearAllMocks()
  })
  test('it sets the next page', () => {
    req.url = '/component-details'
    req.session = {}
    getNextPage.mockReturnValue('/next-page')

    setNextPage(req, res, next)

    expect(req).toHaveProperty('nextPage')
    expect(req.nextPage).toBe('/next-page')
    expect(next).toHaveBeenCalled()
  })
  test('it sets nextpage to checkyouranswers', () => {
    req.url = '/component-details'
    req.session = { checkYourAnswers: true }

    getNextPage.mockReturnValue(null)
    setNextPage(req, res, next)

    expect(req).toHaveProperty('nextPage')
    expect(req.nextPage).toBe('check-your-answers')
    expect(next).toHaveBeenCalled()
  })
  test('it allows adding another when amending answers', () => {
    req.url = '/component-details'
    req.session = { checkYourAnswers: true }
    req.body = { addAnother: true }

    getNextPage.mockReturnValue('a-page')
    setNextPage(req, res, next)

    expect(req).toHaveProperty('nextPage')
    expect(req.nextPage).toBe('a-page')
    expect(next).toHaveBeenCalled()
  })
})

describe('getBackLink', () => {
  let req, res, next
  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
    jest.resetAllMocks()
  })
  it('sets back link to the previous page', () => {
    req.session = {}
    getPreviousPage.mockReturnValue('previous-page')
    getBackLink(req, res, next)

    expect(req.backLink).toBe('previous-page')
    expect(next).toHaveBeenCalled()
  })
  it('sets backlink to cya if session.checkYourAnswers is present', () => {
    req.session = { checkYourAnswers: true }
    getPreviousPage.mockReturnValue('previous-page')
    getBackLink(req, res, next)

    expect(req.backLink).toBe('check-your-answers')
    expect(next).toHaveBeenCalled()
  })
})

describe('setSuccessMessage', () => {
  const res = {}
  const next = jest.fn()
  it('adds a success message for code details', () => {
    const req = {
      session: {},
      path: '/component-code-details',
      body: { addAnother: true }
    }

    setSuccessMessage(req, res, next)

    expect(req.session).toHaveProperty('sessionFlash')
    expect(req.session.sessionFlash).toStrictEqual({
      type: 'success',
      text: `Code block 1 added`
    })
    expect(next).toHaveBeenCalled()
  })
  it('includes the correct number', () => {
    const req = {
      session: {},
      path: '/component-code-details/2',
      body: { addAnother: true }
    }

    setSuccessMessage(req, res, next)

    expect(req.session).toHaveProperty('sessionFlash')
    expect(req.session.sessionFlash).toStrictEqual({
      type: 'success',
      text: `Code block 2 added`
    })
    expect(next).toHaveBeenCalled()
  })
  it('does not add a message if we are not adding another', () => {
    const req = {
      session: {},
      path: '/component-code-details'
    }

    setSuccessMessage(req, res, next)

    expect(req.session).not.toHaveProperty('sessionFlash')
    expect(next).toHaveBeenCalled()
  })
  it('does not add a message on other pages', () => {
    const req = {
      session: {},
      path: '/figma'
    }

    setSuccessMessage(req, res, next)

    expect(req.session).not.toHaveProperty('sessionFlash')
    expect(next).toHaveBeenCalled()
  })
})

describe('validatePageParams', () => {
  const res = {}
  const next = jest.fn()
  it('sets req.page if page valid', () => {
    const req = { params: { page: 'component-details' } }

    validatePageParams(req, res, next)

    expect(req).toHaveProperty('page')
    expect(req.page).toBe('component-details')
    expect(next).toHaveBeenCalled()
  })
  it('sets req.page if page and subpage are valid', () => {
    const req = {
      params: {
        page: 'component-code-details',
        subpage: '2'
      }
    }

    validatePageParams(req, res, next)

    expect(req).toHaveProperty('page')
    expect(req.page).toBe('component-code-details')
    expect(next).toHaveBeenCalled()
  })
  it('raises an error if page not valid', () => {
    const error = new ApplicationError('Page not found', 404)
    const req = {
      params: {
        page: 'not-a-page',
        subpage: '2'
      }
    }

    validatePageParams(req, res, next)

    expect(req).not.toHaveProperty('page')
    expect(next).toHaveBeenCalledWith(error)
  })
  it('raises an error if subpage not valid', () => {
    const error = new ApplicationError('Page not found', 404)
    const req = {
      params: {
        page: 'component-code-details',
        subpage: 'not-a-sub-page'
      }
    }

    validatePageParams(req, res, next)

    expect(req).not.toHaveProperty('page')
    expect(next).toHaveBeenCalledWith(error)
  })
})

describe('setCsrfToken', () => {
  const next = jest.fn()
  test('it adds a token if one does not exist', () => {
    const req = { session: {} }
    setCsrfToken(req, {}, next)
    expect(req.session).toHaveProperty('csrfToken')
  })
  test('if a token is already set it does not change', () => {
    const req = {
      session: {
        csrfToken: '1234567890'
      }
    }
    setCsrfToken(req, {}, next)
    expect(req.session).toHaveProperty('csrfToken')
    expect(req.session.csrfToken).toBe('1234567890')
  })
})

describe('sessionVerified', () => {
  let next, redirect, res
  beforeEach(() => {
    next = jest.fn()
    redirect = jest.fn()
    res = {
      redirect
    }

    jest.clearAllMocks()
  })
  test('it calls next if verified', () => {
    const req = {
      session: { verified: true }
    }

    sessionVerified(req, res, next)

    expect(next).toHaveBeenCalled()
  })
  test('it redirects to the start page if not verified', () => {
    const req = { session: {} }

    sessionVerified(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(redirect).toHaveBeenCalledWith('/contribute/add-new-component/start')
  })
})

describe('sessionStarted', () => {
  let next, redirect, res
  beforeEach(() => {
    next = jest.fn()
    redirect = jest.fn()
    res = {
      redirect
    }

    jest.clearAllMocks()
  })
  test('it calls next if started', () => {
    const req = {
      session: { started: true }
    }

    sessionStarted(req, res, next)

    expect(next).toHaveBeenCalled()
  })
  test('it redirects to the start page if not started', () => {
    const req = { session: {} }

    sessionStarted(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(redirect).toHaveBeenCalledWith('/contribute/add-new-component/start')
  })
})

describe('removeFromSession', () => {
  let req, res, next
  beforeEach(() => {
    req = {
      url: '',
      params: {},
      session: {}
    }
    res = {
      end: jest.fn()
    }
    next = jest.fn()

    // Reset mocks
    jest.clearAllMocks()
  })
  describe('URL processing', () => {
    it('should remove /remove from URL', () => {
      req.url = '/some-page/remove'
      req.session['/some-page'] = { data: 'test' }

      removeFromSession(req, res, next)

      expect(req.session['/some-page']).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })

    it('should remove /change from URL', () => {
      req.url = '/another-page/change'
      req.session['/another-page'] = { data: 'test' }

      removeFromSession(req, res, next)

      expect(req.session['/another-page']).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })

    it('should handle URL without /remove or /change', () => {
      req.url = '/normal-page'
      req.session['/normal-page'] = { data: 'test' }

      removeFromSession(req, res, next)

      expect(req.session['/normal-page']).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })
  })
  describe('prototype pollution protection', () => {
    it('should block __proto__ and return 403', () => {
      req.url = '__proto__/remove'

      removeFromSession(req, res, next)

      expect(res.end).toHaveBeenCalledWith(403)
      expect(next).not.toHaveBeenCalled()
    })

    it('should block constructor and return 403', () => {
      req.url = 'constructor/change'

      removeFromSession(req, res, next)

      expect(res.end).toHaveBeenCalledWith(403)
      expect(next).not.toHaveBeenCalled()
    })

    it('should block prototype and return 403', () => {
      req.url = 'prototype/remove'

      removeFromSession(req, res, next)

      expect(res.end).toHaveBeenCalledWith(403)
      expect(next).not.toHaveBeenCalled()
    })
  })
  describe('component-image handling', () => {
    it('should set flash message when component-image is removed with filename', () => {
      req.url = '/test-page/remove'
      req.params.page = 'component-image'
      req.session['/test-page'] = {
        componentImage: {
          originalname: 'test-image.jpg'
        }
      }

      removeFromSession(req, res, next)

      expect(req.session.sessionFlash).toStrictEqual({
        type: 'success',
        text: 'File ‘test-image.jpg’ has been removed.'
      })
      expect(req.session['/test-page']).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })

    it('should not set flash message when componentImage is undefined', () => {
      req.url = '/test-page/remove'
      req.params.page = 'component-image'
      req.session['/test-page'] = {}

      removeFromSession(req, res, next)

      expect(req.session.sessionFlash).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })

    it('should not process component-image logic for other pages', () => {
      req.url = '/test-page/remove'
      req.params.page = 'other-page'
      req.session['/test-page'] = {
        componentImage: {
          originalname: 'test-image.jpg'
        }
      }

      removeFromSession(req, res, next)

      expect(req.session.sessionFlash).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })
  })
  describe('session cleanup', () => {
    it('should delete the session key', () => {
      req.url = '/test-page/remove'
      req.session['/test-page'] = { data: 'test' }

      removeFromSession(req, res, next)

      expect(req.session['/test-page']).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })

    it('should not throw error when deleting non-existent key', () => {
      req.url = '/non-existent/remove'

      expect(() => {
        removeFromSession(req, res, next)
      }).not.toThrow()

      expect(next).toHaveBeenCalled()
    })
  })
  describe('conditional handling', () => {
    it('should set conditional answers to "no" when conditions exist', () => {
      req.url = '/add-external-audit/remove'
      req.session['/accessibility-findings'] = {
        hasComponentBeenTestedExternalAccessibility: 'yes',
        hasComponentBeenTestedInternalAudit: 'yes'
      }

      removeFromSession(req, res, next)

      expect(
        req.session['/accessibility-findings']
          .hasComponentBeenTestedExternalAccessibility
      ).toBe('no')
      expect(
        req.session['/accessibility-findings']
          .hasComponentBeenTestedInternalAudit
      ).toBe('yes')
      expect(next).toHaveBeenCalled()
    })
  })
})

describe('saveSession', () => {
  let req, res, next
  beforeEach(() => {
    req = {
      session: {},
      body: {},
      path: '/test-path',
      url: '/test-url',
      sessionID: 'test-session-id'
    }
    res = {
      end: jest.fn()
    }
    next = jest.fn()

    // Reset mocks
    jest.clearAllMocks()
    getHashedUrl.mockReturnValue('hashed-url-123')
  })
  describe('session initialization', () => {
    it('should initialize session if it does not exist', () => {
      req.session = undefined
      req.body = { field1: 'value1' }

      saveSession(req, res, next)

      expect(req.session).toEqual({
        '/test-path': { field1: 'value1' }
      })
      expect(next).toHaveBeenCalled()
    })

    it('should not overwrite existing session', () => {
      req.session = { existingKey: 'existingValue' }
      req.body = { field1: 'value1' }

      saveSession(req, res, next)

      expect(req.session.existingKey).toBe('existingValue')
      expect(req.session['/test-path']).toEqual({ field1: 'value1' })
      expect(next).toHaveBeenCalled()
    })
  })
  describe('CSRF token handling', () => {
    it('should exclude _csrf from body when saving to session', () => {
      req.body = {
        _csrf: 'csrf-token-123',
        field1: 'value1',
        field2: 'value2'
      }

      saveSession(req, res, next)

      expect(req.session['/test-path']).toEqual({
        field1: 'value1',
        field2: 'value2'
      })
      expect(req.session['/test-path']._csrf).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })
  })
  describe('file upload handling', () => {
    it('should handle file upload and store Redis key reference', () => {
      req.file = {
        fieldname: 'uploadedFile',
        originalname: 'test-document.pdf'
      }
      req.body = {
        field1: 'value1'
      }

      saveSession(req, res, next)

      expect(getHashedUrl).toHaveBeenCalledWith('/test-url')
      expect(req.session['/test-path']).toEqual({
        field1: 'value1',
        uploadedFile: {
          originalname: 'test-document.pdf',
          redisKey: 'file:hashed-url-123:test-session-id:uploadedFile'
        }
      })
      expect(next).toHaveBeenCalled()
    })

    it('should handle file upload with _csrf token', () => {
      req.file = {
        fieldname: 'image',
        originalname: 'photo.jpg'
      }
      req.body = {
        _csrf: 'csrf-token-456',
        description: 'A photo'
      }

      saveSession(req, res, next)

      expect(req.session['/test-path']).toEqual({
        description: 'A photo',
        image: {
          originalname: 'photo.jpg',
          redisKey: 'file:hashed-url-123:test-session-id:image'
        }
      })
      expect(req.session['/test-path']._csrf).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })
  })
})

describe('canAddAnother', () => {
  let res, req, next
  beforeEach(() => {
    res = {}
    next = jest.fn()
    jest.restoreAllMocks()
  })
  it('sets addAnother to 1 if no subpage', () => {
    req = {}

    canAddAnother(req, res, next)

    expect(req.addAnother).toBe(1)
    expect(req.showAddAnother).toBe(true)
    expect(next).toHaveBeenCalled()
  })
  it('increments subpage count', () => {
    req = { params: { subpage: 1 } }

    canAddAnother(req, res, next)

    expect(req.addAnother).toBe(2)
    expect(req.showAddAnother).toBe(true)
    expect(next).toHaveBeenCalled()
  })
  it('prevents incrementing past max', () => {
    req = { params: { subpage: 3 } }

    canAddAnother(req, res, next)

    expect(req.addAnother).toBe(3)
    expect(req.showAddAnother).toBe(false)
    expect(next).toHaveBeenCalled()
  })
})

describe('getFormDataFromSession', () => {
  let req, res, next
  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
    jest.restoreAllMocks()
  })
  test('it sets formData on request', () => {
    req.url = '/page'
    req.session = { '/page': { key: 'value' } }
    getFormDataFromSession(req, res, next)

    expect(req).toHaveProperty('formData')
    expect(req.formData).toStrictEqual({ key: 'value' })
    expect(next).toHaveBeenCalled()
  })
  it('handles no session', () => {
    req.url = '/page'
    getFormDataFromSession(req, res, next)
    expect(req).toHaveProperty('formData')
    expect(req.formData).toStrictEqual({})
    expect(next).toHaveBeenCalled()
  })
  it('handles no url key on sesssion', () => {
    req.url = '/page1'
    req.session = { '/page2': { key: 'value' } }
    getFormDataFromSession(req, res, next)

    expect(req).toHaveProperty('formData')
    expect(req.formData).toStrictEqual({})
    expect(next).toHaveBeenCalled()
  })
  it('handles no url', () => {
    req.session = { '/page': { key: 'value' } }
    getFormDataFromSession(req, res, next)

    expect(req).toHaveProperty('formData')
    expect(req.formData).toStrictEqual({})
    expect(next).toHaveBeenCalled()
  })
})

describe('xssComponentCode', () => {
  let res, req, next
  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
    jest.resetAllMocks()
  })
  it('sanitizes html', () => {
    req.body = {
      componentCodeLanguage: 'html',
      componentCode: 'code'
    }
    sanitize.mockReturnValue('sanitized html')

    xssComponentCode(req, res, next)

    expect(sanitize).toHaveBeenCalled()
    expect(req.body.componentCode).toBe('sanitized html')
  })
  it('sanitizes nunjucks', () => {
    req.body = {
      componentCodeLanguage: 'nunjucks',
      componentCode: 'code'
    }
    sanitize.mockReturnValue('sanitized njk')

    xssComponentCode(req, res, next)

    expect(sanitize).toHaveBeenCalled()
    expect(req.body.componentCode).toBe('sanitized njk')
  })
  it('does not sanitize css', () => {
    req.body = {
      componentCodeLanguage: 'css',
      componentCode: 'css code'
    }

    xssComponentCode(req, res, next)

    expect(sanitize).not.toHaveBeenCalled()
    expect(req.body.componentCode).toBe('css code')
  })
  it('does not sanitize javascript', () => {
    req.body = {
      componentCodeLanguage: 'javascript',
      componentCode: 'js code'
    }

    xssComponentCode(req, res, next)

    expect(sanitize).not.toHaveBeenCalled()
    expect(req.body.componentCode).toBe('js code')
  })
})

describe('saveFileToRedis middleware', () => {
  let req, res, next
  // Mock console methods to avoid cluttering test output
  const originalConsoleLog = console.log
  const originalConsoleError = console.error
  beforeEach(() => {
    req = {
      session: {},
      url: '/test-url',
      sessionID: 'test-session-123'
    }
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    next = jest.fn().mockResolvedValue()

    // Reset all mocks
    jest.clearAllMocks()

    // Mock console methods
    console.log = jest.fn()
    console.error = jest.fn()

    // Default mock implementations
    getHashedUrl.mockReturnValue('hashed-url-abc123')
    redis.set.mockResolvedValue('OK')
  })
  afterEach(() => {
    // Restore console methods
    console.log = originalConsoleLog
    console.error = originalConsoleError
  })
  describe('when no file is uploaded', () => {
    it('should call next() without processing', async () => {
      await saveFileToRedis(req, res, next)

      expect(redis.set).not.toHaveBeenCalled()
      expect(getHashedUrl).not.toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })
  describe('when file is uploaded successfully', () => {
    beforeEach(() => {
      req.file = {
        buffer: Buffer.from('test file content'),
        originalname: 'test-document.pdf',
        mimetype: 'application/pdf',
        fieldname: 'uploadedFile'
      }
    })

    it('should save file to Redis with correct data structure', async () => {
      await saveFileToRedis(req, res, next)

      const expectedRedisKey =
        'file:hashed-url-abc123:test-session-123:uploadedFile'
      const expectedData = JSON.stringify({
        buffer: Buffer.from('test file content').toString('base64'),
        originalname: 'test-document.pdf',
        mimetype: 'application/pdf'
      })

      expect(getHashedUrl).toHaveBeenCalledWith('/test-url')
      expect(redis.set).toHaveBeenCalledWith(
        expectedRedisKey,
        expectedData,
        'EX',
        24 * 60 * 60
      )
      expect(req.session.uploadedFile).toBe(expectedRedisKey)
      expect(console.log).toHaveBeenCalledWith(
        `[Redis] File saved with key: ${expectedRedisKey}`
      )
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
    })

    it('should handle different file types correctly', async () => {
      req.file = {
        buffer: Buffer.from('image data'),
        originalname: 'photo.jpg',
        mimetype: 'image/jpeg',
        fieldname: 'profileImage'
      }

      await saveFileToRedis(req, res, next)

      const expectedData = JSON.stringify({
        buffer: Buffer.from('image data').toString('base64'),
        originalname: 'photo.jpg',
        mimetype: 'image/jpeg'
      })

      expect(redis.set).toHaveBeenCalledWith(
        'file:hashed-url-abc123:test-session-123:profileImage',
        expectedData,
        'EX',
        24 * 60 * 60
      )
      expect(req.session.profileImage).toBe(
        'file:hashed-url-abc123:test-session-123:profileImage'
      )
      expect(next).toHaveBeenCalled()
    })

    it('should preserve existing session data', async () => {
      req.session = {
        existingKey: 'existingValue',
        anotherKey: { nested: 'data' }
      }

      await saveFileToRedis(req, res, next)

      expect(req.session.existingKey).toBe('existingValue')
      expect(req.session.anotherKey).toEqual({ nested: 'data' })
      expect(req.session.uploadedFile).toBe(
        'file:hashed-url-abc123:test-session-123:uploadedFile'
      )
      expect(next).toHaveBeenCalled()
    })
  })
  describe('error handling', () => {
    beforeEach(() => {
      req.file = {
        buffer: Buffer.from('test content'),
        originalname: 'test.txt',
        mimetype: 'text/plain',
        fieldname: 'testFile'
      }
    })

    it('should handle Redis connection errors', async () => {
      const redisError = new Error('Redis connection failed')
      redis.set.mockRejectedValue(redisError)

      await saveFileToRedis(req, res, next)

      expect(console.error).toHaveBeenCalledWith(
        '[Redis] Error saving file: Redis connection failed'
      )
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith('Failed to process file.')
      expect(next).not.toHaveBeenCalled()
      expect(req.session.testFile).toBeUndefined()
    })

    it('should handle Redis timeout errors', async () => {
      const timeoutError = new Error('Operation timed out')
      redis.set.mockRejectedValue(timeoutError)

      await saveFileToRedis(req, res, next)

      expect(console.error).toHaveBeenCalledWith(
        '[Redis] Error saving file: Operation timed out'
      )
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith('Failed to process file.')
      expect(next).not.toHaveBeenCalled()
    })
  })
})

describe('getFormSummaryListForRemove', () => {
  let req, res, next
  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
    jest.resetAllMocks()
  })
  it('deletes remoeSummaryRows', () => {
    req.url = '/remove/page'
    req.removeSummaryRows = { key: 'value' }

    getFormSummaryListForRemove(req, res, next)

    expect(req).not.toHaveProperty('removeSummaryRows')
    expect(next).toHaveBeenCalled()
  })
  it('sets removeSummaryRows', () => {
    req.url = '/remove/page'
    req.session = { '/page': { key: 'value' } }

    getAnswersForSection.mockReturnValue({ answer: 'value' })

    getFormSummaryListForRemove(req, res, next)

    expect(req).toHaveProperty('removeSummaryRows')
    expect(req.removeSummaryRows).toStrictEqual({ answer: 'value' })
    expect(next).toHaveBeenCalled()
  })
})

describe('clearSkippedPageData', () => {
  let req, res, next
  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
  })
  it('clears pages no longer required', () => {
    req.session = {
      '/page1': {},
      '/page2': {},
      '/page3': {},
      '/page4': {}
    }
    getCurrentFormPages.mockReturnValue(['/page1', '/page2', '/page4'])

    clearSkippedPageData(req, res, next)

    expect(req.session).toStrictEqual({
      '/page1': {},
      '/page2': {},
      '/page4': {}
    })
    expect(next).toHaveBeenCalled()
  })
  it('clears subpage data', () => {
    req.session = {
      '/page1': {},
      '/page2': {},
      '/page3': {},
      '/page3/1': {},
      '/page3/2': {},
      '/page4': {}
    }
    getCurrentFormPages.mockReturnValue(['/page1', '/page2', '/page4'])

    clearSkippedPageData(req, res, next)

    expect(req.session).toStrictEqual({
      '/page1': {},
      '/page2': {},
      '/page4': {}
    })
    expect(next).toHaveBeenCalled()
  })
})

describe('validateComponentImagePage', () => {
  let req, res, next
  beforeEach(() => {
    req = { params: {} }
    res = {}
    next = jest.fn()
  })
  it('calls next for component image url', () => {
    req.params.page = 'component-image'
    validateComponentImagePage(req, res, next)
    expect(next).toHaveBeenCalled()
  })
  it('calls next with a 400 error if not component image page', () => {
    req.params.page = 'figma'
    const error = new ApplicationError('Invalid page', 400)

    validateComponentImagePage(req, res, next)

    expect(next).toHaveBeenCalledWith(error)
  })
})

describe('validateFormData', () => {
  let req, res, next
  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn(() => res),
      render: jest.fn()
    }
    next = jest.fn()
    jest.clearAllMocks()
  })
  it('returns 500 if schema is not found', () => {
    const err = new ApplicationError(`Could not find schema: schema3`, 500)
    getSchema.mockReturnValue(undefined)
    req.path = '/schema3'

    validateFormData(req, res, next)

    expect(next).toHaveBeenCalledWith(err)
  })
  it('calls next if valid', () => {
    getSchema.mockReturnValue({
      validate: jest.fn().mockReturnValue({ error: undefined })
    })
    req.path = '/schema1'

    validateFormData(req, res, next)

    expect(next).toHaveBeenCalled()
  })
  it('returns 400 if errors present', () => {
    getSchema.mockReturnValue({
      validate: jest.fn().mockReturnValue({ error: { details: [] } })
    })
    req.path = '/schema1'
    req.params = { page: 'email' }

    const expectedArgs = {
      addAnother: 1,
      backLink: false,
      csrfToken: undefined,
      errorList: [],
      file: undefined,
      formData: undefined,
      formErrorStyles: {},
      formErrors: {},
      page: {
        fields: {
          emailAddress: {
            label: 'Enter your justice.gov.uk email address'
          }
        },
        removable: false,
        showOnCya: false,
        title: 'Verify that you work for MoJ'
      },
      showAddAnother: false,
      submitUrl: undefined
    }

    validateFormData(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.render).toHaveBeenCalledWith('email', expectedArgs)
    expect(next).not.toHaveBeenCalled()
  })

  /**
   * This test is not very isolated, it covers a lot of behaviour
   * it is hard to mock the side effects as they are private to the module
   * or they cannot be mocked as the methods are being teing tested in this
   * file.  This test verifies:
   *  - the 400 return status
   *  - the transformErrorsToErrorList function
   *  - the errorTemplateVariables function
   *  - the date field parsing
   *  - that only the first error is shown for a field
   *  - that govuk error classes are applied to the individual date part fields
   */
  it('generates and formats errors', () => {
    getSchema.mockReturnValue({
      validate: jest.fn().mockReturnValue({
        error: {
          details: [
            {
              message: 'first error',
              path: ['emailAddress']
            },
            {
              message: 'second error',
              path: ['emailAddress']
            },
            {
              message: 'bad day',
              path: ['auditDate-day']
            },
            {
              message: 'bad month',
              path: ['auditDate-month']
            },
            {
              message: 'bad year',
              path: ['auditDate-year']
            }
          ]
        }
      })
    })
    req.path = '/schema1'
    req.params = { page: 'email' }
    req.body = {
      emailAddress: 'not an email address',
      'auditDate-day': '200',
      'auditDate-month': '37',
      'auditDate-year': '1'
    }

    const expectedArgs = {
      addAnother: 1,
      backLink: false,
      csrfToken: undefined,
      errorList: [
        {
          href: '#email-address',
          text: 'first error'
        },
        {
          href: '#audit-date-day',
          text: 'bad day'
        }
      ],
      file: undefined,
      formData: {
        emailAddress: 'not an email address',
        'auditDate-day': '200',
        'auditDate-month': '37',
        'auditDate-year': '1'
      },
      formErrorStyles: {
        'auditDate-day': 'govuk-input--error',
        'auditDate-month': 'govuk-input--error',
        'auditDate-year': 'govuk-input--error'
      },
      formErrors: {
        auditDate: {
          text: 'bad day'
        },
        'auditDate-day': null,
        'auditDate-month': null,
        'auditDate-year': null,
        emailAddress: {
          text: 'first error'
        }
      },
      page: {
        fields: {
          emailAddress: {
            label: 'Enter your justice.gov.uk email address'
          }
        },
        removable: false,
        showOnCya: false,
        title: 'Verify that you work for MoJ'
      },
      showAddAnother: false,
      submitUrl: undefined
    }

    validateFormData(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.render).toHaveBeenCalledWith('email', expectedArgs)
    expect(next).not.toHaveBeenCalled()
  })
})

describe('validateFormDataFileUpload', () => {
  let req, res, next
  beforeEach(() => {
    req = {}
    res = {
      render: jest.fn(),
      status: jest.fn(() => res)
    }
    next = jest.fn()
    jest.clearAllMocks()
  })
  it('calls next if no error', () => {
    const err = undefined
    validateFormDataFileUpload(err, req, res, next)
    expect(next).toHaveBeenCalled()
  })
  it('calls next if error code is not LIMIT_FILE_SIZE', () => {
    const err = {
      code: 'AN_ERROR'
    }
    validateFormDataFileUpload(err, req, res, next)
    expect(next).toHaveBeenCalled()
  })
  it('renders the template with errors', () => {
    const err = {
      code: 'LIMIT_FILE_SIZE',
      field: 'componentImage'
    }
    req.params = { page: 'component-image' }
    const expectedArgs = {
      addAnother: 1,
      backLink: false,
      csrfToken: undefined,
      errorList: [
        {
          href: '#component-image',
          text: 'The selected file must be smaller than 10MB'
        }
      ],
      file: undefined,
      formData: undefined,
      formErrorStyles: null,
      formErrors: {
        componentImage: {
          text: 'The selected file must be smaller than 10MB'
        }
      },
      page: {
        fields: {
          componentImage: {
            hint: 'The file must be a JPG, BMP, PNG, TIF or PDF, and smaller than 10MB.',
            label: 'Upload a file'
          }
        },
        removable: false,
        showOnCya: true,
        title: 'Component image'
      },
      showAddAnother: false,
      submitUrl: undefined
    }

    validateFormDataFileUpload(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.render).toHaveBeenCalledWith('component-image', expectedArgs)
    expect(next).not.toHaveBeenCalled()
  })
})
