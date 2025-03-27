/* eslint-disable no-new */

import { queryByRole, getByLabelText, fireEvent } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import { configureAxe } from 'jest-axe'
import { outdent } from 'outdent'
import { fakeServerWithClock, spy, restore, useFakeXMLHttpRequest } from 'sinon'

import { MultiFileUpload } from './multi-file-upload.mjs'

const user = userEvent.setup()
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

function createComponent() {
  const html = outdent`
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <div class="moj-multi-file-upload" data-module="moj-multi-file-upload">
          <div class="moj-multi-file__uploaded-files moj-hidden">
            <h2 class="govuk-heading-m">Files added</h2>
            <div class="govuk-summary-list moj-multi-file-upload__list">
            </div>
          </div>
          <div class="moj-multi-file-upload__upload">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-label--m" for="documents">
                Upload a file
              </label>
              <input class="govuk-file-upload moj-multi-file-upload__input" id="documents" name="documents" type="file" multiple="">
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-multi-file-upload"]')
  )
}

const successResponse = {
  success: {
    messageHtml: 'File uploaded successfully',
    messageText: 'File uploaded successfully'
  },
  file: {
    filename: 'test',
    originalname: 'test.txt'
  }
}

describe('Multi-file upload', () => {
  let server
  let component

  let entryHook
  let exitHook
  let errorHook
  let deleteHook

  beforeEach(() => {
    server = fakeServerWithClock.create({
      respondImmediately: true
    })

    component = createComponent()

    entryHook = spy()
    exitHook = spy()
    errorHook = spy()
    deleteHook = spy()

    new MultiFileUpload(component, {
      uploadUrl: '/upload',
      deleteUrl: '/delete',
      hooks: {
        entryHook,
        exitHook,
        errorHook,
        deleteHook
      }
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
    server.restore()
    restore()
  })

  test('initialises with enhanced class', () => {
    expect(component).toHaveClass('moj-multi-file-upload--enhanced')
  })

  test('creates dropzone with correct text', () => {
    const dropzone = component.querySelector('.moj-multi-file-upload__dropzone')
    expect(dropzone).toBeInTheDocument()
    expect(dropzone).toHaveTextContent('Drag and drop files here or')
    expect(dropzone.querySelector('label')).toHaveTextContent('Choose files')
  })

  test('creates status box for announcements', () => {
    const statusBox = queryByRole(component, 'status')
    expect(statusBox).toBeInTheDocument()
    expect(statusBox).toHaveClass('govuk-visually-hidden')
  })

  describe('File upload handling', () => {
    let file
    let input
    const successResponse = {
      success: {
        messageHtml: 'File uploaded successfully',
        messageText: 'File uploaded successfully'
      },
      file: {
        filename: 'test',
        originalname: 'test.txt'
      }
    }

    beforeEach(() => {
      file = new File(['test content'], 'test.txt', { type: 'text/plain' })
      input = component.querySelector('.moj-multi-file-upload__input')
      input = getByLabelText(component, 'Upload a file')

      // Configure server response for file upload
      server.respondWith('POST', '/upload', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(successResponse)
      ])
    })

    test('handles file input change', async () => {
      const changeEvent = new Event('change', { bubbles: true })

      // input.files is not writable, so we do this to add the files to the input
      Object.defineProperty(input, 'files', {
        value: { files: [file] }
      })

      fireEvent(input, changeEvent)

      const feedbackContainer = component.querySelector(
        '.moj-multi-file__uploaded-files'
      )
      expect(feedbackContainer).not.toHaveClass('moj-hidden')
      const newInput = getByLabelText(component, 'Upload a file')
      expect(newInput).toHaveValue('')
      expect(newInput).toHaveFocus()
    })

    test('displays upload progress', async () => {
      /** @type {SinonFakeXMLHttpRequest | undefined} */
      let request

      // Create a spy on XMLHttpRequest to simulate upload progress
      const xhr = useFakeXMLHttpRequest()
      xhr.onCreate = (req) => {
        request = req
      }

      await user.upload(input, file)

      request?.upload.dispatchEvent(
        new window.ProgressEvent('progress', {
          lengthComputable: true,
          loaded: 50,
          total: 100
        })
      )

      const fileRows = component.querySelectorAll('.moj-multi-file-upload__row')
      const progressElement = component.querySelector(
        '.moj-multi-file-upload__progress'
      )
      const nameElement = component.querySelector(
        '.moj-multi-file-upload__filename'
      )

      expect(fileRows).toHaveLength(1)
      expect(progressElement).toHaveTextContent('50%')
      expect(nameElement).toHaveTextContent(file.name)

      xhr.restore()
    })

    test('handles successful upload', async () => {
      await user.upload(input, file)

      expect(entryHook).toHaveBeenCalledOnce()
      expect(exitHook).toHaveBeenCalledOnce()
      expect(exitHook).toHaveBeenCalledAfter(entryHook)

      const successMessage = component.querySelector(
        '.moj-multi-file-upload__success'
      )
      const deleteButton = component.querySelector(
        '.moj-multi-file-upload__delete'
      )

      expect(successMessage).toHaveTextContent('File uploaded successfully')
      expect(deleteButton).toBeInTheDocument()
      expect(deleteButton).toHaveAccessibleName(`Delete test.txt`)
      expect(deleteButton).toHaveValue('test')
    })

    test('handles 200 status with error in response json', async () => {
      server.respondWith('POST', '/upload', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          error: {
            message: 'Upload failed'
          }
        })
      ])

      await user.upload(input, file)

      const errorMessage = component.querySelector(
        '.moj-multi-file-upload__error'
      )
      expect(errorMessage).toHaveTextContent('Upload failed')
    })

    test('handles non 200 response status', async () => {
      server.respondWith('POST', '/upload', [
        500,
        { 'Content-Type': 'text/plain' },
        ''
      ])

      await user.upload(input, file)

      expect(errorHook).toHaveBeenCalledOnce()
    })
  })

  describe('File deletion', () => {
    beforeEach(async () => {
      const file = new File(['test content'], 'test.txt', {
        type: 'text/plain'
      })
      const input = component.querySelector('.moj-multi-file-upload__input')

      server.respondWith('POST', '/upload', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          success: {
            messageHtml: 'File uploaded successfully'
          },
          file: {
            filename: '123',
            originalname: 'test.txt'
          }
        })
      ])

      await user.upload(input, file)
    })

    test('handles file deletion', async () => {
      server.respondWith('POST', '/delete', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ success: true })
      ])

      const deleteButton = component.querySelector(
        '.moj-multi-file-upload__delete'
      )
      await user.click(deleteButton)

      expect(deleteHook).toHaveBeenCalledOnce()
      expect(server.requests[server.requests.length - 1].url).toBe('/delete')
      expect(server.requests[server.requests.length - 1].method).toBe('POST')

      const fileRow = component.querySelector('.moj-multi-file-upload__row')
      expect(fileRow).not.toBeInTheDocument()
    })

    test('hides feedback container when all files are deleted', async () => {
      server.respondWith('POST', '/delete', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ success: true })
      ])

      const deleteButton = component.querySelector(
        '.moj-multi-file-upload__delete'
      )
      await user.click(deleteButton)

      const feedbackContainer = component.querySelector(
        '.moj-multi-file__uploaded-files'
      )
      expect(feedbackContainer).toHaveClass('moj-hidden')
    })
  })

  describe('Drag and drop', () => {
    test('handles dragover event', () => {
      const dropzone = component.querySelector(
        '.moj-multi-file-upload__dropzone'
      )
      const dragOverEvent = new Event('dragover')
      dropzone.dispatchEvent(dragOverEvent)

      expect(dropzone).toHaveClass('moj-multi-file-upload--dragover')
    })

    test('handles dragleave event', () => {
      const dropzone = component.querySelector(
        '.moj-multi-file-upload__dropzone'
      )
      dropzone.classList.add('moj-multi-file-upload--dragover')

      const dragLeaveEvent = new Event('dragleave')
      dropzone.dispatchEvent(dragLeaveEvent)

      expect(dropzone).not.toHaveClass('moj-multi-file-upload--dragover')
    })

    test('handles file drop', () => {
      server.respondWith('POST', '/upload', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          success: {
            messageHtml: 'File uploaded successfully'
          },
          file: {
            filename: 'test',
            originalname: 'test.txt'
          }
        })
      ])

      const dropzone = component.querySelector(
        '.moj-multi-file-upload__dropzone'
      )
      const file = new File(['test content'], 'test.txt', {
        type: 'text/plain'
      })

      const dropEvent = new Event('drop')
      dropEvent.preventDefault = () => {}
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: {
          files: [file]
        }
      })

      dropzone.dispatchEvent(dropEvent)

      expect(server.requests).toHaveLength(1)
      expect(server.requests[0].url).toBe('/upload')
      expect(server.requests[0].method).toBe('POST')

      const feedbackContainer = component.querySelector(
        '.moj-multi-file__uploaded-files'
      )
      const successMessage = component.querySelector(
        '.moj-multi-file-upload__success'
      )
      const deleteButton = component.querySelector(
        '.moj-multi-file-upload__delete'
      )

      // test callbacks
      expect(entryHook).toHaveBeenCalledOnce()
      expect(exitHook).toHaveBeenCalledOnce()
      expect(exitHook).toHaveBeenCalledAfter(entryHook)

      // test file present in UI
      expect(feedbackContainer).not.toHaveClass('moj-hidden')
      expect(successMessage).toHaveTextContent('File uploaded successfully')
      expect(deleteButton).toBeInTheDocument()
      expect(deleteButton).toHaveAccessibleName(`Delete test.txt`)
      expect(deleteButton).toHaveValue('test')
    })
  })

  describe('Uploading multiple files', () => {
    let files
    let input

    beforeEach(() => {
      files = [
        new File(['test content'], 'test-1.txt', { type: 'text/plain' }),
        new File(['test content'], 'test-2.txt', { type: 'text/plain' })
      ]
      input = component.querySelector('.moj-multi-file-upload__input')
      input = getByLabelText(component, 'Upload a file')

      // Configure server response for file upload
      server.respondWith('POST', '/upload', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(successResponse)
      ])
    })

    test('handles multiple files', async () => {
      await user.upload(input, files)

      const feedbackContainer = component.querySelector(
        '.moj-multi-file__uploaded-files'
      )
      const fileRows = component.querySelectorAll('.moj-multi-file-upload__row')
      const successMessages = component.querySelectorAll(
        '.moj-multi-file-upload__success'
      )
      const deleteButtons = component.querySelectorAll(
        '.moj-multi-file-upload__delete'
      )

      expect(entryHook).toHaveBeenCalledTwice()
      expect(exitHook).toHaveBeenCalledTwice()

      expect(feedbackContainer).not.toHaveClass('moj-hidden')
      expect(fileRows).toHaveLength(2)

      expect(successMessages[0]).toHaveTextContent('File uploaded successfully')
      expect(deleteButtons[0]).toHaveAccessibleName(`Delete test.txt`)
      expect(deleteButtons[0]).toHaveValue('test')
      expect(successMessages[1]).toHaveTextContent('File uploaded successfully')
      expect(deleteButtons[1]).toHaveAccessibleName(`Delete test.txt`)
      expect(deleteButtons[1]).toHaveValue('test')
    })

    test('handles multiple file drop', () => {
      const dropzone = component.querySelector(
        '.moj-multi-file-upload__dropzone'
      )

      const dropEvent = new Event('drop')
      dropEvent.preventDefault = () => {}
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: {
          files
        }
      })

      dropzone.dispatchEvent(dropEvent)

      expect(server.requests).toHaveLength(2)
      expect(server.requests[0].url).toBe('/upload')
      expect(server.requests[0].method).toBe('POST')

      const feedbackContainer = component.querySelector(
        '.moj-multi-file__uploaded-files'
      )

      const fileRows = component.querySelectorAll('.moj-multi-file-upload__row')
      const successMessages = component.querySelectorAll(
        '.moj-multi-file-upload__success'
      )
      const deleteButtons = component.querySelectorAll(
        '.moj-multi-file-upload__delete'
      )

      expect(entryHook).toHaveBeenCalledTwice()
      expect(exitHook).toHaveBeenCalledTwice()

      expect(feedbackContainer).not.toHaveClass('moj-hidden')
      expect(fileRows).toHaveLength(2)

      expect(successMessages[0]).toHaveTextContent('File uploaded successfully')
      expect(deleteButtons[0]).toHaveAccessibleName(`Delete test.txt`)
      expect(deleteButtons[0]).toHaveValue('test')
      expect(successMessages[1]).toHaveTextContent('File uploaded successfully')
      expect(deleteButtons[1]).toHaveAccessibleName(`Delete test.txt`)
      expect(deleteButtons[1]).toHaveValue('test')
    })
  })

  describe('Accessibility', () => {
    let file
    let input

    beforeEach(() => {
      file = new File(['test content'], 'test.txt', {
        type: 'text/plain'
      })
      input = component.querySelector('.moj-multi-file-upload__input')

      // Configure server response for file upload
      server.respondWith('POST', '/upload', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(successResponse)
      ])
    })

    test('status messages are announced to screen readers', async () => {
      await user.upload(input, file)

      const statusBox = queryByRole(component, 'status')
      expect(statusBox).toHaveTextContent('File uploaded successfully')
    })

    test('component has no wcag violations', async () => {
      expect(await axe(document.body)).toHaveNoViolations()
      await user.upload(input, file)
      expect(await axe(document.body)).toHaveNoViolations()
    })
  })
})

/**
 * @import { SinonFakeXMLHttpRequest } from 'sinon'
 */
