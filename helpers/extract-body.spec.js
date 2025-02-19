const extractBody = require('./extract-body');
const { COMPONENT_FORM_HIDDEN_FIELDS } = require('../config');

jest.mock('../config', () => ({
  COMPONENT_FORM_HIDDEN_FIELDS: {
    'test-path': {
      hidden: ['field1', 'field2']
    }
  }
}));

describe('extractBody', () => {
  it('should remove hidden fields and keep the original body', () => {
    const url = '/test-path';
    const body = { field1: 'value1', field2: 'value2', field3: 'value3' };
    const result = extractBody(url, body);
    expect(result).toEqual({ field3: 'value3' });
  });

  it('should format date fields and keep the original body', () => {
    const url = '/another-path';
    const body = { 'date-day': '1', 'date-month': '2', 'date-year': '2023', field1: 'value1' };
    const result = extractBody(url, body);
    expect(result).toEqual({...{ 'date': '2023-02-01' }, ...body });
  });

  it('should handle both hidden and date fields and keep the original body', () => {
    const url = '/test-path';
    const body = { field1: 'value1', 'date-day': '1', 'date-month': '2', 'date-year': '2023', field3: 'value3' };
    const result = extractBody(url, body);
    const bodyWithoutHidden = {...body}
    delete bodyWithoutHidden['field1']
    expect(result).toEqual({...{ 'date': '2023-02-01' }, ...bodyWithoutHidden });
  });

  it('should return the original body if no hidden fields are defined', () => {
    const url = '/undefined-path';
    const body = { field1: 'value1', field2: 'value2' };
    const result = extractBody(url, body);
    expect(result).toEqual(body);
  });

  it('should return the original body if no date fields are present', () => {
    const url = '/another-path';
    const body = { field1: 'value1', field2: 'value2' };
    const result = extractBody(url, body);
    expect(result).toEqual(body);
  });
});
