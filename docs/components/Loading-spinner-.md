---
title: Loading spinner 
tabs: true
status: Experimental
statusDate: August 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/xxx
contributorName: me you
contributorTeam: who
---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1755613346954/126620407-6df14ec7-fabb-43e8-b2f1-f6a325feb026.png" alt="Loading spinner " />
</div>

## Overview
Tell a user they need to wait, because something is happening.

### How the component is currently used

We needed a way to show a user that a long running task (in this case a virus scan on uploads) was in progress along with providing progress updates. The solution uses a modal to prevent the user from trying to upload further files during the upload progress and updates 'x of x files uploaded' text as the files are scanned.

### Contribute to this component
You can help develop this component by adding information to the Github discussion. This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma link was not included when this component was added.

      There may be more information in the [Loading-spinner- Github discussion]({{ githuburl }}). You can also view the component image in the overview.

## Contribute a Figma link

      If you have a Figma link for this component (or a component like it) you can add it to [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

No accessibility findings were included when this component was added. There may be more information in the [Loading-spinner- Github discussion]({{ githuburl }}).
## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [Loading-spinner- Github discussion]({{ githuburl }}).


### Example 1: javascript

<div class="app-example__code" data-module="app-copy">

```javascript
{% raw %}
export class FileUploadModal {
    init() {
        // so we can reference the same func when removing event
        this.handleTrapFocus = this.handleTrapFocus.bind(this)

        this.cancelUploadButton = document.getElementById('cancel-upload-button')

        this.dialog = document.getElementById('dialog')
        this.dialogOverlay = document.getElementById('dialog-overlay')
        this.dialogTitle = document.getElementById('dialog-title')
        this.dialogFileCount = document.getElementById('file-count')

        this.eventSource = null

        if (this.cancelUploadButton && this.dialog) {
            this.registerListeners()

            if (this.dialog.dataset.startScan === "1") {
                this.toggleDialogVisibility()
                this.openConnection()
            }
        }
    }

    registerListeners() {
        this.cancelUploadButton.addEventListener('click', () => {
            document.getElementById('cancel-upload-form').submit()
        })
    }

    toggleDialogVisibility() {
        this.dialog.classList.toggle('govuk-!-display-none')
        this.dialogOverlay.classList.toggle('govuk-!-display-none')

        if (this.dialogVisible()) {
            this.dialog.addEventListener('keydown', this.handleTrapFocus)
            this.dialogTitle.focus()
        } else {
            this.dialog.removeEventListener('keydown', this.handleTrapFocus)
        }
    }

    dialogVisible() {
        return !this.dialog.classList.contains('govuk-!-display-none') && !this.dialogOverlay.classList.contains('govuk-!-display-none')
    }

    openConnection() {
        this.eventSource = new EventSource(document.querySelector("[data-sse-url]").dataset.sseUrl);

        this.eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.finishedScanning === true) {
                document.getElementById('scan-results-form').submit()
            }

            if (data.closeConnection === "1") {
                this.eventSource.close()
                document.getElementById('close-connection-form').submit()
            }

            let parts = this.dialogFileCount.innerHTML.split(' ')
            parts[0] = data.scannedCount
            this.dialogFileCount.innerHTML = parts.join(' ')
        };
    }

    handleTrapFocus(e) {
        const firstFocusableEl = this.dialogTitle
        const lastFocusableEl = this.cancelUploadButton
        const KEY_CODE_TAB = 9
        const KEY_CODE_ESC = 27

        const tabPressed = (e.key === 'Tab' || e.keyCode === KEY_CODE_TAB)
        const escPressed = (e.key === 'Esc' || e.keyCode === KEY_CODE_ESC)

        if (tabPressed) {
            if (e.shiftKey) { /* shift + tab */
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus()
                    e.preventDefault()
                }
            } else /* tab */ {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus()
                    e.preventDefault()
                }
            }
        }

        if (escPressed) {
            document.getElementById('cancel-upload-form').submit()
        }
    }
}
{% endraw %}
```

</div>



### Example 2: SCCS

<div class="app-example__code" data-module="app-copy">

```
{% raw %}
//adapted from https://github.com/UKHomeOffice/design-system/discussions/488

.app-loading-spinner {
  &__spinner{
    border: 12px solid #DEE0E2;
    border-radius: 50%;
    border-top-color: #005EA5;
    width: 80px;
    height: 80px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    margin-bottom: 1.5em;
  }
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
{% endraw %}
```

</div>



### Example 3: html

<div class="app-example__code" data-module="app-copy">

```html
{% raw %}
{{ template "page" . }}

{{ define "pageTitle" }}{{ tr .App "uploadYourEvidence" }}{{ end }}

{{ define "uploadedList" }}
    {{ trHtml .App "uploadedFilesContent" }}

    <form method="post" enctype="multipart/form-data" id="delete-form">
        {{ template "csrf-field" . }}

        <input type="hidden" id="f-delete-action" name="action" value="delete" />

        <dl class="govuk-summary-list">
            <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                    {{ tr .App "fileName" }}
                </dt>
                <dd class="govuk-summary-list__actions"></dd>
            </div>
            {{ range $i, $d := .Documents.ScannedNotSent }}
                <div class="govuk-summary-list__row">
                    <dt class="govuk-summary-list__value">
                        {{ $d.Filename }}
                    </dt>
                    <dd class="govuk-summary-list__actions">
                        <input type="hidden" id="f-delete-evidence-{{ $i }}" name="delete" value="{{ $d.Key }}" />
                        <button class="app-button-link govuk-link">
                            {{ tr $.App "delete" }}<span class="govuk-visually-hidden"> {{ $d.Filename }}</span>
                        </button>
                    </dd>
                </div>
            {{ end }}
        </dl>
    </form>
{{ end }}

{{ define "previouslyUploadedList" }}
    <h2 class="govuk-heading-m">{{ tr .App "previouslyUploadedFiles" }}</h2>
    <p class="govuk-body">{{ tr .App "theseFilesHaveAlreadyBeenUploaded" }}</p>

    <dl class="govuk-summary-list">
        <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
                {{ tr .App "fileName" }}
            </dt>
            <dd class="govuk-summary-list__actions govuk-!-font-weight-bold">{{ tr .App "uploadDateAndTime" }}</dd>
        </div>
        {{ range $i, $d := .Documents.Sent }}
            <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__value">
                    {{ $d.Filename }}
                </dt>
                <dd class="govuk-summary-list__actions">
                    {{ formatDateTime $.App $d.Uploaded }}
                </dd>
            </div>
        {{ end }}
    </dl>
{{ end }}

{{ define "main" }}
    <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
            {{ if .Deleted }}
                {{ template "notification-banner" (notificationBanner .App "important" (trFormatHtml .App "youHaveDeletedFile" "Filename" .Deleted) "heading") }}
            {{ end }}

            <h1 class="govuk-heading-xl">{{ tr .App "uploadYourEvidence" }}</h1>

            {{ trHtml .App "uploadEvidenceContent" }}

            {{ $totalDocumentsCount := (len .Documents) }}
            {{ if eq $totalDocumentsCount 0 }}
                {{ template "details" (details . "tipsForTakingPhotosAndCopies" "tipsForTakingPhotosAndCopiesDetails" false) }}
            {{ end }}

            <div class="govuk-!-width-two-thirds">
                <form method="post" enctype="multipart/form-data" id="upload-form">
                    {{ template "csrf-field" . }}

                    <input type="hidden" id="f-upload-action" name="action" value="upload" />

                    <div class="govuk-form-group {{ if .Errors.Has ">
                        <label class="govuk-label govuk-label--m" for="f-upload">{{ tr .App "uploadAFile" }}</label>

                        {{ template "error-message" (errorMessage . "upload") }}

                        {{ trFormatHtml .App "uploadGuidance" "NumberOfAllowedFiles" .NumberOfAllowedFiles }}

                        <input class="govuk-file-upload" id="f-upload" name="upload" type="file" accept="{{ concatComma .MimeTypes }}" />
                    </div>

                    <div class="govuk-form-group">
                        <button type="submit" class="govuk-button">{{ tr .App "uploadFiles" }}</button>
                    </div>
                </form>
            </div>

            {{ $scannedDocumentsNotSentCount := (len .Documents.ScannedNotSent) }}
            {{ $sentDocumentsCount := (len .Documents.Sent) }}
            {{ $useTabs := and (gt $scannedDocumentsNotSentCount 0) (gt $sentDocumentsCount 0) }}

            {{ if $useTabs }}
                <div class="govuk-tabs">
                    <ul class="govuk-tabs__list">
                        <li class="govuk-tabs__list-item govuk-tabs__list-item--selected">
                            <a class="govuk-tabs__tab" href="#uploaded">{{ tr .App "uploadedFiles" }}</a>
                        </li>
                        <li class="govuk-tabs__list-item">
                            <a class="govuk-tabs__tab" href="#previouslyUploaded">{{ tr .App "previouslyUploadedFiles" }}</a>
                        </li>
                    </ul>

                    <div class="govuk-tabs__panel" id="uploaded">
                        {{ template "uploadedList" . }}
                    </div>

                    <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="previouslyUploaded">
                        {{ template "previouslyUploadedList" . }}
                    </div>
                </div>
            {{ else }}
                {{ if gt $scannedDocumentsNotSentCount 0 }}
                    {{ template "uploadedList" . }}
                {{ else if gt $sentDocumentsCount 0 }}
                    {{ template "previouslyUploadedList" . }}
                {{ else }}
                    <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                {{ end }}
            {{ end }}

            <form method="post" enctype="multipart/form-data" id="pay-form">
                {{ template "csrf-field" . }}

                <input type="hidden" id="f-pay-action" name="action" value="pay" />

                <div class="govuk-button-group">
                    {{ if gt $scannedDocumentsNotSentCount 0 }}
                        {{ $label := "continue" }}
                        {{ if .RequiresPayment }}
                            {{ $label = "continueToPayment" }}
                        {{ end }}

                        <button type="submit" class="govuk-button" id="continue-or-pay">{{ tr .App $label }}</button>
                    {{ end }}
                    <a href="{{ link .App (global.Paths.TaskList.Format .App.LpaID) }}" class="govuk-button govuk-button--secondary">{{ tr .App "returnToTaskList" }}</a>
                </div>
            </form>

            <div id="dialog-overlay" class="app-dialog-overlay govuk-!-display-none" tabindex="-1"></div>

            <div id="dialog" class="app-dialog govuk-!-display-none">

                <h2 id="dialog-title" class="govuk-heading-l" tabindex="0">{{ tr .App "yourFilesAreUploading" }}</h2>

                <div class="app-loading-spinner">
                    <div class="app-loading-spinner__spinner"></div>
                    <div class="app-loading-spinner__content">
                        <h3 id="file-count" class="govuk-heading-s" tabindex="0">{{ trFormat .App "0OfNFilesUploaded" "DocumentsToScanCount" $totalDocumentsCount }}</h3>
                    </div>
                </div>

                <p id="dialog-description" class="govuk-body" tabindex="0">{{ trHtml .App "yourFilesAreUploadingContent" }}</p>

                <div class="govuk-button-group">
                    <button type="button" id="cancel-upload-button" class="govuk-button govuk-button--secondary">{{ tr .App "cancelUpload" }}</button>
                </div>
            </div>

            <form method="post" enctype="multipart/form-data" id="close-connection-form">
                {{ template "csrf-field" . }}
                <input type="hidden" id="f-close-connection-action" name="action" value="closeConnection" />
            </form>

            <form method="post" enctype="multipart/form-data" id="cancel-upload-form">
                {{ template "csrf-field" . }}
                <input type="hidden" id="f-cancel-upload-action" name="action" value="cancelUpload" />
            </form>

            <form method="post" enctype="multipart/form-data" id="scan-results-form">
                {{ template "csrf-field" . }}
                <input type="hidden" id="f-scan-results-action" name="action" value="scanResults" />
            </form>

        </div>
    </div>
{{ end }}
{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
