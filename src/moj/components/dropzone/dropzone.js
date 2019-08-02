function dragAndDropSupported() {
  var div = document.createElement('div');
  return typeof div.ondrop != 'undefined';
}

function formDataSupported() {
  return typeof FormData == 'function';
}

function fileApiSupported() {
  var input = document.createElement('input');
  input.type = 'file';
  return typeof input.files != 'undefined';
};

if(dragAndDropSupported() && formDataSupported() && fileApiSupported()) {
  MOJFrontend.Dropzone = function(options) {
    this.options = options;
    this.container = this.options.container;
    this.container.addClass('moj-dropzone--enhanced');
    this.input = this.container.find('.govuk-file-upload');
    this.setupDropzone();
    this.setupLabel();
    this.setupFileInput();
    this.setupStatusBox();
    this.options.listContainer.on('click', '.moj-file-list__delete', $.proxy(this, 'onFileDeleteClick'))
  };

  MOJFrontend.Dropzone.prototype.setupDropzone = function() {
    this.input.wrap('<div class="moj-dropzone__dropzone" />');
    this.dropzone = this.container.find('.moj-dropzone__dropzone');
    this.dropzone.on('dragover', $.proxy(this, 'onDragOver'));
    this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'));
    this.dropzone.on('drop', $.proxy(this, 'onDrop'));
  };

  MOJFrontend.Dropzone.prototype.setupLabel = function() {
    this.label = $('<label for="'+this.input[0].id+'" class="govuk-button govuk-button--secondary">Choose a file</label>');
    this.dropzone.append('<p>Drag and drop files here or </p>');
    this.dropzone.append(this.label);
  };

  MOJFrontend.Dropzone.prototype.onFileDeleteClick = function(e) {
    $(e.target).parent().parent().remove();
    if(this.options.listContainer.find('.govuk-summary-list div').length === 0) {
      this.options.listContainer.attr('hidden', '');
    }
  };

  MOJFrontend.Dropzone.prototype.setupFileInput = function() {
    this.fileInput = this.dropzone.find('[type=file]');
    this.fileInput.on('change', $.proxy(this, 'onFileChange'));
    this.fileInput.on('focus', $.proxy(this, 'onFileFocus'));
    this.fileInput.on('blur', $.proxy(this, 'onFileBlur'));
  };

  MOJFrontend.Dropzone.prototype.setupStatusBox = function() {
    this.status = $('<div aria-live="polite" role="status" class="govuk-visually-hidden" />');
    this.dropzone.append(this.status);
  };

  MOJFrontend.Dropzone.prototype.onDragOver = function(e) {
  	e.preventDefault();
  	this.dropzone.addClass('moj-dropzone--dragover');
  };

  MOJFrontend.Dropzone.prototype.onDragLeave = function() {
  	this.dropzone.removeClass('moj-dropzone--dragover');
  };

  MOJFrontend.Dropzone.prototype.onDrop = function(e) {
  	e.preventDefault();
  	this.dropzone.removeClass('moj-dropzone--dragover');
    this.options.listContainer.removeAttr('hidden');
    this.status.html(this.options.uploadStatusText);
  	this.uploadFiles(e.originalEvent.dataTransfer.files);
  };

  MOJFrontend.Dropzone.prototype.uploadFiles = function(files) {
    for(var i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  };

  MOJFrontend.Dropzone.prototype.onFileChange = function(e) {
    this.options.listContainer.removeAttr('hidden');
    this.status.html(this.options.uploadStatusText);
    this.uploadFiles(e.currentTarget.files);
  };

  MOJFrontend.Dropzone.prototype.onFileFocus = function(e) {
    this.label.addClass('moj-dropzone--focused');
  };

  MOJFrontend.Dropzone.prototype.onFileBlur = function(e) {
    this.label.removeClass('moj-dropzone--focused');
  };

  MOJFrontend.Dropzone.prototype.getSuccessHtml = function(success) {
    var html = '';
    html += '<span class="moj-file-list__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> ' + success.message + '</span>';
    return html;
  };

  MOJFrontend.Dropzone.prototype.getErrorHtml = function(error) {
    var html = '';
    html += '<span class="moj-file-list__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg> '+error.message+'</span>';
    return html;
  };

  MOJFrontend.Dropzone.prototype.getFileRowHtml = function(file) {
    var html = '';
    html += '<div class="govuk-summary-list__row">';
    html += '  <dd class="govuk-summary-list__value">';
    html +=       '<span class="moj-file-list__filename">'+file.name+'</span>';
    html +=       '<span class="moj-file-list__progress">0%</span>';
    html += '  </dd>';
    html += '  <dd class="govuk-summary-list__actions"></dd>';
    html += '</div>';
    return html;
  }

  MOJFrontend.Dropzone.prototype.uploadFile = function(file) {
    var formData = new FormData();
    formData.append('documents', file);
    var item = $(this.getFileRowHtml(formData.get('documents')));
    this.options.listContainer.find('dl').append(item);

    $.ajax({
      url: '/ajax-upload',
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
          this.status.html(response.success.message);
        }

        var html = '<button class="moj-file-list__delete govuk-button govuk-button--secondary govuk-!-margin-bottom-0" type="button">';
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
            item.find('.moj-file-list__progress').text(' '+percentComplete + '%');
          }
        }, false);
        return xhr;
      }
    });
  };
}