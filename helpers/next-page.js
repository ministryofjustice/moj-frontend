const { COMPONENT_FORM_PAGES } = require("../config");

const checkConditions = (conditions, session) => {
  return Object.entries(conditions).every(([key, value]) => {
    if (typeof value === 'object') {
      return session[key] && checkConditions(value, session[key]);
    }
    return session[key] === value;
  });
};

const nextPage = (url, session) => {
  const pages = Object.keys(COMPONENT_FORM_PAGES);
  const currentPageIndex = pages.findIndex(page => url.endsWith(page));

  for (let i = currentPageIndex + 1; i < pages.length; i++) {
    const page = pages[i];
    const conditions = COMPONENT_FORM_PAGES[page];
    const shouldShowPage = checkConditions(conditions, session);

    if (shouldShowPage) {
      return page;
    }
  }

  return null;
};

module.exports = nextPage;
