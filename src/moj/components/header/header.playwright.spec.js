const path = require('path')

const { test, expect } = require('@playwright/test')
const { compile } = require('sass-embedded')

const { bundleComponent } = require('../../lib/bundle.js')
const { render, getExamples } = require('../../lib/components.js')

let examples
let bundledComponent
let componentStyles

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} exampleName
 * @param {string} [styles] - Additional styles applied before initialisation
 */
async function setupPage(page, exampleName, styles = '') {
  await page.setContent(render('header', examples[exampleName], true))
  await page.addStyleTag({ content: componentStyles })
  if (styles) {
    await page.addStyleTag({ content: styles })
  }
  await page.addScriptTag({ content: bundledComponent, type: 'module' })
  // @ts-expect-error MOJHeader is in page scope, not test scope
  await page.waitForFunction(() => typeof MOJHeader !== 'undefined')
}

/**
 * Initialises the header and returns its synchronous wrapped state.
 *
 * @param {import('@playwright/test').Page} page
 */
async function initialiseHeader(page) {
  return page.evaluate(async () => {
    const $header = document.querySelector('[data-module="moj-header"]')
    // @ts-expect-error MOJHeader is in page scope, not test scope
    new MOJHeader($header) // eslint-disable-line no-new, no-undef
    const isWrapped = $header.hasAttribute('data-wrapped')

    // Finish initial observer notifications before testing subsequent resizes.
    await new Promise((resolve) => {
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => resolve(null))
      )
    })
    return isWrapped
  })
}

test.describe('header', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test.beforeAll(async () => {
    examples = await getExamples('header')
    bundledComponent = await bundleComponent(
      path.join(__dirname, 'header.mjs'),
      'MOJHeader'
    )
    componentStyles = compile(path.join(__dirname, '_header.scss'), {
      loadPaths: [path.join(__dirname, '../../../../node_modules')],
      quietDeps: true
    }).css
  })

  for (const content of ['account', 'navigation']) {
    test(`${content} updates its wrapped state as the viewport narrows and widens`, async ({
      page
    }) => {
      await setupPage(page, `responsive ${content}`)
      expect(await initialiseHeader(page)).toBe(false)
      const $header = page.locator('.moj-header')

      await expect($header).not.toHaveAttribute('data-wrapped')
      await page.setViewportSize({ width: 375, height: 900 })
      await expect($header).toHaveAttribute('data-wrapped', '')
      await page.setViewportSize({ width: 1440, height: 900 })
      await expect($header).not.toHaveAttribute('data-wrapped')
    })
  }

  test('sets the wrapped state synchronously when initialised at a narrow viewport', async ({
    page
  }) => {
    await page.setViewportSize({ width: 375, height: 900 })
    await setupPage(page, 'responsive account')

    expect(await initialiseHeader(page)).toBe(true)
    await expect(page.locator('.moj-header')).toHaveAttribute(
      'data-wrapped',
      ''
    )
  })

  test('responds to header resizing without a viewport change', async ({
    page
  }) => {
    await setupPage(page, 'responsive account')
    await initialiseHeader(page)
    const $header = page.locator('.moj-header')

    await expect($header).not.toHaveAttribute('data-wrapped')
    await $header.evaluate(($element) => {
      $element.style.width = '550px'
    })
    await expect($header).toHaveAttribute('data-wrapped', '')
    await $header.evaluate(($element) => {
      $element.style.removeProperty('width')
    })
    await expect($header).not.toHaveAttribute('data-wrapped')
  })

  test('initialises without any wrap items and leaves the wrapped state unset', async ({
    page
  }) => {
    await setupPage(page, 'default')

    expect(await initialiseHeader(page)).toBe(false)
    await expect(page.locator('.moj-header')).toHaveAttribute(
      'data-moj-header-init'
    )
    await page.setViewportSize({ width: 375, height: 900 })
    await expect(page.locator('.moj-header')).not.toHaveAttribute(
      'data-wrapped'
    )
  })

  test('initialises without a reference item and leaves the wrapped state unset', async ({
    page
  }) => {
    await setupPage(page, 'with account')
    await page
      .locator('.js-moj-header__wrap-reference')
      .evaluate(($element) => {
        $element.remove()
      })

    expect(await initialiseHeader(page)).toBe(false)
    await expect(page.locator('.moj-header')).toHaveAttribute(
      'data-moj-header-init'
    )
    await page.setViewportSize({ width: 375, height: 900 })
    await expect(page.locator('.moj-header')).not.toHaveAttribute(
      'data-wrapped'
    )
  })
})
