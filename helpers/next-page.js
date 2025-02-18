const {COMPONENT_FORM_PAGES, COMPONENT_FORM_PAGES_OPTIONS} = require("../config");
const nextPage = (url, body, subpage) => {
  const path = url.split('/')[1]
  const index = COMPONENT_FORM_PAGES.findIndex((page) => path.endsWith(page))
  const currentPage = COMPONENT_FORM_PAGES[index]

  if (subpage) {
    // Return same page but with the next subpage
    return `${currentPage}/${subpage}`
  }

  // Check if there's an entry for this page in COMPONENT_FORM_PAGES_OPTIONS
  if (COMPONENT_FORM_PAGES_OPTIONS[currentPage]) {
    const fieldKey = Object.keys(COMPONENT_FORM_PAGES_OPTIONS[currentPage])[0] // Get the expected field from the body
    const fieldValue = body?.[fieldKey] // Extract the value from the body

    if (
      fieldValue &&
      COMPONENT_FORM_PAGES_OPTIONS[currentPage][fieldKey][fieldValue]
    ) {
      return COMPONENT_FORM_PAGES_OPTIONS[currentPage][fieldKey][fieldValue] // Return mapped page
    }
  }

  // Default behavior: return the next page in COMPONENT_FORM_PAGES
  if (index !== -1 && index < COMPONENT_FORM_PAGES.length - 1) {
    return COMPONENT_FORM_PAGES[index + 1]
  }

  return null
}

module.exports = nextPage
