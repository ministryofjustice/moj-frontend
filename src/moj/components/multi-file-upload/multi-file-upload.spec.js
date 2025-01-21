const sinon = require("sinon");
const {
  queryByRole,
  getByLabelText,
  fireEvent,
} = require("@testing-library/dom");
const { userEvent } = require("@testing-library/user-event");
const { configureAxe } = require("jest-axe");

require("../../helpers.js");
require("./multi-file-upload.js");

const user = userEvent.setup();
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

const createComponent = (options = {}) => {
  const html = `
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <div class="moj-multi-file-upload">
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
    </div>`;

  document.body.insertAdjacentHTML("afterbegin", html);
  const component = document.querySelector(".moj-multi-file-upload");
  return {
    component,
    options: { container: component, ...options },
  };
};

describe("Multi-file upload", () => {
  let component;
  let options;
  let server;
  let uploadFileEntryHook;
  let uploadFileExitHook;
  let uploadFileErrorHook;
  let fileDeleteHook;

  beforeEach(() => {
    server = sinon.fakeServerWithClock.create({
      respondImmediately: true,
    });

    uploadFileEntryHook = sinon.spy();
    uploadFileExitHook = sinon.spy();
    uploadFileErrorHook = sinon.spy();
    fileDeleteHook = sinon.spy();

    ({ component, options } = createComponent({
      uploadFileEntryHook: uploadFileEntryHook,
      uploadFileExitHook: uploadFileExitHook,
      uploadFileErrorHook: uploadFileErrorHook,
      fileDeleteHook: fileDeleteHook,
      uploadUrl: "/upload",
      deleteUrl: "/delete",
    }));

    new MOJFrontend.MultiFileUpload(options);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    server.restore();
    sinon.restore();
  });

  test("initialises with enhanced class", () => {
    expect(component).toHaveClass("moj-multi-file-upload--enhanced");
const feedbackContainer = component.querySelector(
        ".moj-multi-file__uploaded-files",
      );
      expect(feedbackContainer).toHaveClass("moj-hidden");
  });

  test("creates dropzone with correct text", () => {
    const dropzone = component.querySelector(
      ".moj-multi-file-upload__dropzone",
    );
    expect(dropzone).toBeInTheDocument();
    expect(dropzone).toHaveTextContent("Drag and drop files here or");
    expect(dropzone.querySelector("label")).toHaveTextContent("Choose files");
  });

  test("creates status box for announcements", () => {
    const statusBox = queryByRole(component, "status");
    expect(statusBox).toBeInTheDocument();
    expect(statusBox).toHaveClass("govuk-visually-hidden");
  });

  describe("File upload handling", () => {
    let file;
    let input;
    const successResponse = {
      success: {
        messageHtml: "File uploaded successfully",
        messageText: "File uploaded successfully",
      },
      file: {
        filename: "test",
        originalname: "test.txt",
      },
    };

    beforeEach(() => {
      file = new File(["test content"], "test.txt", { type: "text/plain" });
      input = component.querySelector(".moj-multi-file-upload__input");
      input = getByLabelText(component, "Upload a file");

      // Configure server response for file upload
      server.respondWith("POST", "/upload", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify(successResponse),
      ]);
    });

    test("handles file input change", async () => {
      const changeEvent = new Event("change", { bubbles: true });

      //input.files is not writable, so we do this to add the files to the input
      Object.defineProperty(input, "files", {
        value: { files: [file] },
      });

      fireEvent(input, changeEvent);

      const feedbackContainer = component.querySelector(
        ".moj-multi-file__uploaded-files",
      );
      expect(feedbackContainer).not.toHaveClass("moj-hidden");
      const newInput = getByLabelText(component, "Upload a file");
      expect(newInput).toHaveValue("");
      expect(newInput).toHaveFocus();
    });

    test("displays upload progress", async () => {
      // Create a spy on XMLHttpRequest to simulate upload progress
      const xhr = sinon.useFakeXMLHttpRequest();
      let request;
      xhr.onCreate = (req) => {
        request = req;
      };

      await user.upload(input, file);

      request.uploadProgress({
        lengthComputable: true,
        loaded: 50,
        total: 100,
      });

      const fileRows = component.querySelectorAll(
        ".moj-multi-file-upload__row",
      );
      const progressElement = component.querySelector(
        ".moj-multi-file-upload__progress",
      );
      const nameElement = component.querySelector(
        ".moj-multi-file-upload__filename",
      );

      expect(fileRows.length).toBe(1);
      expect(progressElement).toHaveTextContent("50%");
      expect(nameElement).toHaveTextContent(file.name);

      xhr.restore();
    });

    test("handles successful upload", async () => {
      await user.upload(input, file);

      expect(uploadFileEntryHook).toHaveBeenCalledOnce();
      expect(uploadFileExitHook).toHaveBeenCalledOnce();
      expect(uploadFileExitHook).toHaveBeenCalledAfter(uploadFileEntryHook);

      const successMessage = component.querySelector(
        ".moj-multi-file-upload__success",
      );
      const deleteButton = component.querySelector(
        ".moj-multi-file-upload__delete",
      );

      expect(successMessage).toHaveTextContent("File uploaded successfully");
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveAccessibleName(`Delete test.txt`);
      expect(deleteButton).toHaveAttribute("value", "test");
    });

    //  this fails as the component still attempts to access response.file (line 149)
    test("handles 200 status with error in response json", async () => {
      server.respondWith("POST", "/upload", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({
          error: {
            message: "Upload failed",
},
      file: {
        filename: "test",
        originalname: "test.txt",
      },
        }),
      ]);

      await user.upload(input, file);

      const errorMessage = component.querySelector(
        ".moj-multi-file-upload__error",
      );
      expect(errorMessage).toHaveTextContent("Upload failed");
    });

    test("handles non 200 response status ", async () => {
      server.respondWith("POST", "/upload", [
        500,
        { "Content-Type": "text/plain" },
        "",
      ]);

      await user.upload(input, file);

      expect(uploadFileErrorHook).toHaveBeenCalledOnce();
    });
  });

  describe("File deletion", () => {
    beforeEach(async () => {
      const file = new File(["test content"], "test.txt", {
        type: "text/plain",
      });
      const input = component.querySelector(".moj-multi-file-upload__input");

      server.respondWith("POST", "/upload", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({
          success: {
            messageHtml: "File uploaded successfully",
          },
          file: {
            filename: "123",
            originalname: "test.txt",
          },
        }),
      ]);

      await user.upload(input, file);
    });

    test("handles file deletion", async () => {
      server.respondWith("POST", "/delete", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({ success: true }),
      ]);

      const deleteButton = component.querySelector(
        ".moj-multi-file-upload__delete",
      );
      await user.click(deleteButton);

      expect(fileDeleteHook).toHaveBeenCalledOnce();
      expect(server.requests[server.requests.length - 1].url).toBe("/delete");
      expect(server.requests[server.requests.length - 1].method).toBe("POST");

      const fileRow = component.querySelector(".moj-multi-file-upload__row");
      expect(fileRow).not.toBeInTheDocument();
    });

    test("hides feedback container when all files are deleted", async () => {
      server.respondWith("POST", "/delete", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({ success: true }),
      ]);

      const deleteButton = component.querySelector(
        ".moj-multi-file-upload__delete",
      );
      await user.click(deleteButton);

      const feedbackContainer = component.querySelector(
        ".moj-multi-file__uploaded-files",
      );
      expect(feedbackContainer).toHaveClass("moj-hidden");
    });
  });

  describe("Drag and drop", () => {
    test("handles dragover event", () => {
      const dropzone = component.querySelector(
        ".moj-multi-file-upload__dropzone",
      );
      const dragOverEvent = new Event("dragover");
      dropzone.dispatchEvent(dragOverEvent);

      expect(dropzone).toHaveClass("moj-multi-file-upload--dragover");
    });

    test("handles dragleave event", () => {
      const dropzone = component.querySelector(
        ".moj-multi-file-upload__dropzone",
      );
      dropzone.classList.add("moj-multi-file-upload--dragover");

      const dragLeaveEvent = new Event("dragleave");
      dropzone.dispatchEvent(dragLeaveEvent);

      expect(dropzone).not.toHaveClass("moj-multi-file-upload--dragover");
    });

    test("handles file drop", () => {
      server.respondWith("POST", "/upload", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({
          success: {
            messageHtml: "File uploaded successfully",
          },
          file: {
            filename: "test",
            originalname: "test.txt",
          },
        }),
      ]);

      const dropzone = component.querySelector(
        ".moj-multi-file-upload__dropzone",
      );
      const file = new File(["test content"], "test.txt", {
        type: "text/plain",
      });

      const dropEvent = new Event("drop");
      dropEvent.preventDefault = () => {};
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: {
          files: [file],
        },
      });

      dropzone.dispatchEvent(dropEvent);

      expect(server.requests.length).toBe(1);
      expect(server.requests[0].url).toBe("/upload");
      expect(server.requests[0].method).toBe("POST");

      const feedbackContainer = component.querySelector(
        ".moj-multi-file__uploaded-files",
      );
      const successMessage = component.querySelector(
        ".moj-multi-file-upload__success",
      );
      const deleteButton = component.querySelector(
        ".moj-multi-file-upload__delete",
      );

      // test callbacks
      expect(uploadFileEntryHook).toHaveBeenCalledOnce();
      expect(uploadFileExitHook).toHaveBeenCalledOnce();
      expect(uploadFileExitHook).toHaveBeenCalledAfter(uploadFileEntryHook);

      // test file present in UI
      expect(feedbackContainer).not.toHaveClass("moj-hidden");
      expect(successMessage).toHaveTextContent("File uploaded successfully");
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveAccessibleName(`Delete test.txt`);
      expect(deleteButton).toHaveAttribute("value", "test");
    });
  });

  describe("Uploading multiple files", () => {
    let files;
    let input;
    const successResponse = {
      success: {
        messageHtml: "File uploaded successfully",
        messageText: "File uploaded successfully",
      },
      file: {
        filename: "test",
        originalname: "test.txt",
      },
    };

    beforeEach(() => {
      files = [
        new File(["test content"], "test-1.txt", { type: "text/plain" }),
        new File(["test content"], "test-2.txt", { type: "text/plain" }),
      ];
      input = component.querySelector(".moj-multi-file-upload__input");
      input = getByLabelText(component, "Upload a file");

      // Configure server response for file upload
      server.respondWith("POST", "/upload", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify(successResponse),
      ]);
    });

    test("handles multiple files", async () => {
      await user.upload(input, files);

      const feedbackContainer = component.querySelector(
        ".moj-multi-file__uploaded-files",
      );
      const fileRows = component.querySelectorAll(
        ".moj-multi-file-upload__row",
      );
      const successMessages = component.querySelectorAll(
        ".moj-multi-file-upload__success",
      );
      const deleteButtons = component.querySelectorAll(
        ".moj-multi-file-upload__delete",
      );

      expect(uploadFileEntryHook).toHaveBeenCalledTwice();
      expect(uploadFileExitHook).toHaveBeenCalledTwice();

      expect(feedbackContainer).not.toHaveClass("moj-hidden");
      expect(fileRows.length).toBe(2);

      expect(successMessages[0]).toHaveTextContent(
        "File uploaded successfully",
      );
      expect(deleteButtons[0]).toHaveAccessibleName(`Delete test.txt`);
      expect(deleteButtons[0]).toHaveAttribute("value", "test");
      expect(successMessages[1]).toHaveTextContent(
        "File uploaded successfully",
      );
      expect(deleteButtons[1]).toHaveAccessibleName(`Delete test.txt`);
      expect(deleteButtons[1]).toHaveAttribute("value", "test");
    });

    test("handles multiple file drop", () => {
      const dropzone = component.querySelector(
        ".moj-multi-file-upload__dropzone",
      );

      const dropEvent = new Event("drop");
      dropEvent.preventDefault = () => {};
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: {
          files: files,
        },
      });

      dropzone.dispatchEvent(dropEvent);

      expect(server.requests.length).toBe(2);
      expect(server.requests[0].url).toBe("/upload");
      expect(server.requests[0].method).toBe("POST");

      const feedbackContainer = component.querySelector(
        ".moj-multi-file__uploaded-files",
      );

      const fileRows = component.querySelectorAll(
        ".moj-multi-file-upload__row",
      );
      const successMessages = component.querySelectorAll(
        ".moj-multi-file-upload__success",
      );
      const deleteButtons = component.querySelectorAll(
        ".moj-multi-file-upload__delete",
      );

      expect(uploadFileEntryHook).toHaveBeenCalledTwice();
      expect(uploadFileExitHook).toHaveBeenCalledTwice();

      expect(feedbackContainer).not.toHaveClass("moj-hidden");
      expect(fileRows.length).toBe(2);

      expect(successMessages[0]).toHaveTextContent(
        "File uploaded successfully",
      );
      expect(deleteButtons[0]).toHaveAccessibleName(`Delete test.txt`);
      expect(deleteButtons[0]).toHaveAttribute("value", "test");
      expect(successMessages[1]).toHaveTextContent(
        "File uploaded successfully",
      );
      expect(deleteButtons[1]).toHaveAccessibleName(`Delete test.txt`);
      expect(deleteButtons[1]).toHaveAttribute("value", "test");
    });
  });

  describe("Accessibility", () => {
    let file;
    let input;

    beforeEach(() => {
      file = new File(["test content"], "test.txt", {
        type: "text/plain",
      });
      input = component.querySelector(".moj-multi-file-upload__input");
    });

    test("status messages are announced to screen readers", async () => {
      await user.upload(input, file);

      const statusBox = queryByRole(component, "status");
      expect(statusBox).toHaveTextContent("Uploading files, please wait");
    });

    test("component has no wcag violations", async () => {
      expect(await axe(document.body)).toHaveNoViolations();
      await user.upload(input, file);
      expect(await axe(document.body)).toHaveNoViolations();
    });
  });
});
