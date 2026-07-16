const amountInputSelector = 'input[data-label="amount"]'
const totalInput = document.querySelector('#expenses-total')

const calculateTotal = () => {
  let total = 0
  document.querySelectorAll(amountInputSelector).forEach(($input) => {
    const value = parseFloat($input.value)
    if (!isNaN(value)) {
      total += value
    }
  })
  totalInput.value = total.toFixed(2)
}

document.querySelectorAll(amountInputSelector).forEach(($input) => {
  $input.addEventListener('input', calculateTotal)
})

document.addEventListener('moj-add-another:add-item', function (event) {
  const $newItem = event.target
  const inputs = $newItem.querySelectorAll(amountInputSelector)
  inputs.forEach(($input) => {
    $input.addEventListener('input', calculateTotal)
  })
})

document.addEventListener('moj-add-another:remove-item', function (event) {
  calculateTotal()
})
