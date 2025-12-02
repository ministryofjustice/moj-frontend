import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { test, expect } from '@playwright/test'
import jsYaml from 'js-yaml'

const nunjucks = require('nunjucks')

const componentName = 'pagination'

// Nunjucks default environment
const env = nunjucksEnv()

function nunjucksEnv(searchPaths = [], nunjucksOptions = {}) {
  // Add to Nunjucks search paths (without 'govuk' suffix)
  searchPaths.push('src')
  searchPaths.push('node_modules/govuk-frontend/dist/')

  // Nunjucks environment
  return nunjucks.configure(searchPaths, {
    trimBlocks: true, // automatically remove trailing newlines from a block/tag
    lstripBlocks: true, // automatically remove leading whitespace from a block/tag,
    ...nunjucksOptions
  })
}
async function getYaml() {
  return jsYaml.load(
    await readFile(path.join(__dirname, '../', '../', 'fixtures.yaml'), 'utf8'),
    { json: true }
  )
}

async function getFixtures() {
  const json = await getYaml()

  if (!json?.examples) {
    throw new Error(`${componentName} fixtures.yaml is missing "examples"`)
  }

  return {
    fixtures: json.examples
  }
}

async function getExamples() {
  const { fixtures } = await getFixtures()
  const examples = {}

  for (const fixture of fixtures) {
    examples[fixture.name] = {
      context: fixture.options,
      fixture
    }
  }

  return examples
}

/**
 * Render component HTML
 *
 * @param {string} componentName - Component name
 * @param {object} [options] - Nunjucks macro render options
 * @returns {string} HTML rendered by the component
 */
function render(componentName, options) {
  const macroName = componentNameToMacroName(componentName)
  const macroPath = `moj/components/${componentName}/macro.njk`

  return renderMacro(macroName, macroPath, options)
}

/**
 * Render macro HTML
 *
 */
function renderMacro(macroName, macroPath, options) {
  const paramsFormatted = JSON.stringify(options?.context ?? {}, undefined, 2)

  let macroString = `{%- from "${macroPath}" import ${macroName} -%}`

  // If we're nesting child components or text, pass the children to the macro
  // using the 'caller' Nunjucks feature
  macroString += options?.callBlock
    ? `{%- call ${macroName}(${paramsFormatted}) -%}${options.callBlock}{%- endcall -%}`
    : `{{- ${macroName}(${paramsFormatted}) -}}`

  return renderString(macroString, options)
}

/**
 * Render string
 *
 * @param {string} string - Nunjucks string to render
 * @param {object} [options] - Nunjucks render options
 * @returns {string} HTML rendered from the Nunjucks string
 */
function renderString(string, options) {
  const nunjucksEnv = options?.env ?? env
  return nunjucksEnv.renderString(string, options?.context ?? {})
}
/**
 * Convert a kebab-cased string to a PascalCased one
 *
 * @param {string} value - Input kebab-cased string
 * @returns {string} Output PascalCased string
 */
function kebabCaseToPascalCase(value) {
  return (
    value
      .toLowerCase()
      .split('-')
      // capitalize each 'word'
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  )
}

/**
 * Convert a kebab-cased string to a camelCased one
 *
 * @param {string} value - Input kebab-cased string
 * @returns {string} Output camelCased string
 */
function kebabCaseToCamelCase(value) {
  return kebabCaseToPascalCase(value).replace(/^./, (str) => str.toLowerCase())
}

/**
 * Convert component name to macro name
 *
 * Component names are kebab-cased (button, date-input), whilst macro names have
 * a `govuk` prefix and are camel cased (govukButton, govukDateInput).
 *
 * @param {string} componentName - A kebab-cased component name
 * @returns {string} The name of its corresponding Nunjucks macro
 */
function componentNameToMacroName(componentName) {
  return kebabCaseToCamelCase(`moj-${componentName}`)
}
test.describe('pagination', () => {
  let examples

  test.beforeAll(async () => {
    examples = await getExamples()
  })

  test.describe('by default', () => {
    let $component
    let $pagination

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples.default)
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('is on the page', async () => {
      await expect($component).toBeVisible()
      await expect($pagination).toBeVisible()
    })
  })

  test.describe('default no items', () => {
    let $component
    let $pagination

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['default no items'])
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('does not display prev/next only pagination', async () => {
      await expect($component).toBeAttached()
      await expect($pagination).not.toBeVisible()
    })
  })

  test.describe('with results window', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['with results window'])
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).toContainText('Showing results 11 to 20')
      await expect($results).not.toContainText(' out of ')
    })
  })

  test.describe('with results window and count', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render(
        'pagination',
        examples['with results window and count']
      )
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).toContainText('Showing 11 to 20 out of 28 results')
    })
  })

  test.describe('with results count only', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['with results count only'])
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).not.toContainText('Showing 11 to 20 ')
      await expect($results).toContainText('28 total results')
    })
  })

  test.describe('with no items and results count', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render(
        'pagination',
        examples['with no items and results count']
      )
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).not.toContainText('Showing 11 to 20 ')
      await expect($results).not.toContainText('total')
      await expect($results).toContainText('8 results')
    })
  })

  test.describe('with pages count', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['with pages count'])
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).toContainText('Page 2 of 3')
    })
  })
})
