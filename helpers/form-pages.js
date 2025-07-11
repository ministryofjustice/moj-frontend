const { COMPONENT_FORM_PAGES } = require('../config')

/**
 * Gets all the pages that are required based on the current answers
 */
const getCurrentFormPages = (session) => {
  const pages = []
  for (const [page, config] of Object.entries(COMPONENT_FORM_PAGES)) {
    if (config?.conditions) {
      if (checkConditions(config.conditions, session)) {
        pages.push(page)
      }
    } else {
      pages.push(page)
    }
  }
  return pages
}
/**
 * Check the conditions for a page and check whether they are met by the saved
 * values in the session.
 *
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
module.exports = getCurrentFormPages
