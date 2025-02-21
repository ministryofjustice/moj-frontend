const { COMPONENT_FORM_PAGES } = require("../config");
const urlRoot = '/get-involved/add-new-component'

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
  const [currentPage, subpage] = url.split('/').slice(1); // split the url to get the page and subpage
  const currentPageIndex = pages.findIndex(page => currentPage.endsWith(page));

  // Check if there are subpages in the session for the current page
  if (subpage && Number.isInteger(Number(subpage)) && subpage > 1) {
    return `${urlRoot}/${currentPage}/${subpage - 1}`;
  }

  for (let i = currentPageIndex - 1; i >= 0; i--) {
    const page = pages[i];
    const conditions = COMPONENT_FORM_PAGES[page];
    const shouldShowPage = checkConditions(conditions, session);

    if (shouldShowPage) {
      // Check if there are subpages in the session for the previous page
      if (session) {
        const subpages = Object.keys(session).filter(p => p.startsWith(`/${page}/`));
        if (subpages.length > 0) {
          // Sort subpages to get the highest one
          subpages.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
          return `${urlRoot}${subpages[0]}`
        }
      }
      return `${urlRoot}/${page}`;
    }
  }

  return null;
};

module.exports = previousPage;
