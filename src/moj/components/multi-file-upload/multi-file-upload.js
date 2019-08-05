if(MOJFrontend.dragAndDropSupported() && MOJFrontend.formDataSupported() && MOJFrontend.fileApiSupported()) {
  MOJFrontend.MultiFileUpload = function(options) {
    this.options = options;
    this.options.dropzoneContainer.addClass('moj-multi-file-upload--enhanced');
    this.input = this.options.dropzoneContainer.find('.govuk-file-upload');
    this.setupDropzone();
    this.setupLabel();
    this.setupFileInput();
    this.setupStatusBox();
    this.options.feedbackAreaContainer.on('click', '.moj-multi-file-feedback__delete', $.proxy(this, 'onFileDeleteClick'))
  };

  MOJFrontend.MultiFileUpload.prototype.setupDropzone = function() {
    this.input.wrap('<div class="moj-multi-file-upload__dropzone" />');
    this.dropzone = this.options.dropzoneContainer.find('.moj-multi-file-upload__dropzone');
    this.dropzone.on('dragover', $.proxy(this, 'onDragOver'));
    this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'));
    this.dropzone.on('drop', $.proxy(this, 'onDrop'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupLabel = function() {
    this.label = $('<label for="'+this.input[0].id+'" class="govuk-button govuk-button--secondary">Choose a file</label>');
    this.dropzone.append('<p class="govuk-body">Drag and drop files here or </p>');
    this.dropzone.append(this.label);
  };

  MOJFrontend.MultiFileUpload.prototype.onFileDeleteClick = function(e) {
    $(e.currentTarget).parent().parent().remove();

    $.ajax({
      url: this.options.deleteUrl,
      type: 'post',
      dataType: 'json',
      data: { filename: $(e.currentTarget).attr('data-filename') },
      success: $.proxy(function(response){
        if(response.error) {
          console.log('error');
        } else {
          console.log('able to delete');
        }
      }, this)
    });
    if(this.options.feedbackAreaContainer.find('.govuk-summary-list div').length === 0) {
      this.options.feedbackAreaContainer.attr('hidden', '');
    }
  };

  MOJFrontend.MultiFileUpload.prototype.setupFileInput = function() {
    this.fileInput = this.dropzone.find('[type=file]');
    this.fileInput.on('change', $.proxy(this, 'onFileChange'));
    this.fileInput.on('focus', $.proxy(this, 'onFileFocus'));
    this.fileInput.on('blur', $.proxy(this, 'onFileBlur'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupStatusBox = function() {
    this.status = $('<div aria-live="polite" role="status" class="govuk-visually-hidden" />');
    this.dropzone.append(this.status);
  };

  MOJFrontend.MultiFileUpload.prototype.onDragOver = function(e) {
  	e.preventDefault();
  	this.dropzone.addClass('moj-multi-file-upload--dragover');
  };

  MOJFrontend.MultiFileUpload.prototype.onDragLeave = function() {
  	this.dropzone.removeClass('moj-multi-file-upload--dragover');
  };

  MOJFrontend.MultiFileUpload.prototype.onDrop = function(e) {
  	e.preventDefault();
  	this.dropzone.removeClass('moj-multi-file-upload--dragover');
    this.options.feedbackAreaContainer.removeAttr('hidden');
    this.status.html(this.options.uploadStatusText);
  	this.uploadFiles(e.originalEvent.dataTransfer.files);
  };

  MOJFrontend.MultiFileUpload.prototype.uploadFiles = function(files) {
    for(var i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  };

  MOJFrontend.MultiFileUpload.prototype.onFileChange = function(e) {
    this.options.feedbackAreaContainer.removeAttr('hidden');
    this.status.html(this.options.uploadStatusText);
    this.uploadFiles(e.currentTarget.files);
    this.fileInput.replaceWith($(e.currentTarget).val('').clone(true));
    this.setupFileInput();
    this.fileInput.focus();
  };

  MOJFrontend.MultiFileUpload.prototype.onFileFocus = function(e) {
    this.label.addClass('moj-multi-file-upload--focused');
  };

  MOJFrontend.MultiFileUpload.prototype.onFileBlur = function(e) {
    this.label.removeClass('moj-multi-file-upload--focused');
  };

  MOJFrontend.MultiFileUpload.prototype.getSuccessHtml = function(success) {
    return '<span class="moj-multi-file-feedback__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> ' + success.messageHtml + '</span>';
  };

  MOJFrontend.MultiFileUpload.prototype.getErrorHtml = function(error) {
    return '<span class="moj-multi-file-feedback__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg> '+error.message+'</span>';
  };

  MOJFrontend.MultiFileUpload.prototype.getFileRowHtml = function(file) {
    var html = '';
    html += '<div class="govuk-summary-list__row">';
    html += '  <dd class="govuk-summary-list__value">';
    html +=       '<span class="moj-multi-file-feedback__filename">'+file.name+'</span>';
    html +=       '<span class="moj-multi-file-feedback__progress">0%</span>';
    html += '  </dd>';
    html += '  <dd class="govuk-summary-list__actions"></dd>';
    html += '</div>';
    return html;
  }

  MOJFrontend.MultiFileUpload.prototype.uploadFile = function(file) {
    var formData = new FormData();
    formData.append('documents', file);
    var item = $(this.getFileRowHtml(formData.get('documents')));
    this.options.feedbackAreaContainer.find('dl').append(item);

    $.ajax({
      url: this.options.uploadUrl,
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: $.proxy(function(response){
        if(response.error) {
          item.find('.govuk-summary-list__value').html(this.getErrorHtml(response.error));
          this.status.html(response.error.message);
        } else {
          item.find('.govuk-summary-list__value').html(this.getSuccessHtml(response.success));
          this.status.html(response.success.messageText);
        }

        var html = '<button class="moj-multi-file-feedback__delete govuk-button govuk-button--secondary govuk-!-margin-bottom-0" type="button" data-filename="' + response.file.filename + '">';
        html += '      Delete <span class="govuk-visually-hidden">' + response.file.originalname + '</span>';
        html += '   </button>';

        item.find('.govuk-summary-list__actions').append(html);
      }, this),
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
          if (e.lengthComputable) {
            var percentComplete = e.loaded / e.total;
            percentComplete = parseInt(percentComplete * 100);
            item.find('.moj-multi-file-feedback__progress').text(' '+percentComplete + '%');
          }
        }, false);
        return xhr;
      }
    });
  };
}