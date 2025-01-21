let requestCount = 0;
let fileCount = 0;
let droppedFiles = [];
let pickedFiles = [];
let input;

const successResponse = (filename) => {
  return {
    status: 200,
    statusText: "OK",
    text: {
      success: {
        messageHtml: `${filename} uploaded successfully`,
        messageText: `${filename} uploaded successfully`,
      },
      file: {
        filename: filename,
        originalname: filename,
      },
    },
  };
};

const errorResponse = (filename) => {
  return {
    status: 200,
    text: {
      error: {
        message: `${filename} upload failed`,
      },
      file: {
        filename: filename,
        originalname: filename,
      },
    },
  };
};

const deleteResponse = {
  status: 200,
  text: JSON.stringify({
    success: true,
  }),
};

document.addEventListener("DOMContentLoaded", () => {
  const dropzone = document.querySelector(".moj-multi-file-upload__dropzone");
  // we listen for the change event on the container as the input gets replaced
  // each time when files are picked
  dropzone.addEventListener(
    "change",
    () => {
      input = document.querySelector("#documents");
      pickedFiles = Array.from(input.files);
    },
    true,
  );

  // Use capture to ensure this fires *before* the event registered in the component triggers the uploads
  dropzone.addEventListener(
    "drop",
    (e) => {
      droppedFiles = Array.from(e.dataTransfer.files);
    },
    true,
  );
});

if (typeof xhook !== "undefined") {
  xhook.before(function (request, callback) {
    const files = pickedFiles.length > 0 ? pickedFiles : droppedFiles;
    const file = files[fileCount];

    requestCount++;
    fileCount++;

    switch (request.url) {
      case "/ajax-upload":
        let loaded = 0;
        // manually firing progress will advance the ready state to 3
        request.xhr.upload.dispatchEvent("progress", {
          loaded: loaded,
          total: 100,
          lengthComputable: true,
        });

        const tick = (requestNum) => {
          // Randomly increment the loaded percentage, cap to 100
          loaded += Math.round(8 + Math.random() * 8);
          loaded = Math.min(loaded, 100);

          request.xhr.upload.dispatchEvent("progress", {
            loaded: loaded,
            total: 100,
            lengthComputable: true,
          });

          if (loaded < 100) {
            setTimeout(() => {
              tick(requestNum);
            }, 200);
          } else {
            // Fail every third upload
            if (requestNum % 3 === 0 && loaded > 50) {
              callback(errorResponse(file?.name || "test.txt"));
            } else {
              callback(successResponse(file?.name || "text.txt"));
            }
          }
        };

        tick(requestCount);

        // reset file count if we're on the last one
        if (fileCount == files.length) {
          fileCount = 0;
          pickedFiles = [];
          droppedFiles = [];
        }

        break;

      case "/ajax-delete":
        callback(deleteResponse);
        break;
      default:
        // pass request through to network
        callback();
    }
  });
}
