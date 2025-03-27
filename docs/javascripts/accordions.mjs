/* eslint-disable no-new */

import { Accordion } from 'govuk-frontend'

/**
 * @param {NodeListOf<HTMLElement>} $accordions
 */
export function initAccordions($accordions) {
  if (!$accordions.length) {
    return
  }

  /** @type {HTMLElement | undefined} */
  let $linkedElement

  /** @type {HTMLElement | undefined} */
  let $linkedSection

  const { hash } = window.location

  // Find section for browsers without 'beforematch' support
  if (!('onbeforematch' in document) && hash.includes('#')) {
    const id = hash.split('#').pop()

    // Handle hash fragments with invalid IDs
    const selector = `[id="${decodeURI(id)}"]`

    $linkedElement = document.querySelector(selector)
    $linkedSection = $linkedElement?.closest('.govuk-accordion__section')
  }

  // Initialise each accordion
  $accordions.forEach(($accordion) => {
    const accordion = new Accordion($accordion)

    if (
      $linkedElement &&
      $linkedSection &&
      $accordion.contains($linkedSection)
    ) {
      // Open the section
      accordion.setExpanded(true, $linkedSection)

      // Scroll to element
      $linkedElement.scrollIntoView()

      // Apply focus
      window.setTimeout(() => {
        $linkedElement.focus({ preventScroll: true })
      }, 0)
    }
  })
}
