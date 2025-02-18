const {COMPONENT_FORM_PAGES, COMPONENT_FORM_PAGES_OPTIONS} = require("../config");
const nextPage = (url, body, subpage) => {
  const path = url.split('/')[1]
  const index = COMPONENT_FORM_PAGES.findIndex((page) => path.endsWith(page))
  const currentPage = COMPONENT_FORM_PAGES[index]

  if (subpage) {
    // Return same page but with the next subpage
    return `${currentPage}/${subpage}`
  }

  const getNextPage = (pageOptions, body) => {
    const fieldKey = Object.keys(pageOptions)[0]
    const fieldValue = body?.[fieldKey]

    if (fieldValue && pageOptions[fieldKey]) {
      const nextPageOption = pageOptions[fieldKey][fieldValue]
      if (typeof nextPageOption === 'string') {
        return nextPageOption
      } else if (typeof nextPageOption === 'object') {
        return getNextPage(nextPageOption, body)
      }
    }
    return null
  }

  // Check if there's an entry for this page in COMPONENT_FORM_PAGES_OPTIONS
  if (COMPONENT_FORM_PAGES_OPTIONS[currentPage]) {
    const nextPage = getNextPage(COMPONENT_FORM_PAGES_OPTIONS[currentPage], body)
    if (nextPage) {
      return nextPage
    }
  }

  // Default behavior: return the next page in COMPONENT_FORM_PAGES
  if (index !== -1 && index < COMPONENT_FORM_PAGES.length - 1) {
    return COMPONENT_FORM_PAGES[index + 1]
  }

  return null
}

module.exports = nextPage
