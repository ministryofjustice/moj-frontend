const { COMPONENT_FORM_PAGES } = require("../config");

const checkConditions = (conditions, session) => {
  return Object.entries(conditions).every(([key, value]) => {
    if (typeof value === 'object') {
      return session[key] && checkConditions(value, session[key]);
    }
    return session[key] === value;
  });
};

const nextPage = (url, session, body, subpage ) => {
  const pages = Object.keys(COMPONENT_FORM_PAGES);
  const currentPage = url.split('/')[1] // ensure we get the page not the forward slash or any subpage detail
  const currentPageIndex = pages.findIndex(page => currentPage.endsWith(page));

  if (subpage) {
    // Return same page but with the next subpage
    return `${currentPage}/${subpage}`
  }

  // Combine session and posted data
  const pageData = {}
  if(body){
    pageData[url] = body
  }
  const data = {...session,...pageData}

  for (let i = currentPageIndex + 1; i < pages.length; i++) {
    const page = pages[i];
    const conditions = COMPONENT_FORM_PAGES[page];
    const shouldShowPage = checkConditions(conditions, data);
    if (shouldShowPage) {
      return page;
    }
  }

  return null;
};

module.exports = nextPage;
