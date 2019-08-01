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
    this.dropzone = this.setupDropzone();
    this.setupLabel();


    // this.setupFileInput();
    // this.setupStatusBox();
    // $('.moj-files').on('click', '.moj-file-remove', $.proxy(this, 'onFileRemoveClick'))
  };

  MOJFrontend.Dropzone.prototype.setupDropzone = function() {
    this.dropzone = $('<div class="moj-dropzone__dropzone" />');
    this.input.wrap(this.dropzone);
    this.dropzone.on('dragover', $.proxy(this, 'onDragOver'));
    this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'));
    this.dropzone.on('drop', $.proxy(this, 'onDrop'));
    return this.dropzone;
  };

  MOJFrontend.Dropzone.prototype.setupLabel = function() {
    this.label = $('<label for="'+this.input[0].id+'" class="govuk-button govuk-button--secondary">Upload file</label>');
    $('.moj-dropzone__dropzone').append('<p>Drag and drop files here or </p>');
    $('.moj-dropzone__dropzone').append(this.label);
  };

  MOJFrontend.Dropzone.prototype.onFileRemoveClick = function(e) {
    $(e.target).parent().remove();
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
    // prevent default to allow the drop to happen
  	e.preventDefault();
  	this.dropzone.addClass('moj-dropzone--dragover');
  };

  MOJFrontend.Dropzone.prototype.onDragLeave = function() {
  	this.dropzone.removeClass('moj-dropzone--dragover');
  };

  MOJFrontend.Dropzone.prototype.onDrop = function(e) {
    // prevent default to allow the drop to happen
  	e.preventDefault();
  	this.dropzone.removeClass('moj-dropzone--dragover');
    $('.moj-files').removeClass('hidden');
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
    this.dropzone.find('label').addClass('moj-dropzone--focused');
  };

  MOJFrontend.Dropzone.prototype.onFileBlur = function(e) {
    this.dropzone.find('label').removeClass('moj-dropzone--focused');
  };

  MOJFrontend.Dropzone.prototype.getSuccessHtml = function(file) {
    var html = '<a class="moj-file-name" href="/'+file.path+'">'+file.originalname+'</a>';
    html += '<span class="moj-success"><svg width="1.5em" height="1.5em"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tick"></use></svg>File uploaded</span>';
    html += '<button type="button" class="file-remove">Remove</button>';
    return html;
  };

  MOJFrontend.Dropzone.prototype.getErrorHtml = function(error) {
    var html = '<span class="moj-file-name">'+error.file.originalname+'</span>';
    html += '<span class="moj-error"><svg width="1.5em" height="1.5em"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-icon"></use></svg>'+error.text+'</span>';
    html += '<button type="button" class="file-remove">Remove</button>';
    return html;
  };

  MOJFrontend.Dropzone.prototype.uploadFile = function(file) {
    var formData = new FormData();
    formData.append('documents', file);
    var li = $('<li><span class="moj-file-name">'+ formData.get('documents').name +'</span><progress value="0" max="100">0%</progress></li>');
    $('.files ul').append(li);

    $.ajax({
      url: '/ajax-upload',
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: $.proxy(function(response){
        if(response.error) {
          li.html(this.getErrorHtml(response.error));
          this.status.html(response.error);
        } else {
          li.html(this.getSuccessHtml(response.file));
          this.status.html(response.file.originalname + ' has been uploaded.');
        }
      }, this),
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
          if (e.lengthComputable) {
            var percentComplete = e.loaded / e.total;
            percentComplete = parseInt(percentComplete * 100);
            li.find('progress')
              .prop('value', percentComplete)
              .text(percentComplete + '%');
          }
        }, false);
        return xhr;
      }
    });
  };
}