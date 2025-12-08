import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { load } from 'js-yaml'

import { componentNameToMacroName } from './names.js'

const nunjucks = require('nunjucks')

// Nunjucks default environment
const env = nunjucksEnv()

/**
 * Nunjucks environment factory
 *
 * @param {string[]} [searchPaths] - Nunjucks search paths (optional)
 * @param {import('nunjucks').ConfigureOptions} [nunjucksOptions] - Nunjucks options (optional)
 * @returns {import('nunjucks').Environment} Nunjucks environment
 */
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

/**
 * @param {string} componentName - the name of the component to load
 */
async function getYaml(componentName) {
  return load(
    await readFile(
      path.join(__dirname, '../components', componentName, 'fixtures.yaml'),
      'utf8'
    ),
    { json: true }
  )
}

/**
 * @param {string} componentName - the name of the component to load
 */
async function getFixtures(componentName) {
  const json = await getYaml(componentName)

  if (!json?.examples) {
    throw new Error(`${componentName} fixtures.yaml is missing "examples"`)
  }

  return {
    fixtures: json.examples
  }
}

/**
 * @param {string} componentName - the name of the component to load
 * @returns {Promise<{ [name: string]: MacroRenderOptions }>} Component examples as an object
 */
async function getExamples(componentName) {
  const { fixtures } = await getFixtures(componentName)

  /** @type {{ [name: string]: MacroRenderOptions }} */
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
 * @param {MacroRenderOptions} [options] - Nunjucks macro render options
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
 * @param {string} macroName - The name of the macro
 * @param {string} macroPath - The path to the file containing the macro
 * @param {MacroRenderOptions} [options] - Nunjucks macro render options
 * @returns {string} HTML rendered by the macro
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
 * @param {MacroRenderOptions | TemplateRenderOptions} [options] - Nunjucks render options
 * @returns {string} HTML rendered from the Nunjucks string
 */
function renderString(string, options) {
  const nunjucksEnv = options?.env ?? env
  return nunjucksEnv.renderString(string, options?.context ?? {})
}

export { render, getExamples }

/**
 * Component examples with Nunjucks macro options (or params)
 *
 * @typedef {object} ComponentExample
 * @property {string} name - Example name
 * @property {string} [description] - Example description
 * @property {boolean} [hidden] - Example hidden from review app
 * @property {boolean} [screenshot] - Screenshot and include in visual regression tests
 * @property {PageTemplateOptions} [pageTemplateOptions] - Page template options for render
 * @property {MacroOptions} options - Nunjucks macro options (or params)
 */

/**
 * Nunjucks macro options
 *
 * @typedef {{ [param: string]: unknown }} MacroOptions
 */

/**
 * Nunjucks macro render options
 *
 * @typedef {object} MacroRenderOptions
 * @property {MacroOptions | unknown} [context] - Nunjucks mixed context (optional)
 * @property {string} [callBlock] - Nunjucks macro `caller()` content (optional)
 * @property {import('nunjucks').Environment} [env] - Nunjucks environment (optional)
 * @property {ComponentExample} [fixture] - Component fixture (optional)
 */

/**
 * Nunjucks template render options
 *
 * @typedef {object} TemplateRenderOptions
 * @property {object} [context] - Nunjucks context object (optional)
 * @property {{ [blockName: string]: string }} [blocks] - Nunjucks blocks (optional)
 * @property {object} [set] - Nunjucks variables to set in template (optional)
 * @property {import('nunjucks').Environment} [env] - Nunjucks environment (optional)
 */
