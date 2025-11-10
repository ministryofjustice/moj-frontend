const updateDatepickerToggleAriaLabel = ($item) => {
  $item.querySelectorAll('.moj-js-datepicker-toggle').forEach(($button) => {
    const $label = $button.closest('.moj-datepicker').querySelector('label')
    const labelText = $label ? $label.textContent : ''
    if (labelText) {
      $button.setAttribute('aria-label', `Choose ${labelText.toLowerCase()}`)
    }
  })
}

const $addAnotherItems = document.querySelectorAll('.moj-add-another')
$addAnotherItems.forEach(($addAnother) => {
  // Set a unique accessible name for the datepicker toggle buttons in existing items
  $addAnother.querySelectorAll('.moj-add-another__item').forEach(($item) => {
    updateDatepickerToggleAriaLabel($item)
  })
})

document.addEventListener('moj-add-another:add-item', function (event) {
  const $newItem = event.target
  // Initialize any new components in the added item
  window.MOJFrontend.initAll($newItem)
  // Set a unique accessible name for the datepicker toggle buttons
  updateDatepickerToggleAriaLabel($newItem)
})
