import $ from 'jquery'

export function MultiSelect(options) {
  this.container = $(options.container)

  if (this.container.data('moj-multi-select-initialised')) {
    return
  }

  this.container.data('moj-multi-select-initialised', true)

  const idPrefix = options.id_prefix
  let allId = 'checkboxes-all'
  if (typeof idPrefix !== 'undefined') {
    allId = `${idPrefix}checkboxes-all`
  }

  this.toggle = $(this.getToggleHtml(allId))
  this.toggleButton = this.toggle.find('input')
  this.toggleButton.on('click', this.onButtonClick.bind(this))
  this.container.append(this.toggle)
  this.checkboxes = $(options.checkboxes)
  this.checkboxes.on('click', this.onCheckboxClick.bind(this))
  this.checked = options.checked || false
}

MultiSelect.prototype.getToggleHtml = function (allId) {
  let html = ''
  html +=
    '<div class="govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox">'
  html += `  <input type="checkbox" class="govuk-checkboxes__input" id="${allId}">`
  html += `  <label class="govuk-label govuk-checkboxes__label moj-multi-select__toggle-label" for="${allId}">`
  html += '    <span class="govuk-visually-hidden">Select all</span>'
  html += '  </label>'
  html += '</div>'
  return html
}

MultiSelect.prototype.onButtonClick = function () {
  if (this.checked) {
    this.uncheckAll()
    this.toggleButton[0].checked = false
  } else {
    this.checkAll()
    this.toggleButton[0].checked = true
  }
}

MultiSelect.prototype.checkAll = function () {
  this.checkboxes.each((index, el) => {
    el.checked = true
  })
  this.checked = true
}

MultiSelect.prototype.uncheckAll = function () {
  this.checkboxes.each((index, el) => {
    el.checked = false
  })
  this.checked = false
}

MultiSelect.prototype.onCheckboxClick = function (event) {
  if (!event.target.checked) {
    this.toggleButton[0].checked = false
    this.checked = false
  } else {
    if (this.checkboxes.filter(':checked').length === this.checkboxes.length) {
      this.toggleButton[0].checked = true
      this.checked = true
    }
  }
}
