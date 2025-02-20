const previousPage = require('./previous-page');
const { COMPONENT_FORM_PAGES } = require('../config');

describe('previousPage function', () => {
  const session = { pages: {} };

  it('should return the previous page if conditions are met', () => {
    session.pages['/accessibility-findings'] = { hasComponentBeenTestedExternalAccessibility: 'yes' };
    const result = previousPage('/add-external-audit', session);
    expect(result).toBe('accessibility-findings');
  });

  it('should skip pages if conditions are not met', () => {
    session.pages['/accessibility-findings'] = { hasComponentBeenTestedExternalAccessibility: 'no' };
    session.pages['/add-internal-audit'] = { hasComponentBeenTestedInternalAudit: 'no' };
    session.pages['/add-assistive-tech'] = { hasComponentBeenTestedUsingAssistiveTechnology: 'yes' };
    const result = previousPage('/add-assistive-tech', session);
    expect(result).toBe('accessibility-findings');
  });

  it('should return null if there are no previous pages', () => {
    const result = previousPage('/component-details', session);
    expect(result).toBeNull();
  });

  it('should return null if the current page is not found', () => {
    const result = previousPage('/non-existent-page', session);
    expect(result).toBeNull();
  });
});
