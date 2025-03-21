const { join, parse } = require('path')

const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')
const PluginError = require('plugin-error')
const { rollup } = require('rollup')

/**
 * Compile Sass to CSS task
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
      input: join(srcPath, assetPath),
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
          sourceMap: { includeSources: true },

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
        ? join(destPath, output.file ?? `${name}.js`)
        : undefined,

      // Enable source maps
      sourcemap: true
    })
  }

  taskFn.displayName = 'compile:javascripts'
  return taskFn
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
