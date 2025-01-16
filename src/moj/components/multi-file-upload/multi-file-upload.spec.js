const {
  queryByRole,
  within,
  queryByText,
  waitFor,
  fireEvent,
} = require("@testing-library/dom");
const { userEvent } = require("@testing-library/user-event");

require("../../helpers.js");
require("./multi-file-upload.js");

const user = userEvent.setup();

// Mock DataTransfer
class MockDataTransfer {
  constructor() {
    this.files = [];
    this.items = {
      add: (file) => {
        this.files.push(file);
      },
      remove: (index) => {
        this.files.splice(index, 1);
      },
      clear: () => {
        this.files = [];
      },
    };
  }
}

const simulateFileUpload = (fileInput, files) => {
  const mockDataTransfer = new MockDataTransfer();
  files.forEach((file) => mockDataTransfer.items.add(file));

console.log(mockDataTransfer.files)
  const changeEvent = new Event("change", { bubbles: true });
  Object.defineProperty(changeEvent, "target", {
    value: { files: mockDataTransfer.files },
  });

  fireEvent(fileInput, changeEvent);
};

const simulateFileDrop = (dropzone, files) => {
  const mockDataTransfer = new MockDataTransfer();
  files.forEach((file) => mockDataTransfer.items.add(file));

  const dropEvent = new Event("drop", { bubbles: true });
  Object.defineProperty(dropEvent, "dataTransfer", {
    value: mockDataTransfer,
  });
  Object.defineProperty(dropEvent, "preventDefault", { value: jest.fn() });

  fireEvent(dropzone, dropEvent);
};

const createComponent = (options = {}) => {
  const html = `
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <form action="/upload" method="post" enctype="multipart/form-data">
          <div class="moj-multi-file-upload">
            <div class="moj-multi-file__uploaded-files moj-hidden">
              <h2 class="govuk-heading-m">Files added</h2>
              <div class="govuk-summary-list moj-multi-file-upload__list"></div>
            </div>
            <div class="moj-multi-file-upload__upload">
              <div class="govuk-form-group">
                <label class="govuk-label govuk-label--m" for="documents">
                  Upload a file
                </label>
                <input class="govuk-file-upload moj-multi-file-upload__input" id="documents" name="documents" type="file" multiple>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>`;

  document.body.insertAdjacentHTML("afterbegin", html);
  const component = document.querySelector(".moj-multi-file-upload");
  options.container = ".moj-multi-file-upload";
  options.uploadUrl = options.uploadUrl || "/upload";
  options.deleteUrl = options.deleteUrl || "/delete";

  return { component, options };
};

describe("multi-file upload", () => {
  let component;
  let options;
  let uploadFileEntryHook;
  let uploadFileExitHook;
  let uploadFileErrorHook;
  let fileDeleteHook;

  beforeEach(() => {
    // Mock fetch globally
    global.fetch = jest.fn();
    global.FormData = jest.fn(() => ({
      append: jest.fn(),
    }));

    uploadFileEntryHook = jest.fn();
    uploadFileExitHook = jest.fn();
    uploadFileErrorHook = jest.fn();
    fileDeleteHook = jest.fn();

    ({ component, options } = createComponent());
    options.uploadFileEntryHook = uploadFileEntryHook;
    options.uploadFileExitHook = uploadFileExitHook;
    options.uploadFileErrorHook = uploadFileErrorHook;
    options.fileDeleteHook = fileDeleteHook;

    new MOJFrontend.MultiFileUpload(options);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.resetAllMocks();
  });

  test("enhances the upload component with drag and drop functionality", () => {
    expect(component).toHaveClass("moj-multi-file-upload--enhanced");
  });

  test("creates dropzone with correct text", () => {
    const dropzone = component.querySelector(
      ".moj-multi-file-upload__dropzone",
    );
    expect(dropzone).toBeInTheDocument();
    expect(dropzone).toHaveTextContent("Drag and drop files here or");
    expect(dropzone).toHaveTextContent("Choose files");
  });

  test("creates status box for accessibility", () => {
    const statusBox = queryByRole(component.parentElement, "status");
    expect(statusBox).toBeInTheDocument();
    expect(statusBox).toHaveClass("govuk-visually-hidden");
  });

  describe("file upload", () => {
    let file;

    beforeEach(() => {
      file = new File(["test content"], "test.txt", { type: "text/plain" });
    });

    test("handles successful file upload", async () => {
console.log(file)
      const successResponse = {
        success: {
          messageHtml: "File uploaded successfully",
          messageText: "File uploaded successfully",
        },
        file: {
          filename: "test.txt",
          originalname: "test.txt",
        },
      };

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(successResponse),
        }),
      );

      const fileInput = component.querySelector(
        ".moj-multi-file-upload__input",
      );
      // simulateFileUpload(fileInput, [file]);
await user.upload(fileInput, file)

      // await waitFor(() => {
        expect(uploadFileEntryHook).toHaveBeenCalled();
        await waitFor(() => {
          expect(uploadFileExitHook).toHaveBeenCalled();
})
        expect(
          component.querySelector(".moj-multi-file-upload__success"),
        ).toBeInTheDocument();
      // });
    });

    test("handles upload errors", async () => {
      const errorResponse = {
        error: {
          message: "Upload failed",
        },
      };

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(errorResponse),
        }),
      );

      const fileInput = component.querySelector(
        ".moj-multi-file-upload__input",
      );
      simulateFileUpload(fileInput, [file]);

      await waitFor(() => {
        const errorMessage = component.querySelector(
          ".moj-multi-file-upload__error",
        );
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent("Upload failed");
      });
    });

    test("handles multiple file upload", async () => {
      const files = [
        new File(["content 1"], "test1.txt", { type: "text/plain" }),
        new File(["content 2"], "test2.txt", { type: "text/plain" }),
      ];

      const successResponse = {
        success: {
          messageHtml: "File uploaded successfully",
          messageText: "File uploaded successfully",
        },
        file: {
          filename: "test.txt",
          originalname: "test.txt",
        },
      };

      global.fetch
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(successResponse),
          }),
        )

      const fileInput = component.querySelector(
        ".moj-multi-file-upload__input",
      );
      simulateFileUpload(fileInput, files);

      await waitFor(() => {
        const successMessages = component.querySelectorAll(
          ".moj-multi-file-upload__success",
        );
        expect(successMessages).toHaveLength(2);
      });
    });
  });

  describe("file deletion", () => {
    beforeEach(async () => {
      // Setup a file in the list first
      const successResponse = {
        success: {
          messageHtml: "File uploaded successfully",
          messageText: "File uploaded successfully",
        },
        file: {
          filename: "test.txt",
          originalname: "test.txt",
        },
      };

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(successResponse),
        }),
      );

      const file = new File(["test content"], "test.txt", {
        type: "text/plain",
      });
      const fileInput = component.querySelector(
        ".moj-multi-file-upload__input",
      );
      await user.upload(fileInput, file);

      // Reset fetch mock for delete tests
      global.fetch.mockReset();
    });

    test("handles successful file deletion", async () => {
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        }),
      );

      const deleteButton = component.querySelector(
        ".moj-multi-file-upload__delete",
      );
      await user.click(deleteButton);

      await waitFor(() => {
        expect(
          component.querySelector(".moj-multi-file-upload__row"),
        ).not.toBeInTheDocument();
        expect(fileDeleteHook).toHaveBeenCalled();
      });
    });

    test("hides feedback container when last file is deleted", async () => {
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        }),
      );

      const deleteButton = component.querySelector(
        ".moj-multi-file-upload__delete",
      );
      await user.click(deleteButton);

      await waitFor(() => {
        const feedbackContainer = component.querySelector(
          ".moj-multi-file__uploaded-files",
        );
        expect(feedbackContainer).toHaveClass("moj-hidden");
      });
    });
  });

  describe("drag and drop", () => {
    test("adds dragover class on dragover", () => {
      const dropzone = component.querySelector(
        ".moj-multi-file-upload__dropzone",
      );
      fireEvent.dragOver(dropzone);
      expect(dropzone).toHaveClass("moj-multi-file-upload--dragover");
    });

    test("removes dragover class on dragleave", () => {
      const dropzone = component.querySelector(
        ".moj-multi-file-upload__dropzone",
      );
      dropzone.classList.add("moj-multi-file-upload--dragover");
      fireEvent.dragLeave(dropzone);
      expect(dropzone).not.toHaveClass("moj-multi-file-upload--dragover");
    });

    test("handles file drop", async () => {
      const file = new File(["test content"], "test.txt", {
        type: "text/plain",
      });
      const dropzone = component.querySelector(
        ".moj-multi-file-upload__dropzone",
      );

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: {
                messageHtml: "File uploaded successfully",
                messageText: "File uploaded successfully",
              },
              file: {
                filename: "test.txt",
                originalname: "test.txt",
              },
            }),
        }),
      );

      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file],
        },
      });

      await waitFor(() => {
        expect(uploadFileEntryHook).toHaveBeenCalled();
        expect(uploadFileExitHook).toHaveBeenCalled();
        expect(dropzone).not.toHaveClass("moj-multi-file-upload--dragover");
      });
    });
  });
});
