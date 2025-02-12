const { generateMarkdown } = require('./generate-documentation')

describe('generateMarkdown', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2023-01-01T00:00:00Z'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should generate markdown with all fields populated', () => {
    const mockData = {
      '/component-details': {
        componentName: 'Test Component',
        briefDescription: 'This is a brief description.',
        componentOverview: 'This is an overview.',
        componentProblemSolved: 'This is the problem solved.',
        howIsTheComponentUsed: 'This is how it is used.'
      },
      '/accessibility-findings-more': {
        accessibilityTellUsMore: 'Accessibility details here.'
      },
      '/prototype-url': {
        prototypeUrl: 'www.test.com'
      },
      '/component-code-details': {
        componentCode: '<p>hello!</p>',
        howIsTheComponentUsed: 'Somehow'
      },
      '/additional-information': {
        additionalInformation: 'Additional information here.'
      },
      '/your-details': {
        fullName: 'Test User',
        emailAddress: 'test@test.com'
      }
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })

  it('should handle missing details gracefully', () => {
    const mockData = {
      '/component-details': {},
      '/component-code-details': {},
      '/additional-information': {},
      '/your-details': {}
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })

  it('should handle missing image data gracefully', () => {
    const mockData = {
      '/component-details': {
        componentName: 'Another Component',
        briefDescription: 'Another brief description.',
        componentOverview: 'Another overview.',
        componentProblemSolved: 'Another problem solved.',
        howIsTheComponentUsed: 'Another usage.'
      },
      '/component-code-details': {
        componentCode: '<p>hello!</p>',
        howIsTheComponentUsed: 'Somehow'
      },
      '/additional-information': {
        additionalInformation: 'Additional information here.'
      },
      '/your-details': {
        fullName: 'Another User',
        emailAddress: 'another@test.com'
      }
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })

  it('should sanitize the filename correctly', () => {
    const mockData = {
      '/component-details': {
        componentName: 'Component! With@ Special#Chars',
        briefDescription: 'Brief description here.',
        componentOverview: 'Overview here.',
        componentProblemSolved: 'Problem solved here.',
        howIsTheComponentUsed: 'Usage here.'
      },
      '/component-code-details': {
        componentCode: '<p>hello!</p>',
        howIsTheComponentUsed: 'Somehow'
      },
      '/additional-information': {
        additionalInformation: 'Additional information here.'
      },
      '/your-details': {
        fullName: 'Special User',
        emailAddress: 'special@test.com'
      }
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })

  it('should return minimal markdown if no valid data is provided', () => {
    const mockData = {
      '/component-details': {},
      '/component-code-details': {},
      '/additional-information': {},
      '/your-details': {}
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })
})
