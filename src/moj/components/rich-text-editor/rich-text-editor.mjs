export function RichTextEditor(options) {
  if (!('contentEditable' in document.documentElement)) {
    return
  }

  this.options = options
  this.options.toolbar = this.options.toolbar || {
    bold: false,
    italic: false,
    underline: false,
    bullets: true,
    numbers: true
  }

  this.textarea = this.options.textarea
  this.container = this.textarea.parentElement

  if (this.container.hasAttribute('data-rich-text-editor-init')) {
    return
  }

  this.container.setAttribute('data-rich-text-editor-init', '')

  this.createToolbar()
  this.hideDefault()
  this.configureToolbar()

  this.keys = {
    left: 37,
    right: 39,
    up: 38,
    down: 40
  }

  this.container
    .querySelector('.moj-rich-text-editor__content')
    .addEventListener('input', this.onEditorInput.bind(this))

  this.container
    .querySelector('label')
    .addEventListener('click', this.onLabelClick.bind(this))

  this.toolbar.addEventListener('keydown', this.onToolbarKeydown.bind(this))
}

RichTextEditor.prototype.onToolbarKeydown = function (event) {
  let focusableButton
  switch (event.keyCode) {
    case this.keys.right:
    case this.keys.down: {
      focusableButton = this.buttons.find(
        (button) => button.getAttribute('tabindex') === '0'
      )
      const nextButton = focusableButton.nextElementSibling
      if (nextButton instanceof HTMLButtonElement) {
        nextButton.focus()
        focusableButton.setAttribute('tabindex', '-1')
        nextButton.setAttribute('tabindex', '0')
      }
      break
    }
    case this.keys.left:
    case this.keys.up: {
      focusableButton = this.buttons.find(
        (button) => button.getAttribute('tabindex') === '0'
      )
      const previousButton = focusableButton.previousElementSibling
      if (previousButton instanceof HTMLButtonElement) {
        previousButton.focus()
        focusableButton.setAttribute('tabindex', '-1')
        previousButton.setAttribute('tabindex', '0')
      }
      break
    }
  }
}

RichTextEditor.prototype.getToolbarHtml = function () {
  let html = ''

  html += '<div class="moj-rich-text-editor__toolbar" role="toolbar">'

  if (this.options.toolbar.bold) {
    html +=
      '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--bold" type="button" data-command="bold"><span class="govuk-visually-hidden">Bold</span></button>'
  }

  if (this.options.toolbar.italic) {
    html +=
      '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--italic" type="button" data-command="italic"><span class="govuk-visually-hidden">Italic</span></button>'
  }

  if (this.options.toolbar.underline) {
    html +=
      '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--underline" type="button" data-command="underline"><span class="govuk-visually-hidden">Underline</span></button>'
  }

  if (this.options.toolbar.bullets) {
    html +=
      '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--unordered-list" type="button" data-command="insertUnorderedList"><span class="govuk-visually-hidden">Unordered list</span></button>'
  }

  if (this.options.toolbar.numbers) {
    html +=
      '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--ordered-list" type="button" data-command="insertOrderedList"><span class="govuk-visually-hidden">Ordered list</span></button>'
  }

  html += '</div>'
  return html
}

RichTextEditor.prototype.getEnhancedHtml = function () {
  return `${this.getToolbarHtml()}<div class="govuk-textarea moj-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>`
}

RichTextEditor.prototype.hideDefault = function () {
  this.textarea.classList.add('govuk-visually-hidden')
  this.textarea.setAttribute('aria-hidden', 'true')
  this.textarea.setAttribute('tabindex', '-1')
}

RichTextEditor.prototype.createToolbar = function () {
  this.toolbar = document.createElement('div')
  this.toolbar.className = 'moj-rich-text-editor'
  this.toolbar.innerHTML = this.getEnhancedHtml()
  this.container.append(this.toolbar)

  this.container.querySelector('.moj-rich-text-editor__content').innerHTML =
    this.textarea.value
}

RichTextEditor.prototype.configureToolbar = function () {
  this.buttons = Array.from(
    this.container.querySelectorAll('.moj-rich-text-editor__toolbar-button')
  )

  this.buttons.forEach((button, index) => {
    button.setAttribute('tabindex', !index ? '0' : '-1')
    button.addEventListener('click', this.onButtonClick.bind(this))
  })
}

RichTextEditor.prototype.onButtonClick = function (event) {
  document.execCommand(
    event.currentTarget.getAttribute('data-command'),
    false,
    null
  )
}

RichTextEditor.prototype.getContent = function () {
  return this.container.querySelector('.moj-rich-text-editor__content')
    .innerHTML
}

RichTextEditor.prototype.onEditorInput = function () {
  this.updateTextarea()
}

RichTextEditor.prototype.updateTextarea = function () {
  document.execCommand('defaultParagraphSeparator', false, 'p')
  this.textarea.value = this.getContent()
}

RichTextEditor.prototype.onLabelClick = function (event) {
  event.preventDefault()
  this.container.querySelector('.moj-rich-text-editor__content').focus()
}
