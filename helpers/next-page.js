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
 * @returns {({nextPage: string, skippedPages: string[]}|null)}
 */
const getNextPage = (url, session, body, subpage) => {
  const pages = Object.keys(COMPONENT_FORM_PAGES)
  console.log(pages)
  const currentPageUrl = getCurrentPageUrl(url)
  console.log(currentPageUrl)
  const currentPageIndex = getCurrentPageIndex(currentPageUrl)
  console.log(currentPageIndex)
  const skippedPages = []

  if (subpage) {
    console.log('there is a subpage')
    // Return same page but with the next subpage
    return { nextPage: `${currentPageUrl}/${subpage}`, skippedPages }
  }

  // Combine session and posted data
  const pageData = {}
  if (body) {
    pageData[url] = body
  }
  const data = { ...session, ...pageData }

  for (let i = currentPageIndex + 1; i < pages.length; i++) {
    const nextPage = pages[i]
    console.log(`potential next page ${nextPage}`)
    const conditions = COMPONENT_FORM_PAGES[nextPage].conditions || {}
    console.log(conditions)
    const shouldShowPage = checkConditions(conditions, data)
    console.log(shouldShowPage)
    if (shouldShowPage) {
      return { nextPage, skippedPages }
    }
    skippedPages.push(nextPage)
  }

  return null
}

module.exports = {
  getCurrentPageIndex,
  getCurrentPageUrl,
  getNextPage
}
