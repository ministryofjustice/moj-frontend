const { join, parse } = require('path')

const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')
const { rollup } = require('rollup')
const externalGlobals = require('rollup-plugin-external-globals')

/**
 * Compile Sass to CSS task
 *
 * @param {string} assetPath
 * @param {CompileScriptsOptions} entry
 */
function compileScripts(assetPath, { srcPath, destPath, output = {} }) {
  const { name } = parse(assetPath)

  const taskFn = async () => {
    const bundle = await rollup({
      external: ['jquery'],
      input: join(srcPath, assetPath),
      plugins: [
        externalGlobals({
          jquery: '$'
        }),
        nodeResolve(),
        commonjs()
      ]
    })

    // Write to output formats
    for (const options of [output].flat()) {
      const file = join(destPath, options.file ?? `${name}.js`)

      // Add minifier plugin (optional)
      if (options.compact) {
        options.plugins ??= []
        options.plugins.push(
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
        ...options,

        // Output directory or file
        dir: options.preserveModules ? destPath : undefined,
        file: !options.preserveModules ? file : undefined,
        sourcemap: true
      })
    }
  }

  taskFn.displayName = 'compile:scripts'
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
 * @property {OutputOptions | OutputOptions[]} [output] - Output formats
 */

/**
 * @import { OutputOptions } from 'rollup'
 */
