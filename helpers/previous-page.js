const {COMPONENT_FORM_PAGES, COMPONENT_FORM_PAGES_OPTIONS} = require("../config");

const previousPage = (url, session, body) => {
  if (session.checkYourAnswers) {
    return 'check-your-answers';
  }

  const path = url.split('/')[1];
  const index = COMPONENT_FORM_PAGES.findIndex((page) => path.endsWith(page));
  const currentPage = COMPONENT_FORM_PAGES[index];

  const getPreviousPage = (pageOptions, body) => {
    const fieldKey = Object.keys(pageOptions)[0];
    const fieldValue = body?.[fieldKey];

    if (fieldValue && pageOptions[fieldKey]) {
      const previousPageOption = pageOptions[fieldKey][fieldValue];
      if (typeof previousPageOption === 'string') {
        return previousPageOption;
      } else if (typeof previousPageOption === 'object') {
        return getPreviousPage(previousPageOption, body);
      }
    }
    return null;
  };

  // Check if there's an entry for this page in COMPONENT_FORM_PAGES_OPTIONS
  if (COMPONENT_FORM_PAGES_OPTIONS[currentPage]) {
    const previousPage = getPreviousPage(COMPONENT_FORM_PAGES_OPTIONS[currentPage], body);
    if (previousPage) {
      return previousPage;
    }
  }

  // Default behavior: return the previous page in COMPONENT_FORM_PAGES
  if (index > 0) {
    return COMPONENT_FORM_PAGES[index - 1];
  }

  return false;
};

module.exports = previousPage;
