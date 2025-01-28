new MOJFrontend.FilterToggleButton({
  bigModeMediaQuery: '(min-width: 48.063em)',
  startHidden: true,
  toggleButton: {
    container: document.querySelector('.moj-action-bar__filter'),
    showText: 'Show filter',
    hideText: 'Hide filter',
    classes: 'govuk-button--secondary'
  },
  closeButton: {
    container: document.querySelector('.moj-filter__header-action'),
    text: 'Close'
  },
  filter: {
    container: document.querySelector('.moj-filter')
  }
})
