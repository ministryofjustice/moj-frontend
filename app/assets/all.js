import GOVUKFrontend from "govuk-frontend/govuk/all.js";
import MOJFrontend from "../../package/moj/all.js";

import Copy from "./javascript/copy";
import Tabs from "./javascript/tabs";

GOVUKFrontend.initAll();
MOJFrontend.initAll();

$(function () {
  $('[data-module="app-tabs"]').each(function (e, el) {
    new Tabs($(el));
  });

  $('[data-module="app-copy"]').each(function (e, el) {
    new Copy(el).init();
  });
});

window.MOJFrontend = MOJFrontend;
