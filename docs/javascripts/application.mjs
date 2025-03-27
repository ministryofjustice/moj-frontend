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
  SkipLink
} from 'govuk-frontend'

import { initAccordions } from './accordions.mjs'
import { CollapsibleNav } from './collapsible-nav.mjs'
import { Cookies } from './cookies.mjs'
import { Copy } from './copy.mjs'
import { IFrameResizer } from './iframe-resizer.mjs'
import { MenuToggle } from './menu-toggle.mjs'
import { Tabs } from './tabs.mjs'

// GOV.UK Frontend components
createAll(Button)
createAll(CharacterCount)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(NotificationBanner)
createAll(Radios)
createAll(SkipLink)

const $accordions = document.querySelectorAll('[data-module="govuk-accordion"]')
initAccordions($accordions)

// MoJ Frontend components
MOJFrontend.initAll()

// Website components
createAll(Tabs)
createAll(Copy)
createAll(Cookies)
createAll(IFrameResizer)

window.customElements.define('moj-menu-toggle', MenuToggle)
window.customElements.define('moj-collapsible-nav', CollapsibleNav)
