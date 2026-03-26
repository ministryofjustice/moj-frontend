import { FilterToggleButton } from '/javascripts/moj-frontend.min.js'

const $filter = document.querySelector('[data-module="moj-filter"]')

new FilterToggleButton($filter, {
  bigModeMediaQuery: '(min-width: 48.0625em)',
  startHidden: true,
  toggleButton: {
    showText: 'Show filter',
    hideText: 'Hide filter',
    classes: 'govuk-button--secondary'
  },
  closeButton: {
    text: 'Close'
  }
})
