const express = require('express');
const router = express.Router();
const multer = require('multer');

function getErrorMessage(item) {
  var message = '';
  if(item.error.code == 'FILE_TYPE') {
    message += item.file.originalname + ' must be a png or gif';
  } else if(item.error.code == 'LIMIT_FILE_SIZE') {
    message += item.file.originalname + ' must be smaller than 2mb';
  }
  return message;
}

////////////////////////////////////////////////////////////////////////////////////////
// NO JAVASCRIPT
////////////////////////////////////////////////////////////////////////////////////////

const upload = multer( {
  dest: './public/uploads',
  limits: { fileSize: 2000000 },
  fileFilter: function( req, file, cb ){
    let ok = false;

    if(!req.rejectedFiles) {
      req.rejectedFiles = [];
    }

    if( file.mimetype !== 'image/png' && file.mimetype !== 'image/gif' ) {
      cb(null, false);
      req.rejectedFiles.push({
        file: file,
        error: {
          code: 'FILE_TYPE'
        }
      });
    } else {
      cb(null, true);
    }
  }
} ).array('documents', 10);



router.get('/components/multi-file-upload', function( req, res ){
  var pageObject = {
    uploadedFiles: [],
    errorMessage: null,
    errorSummary: {
      items: []
    }
  };

  // 1. UPLOADED FILES

  if(req.session.uploadedFiles) {
    req.session.uploadedFiles.forEach(function(file) {
      var o = file;
      o.messageHtml = `<span class="moj-multi-file-feedback__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> <a href="/${file.path}">${file.originalname}</a> has been uploaded</span>`;
      pageObject.uploadedFiles.push(o);
    });
  }

  // 2. REJECTED FILES

  if(req.session.rejectedFiles && req.session.rejectedFiles.length) {
    var errorMessage = '';
    req.session.rejectedFiles.forEach(function(item) {
      errorMessage += getErrorMessage(item);
      errorMessage += '<br>';
    });

    req.session.rejectedFiles.forEach(function(item) {
      pageObject.errorSummary.items.push({
        text: getErrorMessage(item),
        href: '#documents'
      });
    });

    pageObject.errorMessage = {
      html: errorMessage
    };
  }

  req.session.rejectedFiles = null;

  res.render( 'components/multi-file-upload/index.html', pageObject );
});

function removeFileFromFileList(filelist, filename) {
  return filelist.filter(function(item, index, array) {
    return item.filename !== filename;
  });
}

router.post('/components/multi-file-upload', function( req, res ){
  upload(req, res, function(err) {
    if(err) {
      // console.log(err);
    }

    var fileId = null;
    for (let [key, value] of Object.entries(req.body)) {
      if(key.indexOf('delete-') > -1) {
        fileId = key.substring(key.indexOf('-')+1, key.length);
      }
    }

    if(!req.session.uploadedFiles) {
      req.session.uploadedFiles = [];
    }
    req.session.uploadedFiles = req.session.uploadedFiles.concat(req.files);

    if(fileId) {
      req.session.uploadedFiles = removeFileFromFileList(req.session.uploadedFiles, fileId);
    }

    // no concat because errors are discarded after use anyway
    req.session.rejectedFiles = req.rejectedFiles;

    res.redirect('/components/multi-file-upload');
  });
} );

////////////////////////////////////////////////////////////////////////////////////////
// AJAX
////////////////////////////////////////////////////////////////////////////////////////

const uploadAjax = multer( {
  dest: './public/uploads',
  limits: { fileSize: 2000000 },
  fileFilter: function( req, file, cb ){
    let ok = false;
    if( file.mimetype !== 'image/png' && file.mimetype !== 'image/gif'){
      return cb({
        code: 'FILE_TYPE',
        field: 'documents',
        file: file
      }, false);
    } else {
      return cb(null, true);
    }
  }
} ).single('documents');

router.post('/ajax-upload', function( req, res ){
  uploadAjax(req, res, function(error) {
    if(error) {
      if(error.code == 'FILE_TYPE') {
        error.message = error.file.originalname + ' must be a png or gif';
      } else if(error.code == 'LIMIT_FILE_SIZE') {
        error.message = error.file.originalname + ' must be smaller than 2mb';
      }
      res.json({ error: error, file: error.file });
    } else {

      console.log(req.session.uploadedFiles);

      if(!req.session.uploadedFiles) {
        req.session.uploadedFiles = [];
      }
      req.session.uploadedFiles.push(req.file);

      res.json({
        file: req.file,
        success: {
          messageHtml: `<a href="${req.file.path}" class="govuk-link"> ${req.file.originalname}</a> has been uploaded`,
          messageText: `${req.file.originalname} has been uploaded`
        }
      });
    }
  } );
} );

router.post('/ajax-delete', function( req, res ){

  req.session.uploadedFiles = removeFileFromFileList(req.session.uploadedFiles, req.body.filename);

  res.json({

  })
});

module.exports = router;