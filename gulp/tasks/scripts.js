const { join, parse } = require('path')

const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
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
        nodeResolve({
          browser: true
          // rootDir: destPath,
          // modulePaths: [join(destPath, 'node_modules')]
          // customResolveOptions: {
          //   moduleDirectory: 'node_modules'
          // }
        }),
        commonjs({
          requireReturnsDefault: 'preferred',
          defaultIsModuleExports: true
        }),
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

      // const isModule = !options.format || ['esm', 'es'].includes(options.format)

      // if (isModule) {
      //   options.globals ??= {}
      //   options.globals['govuk-frontend'] = 'GOVUKFrontend'
      // }

      // Write to output format
      await bundle.write({
        extend: true,
        format: 'esm',
        ...options,

        sanitizeFileName(name) {
          if (name.includes('/node_modules/')) {
            return name.split('/node_modules/')[1]
          }

          return name
        },

        // entryFileNames({ name }) {
        //   console.log({ name })

        //   if (name.includes('node_modules')) {
        //     return `${name}.js`
        //   }

        //   return !options.format || ['esm', 'es'].includes(options.format)
        //     ? '[name].mjs' // Default '.mjs' extension
        //     : '[name].js' // Otherwise '.js' extension
        // },

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
