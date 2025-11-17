const { generateMarkdown, generateEleventyDataFile } = require('./generate-documentation')

describe('generateMarkdown', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2023-01-01T00:00:00Z'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('with all fields populated', () => {
    let mockData
    let mockFiles

    beforeEach(() => {
      mockData = {
        '/component-details': {
          componentName: 'Test Component',
          briefDescription: 'This is a brief description.',
          componentOverview: 'This is an overview.',
          componentProblemSolved: 'This is the problem solved.',
          howIsTheComponentUsed: 'This is how it is used.'
        },
        '/figma-link': {
          figmaUrl: 'www.figma.com'
        },
        '/your-details': {
          fullName: 'Test User',
          emailAddress: 'test@test.com',
          teamName: 'Test team'
        },
        '/add-external-audit': {
          externalOrganisation: 'External Org',
          'auditDate-day': '1',
          'auditDate-month': '1',
          'auditDate-year': '2022',
          issuesDiscovered: 'Some issues discovered.',
          accessibilityReport: 'external-report.pdf'
        },
        '/add-internal-audit': {
          internalOrganisation: 'Internal Org',
          'auditDate-day': '2',
          'auditDate-month': '2',
          'auditDate-year': '2022',
          issuesDiscovered: 'Some internal issues discovered.',
          accessibilityReport: 'internal-report.pdf'
        },
        '/add-assistive-tech': {
          'testingDate-day': '3',
          'testingDate-month': '3',
          'testingDate-year': '2022',
          issuesDiscovered: 'Assistive tech issues discovered.',
          accessibilityReport: 'assistive-tech-report.pdf'
        },
        '/component-code-details': {
          'componentCode': '<p>this is code</p>',
          'componentCodeUsage': 'use it',
          'componentCodeLanguage': 'HTML'
        },
        '/component-code-details/1': {
          'componentCode': '.style { color: red; }',
          'componentCodeUsage': 'copy and paste',
          'componentCodeLanguage': 'other',
          'componentCodeLanguageOther': 'CSS'
        }

      }
      mockFiles = {
        '/component-image': {
          path: 'assets/images/component.jpg'
        }
      }
    })

    it('generates the index.md frontmatter', () => {
      const result = generateMarkdown(mockData, mockFiles)
      expect(result).toMatchSnapshot()
    })

    it('generates the _overview.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'overview')
      expect(result).toMatchSnapshot()
    })

    it('generates the _designs.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'designs')
      expect(result).toMatchSnapshot()
    })

    it('generates the _accessibility.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'accessibility')
      expect(result).toMatchSnapshot()
    })

    it('generates the _code.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'code')
      expect(result).toMatchSnapshot()
    })

    it('generates the 11tydata.js file', () => {
      const result = generateEleventyDataFile(mockData)
      expect(result).toMatchSnapshot()
    })
  })

  describe('partial data', () => {
    let mockData
    let mockFiles

    beforeEach(() => {
      mockData = {
        '/component-details': {
          componentName: 'Test Component',
          briefDescription: 'This is a brief description.',
          componentOverview: 'This is an overview.',
          componentProblemSolved: 'This is the problem solved.',
          howIsTheComponentUsed: 'This is how it is used.'
        },
        '/your-details': {
          fullName: 'Not shared',
          emailAddress: 'test@test.com',
          teamName: 'Test team'
        },
        '/add-external-audit': {
          externalOrganisation: 'External Org',
          'auditDate-day': '1',
          'auditDate-month': '1',
          'auditDate-year': '2022',
          issuesDiscovered: 'Some issues discovered.',
          accessibilityReport: 'external-report.pdf'
        },

        '/add-assistive-tech': {
          'testingDate-day': '3',
          'testingDate-month': '3',
          'testingDate-year': '2022',
          issuesDiscovered: 'Assistive tech issues discovered.',
          accessibilityReport: 'assistive-tech-report.pdf'
        },
      }
      mockFiles = {
        '/component-image': {
          path: 'assets/images/component.jpg'
        }
      }
      })

    it('generates the index.md frontmatter', () => {
      const result = generateMarkdown(mockData, mockFiles)
      expect(result).toMatchSnapshot()
    })

    it('generates the _overview.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'overview')
      expect(result).toMatchSnapshot()
    })

    it('generates the _designs.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'designs')
      expect(result).toMatchSnapshot()
    })

    it('generates the _accessibility.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'accessibility')
      expect(result).toMatchSnapshot()
    })

    it('generates the _code.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'code')
      expect(result).toMatchSnapshot()
    })

    it('generates the 11tydata.js file', () => {
      const result = generateEleventyDataFile(mockData)
      expect(result).toMatchSnapshot()
    })
  })


  describe('component with special characters', () => {
        let mockData
    let mockFiles

    beforeEach(() =>{

    mockData = {
      '/component-details': {
        componentName: 'Component! With@ Special#Chars',
        briefDescription: 'Brief description here.',
        componentOverview: 'Overview here.',
        componentProblemSolved: 'Problem solved here.',
        howIsTheComponentUsed: 'Usage here.'
      },
      '/your-details': {
        fullName: 'Special User',
        emailAddress: 'special@test.com'
      }
    }
      mockFiles = {}
    })

    it('generates the index.md frontmatter', () => {
      const result = generateMarkdown(mockData, mockFiles)
      expect(result.filename).toBe("component-with-special-chars/index.md")
      expect(result).toMatchSnapshot()
    })

    it('generates the _overview.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'overview')
      expect(result.filename).toBe("component-with-special-chars/_overview.md")
      expect(result).toMatchSnapshot()
    })

    it('generates the _designs.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'designs')
      expect(result.filename).toBe("component-with-special-chars/_designs.md")
      expect(result).toMatchSnapshot()
    })

    it('generates the _accessibility.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'accessibility')
      expect(result.filename).toBe("component-with-special-chars/_accessibility.md")
      expect(result).toMatchSnapshot()
    })

    it('generates the _code.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'code')
      expect(result.filename).toBe("component-with-special-chars/_code.md")
      expect(result).toMatchSnapshot()
    })

    it('generates the 11tydata.js file', () => {
      const result = generateEleventyDataFile(mockData)
      expect(result.filename).toBe("component-with-special-chars/component-with-special-chars.11tydata.js")
      expect(result).toMatchSnapshot()
    })
  })

  describe('no data provided', () => {
    let mockData
    let mockFiles

    beforeEach(() =>{
     mockData = {
      '/component-details': {},
      '/component-code-details': {},
      '/additional-information': {},
      '/figma-link': {},
      '/your-details': {},
      '/add-external-audit': {},
      '/add-internal-audit': {},
      '/add-assistive-tech': {}
    }
      mockFiles={}
    })

    it('generates the index.md frontmatter', () => {
      const result = generateMarkdown(mockData, mockFiles)
      expect(result).toMatchSnapshot()
    })

    it('generates the _overview.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'overview')
      expect(result).toMatchSnapshot()
    })

    it('generates the _designs.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'designs')
      expect(result).toMatchSnapshot()
    })

    it('generates the _accessibility.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'accessibility')
      expect(result).toMatchSnapshot()
    })

    it('generates the _code.md tab', () => {
      const result = generateMarkdown(mockData, mockFiles, 'code')
      expect(result).toMatchSnapshot()
    })

    it('generates the 11tydata.js file', () => {
      const result = generateEleventyDataFile(mockData)
      expect(result).toMatchSnapshot()
    })
  })
})
