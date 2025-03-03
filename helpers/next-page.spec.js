const nextPage = require('./next-page')

describe('nextPage function', () => {
  const session = {}

  it('should return the next page as component-image from component-details', () => {
    const result = nextPage('/component-details', session)
    expect(result).toBe('component-image')
  })

  it('should return the next page as prototype-url from prototype when answer was yes', () => {
    session['/prototype'] = { componentPrototypeUrl: 'yes' }
    const result = nextPage('/prototype', session)
    expect(result).toBe('prototype-url')
  })

  it('should return the next page if conditions are met', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'yes'
    }
    const result = nextPage('/accessibility-findings', session)
    expect(result).toBe('add-external-audit')
  })

  it('should skip pages if conditions are not met', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'no',
      hasComponentBeenTestedInternalAudit: 'no',
      hasComponentBeenTestedUsingAssistiveTechnology: 'yes'
    }
    const result = nextPage('/accessibility-findings', session)
    expect(result).toBe('add-assistive-tech')
  })

  it('should return null if there are no more pages', () => {
    const result = nextPage('/check-your-answers', session)
    expect(result).toBeNull()
  })
})
