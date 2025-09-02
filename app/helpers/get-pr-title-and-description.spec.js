const getPrTitleAndDescription = require('./get-pr-title-and-description')

describe('getPrTitleAndDescription', () => {
  it('should return the correct title and description when session data is present', () => {
    const session = {
      '/component-details': {
        componentName: 'Test Component',
        componentOverview: 'This is a test component.'
      }
    }
    const result = getPrTitleAndDescription(session)
    expect(result).toEqual({
      title: 'docs(contribution): Test Component',
      description: 'This is a test component.'
    })
  })

  it('should return empty strings for title and description when session data is missing', () => {
    const session = {}
    const result = getPrTitleAndDescription(session)
    expect(result).toEqual({
      title: 'docs(contribution): Unnamed component',
      description: ''
    })
  })

  it('should return empty strings for title and description when component details are missing', () => {
    const session = {
      '/component-details': {}
    }
    const result = getPrTitleAndDescription(session)
    expect(result).toEqual({
      title: 'docs(contribution): Unnamed component',
      description: ''
    })
  })

  it('should return the correct title and empty description when only componentName is present', () => {
    const session = {
      '/component-details': {
        componentName: 'Test Component'
      }
    }
    const result = getPrTitleAndDescription(session)
    expect(result).toEqual({
      title: 'docs(contribution): Test Component',
      description: ''
    })
  })

  it('should return the correct description and empty title when only componentOverview is present', () => {
    const session = {
      '/component-details': {
        componentOverview: 'This is a test component.'
      }
    }
    const result = getPrTitleAndDescription(session)
    expect(result).toEqual({
      title: 'docs(contribution): Unnamed component',
      description: 'This is a test component.'
    })
  })
})
