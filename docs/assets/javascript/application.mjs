/* eslint-disable no-new */

import * as GOVUKFrontend from 'govuk-frontend'
import $ from 'jquery'

import * as MOJFrontend from '../../../src/moj/all.mjs'

import CollapsibleNav from './collapsible-nav.mjs'
import Cookies from './cookies.mjs'
import Copy from './copy.mjs'
import IFrameResizer from './iframe-resizer.mjs'
import MenuToggle from './menu-toggle.mjs'
import Tabs from './tabs.mjs'

GOVUKFrontend.initAll()
MOJFrontend.initAll()

const $tabs = document.querySelectorAll('[data-module="app-tabs"]')

$tabs.forEach(($tabs) => {
  new Tabs($($tabs))
})

const $codeBlocks = document.querySelectorAll('[data-module="app-copy"]')

$codeBlocks.forEach(($codeBlock) => {
  new Copy($codeBlock).init()
})

const $cookieBanners = document.querySelectorAll('[data-module="app-cookies"]')

$cookieBanners.forEach(($cookieBanner) => {
  new Cookies($cookieBanner).init()
})

const $iframes = document.querySelectorAll('iframe')

$iframes.forEach(($iframe) => {
  new IFrameResizer($iframe)
})

window.MOJFrontend = MOJFrontend
window.customElements.define('moj-menu-toggle', MenuToggle)
window.customElements.define('moj-collapsible-nav', CollapsibleNav)
