if (typeof MOJFrontend.MultiFileUpload !== "undefined") {
  new MOJFrontend.MultiFileUpload({
    container: $(".moj-multi-file-upload"),
    uploadUrl: "/ajax-upload",
    deleteUrl: "/ajax-delete",
  });
}
