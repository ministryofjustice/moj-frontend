document.addEventListener('moj-add-another:add-item', function (event) {
  const $newItem = event.target
  window.MOJFrontend.initAll($newItem)
})
