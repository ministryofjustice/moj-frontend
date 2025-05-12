const previousPage = require('./previous-page')

describe('previousPage function', () => {
  const session = {}

  it('should return the previous page if conditions are met', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'yes'
    }
    const result = previousPage('/add-external-audit', session)
    expect(result).toBe('/contribute/add-new-component/accessibility-findings')
  })

  it('should skip pages if conditions are not met', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'no'
    }
    session['/add-internal-audit'] = {
      hasComponentBeenTestedInternalAudit: 'no'
    }
    session['/add-assistive-tech'] = {
      hasComponentBeenTestedUsingAssistiveTechnology: 'yes'
    }
    const result = previousPage('/add-assistive-tech', session)
    expect(result).toBe('/contribute/add-new-component/accessibility-findings')
  })

  it('should return null if there are no previous pages', () => {
    const result = previousPage('/component-details', session)
    expect(result).toBeNull()
  })

  it('should return null if the current page is not found', () => {
    const result = previousPage('/non-existent-page', session)
    expect(result).toBeNull()
  })

  it('should return the previous subpage if it exists', () => {
    session['/component-details/2'] = {}
    const result = previousPage('/component-details/3', session)
    expect(result).toBe('/contribute/add-new-component/component-details/2')
  })

  it('should return the highest subpage if multiple subpages exist', () => {
    session['/component-code/1'] = {}
    session['/component-code/2'] = {}
    const result = previousPage('/figma', session)
    expect(result).toBe('/contribute/add-new-component/component-code/2')
  })
})
