/* eslint-disable @typescript-eslint/no-empty-function */

import {
  dragAndDropSupported,
  fileApiSupported,
  formDataSupported
} from '../../helpers.mjs'

export function MultiFileUpload(params) {
  if (!(dragAndDropSupported() && formDataSupported() && fileApiSupported())) {
    return
  }

  this.defaultParams = {
    uploadFileEntryHook: () => {},
    uploadFileExitHook: () => {},
    uploadFileErrorHook: () => {},
    fileDeleteHook: () => {},
    uploadStatusText: 'Uploading files, please wait',
    dropzoneHintText: 'Drag and drop files here or',
    dropzoneButtonText: 'Choose files'
  }

  this.params = Object.assign({}, this.defaultParams, params)

  this.container = this.params.container
  this.container.classList.add('moj-multi-file-upload--enhanced')

  this.feedbackContainer = this.container.querySelector(
    '.moj-multi-file__uploaded-files'
  )

  this.setupFileInput()
  this.setupDropzone()
  this.setupLabel()
  this.setupStatusBox()

  this.container.addEventListener('click', this.onFileDeleteClick.bind(this))
}

MultiFileUpload.prototype.setupDropzone = function () {
  this.dropzone = document.createElement('div')
  this.dropzone.classList.add('moj-multi-file-upload__dropzone')

  this.dropzone.addEventListener('dragover', this.onDragOver.bind(this))
  this.dropzone.addEventListener('dragleave', this.onDragLeave.bind(this))
  this.dropzone.addEventListener('drop', this.onDrop.bind(this))

  this.fileInput.replaceWith(this.dropzone)
  this.dropzone.appendChild(this.fileInput)
}

MultiFileUpload.prototype.setupLabel = function () {
  const label = document.createElement('label')
  label.setAttribute('for', this.fileInput.id)
  label.classList.add('govuk-button', 'govuk-button--secondary')
  label.textContent = this.params.dropzoneButtonText

  const hint = document.createElement('p')
  hint.classList.add('govuk-body')
  hint.textContent = this.params.dropzoneHintText

  this.label = label
  this.dropzone.append(hint)
  this.dropzone.append(label)
}

MultiFileUpload.prototype.setupFileInput = function () {
  this.fileInput = this.container.querySelector('.moj-multi-file-upload__input')
  this.fileInput.addEventListener('change', this.onFileChange.bind(this))
  this.fileInput.addEventListener('focus', this.onFileFocus.bind(this))
  this.fileInput.addEventListener('blur', this.onFileBlur.bind(this))
}

MultiFileUpload.prototype.setupStatusBox = function () {
  this.status = document.createElement('div')
  this.status.classList.add('govuk-visually-hidden')
  this.status.setAttribute('aria-live', 'polite')
  this.status.setAttribute('role', 'status')
  this.dropzone.append(this.status)
}

MultiFileUpload.prototype.onDragOver = function (event) {
  event.preventDefault()
  this.dropzone.classList.add('moj-multi-file-upload--dragover')
}

MultiFileUpload.prototype.onDragLeave = function () {
  this.dropzone.classList.remove('moj-multi-file-upload--dragover')
}

MultiFileUpload.prototype.onDrop = function (event) {
  event.preventDefault()
  this.dropzone.classList.remove('moj-multi-file-upload--dragover')
  this.feedbackContainer.classList.remove('moj-hidden')
  this.status.textContent = this.params.uploadStatusText
  this.uploadFiles(event.dataTransfer.files)
}

MultiFileUpload.prototype.uploadFiles = function (files) {
  for (const file of Array.from(files)) {
    this.uploadFile(file)
  }
}

MultiFileUpload.prototype.onFileChange = function () {
  this.feedbackContainer.classList.remove('moj-hidden')
  this.status.textContent = this.params.uploadStatusText
  this.uploadFiles(this.fileInput.files)

  const fileInput = this.fileInput.cloneNode(true)
  fileInput.value = ''

  this.fileInput.replaceWith(fileInput)

  this.setupFileInput()
  this.fileInput.focus()
}

MultiFileUpload.prototype.onFileFocus = function () {
  this.label.classList.add('moj-multi-file-upload--focused')
}

MultiFileUpload.prototype.onFileBlur = function () {
  this.label.classList.remove('moj-multi-file-upload--focused')
}

MultiFileUpload.prototype.getSuccessHtml = function (success) {
  return `<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg>${success.messageHtml}</span>`
}

MultiFileUpload.prototype.getErrorHtml = function (error) {
  return `<span class="moj-multi-file-upload__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg>${error.message}</span>`
}

MultiFileUpload.prototype.getFileRow = function (file) {
  const row = document.createElement('div')

  row.classList.add('govuk-summary-list__row', 'moj-multi-file-upload__row')

  row.innerHTML = `
    <div class="govuk-summary-list__value moj-multi-file-upload__message">
      <span class="moj-multi-file-upload__filename">${file.name}</span>
      <span class="moj-multi-file-upload__progress">0%</span>
    </div>
    <div class="govuk-summary-list__actions moj-multi-file-upload__actions"></div>
  `

  return row
}

MultiFileUpload.prototype.getDeleteButton = function (file) {
  const button = document.createElement('button')

  button.setAttribute('type', 'button')
  button.setAttribute('name', 'delete')
  button.setAttribute('value', file.filename)

  button.classList.add(
    'moj-multi-file-upload__delete',
    'govuk-button',
    'govuk-button--secondary',
    'govuk-!-margin-bottom-0'
  )

  button.innerHTML = `Delete <span class="govuk-visually-hidden">${file.originalname}</span>`

  return button
}

MultiFileUpload.prototype.uploadFile = function (file) {
  this.params.uploadFileEntryHook(this, file)

  const item = this.getFileRow(file)
  const message = item.querySelector('.moj-multi-file-upload__message')
  const actions = item.querySelector('.moj-multi-file-upload__actions')
  const progress = item.querySelector('.moj-multi-file-upload__progress')

  const formData = new FormData()
  formData.append('documents', file)

  this.feedbackContainer
    .querySelector('.moj-multi-file-upload__list')
    .append(item)

  const xhr = new XMLHttpRequest()

  const onLoad = () => {
    if (xhr.status < 200 || xhr.status >= 300 || !('success' in xhr.response)) {
      return onError()
    }

    message.innerHTML = this.getSuccessHtml(xhr.response.success)
    this.status.textContent = xhr.response.success.messageText

    actions.append(this.getDeleteButton(xhr.response.file))
    this.params.uploadFileExitHook(this, file, xhr, xhr.responseText)
  }

  const onError = () => {
    const error = new Error(
      xhr.response && 'error' in xhr.response
        ? xhr.response.error.message
        : xhr.statusText || 'Upload failed'
    )

    message.innerHTML = this.getErrorHtml(error)
    this.status.textContent = error.message

    this.params.uploadFileErrorHook(this, file, xhr, xhr.responseText, error)
  }

  xhr.addEventListener('load', onLoad)
  xhr.addEventListener('error', onError)

  xhr.upload.addEventListener('progress', (event) => {
    if (!event.lengthComputable) {
      return
    }

    const percentComplete = parseInt((event.loaded / event.total) * 100, 10)
    progress.textContent = ` ${percentComplete}%`
  })

  xhr.open('POST', this.params.uploadUrl)
  xhr.responseType = 'json'

  xhr.send(formData)
}

MultiFileUpload.prototype.onFileDeleteClick = function (event) {
  const button = event.target

  if (!button || !button.classList.contains('moj-multi-file-upload__delete')) {
    return
  }

  event.preventDefault() // if user refreshes page and then deletes

  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return
    }

    const rows = Array.from(
      this.feedbackContainer.querySelectorAll('.moj-multi-file-upload__row')
    )

    if (rows.length === 1) {
      this.feedbackContainer.classList.add('moj-hidden')
    }

    const row = rows.find((row) => row.contains(button))
    if (row) row.remove()

    this.params.fileDeleteHook(this, undefined, xhr, xhr.responseText)
  })

  xhr.open('POST', this.params.deleteUrl)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.responseType = 'json'

  xhr.send(
    JSON.stringify({
      [button.name]: button.value
    })
  )
}
