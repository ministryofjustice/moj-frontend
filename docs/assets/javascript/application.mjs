/* eslint-disable no-new */

import { createAll } from 'govuk-frontend'
import * as GOVUKFrontend from 'govuk-frontend'

import * as MOJFrontend from '../../../src/moj/all.mjs'

import CollapsibleNav from './collapsible-nav.mjs'
import Cookies from './cookies.mjs'
import Copy from './copy.mjs'
import IFrameResizer from './iframe-resizer.mjs'
import MenuToggle from './menu-toggle.mjs'
import Tabs from './tabs.mjs'

GOVUKFrontend.initAll()
MOJFrontend.initAll()

createAll(Tabs)
createAll(Copy)
createAll(Cookies)

const $iframes = document.querySelectorAll('iframe')
for (const $iframe of Array.from($iframes)) {
  new IFrameResizer($iframe)
}

window.MOJFrontend = MOJFrontend
window.customElements.define('moj-menu-toggle', MenuToggle)
window.customElements.define('moj-collapsible-nav', CollapsibleNav)
