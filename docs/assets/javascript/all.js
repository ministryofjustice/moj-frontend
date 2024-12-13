import { initAll as initGOVUKFrontend } from "govuk-frontend/dist/govuk/all.mjs";
import MOJFrontend from "../../../package/moj/all.js";

import Cookies from "./cookies";
import Copy from "./copy";
import Tabs from "./tabs";
import IFrameResizer from './iframe-resizer.js'

import MenuToggle from "./menu-toggle.js";
import CollapsibleNav from "./collapsible-nav.js";

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

  const iFrames = document.querySelectorAll('iframe')
  iFrames.forEach((frame) => new IFrameResizer(frame))
});

window.MOJFrontend = MOJFrontend;
customElements.define('moj-menu-toggle', MenuToggle)
customElements.define('moj-collapsible-nav', CollapsibleNav)
