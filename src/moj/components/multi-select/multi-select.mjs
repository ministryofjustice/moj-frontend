import $ from 'jquery'

export class MultiSelect {
  constructor(options) {
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
    this.toggleButton.on('click', $.proxy(this, 'onButtonClick'))
    this.container.append(this.toggle)
    this.checkboxes = $(options.checkboxes)
    this.checkboxes.on('click', $.proxy(this, 'onCheckboxClick'))
    this.checked = options.checked || false
  }

  getToggleHtml(allId) {
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

  onButtonClick(e) {
    if (this.checked) {
      this.uncheckAll()
      this.toggleButton[0].checked = false
    } else {
      this.checkAll()
      this.toggleButton[0].checked = true
    }
  }

  checkAll() {
    this.checkboxes.each(
      $.proxy(function (index, el) {
        el.checked = true
      }, this)
    )
    this.checked = true
  }

  uncheckAll() {
    this.checkboxes.each(
      $.proxy(function (index, el) {
        el.checked = false
      }, this)
    )
    this.checked = false
  }

  onCheckboxClick(e) {
    if (!e.target.checked) {
      this.toggleButton[0].checked = false
      this.checked = false
    } else {
      if (
        this.checkboxes.filter(':checked').length === this.checkboxes.length
      ) {
        this.toggleButton[0].checked = true
        this.checked = true
      }
    }
  }
}
