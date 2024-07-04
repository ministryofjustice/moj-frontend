import { initAll as initGOVUKFrontend } from "govuk-frontend/dist/govuk/all.mjs";
import MOJFrontend from "../../../package/moj/all.js";

import Cookies from "./cookies";
import Copy from "./copy";
import Tabs from "./tabs";

initGOVUKFrontend();
MOJFrontend.initAll();

$(function () {
  $('[data-module="app-tabs"]').each(function (e, el) {
    new Tabs($(el));
  });

  $('[data-module="app-copy"]').each(function (e, el) {
    new Copy(el).init();
  });

  $('[data-module="app-cookies"]').each(function (e, el) {
    new Cookies(el).init();
  });
});

window.MOJFrontend = MOJFrontend;
