import { mergeConfigs, normaliseDataset } from '../../common/configuration.mjs'

export class RichTextEditor {
  /**
   * @param {Element | null} $root - HTML element to use for rich text editor
   * @param {RichTextEditorConfig} config
   */
  constructor($root, config = {}) {
    if (
      !$root ||
      !($root instanceof HTMLElement) ||
      !RichTextEditor.isSupported()
    ) {
      return this
    }

    this.$root = $root

    if (this.$root.hasAttribute('data-rich-text-editor-init')) {
      return this
    }

    this.$root.setAttribute('data-rich-text-editor-init', '')

    const $textarea = this.$root.querySelector('.govuk-textarea')
    if (!$textarea || !($textarea instanceof HTMLTextAreaElement)) {
      return this
    }

    this.$textarea = $textarea

    /**
     * Merge configs
     *
     * @type {RichTextEditorConfig}
     */
    this.config = mergeConfigs(
      RichTextEditor.defaults,
      config,
      normaliseDataset(RichTextEditor, this.$root.dataset)
    )

    this.createToolbar()
    this.hideDefault()
    this.configureToolbar()

    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    }

    this.$content.addEventListener('input', this.onEditorInput.bind(this))

    this.$root
      .querySelector('label')
      .addEventListener('click', this.onLabelClick.bind(this))

    this.$toolbar.addEventListener('keydown', this.onToolbarKeydown.bind(this))
  }

  /**
   * @param {KeyboardEvent} event - Click event
   */
  onToolbarKeydown(event) {
    let $focusableButton
    switch (event.keyCode) {
      case this.keys.right:
      case this.keys.down: {
        $focusableButton = this.$buttons.find(
          (button) => button.getAttribute('tabindex') === '0'
        )

        if ($focusableButton) {
          const $nextButton = $focusableButton.nextElementSibling

          if ($nextButton && $nextButton instanceof HTMLButtonElement) {
            $nextButton.focus()
            $focusableButton.setAttribute('tabindex', '-1')
            $nextButton.setAttribute('tabindex', '0')
          }
        }

        break
      }

      case this.keys.left:
      case this.keys.up: {
        $focusableButton = this.$buttons.find(
          (button) => button.getAttribute('tabindex') === '0'
        )

        if ($focusableButton) {
          const $previousButton = $focusableButton.previousElementSibling

          if ($previousButton && $previousButton instanceof HTMLButtonElement) {
            $previousButton.focus()
            $focusableButton.setAttribute('tabindex', '-1')
            $previousButton.setAttribute('tabindex', '0')
          }
        }

        break
      }
    }
  }

  getToolbarHtml() {
    let html = ''

    html += '<div class="moj-rich-text-editor__toolbar" role="toolbar">'

    if (this.config.toolbar.bold) {
      html +=
        '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--bold" type="button" data-command="bold"><span class="govuk-visually-hidden">Bold</span></button>'
    }

    if (this.config.toolbar.italic) {
      html +=
        '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--italic" type="button" data-command="italic"><span class="govuk-visually-hidden">Italic</span></button>'
    }

    if (this.config.toolbar.underline) {
      html +=
        '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--underline" type="button" data-command="underline"><span class="govuk-visually-hidden">Underline</span></button>'
    }

    if (this.config.toolbar.bullets) {
      html +=
        '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--unordered-list" type="button" data-command="insertUnorderedList"><span class="govuk-visually-hidden">Unordered list</span></button>'
    }

    if (this.config.toolbar.numbers) {
      html +=
        '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--ordered-list" type="button" data-command="insertOrderedList"><span class="govuk-visually-hidden">Ordered list</span></button>'
    }

    html += '</div>'
    return html
  }

  getEnhancedHtml() {
    return `${this.getToolbarHtml()}<div class="govuk-textarea moj-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>`
  }

  hideDefault() {
    this.$textarea.classList.add('govuk-visually-hidden')
    this.$textarea.setAttribute('aria-hidden', 'true')
    this.$textarea.setAttribute('tabindex', '-1')
  }

  createToolbar() {
    this.$toolbar = document.createElement('div')
    this.$toolbar.className = 'moj-rich-text-editor'
    this.$toolbar.innerHTML = this.getEnhancedHtml()
    this.$root.append(this.$toolbar)

    this.$content = /** @type {HTMLElement} */ (
      this.$root.querySelector('.moj-rich-text-editor__content')
    )

    this.$content.innerHTML = this.$textarea.value
  }

  configureToolbar() {
    this.$buttons = Array.from(
      /** @type {NodeListOf<HTMLButtonElement>} */
      (this.$root.querySelectorAll('.moj-rich-text-editor__toolbar-button'))
    )

    this.$buttons.forEach(($button, index) => {
      $button.setAttribute('tabindex', !index ? '0' : '-1')
      $button.addEventListener('click', this.onButtonClick.bind(this))
    })
  }

  /**
   * @param {MouseEvent} event - Click event
   */
  onButtonClick(event) {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return
    }

    document.execCommand(
      event.currentTarget.getAttribute('data-command'),
      false,
      undefined
    )
  }

  getContent() {
    return this.$content.innerHTML
  }

  onEditorInput() {
    this.updateTextarea()
  }

  updateTextarea() {
    document.execCommand('defaultParagraphSeparator', false, 'p')
    this.$textarea.value = this.getContent()
  }

  /**
   * @param {MouseEvent} event - Click event
   */
  onLabelClick(event) {
    event.preventDefault()
    this.$content.focus()
  }

  static isSupported() {
    return 'contentEditable' in document.documentElement
  }

  /**
   * Rich text editor config
   *
   * @type {RichTextEditorConfig}
   */
  static defaults = Object.freeze({
    toolbar: {
      bold: false,
      italic: false,
      underline: false,
      bullets: true,
      numbers: true
    }
  })

  /**
   * Rich text editor config schema
   *
   * @satisfies {Schema<RichTextEditorConfig>}
   */
  static schema = Object.freeze({
    properties: {
      toolbar: { type: 'object' }
    }
  })
}

/**
 * Rich text editor config
 *
 * @typedef {object} RichTextEditorConfig
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

/**
 * @import { Schema } from '../../common/configuration.mjs'
 */
