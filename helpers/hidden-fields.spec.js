const getHiddenFields = require('../helpers/hidden-fields');

describe('getHiddenFields', () => {
  let req;

  beforeEach(() => {
    req = {
      url: '/add-internal-audit',
      session: {
        'accessibility-findings': { hasComponentBeenTestedInternalAudit: 'yes', hasComponentBeenTestedUsingAssistiveTechnology: 'no' },
        'add-internal-audit': { hasComponentBeenTestedUsingAssistiveTechnology: 'yes' }
      }
    };
  });

  it('should return name-value pairs for hidden fields based on the session data', () => {
    const result = getHiddenFields(req);
    expect(result).toEqual({
      hasComponentBeenTestedInternalAudit: 'yes',
      hasComponentBeenTestedUsingAssistiveTechnology: 'no'
    });
  });

  it('should return an empty object if no hidden fields are configured for the path', () => {
    req.url = '/non-existent-path';
    const result = getHiddenFields(req);
    expect(result).toEqual({});
  });

  it('should return an empty object if the session data does not contain the required fields', () => {
    req.session = {};
    const result = getHiddenFields(req);
    expect(result).toEqual({});
  });

  it('should handle missing session fields gracefully', () => {
    req.session = {
      'accessibility-findings': { hasComponentBeenTestedInternalAudit: 'yes' }
    };
    const result = getHiddenFields(req);
    expect(result).toEqual({
      hasComponentBeenTestedInternalAudit: 'yes'
    });
  });
});
