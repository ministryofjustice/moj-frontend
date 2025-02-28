const { join, parse } = require('path')

const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')
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
        nodeResolve(),
        commonjs(),
        babel({
          babelHelpers: 'bundled'
        })
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
 * @property {OutputOptions | OutputOptions[]} [output] - Rollup output options
 */

/**
 * @import { InputOptions, OutputOptions } from 'rollup'
 */
