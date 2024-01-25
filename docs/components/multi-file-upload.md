---
layout: layouts/component.njk
title: Multi file upload
---

{% lastUpdated "multi-file-upload" %}

{% example "/examples/multi-file-upload", 550 %}

## When to use

Use the multi file upload component to help users upload multiple files at the same time, on a regular basis. For example, in a caseworking system.

## When not to use

Do not use this component if users only need to [upload one file](../../patterns/upload-files).

Uploading multiple files at the same time is more error prone than uploading files, one at a time. This is because users have to use a custom form control that may not be as easy to understand.

For this reason, do not use this component unless research shows that users need a faster way to upload files.

## How to use

The multi file upload consists of a dropzone and feedback area which starts off hidden.

<!-- [Image] -->

Users can drag and drop files onto the dropzone or click the button and select files using the file picker.

Each selected file will start uploading immediately and appear as a row in the feedback area. Each file’s progress is indicated as a percentage.

<!-- [Image] -->

When a file has been uploaded it will show as:

- green, next to a tick icon, if it’s been uploaded successfully
- red, next to a warning icon, if there’s been an error

<!-- [Image] -->

### Initialising the JavaScript

The multi file upload component uses JavaScript. To run it you must include the following script in your page:

```
if(typeof MOJFrontend.MultiFileUpload !== 'undefined') {
  new MOJFrontend.MultiFileUpload({
    container: document.querySelector('.moj-multi-file-upload'),
    uploadUrl: '/ajax-upload-url',
    deleteUrl: '/ajax-delete-url'
  });
}
```

### When JavaScript is not available

When JavaScript is not available, users will be presented with a [file upload component](https://design-system.service.gov.uk/components/file-upload/) and upload button.

When the user selects the upload button, the page will refresh with the valid files being shown in the feedback area.

{% example "/examples/multi-file-upload-no-js", 485 %}

When there are multiple files with errors, you must put:

- separate error messages in the [error summary from the GOV.UK Design System](https://design-system.service.gov.uk/components/error-summary/) — each one must link to the multi file upload
- all [error messages next to the field](https://design-system.service.gov.uk/components/error-message/) separated by a line break (`<br>`)

{% example "/examples/multi-file-upload-no-js-errors", 775 %}

If the form contains other questions and the user selects the upload button:

- save their answers and present them back
- if there are errors, show them in the error summary and next to the related fields

When the user selects the continue button, the entire form including selected files, will be saved and the user will be taken to the next page.

You can include a check screen at this point if you need to.

### Error messages

Use the file upload error messages [from the GOV.UK Design System](https://design-system.service.gov.uk/components/file-upload/#error-messages).
