const checkYourAnswers = require('./check-your-answers')

// Sample session data where all values are objects
const session = {
  '/accessibility-findings': { field1: 'Field Value', field2: 'Another Value' },
  '/accessibility-findings-more': { detail: 'Some additional information' },
  '/additional-information': { info: 'Some additional info' },
  '/component-code': { code: '1234', language: 'JavaScript' },
  '/component-code-details': { detail: 'Extra details' },
  '/component-image': { image: 'image.png' },
  '/prototype': { data: 'Prototype data' },
  '/prototype-url': { url: 'http://example.com' },
  '/your-details': { name: 'Sarah Philips', email: 'sarah@example.com' }
}

describe('checkYourAnswers function', () => {
  it('should transform session data into the expected structure', () => {
    const result = checkYourAnswers(session)

    // Snapshot of the result
    expect(result).toMatchSnapshot()
  })

  it('should handle missing session fields gracefully', () => {
    const incompleteSession = {
      '/accessibility-findings': { field1: 'Field Value' }, // field2 missing
      '/component-code': { code: '1234' },
      '/prototype': { data: 'Prototype data' }
      // Missing some fields like 'component-image', 'your-details'
    }

    const result = checkYourAnswers(incompleteSession)

    // Snapshot of the result with missing fields
    expect(result).toMatchSnapshot()
  })

  it('should handle empty session gracefully', () => {
    const emptySession = {}
    const result = checkYourAnswers(emptySession)

    // Snapshot of the result with an empty session
    expect(result).toMatchSnapshot()
  })
})
