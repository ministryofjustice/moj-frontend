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
  MOJFrontend.Dropzone = function(container) {
    this.container = container;
    this.container.addClass('moj-dropzone--enhanced');
    this.input = this.container.find('.govuk-file-upload');
    this.setupDropzone();
    this.setupLabel();
    this.setupFileInput();
    this.setupStatusBox();
    $('.moj-files').on('click', '.govuk-summary-list__actions a', $.proxy(this, 'onFileDeleteClick'))
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
    if($('.moj-files .govuk-summary-list div').length === 0) {
      $('.moj-files').addClass('moj-hidden');
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
    $('.moj-files').removeClass('moj-hidden');
    this.status.html('Uploading files, please wait.');
  	this.uploadFiles(e.originalEvent.dataTransfer.files);
  };

  MOJFrontend.Dropzone.prototype.uploadFiles = function(files) {
    for(var i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  };

  MOJFrontend.Dropzone.prototype.onFileChange = function(e) {
    $('.moj-files').removeClass('moj-hidden');
    this.status.html('Uploading files, please wait.');
    this.uploadFiles(e.currentTarget.files);
  };

  MOJFrontend.Dropzone.prototype.onFileFocus = function(e) {
    this.label.addClass('moj-dropzone--focused');
  };

  MOJFrontend.Dropzone.prototype.onFileBlur = function(e) {
    this.label.removeClass('moj-dropzone--focused');
  };

  MOJFrontend.Dropzone.prototype.getSuccessHtml = function(file) {
    var html = '';
    html += '<span class="moj-success">' + file.originalname + ' uploaded</span>';
    // html += '<button type="button" class="moj-file-delete">Delete</button>';
    return html;
  };

  MOJFrontend.Dropzone.prototype.getErrorHtml = function(error) {
    var html = '';
    html += '<span class="moj-error">'+error.text+'</span>';
    // html += '<button type="button" class="moj-file-delete">Delete</button>';
    return html;
  };

  MOJFrontend.Dropzone.prototype.getFileRowHtml = function(file) {
    var html = '';
    html += '<div class="govuk-summary-list__row">';
    html += '  <dd class="govuk-summary-list__value">';
    html +=       file.name;
    html +=       '<span class="moj-progress">0%</span>';
    html += '  </dd>';
    html += ' <dd class="govuk-summary-list__actions">';
    html += '  </dd>';
    html += '</div>';
    return html;
  }

  MOJFrontend.Dropzone.prototype.uploadFile = function(file) {
    var formData = new FormData();
    formData.append('documents', file);
    var item = $(this.getFileRowHtml(formData.get('documents')));
    $('.moj-files dl').append(item);

    $.ajax({
      url: '/ajax-upload',
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: $.proxy(function(response){
        if(response.error) {
          item.find('.govuk-summary-list__value').html(this.getErrorHtml(response.error));
          this.status.html(response.error);
        } else {
          item.find('.govuk-summary-list__value').html(this.getSuccessHtml(response.file));
          this.status.html(response.file.originalname + ' has been uploaded.');
        }

        var html = '    <a class="govuk-link" href="#">';
        html += '      Delete<span class="govuk-visually-hidden"> name</span>';
        html += '    </a>';

        item.find('.govuk-summary-list__actions').append(html);
      }, this),
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
          if (e.lengthComputable) {
            var percentComplete = e.loaded / e.total;
            percentComplete = parseInt(percentComplete * 100);
            item.find('.moj-progress').text(' '+percentComplete + '%');
          }
        }, false);
        return xhr;
      }
    });
  };
}