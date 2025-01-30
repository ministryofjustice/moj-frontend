import * as GOVUKFrontend from 'govuk-frontend'

import MOJFrontend from '../../../package/moj/all.js'

import CollapsibleNav from './collapsible-nav.mjs'
import Cookies from './cookies.mjs'
import Copy from './copy.mjs'
import IFrameResizer from './iframe-resizer.mjs'
import MenuToggle from './menu-toggle.mjs'
import Tabs from './tabs.mjs'

GOVUKFrontend.initAll()
MOJFrontend.initAll()

$(function () {
  $('[data-module="app-tabs"]').each(function (e, el) {
    new Tabs($(el))
  })

  $('[data-module="app-copy"]').each(function (e, el) {
    new Copy(el).init()
  })

  $('[data-module="app-cookies"]').each(function (e, el) {
    new Cookies(el).init()
  })

  const iFrames = document.querySelectorAll('iframe')
  iFrames.forEach((frame) => new IFrameResizer(frame))
})

window.MOJFrontend = MOJFrontend
window.customElements.define('moj-menu-toggle', MenuToggle)
window.customElements.define('moj-collapsible-nav', CollapsibleNav)
