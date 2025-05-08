const { getNextPage } = require('./page-navigation')

describe('getNextPage function', () => {
  const session = {}
  const urlBase = '/contribute/add-new-component'

  it('should return the next page as component-image from component-details', () => {
    const result = getNextPage('/component-details', session)
    expect(result).toBe(`${urlBase}/component-image`)
  })

  it('should return the next page as prototype-url from prototype when answer was yes', () => {
    session['/prototype'] = { componentPrototypeUrl: 'yes' }
    const result = getNextPage('/prototype', session)
    expect(result).toBe(`${urlBase}/prototype-url`)
  })

  it('should return the next page if conditions are met', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'yes'
    }
    const result = getNextPage('/accessibility-findings', session)
    expect(result).toBe(`${urlBase}/add-external-audit`)
  })

  it('should skip pages if conditions are not met', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'no',
      hasComponentBeenTestedInternalAudit: 'no',
      hasComponentBeenTestedUsingAssistiveTechnology: 'yes'
    }
    const result = getNextPage('/accessibility-findings', session)
    expect(result).toBe(`${urlBase}/add-assistive-tech`)
  })

  it('should return null if there are no more pages', () => {
    const result = getNextPage(`/check-your-answers`, session)
    expect(result).toBeNull()
  })

  describe('adding another', () => {
    it('should return the first subpage if there are none', () => {
      const result = getNextPage('/component-code-details', session, true)
      expect(result).toBe(`${urlBase}/component-code-details/1`)
    })

    it('should return the next subpage', () => {
      session['/component-code-details'] = {}
      session['/component-code-details/1'] = {}
      const result = getNextPage('/component-code-details/1', session, true)
      expect(result).toBe(`${urlBase}/component-code-details/2`)
    })

    it('should return the highest subpage', () => {
      session['/component-code-details'] = {}
      session['/component-code-details/1'] = {}
      const result = getNextPage('/component-code-details', session, true)
      expect(result).toBe(`${urlBase}/component-code-details/2`)
    })
  })

  describe('amending answers', () => {
    it('should still allow adding another', () => {
      session['/component-code-details'] = {}
      session['/component-code-details/1'] = {}
      const result = getNextPage(
        '/component-code-details/1',
        session,
        true,
        true
      )
      expect(result).toBe(`${urlBase}/component-code-details/2`)
    })

    it('should return cya if no questions conditional questions require answering', () => {
      session['/figma'] = {
        figmaUrl: 'yes'
      }
      session['/figma-link'] = {}
      session['/your-details'] = {}

      const result = getNextPage('/figma', session, false, true)
      expect(result).toBe(`${urlBase}/check-your-answers`)
    })
  })
})
