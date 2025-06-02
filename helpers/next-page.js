const { COMPONENT_FORM_PAGES } = require('../config')

/**
 * @param {object} conditions - the conditions for the page being checked
 * @param {object} session - the current session data
 * @returns {boolean}
 */
const checkConditions = (conditions, session) => {
  return Object.entries(conditions).every(([key, value]) => {
    if (typeof value === 'object') {
      return session[key] && checkConditions(value, session[key])
    }
    return session[key] === value
  })
}

const getCurrentPageUrl = (url) => {
  return url.split('/')[1] // ensure we get the page not the forward slash or any subpage detail
}

const getCurrentPageIndex = (pageUrl) => {
  const pages = Object.keys(COMPONENT_FORM_PAGES)
  return pages.findIndex((page) => pageUrl.endsWith(page))
}
/**
 * @param {string} url - the full url of the page
 * @param {object} session - the current session
 * @param {string} body - the submitted data
 * @param {int} subpage
 * @returns {(string|null)}
 */
const getNextPage = (url, session, pages, subpage, amending) => {
  console.log(pages)
  const currentPageUrl = url.split('/')[1] // ensure we get the page not the forward slash or any subpage detail
  const currentPageIndex = pages.findIndex((page) => currentPageUrl.endsWith(page))

  if (subpage) {
    console.log('there is a subpage')
    // Return same page but with the next subpage
    return `${currentPageUrl}/${subpage}`
  }

  if(!amending && !(currentPageIndex+1 > pages.length)){
    console.log('not making amendments')
    return pages[currentPageIndex + 1]
  }

  // check all pages in getCurrentFormPages have answers
  for (let i = currentPageIndex + 1; i < pages.length; i++) {
    const nextPage = pages[i]
    if(!session[`/${nextPage}`]) {
      return nextPage
    }
  }

  return null
}

const getCurrentFormPages = (url,session) => {
  const pages = []
  for(const [page, config] of Object.entries(COMPONENT_FORM_PAGES)) {
    if(config?.conditions){
      if(checkConditions(config.conditions, session)) {
        pages.push(page)
      }
    } else {
      pages.push(page)
    }
  }
  return pages
}

module.exports = {
  getCurrentPageIndex,
  getCurrentPageUrl,
  getCurrentFormPages,
  getNextPage
}
