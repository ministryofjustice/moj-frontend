const {
  ADD_NEW_COMPONENT_ROUTE: urlRoot
} = require('../config')

const getCurrentFormPages = require('./form-pages.js')

/**
 * @param {string} url
 * @returns {Array<{page:string, subpage: (number|undefined)}>} - Of type [string, (number|undefined)]
 */
const getUrlParts = (url) => {
  let [page, subpage] = url.split('/').slice(1)
  subpage = subpage ? Number.parseInt(subpage) : subpage
  return [page, subpage]
}

/**
 * Finds the index of the given page within the current form pages array
 *
 * @param {string} pageUrl
 * @param {Array<string>} pages - the pages to search in
 */
const getCurrentPageIndex = (pageUrl, pages) => {
  return pages.findIndex((page) => pageUrl.endsWith(page))
}

/**
 * Gets the next page url
 *
 * @param {string} url - the full url of the page
 * @param {object} session - the current session
 * @param {boolean} addingAnother - are we adding additional entries
 * @param {boolean} amendingAnswers - has the user seen the CYA page
 * @returns {(string|null)}
 */
const getNextPage = (url, session, addingAnother, amendingAnswers) => {
  const pages = getCurrentFormPages(session)
  const [currentPageUrl, currentSubpageIndex] = getUrlParts(url)
  const currentPageIndex = getCurrentPageIndex(currentPageUrl, pages)

  if (addingAnother) {
    return getNextSubpageUrl(currentPageUrl, session)
  }

  if (!amendingAnswers) {
    const nextSubpageIndex = getNextSubpageIndex(currentSubpageIndex)
    const hasNextSubpage = Object.hasOwn(
      session,
      `/${currentPageUrl}/${nextSubpageIndex}`
    )
    const nextPage = pages.at(currentPageIndex + 1)

    if (hasNextSubpage) {
      return `${urlRoot}/${currentPageUrl}/${nextSubpageIndex}`
    }
    if (nextPage) {
      return `${urlRoot}/${nextPage}`
    }
    return null
  }

  // if we are amending check all pages in getCurrentFormPages after the
  // current page have answers saved
  for (let i = currentPageIndex + 1; i < pages.length; i++) {
    const nextPage = pages[i]
    if (!Object.hasOwn(session, `/${nextPage}`)) {
      return `${urlRoot}/${nextPage}`
    }
  }

  return null
}

/**
 * Gets the previous page url
 *
 * @param {string} url - the full url of the page
 * @param {object} session - the current session
 * @returns {(string|null)}
 */
const getPreviousPage = (url, session) => {
  const pages = getCurrentFormPages(session)
  const [currentPageUrl, currentSubpageIndex] = getUrlParts(url)
  const currentPageIndex = getCurrentPageIndex(currentPageUrl, pages)

  if (currentPageIndex === -1) {
    return null
  }

  // Check if there are subpages in the session for the current page
  if (currentSubpageIndex) {
    return getPreviousSubpageUrl(currentPageUrl, currentSubpageIndex)
  }

  if (currentPageIndex === 0) {
    return `${urlRoot}/start`
  }

  const previousPage = pages.at(currentPageIndex - 1)

  // check if there are subpages in the session for the previous page
  if (previousPage && session) {
    const subpagePath = findAllSubpages(previousPage, session).at(-1)

    return subpagePath
      ? `${urlRoot}${subpagePath}`
      : `${urlRoot}/${previousPage}`
  }

  return null
}

/**
 * Gets all the subpages for the given page and sorts them
 *
 * @param {string} pageUrl
 * @param {object} session
 * @param {string<asc|desc>} order
 * @returns {Array<string>}
 */
const findAllSubpages = (pageUrl, session, order = 'asc') => {
  return Object.keys(session)
    .filter((p) => p.startsWith(`/${pageUrl}/`))
    .sort((a, b) => {
      if (order === 'asc') {
        return a.localeCompare(b, undefined, { numeric: true })
      }
      return b.localeCompare(a, undefined, { numeric: true })
    })
}

/**
 * Generates a url for the next subpage from a page
 *
 * @param {string} pageUrl
 * @param {object} session
 * @returns {string}
 */
const getNextSubpageUrl = (pageUrl, session) => {
  const subpages = findAllSubpages(pageUrl, session)
  const highestSubpage = Number.parseInt(subpages.at(-1)?.split('/').at(-1))
  const newSubpageIndex = Number.isInteger(highestSubpage)
    ? highestSubpage + 1
    : 1

  return `${urlRoot}/${pageUrl}/${newSubpageIndex}`
}

const getNextSubpageIndex = (currentSubpageIndex) => {
  return currentSubpageIndex ? Number.parseInt(currentSubpageIndex) + 1 : 1
}

/**
 * Generates the url for the previous subpage from a subpage
 *
 * @param {string} pageUrl - the page to find a subpage for
 * @param {number} subpageIndex - the current subpage number
 * @returns {string}
 */
const getPreviousSubpageUrl = (pageUrl, subpageIndex) => {
  let url = `${urlRoot}/${pageUrl}`

  if (subpageIndex > 1) {
    url += `/${subpageIndex - 1}`
  }

  return url
}

module.exports = {
  getNextPage,
  getPreviousPage
}
