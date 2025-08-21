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