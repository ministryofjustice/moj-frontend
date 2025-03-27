/* eslint-disable @typescript-eslint/no-empty-function */

const { join, parse } = require('path')

const pkg = require('@ministryofjustice/frontend/package.json')
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')
const terser = require('@rollup/plugin-terser')
const PluginError = require('plugin-error')
const { rollup } = require('rollup')

/**
 * Compile JavaScript task
 *
 * @param {string} assetPath
 * @param {CompileScriptsOptions} entry
 */
function compileScripts(
  assetPath,
  {
    srcPath,
    destPath,
    input = {}, // Rollup input options
    output = {} // Rollup output options
  }
) {
  const { name } = parse(assetPath)

  const taskFn = async () => {
    const bundle = await rollup({
      ...input,

      /**
       * Input path
       */
      input: join(srcPath, assetPath),

      /**
       * Input plugins
       */
      plugins: [
        nodeResolve({
          browser: true,
          jail: output.preserveModules
            ? srcPath // Prevent `node_modules` bundling
            : undefined // Allow `node_modules` bundling
        }),
        commonjs({
          requireReturnsDefault: 'preferred',
          defaultIsModuleExports: true
        }),
        replace({
          include: '**/common/moj-frontend-version.mjs',
          preventAssignment: true,

          // Add MoJ Frontend release version
          development: pkg.version
        }),
        babel({
          babelHelpers: 'bundled'
        })
      ],

      // Handle warnings as errors
      onwarn(warning) {
        throw new PluginError('compile:javascripts', warning.message, {
          name: warning.code ?? 'Error',
          showProperties: false
        })
      }
    })

    // Add minifier plugin (optional)
    if (output.compact) {
      output.plugins ??= []
      output.plugins.push(
        terser({
          format: { comments: false },

          mangle: {
            keep_classnames: true,
            keep_fnames: true,
            // Ensure all top-level exports skip mangling, for example
            // non-function string constants like `export { version }`
            reserved: await getMOJFrontendExportsNames()
          },

          // Include sources content from source maps to inspect
          // MoJ Frontend and other dependencies' source code
          sourceMap: {
            includeSources: true
          },

          // Compatibility workarounds
          safari10: true
        })
      )
    }

    // Write to output format
    await bundle.write({
      extend: true,
      format: 'esm',
      ...output,

      // Write to directory for modules
      dir: output.preserveModules ? destPath : undefined,

      // Write to file when bundling
      file: !output.preserveModules
        ? join(destPath, output.file ?? `${name}.bundle.js`)
        : undefined,

      // Enable source maps
      sourcemap: true
    })
  }

  taskFn.displayName = 'compile:javascripts'
  return taskFn
}

// GOV.UK Frontend uses browser APIs at `import` time
// because of static properties. These APIs are not available
// in Node.js.
// We mock them the time of the `import` so we can read
// the name of GOV.UK Frontend's exports without errors
async function getMOJFrontendExportsNames() {
  try {
    global.HTMLElement = function () {}
    global.HTMLAnchorElement = function () {}
    return Object.keys(await import('../../src/moj/all.mjs'))
  } finally {
    delete global.HTMLElement
    delete global.HTMLAnchorElement
  }
}

module.exports = {
  compileScripts
}

/**
 * Compile scripts options
 *
 * @typedef {object} CompileScriptsOptions
 * @property {string} srcPath - Source directory
 * @property {string} destPath - Destination directory
 * @property {InputOptions} [input] - Rollup input options
 * @property {OutputOptions} [output] - Rollup output options
 */

/**
 * @import { InputOptions, OutputOptions } from 'rollup'
 */
