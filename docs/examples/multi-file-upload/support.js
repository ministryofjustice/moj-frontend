let requestCount = 0;
if (typeof xhook !== "undefined") {
  xhook.before(function (request, callback) {
    requestCount++;

    switch (request.url) {
      case "/ajax-upload":
        const successResponse = {
          status: 200,
          statusText: "OK",
          text: {
            success: {
              messageHtml: "File uploaded successfully",
              messageText: "File uploaded successfully",
            },
            file: {
              filename: "test",
              originalname: "test.txt",
            },
          },
        };
        const errorResponse = {
          status: 200,
          text: {
            error: {
              message: "Upload failed",
            },
            file: {
              filename: "test",
              originalname: "test.txt",
            },
          },
        };

        let loaded = 0;
        // manually firing progress will advance the ready state to 3
        request.xhr.upload.dispatchEvent("progress", {
          loaded: loaded,
          total: 100,
          lengthComputable: true,
        });

        function tick() {
          loaded += Math.round(8 + Math.random() * 8);
          loaded = Math.min(loaded, 100);
          request.xhr.upload.dispatchEvent("progress", {
            loaded: loaded,
            total: 100,
            lengthComputable: true,
          });
          if (loaded < 100) {
            setTimeout(tick, 200);
          } else {
            callback(successResponse);
          }
        }

        // Fail every other upload
        if (requestCount % 2 === 0) {
          callback(errorResponse);
        } else {
          tick();
        }

        break;

      case "/ajax-delete":
        const deleteResponse = {
          status: 200,
          text: JSON.stringify({
            success: true,
          }),
        };
        callback(deleteResponse);
        break;
      default:
        // pass request through to network
        callback();
    }
  });
}
