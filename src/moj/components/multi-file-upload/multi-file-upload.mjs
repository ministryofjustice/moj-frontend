import $ from 'jquery'

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
    uploadFileEntryHook: $.noop,
    uploadFileExitHook: $.noop,
    uploadFileErrorHook: $.noop,
    fileDeleteHook: $.noop,
    uploadStatusText: 'Uploading files, please wait',
    dropzoneHintText: 'Drag and drop files here or',
    dropzoneButtonText: 'Choose files'
  }

  this.params = $.extend({}, this.defaultParams, params)
  this.container = $(this.params.container)

  this.container.addClass('moj-multi-file-upload--enhanced')

  this.feedbackContainer = this.container.find(
    '.moj-multi-file__uploaded-files'
  )
  this.setupFileInput()
  this.setupDropzone()
  this.setupLabel()
  this.setupStatusBox()
  this.container.on(
    'click',
    '.moj-multi-file-upload__delete',
    $.proxy(this, 'onFileDeleteClick')
  )
}

MultiFileUpload.prototype.setupDropzone = function () {
  this.fileInput.wrap('<div class="moj-multi-file-upload__dropzone" />')
  this.dropzone = this.container.find('.moj-multi-file-upload__dropzone')
  this.dropzone.on('dragover', $.proxy(this, 'onDragOver'))
  this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'))
  this.dropzone.on('drop', $.proxy(this, 'onDrop'))
}

MultiFileUpload.prototype.setupLabel = function () {
  this.label = $(
    `<label for="${this.fileInput[0].id}" class="govuk-button govuk-button--secondary">${this.params.dropzoneButtonText}</label>`
  )
  this.dropzone.append(
    `<p class="govuk-body">${this.params.dropzoneHintText}</p>`
  )
  this.dropzone.append(this.label)
}

MultiFileUpload.prototype.setupFileInput = function () {
  this.fileInput = this.container.find('.moj-multi-file-upload__input')
  this.fileInput.on('change', $.proxy(this, 'onFileChange'))
  this.fileInput.on('focus', $.proxy(this, 'onFileFocus'))
  this.fileInput.on('blur', $.proxy(this, 'onFileBlur'))
}

MultiFileUpload.prototype.setupStatusBox = function () {
  this.status = $(
    '<div aria-live="polite" role="status" class="govuk-visually-hidden" />'
  )
  this.dropzone.append(this.status)
}

MultiFileUpload.prototype.onDragOver = function (event) {
  event.preventDefault()
  this.dropzone.addClass('moj-multi-file-upload--dragover')
}

MultiFileUpload.prototype.onDragLeave = function () {
  this.dropzone.removeClass('moj-multi-file-upload--dragover')
}

MultiFileUpload.prototype.onDrop = function (event) {
  event.preventDefault()
  this.dropzone.removeClass('moj-multi-file-upload--dragover')
  this.feedbackContainer.removeClass('moj-hidden')
  this.status.html(this.params.uploadStatusText)
  this.uploadFiles(event.originalEvent.dataTransfer.files)
}

MultiFileUpload.prototype.uploadFiles = function (files) {
  for (const file of Array.from(files)) {
    this.uploadFile(file)
  }
}

MultiFileUpload.prototype.onFileChange = function (event) {
  this.feedbackContainer.removeClass('moj-hidden')
  this.status.html(this.params.uploadStatusText)
  this.uploadFiles(event.currentTarget.files)
  this.fileInput.replaceWith($(event.currentTarget).val('').clone(true))
  this.setupFileInput()
  this.fileInput.get(0).focus()
}

MultiFileUpload.prototype.onFileFocus = function () {
  this.label.addClass('moj-multi-file-upload--focused')
}

MultiFileUpload.prototype.onFileBlur = function () {
  this.label.removeClass('moj-multi-file-upload--focused')
}

MultiFileUpload.prototype.getSuccessHtml = function (success) {
  return `<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg>${success.messageHtml}</span>`
}

MultiFileUpload.prototype.getErrorHtml = function (error) {
  return `<span class="moj-multi-file-upload__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg>${error.message}</span>`
}

MultiFileUpload.prototype.getFileRowHtml = function (file) {
  const html = `
    <div class="govuk-summary-list__row moj-multi-file-upload__row">
      <div class="govuk-summary-list__value moj-multi-file-upload__message">
        <span class="moj-multi-file-upload__filename">${file.name}</span>
        <span class="moj-multi-file-upload__progress">0%</span>
      </div>
      <div class="govuk-summary-list__actions moj-multi-file-upload__actions"></div>
    </div>`
  return html
}

MultiFileUpload.prototype.getDeleteButtonHtml = function (file) {
  return `<button class="moj-multi-file-upload__delete govuk-button govuk-button--secondary govuk-!-margin-bottom-0" type="button" name="delete" value="${file.filename}">
      Delete <span class="govuk-visually-hidden">${file.originalname}</span>
    </button>`
}

MultiFileUpload.prototype.uploadFile = function (file) {
  this.params.uploadFileEntryHook(this, file)
  const item = $(this.getFileRowHtml(file))
  const formData = new FormData()
  formData.append('documents', file)
  this.feedbackContainer.find('.moj-multi-file-upload__list').append(item)

  $.ajax({
    url: this.params.uploadUrl,
    type: 'post',
    data: formData,
    processData: false,
    contentType: false,
    success: $.proxy(function (response) {
      if (response.error) {
        item
          .find('.moj-multi-file-upload__message')
          .html(this.getErrorHtml(response.error))
        this.status.html(response.error.message)
      } else {
        item
          .find('.moj-multi-file-upload__message')
          .html(this.getSuccessHtml(response.success))
        this.status.html(response.success.messageText)
      }
      item
        .find('.moj-multi-file-upload__actions')
        .append(this.getDeleteButtonHtml(response.file))
      this.params.uploadFileExitHook(this, file, response)
    }, this),
    error: $.proxy(function (jqXHR, textStatus, errorThrown) {
      this.params.uploadFileErrorHook(
        this,
        file,
        jqXHR,
        textStatus,
        errorThrown
      )
    }, this),
    xhr: function () {
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener(
        'progress',
        function (event) {
          if (event.lengthComputable) {
            let percentComplete = event.loaded / event.total
            percentComplete = parseInt(percentComplete * 100, 10)
            item
              .find('.moj-multi-file-upload__progress')
              .text(` ${percentComplete}%`)
          }
        },
        false
      )
      return xhr
    }
  })
}

MultiFileUpload.prototype.onFileDeleteClick = function (event) {
  event.preventDefault() // if user refreshes page and then deletes
  const button = $(event.currentTarget)
  const data = {}
  data[button[0].name] = button[0].value
  $.ajax({
    url: this.params.deleteUrl,
    type: 'post',
    dataType: 'json',
    data,
    success: $.proxy(function (response) {
      if (response.error) {
        // handle error
      } else {
        button.parents('.moj-multi-file-upload__row').remove()
        if (
          this.feedbackContainer.find('.moj-multi-file-upload__row').length ===
          0
        ) {
          this.feedbackContainer.addClass('moj-hidden')
        }
      }
      this.params.fileDeleteHook(this, response)
    }, this)
  })
}
