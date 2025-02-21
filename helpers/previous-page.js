const { COMPONENT_FORM_PAGES } = require("../config");

const checkConditions = (conditions, session) => {
  return Object.entries(conditions).every(([key, value]) => {
    if (typeof value === 'object') {
      return session[key] && checkConditions(value, session[key]);
    }
    return session[key] === value;
  });
};

const previousPage = (url, session) => {
  const pages = Object.keys(COMPONENT_FORM_PAGES);
  const currentPage = url.split('/')[1] // ensure we get the page not the forward slash or any subpage detail
  const currentPageIndex = pages.findIndex(page => currentPage.endsWith(page));

  for (let i = currentPageIndex - 1; i >= 0; i--) {
    const page = pages[i];
    const conditions = COMPONENT_FORM_PAGES[page];
    const shouldShowPage = checkConditions(conditions, session);

    if (shouldShowPage) {
      return page;
    }
  }

  return null;
};

module.exports = previousPage;
