import $ from 'jquery'

export class AddAnother {
  constructor(container) {
    this.container = $(container)

    if (this.container.data('moj-add-another-initialised')) {
      return
    }

    this.container.data('moj-add-another-initialised', true)

    this.container.on(
      'click',
      '.moj-add-another__remove-button',
      $.proxy(this, 'onRemoveButtonClick')
    )
    this.container.on(
      'click',
      '.moj-add-another__add-button',
      $.proxy(this, 'onAddButtonClick')
    )
    this.container
      .find('.moj-add-another__add-button, moj-add-another__remove-button')
      .prop('type', 'button')
  }

  onAddButtonClick(e) {
    const item = this.getNewItem()
    this.updateAttributes(this.getItems().length, item)
    this.resetItem(item)
    const firstItem = this.getItems().first()
    if (!this.hasRemoveButton(firstItem)) {
      this.createRemoveButton(firstItem)
    }
    this.getItems().last().after(item)
    item.find('input, textarea, select').first().focus()
  }

  hasRemoveButton(item) {
    return item.find('.moj-add-another__remove-button').length
  }

  getItems() {
    return this.container.find('.moj-add-another__item')
  }

  getNewItem() {
    const item = this.getItems().first().clone()
    if (!this.hasRemoveButton(item)) {
      this.createRemoveButton(item)
    }
    return item
  }

  updateAttributes(index, item) {
    item.find('[data-name]').each(function (i, el) {
      const originalId = el.id

      el.name = $(el)
        .attr('data-name')
        .replace(/%index%/, index)
      el.id = $(el)
        .attr('data-id')
        .replace(/%index%/, index)

      const label =
        $(el).siblings('label')[0] ||
        $(el).parents('label')[0] ||
        item.find(`[for="${originalId}"]`)[0]
      label.htmlFor = el.id
    })
  }

  createRemoveButton(item) {
    item.append(
      '<button type="button" class="govuk-button govuk-button--secondary moj-add-another__remove-button">Remove</button>'
    )
  }

  resetItem(item) {
    item.find('[data-name], [data-id]').each(function (index, el) {
      if (el.type === 'checkbox' || el.type === 'radio') {
        el.checked = false
      } else {
        el.value = ''
      }
    })
  }

  onRemoveButtonClick(e) {
    $(e.currentTarget).parents('.moj-add-another__item').remove()
    const items = this.getItems()
    if (items.length === 1) {
      items.find('.moj-add-another__remove-button').remove()
    }
    items.each(
      $.proxy(function (index, el) {
        this.updateAttributes(index, $(el))
      }, this)
    )
    this.focusHeading()
  }

  focusHeading() {
    this.container.find('.moj-add-another__heading').get(0).focus()
  }
}
