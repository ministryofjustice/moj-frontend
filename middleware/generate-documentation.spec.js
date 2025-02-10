const { generateMarkdown } = require('./generate-documentation');

describe('generateMarkdown', () => {
  it('should generate markdown with all fields populated', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {
        componentName: 'Test Component',
        briefDescription: 'This is a brief description.',
        componentOverview: 'This is an overview.',
        componentProblemSolved: 'This is the problem solved.',
        howIsTheComponentUsed: 'This is how it is used.'
      },
      '/get-involved/add-new-component/accessibility-findings-more': {
        accessibilityTellUsMore: 'Accessibility details here.'
      },
      '/get-involved/add-new-component/prototype-url': {
        prototypeUrl: 'www.test.com'
      },
      '/get-involved/add-new-component/component-code-details': {
        componentCode: '<p>hello!</p>',
        howIsTheComponentUsed: 'Somehow'
      },
      '/get-involved/add-new-component/additional-information': {
        additionalInformation: 'Additional information here.'
      },
      '/get-involved/add-new-component/your-details': {
        fullName: 'Test User',
        emailAddress: 'test@test.com'
      }
    };

    const result = generateMarkdown(mockData);
    expect(result).toMatchSnapshot();
  });

  it('should handle missing details gracefully', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {},
      '/get-involved/add-new-component/component-code-details': {},
      '/get-involved/add-new-component/additional-information': {},
      '/get-involved/add-new-component/your-details': {}
    };

    const result = generateMarkdown(mockData);
    expect(result).toMatchSnapshot();
  });

  it('should handle missing image data gracefully', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {
        componentName: 'Another Component',
        briefDescription: 'Another brief description.',
        componentOverview: 'Another overview.',
        componentProblemSolved: 'Another problem solved.',
        howIsTheComponentUsed: 'Another usage.'
      },
      '/get-involved/add-new-component/component-code-details': {
        componentCode: '<p>hello!</p>',
        howIsTheComponentUsed: 'Somehow'
      },
      '/get-involved/add-new-component/additional-information': {
        additionalInformation: 'Additional information here.'
      },
      '/get-involved/add-new-component/your-details': {
        fullName: 'Another User',
        emailAddress: 'another@test.com'
      }
    };

    const result = generateMarkdown(mockData);
    expect(result).toMatchSnapshot();
  });

  it('should sanitize the filename correctly', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {
        componentName: 'Component! With@ Special#Chars',
        briefDescription: 'Brief description here.',
        componentOverview: 'Overview here.',
        componentProblemSolved: 'Problem solved here.',
        howIsTheComponentUsed: 'Usage here.'
      },
      '/get-involved/add-new-component/component-code-details': {
        componentCode: '<p>hello!</p>',
        howIsTheComponentUsed: 'Somehow'
      },
      '/get-involved/add-new-component/additional-information': {
        additionalInformation: 'Additional information here.'
      },
      '/get-involved/add-new-component/your-details': {
        fullName: 'Special User',
        emailAddress: 'special@test.com'
      }
    };

    const result = generateMarkdown(mockData);
    expect(result).toMatchSnapshot();
  });

  it('should return minimal markdown if no valid data is provided', () => {
    const mockData = {
      '/get-involved/add-new-component/component-details': {},
      '/get-involved/add-new-component/component-code-details': {},
      '/get-involved/add-new-component/additional-information': {},
      '/get-involved/add-new-component/your-details': {}
    };

    const result = generateMarkdown(mockData);
    expect(result).toMatchSnapshot();
  });
});
