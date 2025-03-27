/* eslint-disable no-new */

import { Accordion } from 'govuk-frontend'

/**
 * @param {NodeListOf<HTMLElement>} $accordions
 */
export function initAccordions($accordions) {
  if (!$accordions.length) {
    return
  }

  $accordions.forEach(($accordion) => {
    new Accordion($accordion)
  })
}
