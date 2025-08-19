const getCurrentFormPages = require('./form-pages')

describe('getCurrentFormPages', () => {
  const session = {}

  it('should return all pages without conditions', () => {
    const result = getCurrentFormPages(session)
    expect(result).toStrictEqual([
      'email',
      'component-details',
      'component-image',
      'accessibility-findings',
      'component-code',
      'figma',
      'your-details',
      'check-your-answers'
    ])
  })

  it('should return pages according to conditions', () => {
    session['/accessibility-findings'] = {
      hasComponentBeenTestedExternalAccessibility: 'yes',
      hasComponentBeenTestedInternalAudit: 'no',
      hasComponentBeenTestedUsingAssistiveTechnology: 'yes'
    }
    session['/figma'] = {
      figmaUrl: 'yes'
    }
    const result = getCurrentFormPages(session)
    expect(result).toStrictEqual([
      'email',
      'component-details',
      'component-image',
      'accessibility-findings',
      'add-external-audit',
      'add-assistive-tech',
      'component-code',
      'figma',
      'figma-link',
      'your-details',
      'check-your-answers'
    ])
  })
})
