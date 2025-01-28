const { generateMarkdown } = require('./generate-documentation')

describe('generateMarkdown', () => {
  it('should generate markdown with all fields populated', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {
        componentName: 'Test Component',
        briefDescription: 'This is a brief description.',
        whyNeeded: 'This is why it is needed.'
      },
      '/get-involved/add-new-component/component-image': {
        componentImage: {
          originalname: 'test-image.png'
        }
      }
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })

  it('should handle missing details gracefully', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {},
      '/get-involved/add-new-component/component-image': {
        componentImage: {
          originalname: 'test-image.png'
        }
      }
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })

  it('should handle missing image data gracefully', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {
        componentName: 'Another Component',
        briefDescription: 'Another brief description.',
        whyNeeded: 'Another reason why it is needed.'
      },
      '/get-involved/add-new-component/component-image': {}
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })

  it('should sanitize the filename correctly', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {
        componentName: 'Component! With@ Special#Chars',
        briefDescription: 'Brief description here.',
        whyNeeded: 'Reason why needed.'
      },
      '/get-involved/add-new-component/component-image': {}
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })

  it('should return minimal markdown if no valid data is provided', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {},
      '/get-involved/add-new-component/component-image': {}
    }

    const result = generateMarkdown(mockData)
    expect(result).toMatchSnapshot()
  })
})
