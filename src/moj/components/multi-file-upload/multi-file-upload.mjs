/* eslint-disable @typescript-eslint/no-empty-function */

import { mergeConfigs, normaliseDataset } from '../../common/configuration.mjs'

export class MultiFileUpload {
  /**
   * @param {Element | null} $root - HTML element to use for multi file upload
   * @param {MultiFileUploadConfig} [config] - Multi file upload config
   */
  constructor($root, config = {}) {
    if (
      !$root ||
      !($root instanceof HTMLElement) ||
      !MultiFileUpload.isSupported()
    ) {
      return this
    }

    this.$root = $root

    if (this.$root.hasAttribute('data-moj-file-upload-init')) {
      return this
    }

    this.$root.setAttribute('data-moj-file-upload-init', '')

    /**
     * Merge configs
     *
     * @type {MultiFileUploadConfig}
     */
    this.config = mergeConfigs(
      MultiFileUpload.defaults,
      config,
      normaliseDataset(MultiFileUpload, this.$root.dataset)
    )

    const $feedbackContainer =
      this.config.feedbackContainer.element ??
      this.$root.querySelector(this.config.feedbackContainer.selector)

    if (!$feedbackContainer || !($feedbackContainer instanceof HTMLElement)) {
      return this
    }

    this.$feedbackContainer = $feedbackContainer

    this.setupFileInput()
    this.setupDropzone()
    this.setupLabel()
    this.setupStatusBox()

    this.$root.addEventListener('click', this.onFileDeleteClick.bind(this))
    this.$root.classList.add('moj-multi-file-upload--enhanced')
  }

  setupDropzone() {
    this.$dropzone = document.createElement('div')
    this.$dropzone.classList.add('moj-multi-file-upload__dropzone')

    this.$dropzone.addEventListener('dragover', this.onDragOver.bind(this))
    this.$dropzone.addEventListener('dragleave', this.onDragLeave.bind(this))
    this.$dropzone.addEventListener('drop', this.onDrop.bind(this))

    this.$fileInput.replaceWith(this.$dropzone)
    this.$dropzone.appendChild(this.$fileInput)
  }

  setupLabel() {
    const $label = document.createElement('label')
    $label.setAttribute('for', this.$fileInput.id)
    $label.classList.add('govuk-button', 'govuk-button--secondary')
    $label.textContent = this.config.dropzoneButtonText

    const $hint = document.createElement('p')
    $hint.classList.add('govuk-body')
    $hint.textContent = this.config.dropzoneHintText

    this.$label = $label
    this.$dropzone.append($hint)
    this.$dropzone.append($label)
  }

  setupFileInput() {
    this.$fileInput = /** @type {HTMLInputElement} */ (
      this.$root.querySelector('.moj-multi-file-upload__input')
    )
    this.$fileInput.addEventListener('change', this.onFileChange.bind(this))
    this.$fileInput.addEventListener('focus', this.onFileFocus.bind(this))
    this.$fileInput.addEventListener('blur', this.onFileBlur.bind(this))
  }

  setupStatusBox() {
    this.$status = document.createElement('div')
    this.$status.classList.add('govuk-visually-hidden')
    this.$status.setAttribute('aria-live', 'polite')
    this.$status.setAttribute('role', 'status')
    this.$dropzone.append(this.$status)
  }

  /**
   * @param {DragEvent} event - Drag event
   */
  onDragOver(event) {
    event.preventDefault()
    this.$dropzone.classList.add('moj-multi-file-upload--dragover')
  }

  onDragLeave() {
    this.$dropzone.classList.remove('moj-multi-file-upload--dragover')
  }

  /**
   * @param {DragEvent} event - Drag event
   */
  onDrop(event) {
    event.preventDefault()
    this.$dropzone.classList.remove('moj-multi-file-upload--dragover')
    this.$feedbackContainer.classList.remove('moj-hidden')
    this.$status.textContent = this.config.uploadStatusText
    this.uploadFiles(event.dataTransfer.files)
  }

  /**
   * @param {FileList} files - File list
   */
  uploadFiles(files) {
    for (const file of Array.from(files)) {
      this.uploadFile(file)
    }
  }

  onFileChange() {
    this.$feedbackContainer.classList.remove('moj-hidden')
    this.$status.textContent = this.config.uploadStatusText
    this.uploadFiles(this.$fileInput.files)

    const $fileInput = this.$fileInput.cloneNode(true)
    if (!$fileInput || !($fileInput instanceof HTMLInputElement)) {
      return
    }

    $fileInput.value = ''
    this.$fileInput.replaceWith($fileInput)

    this.setupFileInput()
    this.$fileInput.focus()
  }

  onFileFocus() {
    this.$label.classList.add('moj-multi-file-upload--focused')
  }

  onFileBlur() {
    this.$label.classList.remove('moj-multi-file-upload--focused')
  }

  /**
   * @param {UploadResponseSuccess['success']} success
   */
  getSuccessHtml(success) {
    return `<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg>${success.messageHtml}</span>`
  }

  /**
   * @param {UploadResponseError['error']} error
   */
  getErrorHtml(error) {
    return `<span class="moj-multi-file-upload__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg>${error.message}</span>`
  }

  /**
   * @param {File} file
   */
  getFileRow(file) {
    const $row = document.createElement('div')

    $row.classList.add('govuk-summary-list__row', 'moj-multi-file-upload__row')

    $row.innerHTML = `
    <div class="govuk-summary-list__value moj-multi-file-upload__message">
      <span class="moj-multi-file-upload__filename">${file.name}</span>
      <span class="moj-multi-file-upload__progress">0%</span>
    </div>
    <div class="govuk-summary-list__actions moj-multi-file-upload__actions"></div>
  `

    return $row
  }

  /**
   * @param {UploadResponseFile} file
   */
  getDeleteButton(file) {
    const $button = document.createElement('button')

    $button.setAttribute('type', 'button')
    $button.setAttribute('name', 'delete')
    $button.setAttribute('value', file.filename)

    $button.classList.add(
      'moj-multi-file-upload__delete',
      'govuk-button',
      'govuk-button--secondary',
      'govuk-!-margin-bottom-0'
    )

    $button.innerHTML = `Delete <span class="govuk-visually-hidden">${file.originalname}</span>`

    return $button
  }

  /**
   * @param {File} file
   */
  uploadFile(file) {
    this.config.hooks.entryHook(this, file)

    const $item = this.getFileRow(file)
    const $message = $item.querySelector('.moj-multi-file-upload__message')
    const $actions = $item.querySelector('.moj-multi-file-upload__actions')
    const $progress = $item.querySelector('.moj-multi-file-upload__progress')

    const formData = new FormData()
    formData.append('documents', file)

    this.$feedbackContainer
      .querySelector('.moj-multi-file-upload__list')
      .append($item)

    const xhr = new XMLHttpRequest()

    const onLoad = () => {
      if (
        xhr.status < 200 ||
        xhr.status >= 300 ||
        !('success' in xhr.response)
      ) {
        return onError()
      }

      $message.innerHTML = this.getSuccessHtml(xhr.response.success)
      this.$status.textContent = xhr.response.success.messageText

      $actions.append(this.getDeleteButton(xhr.response.file))
      this.config.hooks.exitHook(this, file, xhr, xhr.responseText)
    }

    const onError = () => {
      const error = new Error(
        xhr.response && 'error' in xhr.response
          ? xhr.response.error.message
          : xhr.statusText || 'Upload failed'
      )

      $message.innerHTML = this.getErrorHtml(error)
      this.$status.textContent = error.message

      this.config.hooks.errorHook(this, file, xhr, xhr.responseText, error)
    }

    xhr.addEventListener('load', onLoad)
    xhr.addEventListener('error', onError)

    xhr.upload.addEventListener('progress', (event) => {
      if (!event.lengthComputable) {
        return
      }

      const percentComplete = Math.round((event.loaded / event.total) * 100)
      $progress.textContent = ` ${percentComplete}%`
    })

    xhr.open('POST', this.config.uploadUrl)
    xhr.responseType = 'json'

    xhr.send(formData)
  }

  /**
   * @param {MouseEvent} event - Click event
   */
  onFileDeleteClick(event) {
    const $button = event.target

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains('moj-multi-file-upload__delete')
    ) {
      return
    }

    event.preventDefault() // if user refreshes page and then deletes

    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        return
      }

      const $rows = Array.from(
        this.$feedbackContainer.querySelectorAll('.moj-multi-file-upload__row')
      )

      if ($rows.length === 1) {
        this.$feedbackContainer.classList.add('moj-hidden')
      }

      const $rowDelete = $rows.find(($row) => $row.contains($button))
      if ($rowDelete) $rowDelete.remove()

      this.config.hooks.deleteHook(this, undefined, xhr, xhr.responseText)
    })

    xhr.open('POST', this.config.deleteUrl)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.responseType = 'json'

    xhr.send(
      JSON.stringify({
        [$button.name]: $button.value
      })
    )
  }

  static isSupported() {
    return (
      this.isDragAndDropSupported() &&
      this.isFormDataSupported() &&
      this.isFileApiSupported()
    )
  }

  static isDragAndDropSupported() {
    const div = document.createElement('div')
    return typeof div.ondrop !== 'undefined'
  }

  static isFormDataSupported() {
    return typeof FormData === 'function'
  }

  static isFileApiSupported() {
    const input = document.createElement('input')
    input.type = 'file'
    return typeof input.files !== 'undefined'
  }

  /**
   * Multi file upload default config
   *
   * @type {MultiFileUploadConfig}
   */
  static defaults = Object.freeze({
    uploadStatusText: 'Uploading files, please wait',
    dropzoneHintText: 'Drag and drop files here or',
    dropzoneButtonText: 'Choose files',
    feedbackContainer: {
      selector: '.moj-multi-file__uploaded-files'
    },
    hooks: {
      entryHook: () => {},
      exitHook: () => {},
      errorHook: () => {},
      deleteHook: () => {}
    }
  })

  /**
   * Multi file upload config schema
   *
   * @satisfies {Schema<MultiFileUploadConfig>}
   */
  static schema = Object.freeze({
    properties: {
      uploadUrl: { type: 'string' },
      deleteUrl: { type: 'string' },
      uploadStatusText: { type: 'string' },
      dropzoneHintText: { type: 'string' },
      dropzoneButtonText: { type: 'string' },
      feedbackContainer: { type: 'object' },
      hooks: { type: 'object' }
    }
  })
}

/**
 * Multi file upload config
 *
 * @typedef {object} MultiFileUploadConfig
 * @property {string} [uploadUrl] - File upload URL
 * @property {string} [deleteUrl] - File delete URL
 * @property {string} [uploadStatusText] - Upload status text
 * @property {string} [dropzoneHintText] - Dropzone hint text
 * @property {string} [dropzoneButtonText] - Dropzone button text
 * @property {object} [feedbackContainer] - Feedback container config
 * @property {string} [feedbackContainer.selector] - Selector for feedback container
 * @property {Element | null} [feedbackContainer.element] - HTML element for feedback container
 * @property {MultiFileUploadHooks} [hooks] - Upload hooks
 */

/**
 * Multi file upload hooks
 *
 * @typedef {object} MultiFileUploadHooks
 * @property {OnUploadFileEntryHook} [entryHook] - File upload entry hook
 * @property {OnUploadFileExitHook} [exitHook] - File upload exit hook
 * @property {OnUploadFileErrorHook} [errorHook] - File upload error hook
 * @property {OnUploadFileDeleteHook} [deleteHook] - File delete hook
 */

/**
 * Upload hook: File entry
 *
 * @callback OnUploadFileEntryHook
 * @param {InstanceType<typeof MultiFileUpload>} upload - Multi file upload
 * @param {File} file - File upload
 */

/**
 * Upload hook: File exit
 *
 * @callback OnUploadFileExitHook
 * @param {InstanceType<typeof MultiFileUpload>} upload - Multi file upload
 * @param {File} file - File upload
 * @param {XMLHttpRequest} xhr - XMLHttpRequest
 * @param {string} textStatus - Text status
 */

/**
 * Upload hook: File error
 *
 * @callback OnUploadFileErrorHook
 * @param {InstanceType<typeof MultiFileUpload>} upload - Multi file upload
 * @param {File} file - File upload
 * @param {XMLHttpRequest} xhr - XMLHttpRequest
 * @param {string} textStatus - Text status
 * @param {Error} errorThrown - Error thrown
 */

/**
 * Upload hook: File delete
 *
 * @callback OnUploadFileDeleteHook
 * @param {InstanceType<typeof MultiFileUpload>} upload - Multi file upload
 * @param {File} [file] - File upload
 * @param {XMLHttpRequest} xhr - XMLHttpRequest
 * @param {string} textStatus - Text status
 */

/**
 * @typedef {object} UploadResponseSuccess
 * @property {{ messageText: string, messageHtml: string }} success - Response success
 * @property {UploadResponseFile} file - Response file
 */

/**
 * @typedef {object} UploadResponseError
 * @property {{ message: string }} error - Response error
 * @property {UploadResponseFile} file - Response file
 */

/**
 * @typedef {object} UploadResponseFile
 * @property {string} filename - File name
 * @property {string} originalname - Original file name
 */

/**
 * @import { Schema } from '../../common/configuration.mjs'
 */
