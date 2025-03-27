/* eslint-disable no-new */

import * as MOJFrontend from '@ministryofjustice/frontend'
import {
  createAll,
  Button,
  CharacterCount,
  Checkboxes,
  ErrorSummary,
  NotificationBanner,
  Radios,
  SkipLink,
  Tabs
} from 'govuk-frontend'

import { initAccordions } from './accordions.mjs'
import CollapsibleNav from './collapsible-nav.mjs'
import Cookies from './cookies.mjs'
import Copy from './copy.mjs'
import IFrameResizer from './iframe-resizer.mjs'
import MenuToggle from './menu-toggle.mjs'
import { Tabs as MojTabs } from './tabs.mjs'

// GOV.UK Frontend components
createAll(Button)
createAll(CharacterCount)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(NotificationBanner)
createAll(Radios)
createAll(SkipLink)
createAll(Tabs)

const $accordions = document.querySelectorAll('[data-module="govuk-accordion"]')
initAccordions($accordions)

// MoJ Frontend components
MOJFrontend.initAll()

const $tabs = document.querySelectorAll('[data-module="app-tabs"]')

$tabs.forEach(($tabs) => {
  new MojTabs($tabs)
})

const $codeBlocks = document.querySelectorAll('[data-module="app-copy"]')

$codeBlocks.forEach(($codeBlock) => {
  new Copy($codeBlock)
})

const $cookieBanners = document.querySelectorAll('[data-module="app-cookies"]')

$cookieBanners.forEach(($cookieBanner) => {
  new Cookies($cookieBanner)
})

const $iframes = document.querySelectorAll('iframe')

$iframes.forEach(($iframe) => {
  new IFrameResizer($iframe)
})

window.customElements.define('moj-menu-toggle', MenuToggle)
window.customElements.define('moj-collapsible-nav', CollapsibleNav)
