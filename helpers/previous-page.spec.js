const { getPreviousPage } = require('./page-navigation')
const urlBase = '/contribute/add-new-component'

describe('getPreviousPage function', () => {
  const session = {}

  it('should return the previous page if conditions are met', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'yes'
    }
    const result = getPreviousPage('/add-external-audit', session)
    expect(result).toBe(`${urlBase}/accessibility-findings`)
  })

  it('should skip pages if conditions are not met', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'no',
      hasComponentBeenTestedInternalAudit: 'no',
      hasComponentBeenTestedUsingAssistiveTechnology: 'yes'
    }
    const result = getPreviousPage('/add-assistive-tech', session)
    expect(result).toBe(`${urlBase}/accessibility-findings`)
  })

  it('should return start page if there are no previous pages', () => {
    const result = getPreviousPage('/component-details', session)
    expect(result).toBe(`${urlBase}/start`)
  })

  it('should return null if the current page is not found', () => {
    const result = getPreviousPage('/non-existent-page', session)
    expect(result).toBeNull()
  })

  it('should return the previous subpage if it exists', () => {
    session['/component-details/2'] = {}
    const result = getPreviousPage('/component-details/3', session)
    expect(result).toBe(`${urlBase}/component-details/2`)
  })

  it('should return the highest subpage if multiple subpages exist', () => {
    session['/component-code/1'] = {}
    session['/component-code/2'] = {}
    const result = getPreviousPage('/figma', session)
    expect(result).toBe(`${urlBase}/component-code/2`)
  })
})
