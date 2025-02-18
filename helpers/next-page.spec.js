const nextPage = require('../helpers/next-page');
const { COMPONENT_FORM_PAGES, COMPONENT_FORM_PAGES_OPTIONS } = require('../config');

jest.mock('../config', () => ({
  COMPONENT_FORM_PAGES: [
    'component-details',
    'component-image',
    'accessibility-findings',
    'prototype',
    'component-code',
    'your-details'
  ],
  COMPONENT_FORM_PAGES_OPTIONS: {
    'component-details': {
      'hasImage': {
        'yes': 'component-image',
        'no': {
          'isAccessible': {
            'yes': 'accessibility-findings',
            'no': 'prototype'
          }
        }
      }
    }
  }
}));

describe('nextPage', () => {
  it('should return the next page recursively based on nested COMPONENT_FORM_PAGES_OPTIONS', () => {
    const url = '/component-details';
    const body = { hasImage: 'no', isAccessible: 'yes' };
    const result = nextPage(url, body);
    expect(result).toBe('accessibility-findings');
  });

  it('should return the next subpage if subpage is provided', () => {
    const url = '/component-details';
    const body = {};
    const subpage = 2;
    const result = nextPage(url, body, subpage);
    expect(result).toBe('component-details/2');
  });

  it('should return the next page based on COMPONENT_FORM_PAGES_OPTIONS', () => {
    const url = '/component-details';
    const body = { hasImage: 'yes' };
    const result = nextPage(url, body);
    expect(result).toBe('component-image');
  });

  it('should return the next page in COMPONENT_FORM_PAGES if no options match', () => {
    const url = '/component-details';
    const body = { hasImage: 'maybe' };
    const result = nextPage(url, body);
    expect(result).toBe('component-image');
  });

  it('should return null if the current page is the last in COMPONENT_FORM_PAGES', () => {
    const url = '/your-details';
    const body = {};
    const result = nextPage(url, body);
    expect(result).toBeNull();
  });

  it('should return null if the page is not found in COMPONENT_FORM_PAGES', () => {
    const url = '/non-existent-page';
    const body = {};
    const result = nextPage(url, body);
    expect(result).toBeNull();
  });

  it('should return the next page recursively based on nested COMPONENT_FORM_PAGES_OPTIONS', () => {
    const url = '/component-details';
    const body = { hasImage: 'no', isAccessible: 'yes' };
    const result = nextPage(url, body);
    expect(result).toBe('accessibility-findings');
  });
});
