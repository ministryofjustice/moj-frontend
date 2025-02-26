import $ from 'jquery'

/**
 * @class
 * @param {RichTextEditorConfig} options
 */
export function RichTextEditor(options) {
  if (
    !options.textarea ||
    !(options.textarea instanceof HTMLTextAreaElement) ||
    !('contentEditable' in document.documentElement)
  ) {
    return
  }

  options.toolbar = options.toolbar || {
    bold: false,
    italic: false,
    underline: false,
    bullets: true,
    numbers: true
  }

  this.options = options
  this.textarea = $(options.textarea)
  this.container = this.textarea.parent()

  if (this.container.data('moj-rich-text-editor-initialised')) {
    return
  }

  this.container.data('moj-rich-text-editor-initialised', true)

  this.createToolbar()
  this.hideDefault()
  this.configureToolbar()
  this.keys = {
    left: 37,
    right: 39,
    up: 38,
    down: 40
  }
  this.container.on(
    'click',
    '.moj-rich-text-editor__toolbar-button',
    this.onButtonClick.bind(this)
  )
  this.container
    .find('.moj-rich-text-editor__content')
    .on('input', this.onEditorInput.bind(this))
  this.container.find('label').on('click', this.onLabelClick.bind(this))
  this.toolbar.on('keydown', this.onToolbarKeydown.bind(this))
}

/**
 * @param {JQuery.KeyDownEvent<HTMLElement>} e - Click event
 */
RichTextEditor.prototype.onToolbarKeydown = function (e) {
  let focusableButton
  switch (e.keyCode) {
    case this.keys.right:
    case this.keys.down: {
      focusableButton = this.toolbar.find('button[tabindex=0]')
      const nextButton = focusableButton.next('button')
      if (nextButton[0]) {
        nextButton.focus()
        focusableButton.attr('tabindex', '-1')
        nextButton.attr('tabindex', '0')
      }
      break
    }
    case this.keys.left:
    case this.keys.up: {
      focusableButton = this.toolbar.find('button[tabindex=0]')
      const previousButton = focusableButton.prev('button')
      if (previousButton[0]) {
        previousButton.focus()
        focusableButton.attr('tabindex', '-1')
        previousButton.attr('tabindex', '0')
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

RichTextEditor.prototype.getEnhancedHtml = function (val) {
  return `${this.getToolbarHtml()}<div class="govuk-textarea moj-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>`
}

RichTextEditor.prototype.hideDefault = function () {
  this.textarea = this.container.find('textarea')
  this.textarea.addClass('govuk-visually-hidden')
  this.textarea.attr('aria-hidden', 'true')
  this.textarea.attr('tabindex', '-1')
}

RichTextEditor.prototype.createToolbar = function () {
  this.toolbar = document.createElement('div')
  this.toolbar.className = 'moj-rich-text-editor'
  this.toolbar.innerHTML = this.getEnhancedHtml()
  this.container.append(this.toolbar)
  this.toolbar = this.container.find('.moj-rich-text-editor__toolbar')
  this.container
    .find('.moj-rich-text-editor__content')
    .html(this.textarea.val())
}

RichTextEditor.prototype.configureToolbar = function () {
  this.buttons = this.container.find('.moj-rich-text-editor__toolbar-button')
  this.buttons.prop('tabindex', '-1')
  const firstTab = this.buttons.first()
  firstTab.prop('tabindex', '0')
}

RichTextEditor.prototype.onButtonClick = function (e) {
  document.execCommand($(e.currentTarget).data('command'), false, undefined)
}

RichTextEditor.prototype.getContent = function () {
  return this.container.find('.moj-rich-text-editor__content').html()
}

/**
 * @param {JQuery.TriggeredEvent<HTMLElement>} e - Input event
 */
RichTextEditor.prototype.onEditorInput = function (e) {
  this.updateTextarea()
}

RichTextEditor.prototype.updateTextarea = function () {
  document.execCommand('defaultParagraphSeparator', false, 'p')
  this.textarea.val(this.getContent())
}

/**
 * @param {JQuery.ClickEvent<HTMLElement>} e - Click event
 */
RichTextEditor.prototype.onLabelClick = function (e) {
  e.preventDefault()
  this.container.find('.moj-rich-text-editor__content').focus()
}

/**
 * Rich text editor config
 *
 * @typedef {object} RichTextEditorConfig
 * @property {Element | null} textarea - Textarea selector
 * @property {RichTextEditorToolbar} [toolbar] - Toolbar options
 */

/**
 * Rich text editor toolbar options
 *
 * @typedef {object} RichTextEditorToolbar
 * @property {boolean} [bold] - Show the bold button
 * @property {boolean} [italic] - Show the italic button
 * @property {boolean} [underline] - Show the underline button
 * @property {boolean} [bullets] - Show the bullets button
 * @property {boolean} [numbers] - Show the numbers button
 */
