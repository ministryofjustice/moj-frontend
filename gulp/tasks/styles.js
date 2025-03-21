const { readFile } = require('fs/promises')
const { mkdir, writeFile } = require('fs/promises')
const { dirname, join, parse, relative } = require('path')
const { fileURLToPath } = require('url')

const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
const scss = require('postcss-scss')
const { compileAsync } = require('sass-embedded')

/**
 * Compile Sass task
 *
 * @param {string} assetPath
 * @param {CompileStylesOptions} entry
 */
function compileStyles(assetPath, { srcPath, destPath, output = {} }) {
  const { name } = parse(assetPath)

  /**
   * Configure PostCSS
   *
   * @satisfies {ProcessOptions}
   */
  const options = {
    from: join(srcPath, assetPath),
    to: join(destPath, output.file ?? `${name}.css`),

    /**
     * Always generate source maps for either:
     *
     * 1. PostCSS on Sass compiler result
     * 2. PostCSS on Sass sources (Autoprefixer only)
     */
    map: {
      annotation: true,
      inline: false,
      prev: false
    },

    // Sass syntax support
    syntax: output.file?.endsWith('.scss') ? scss : postcss
  }

  const taskFn = async () => {
    let css
    let map

    // Compile Sass to CSS
    if (options.to.endsWith('.css')) {
      ;({ css, sourceMap: map } = await compileAsync(options.from, {
        loadPaths: ['.', 'node_modules'],
        quietDeps: true,
        sourceMap: true,
        sourceMapIncludeSources: true
      }))

      // Make source file:// paths relative
      if (map?.sources) {
        map.sources = map.sources.map((path) =>
          path.startsWith('file:')
            ? relative(options.from, fileURLToPath(path))
            : path
        )
      }

      // Pass source maps to PostCSS
      options.map.prev = map
    }

    // Use Sass source when not compiling
    if (!css) {
      css = await readFile(options.from)
    }

    // Locate PostCSS config
    const config = await postcssrc(options)

    // Apply PostCSS transforms (e.g. vendor prefixes)
    const result = await postcss(config.plugins).process(css, {
      ...options,
      ...config.options
    })

    // Write to files
    await mkdir(dirname(options.to), { recursive: true })
    await writeFile(options.to, result.css)

    if (result.map) {
      await writeFile(`${options.to}.map`, result.map.toString())
    }
  }

  taskFn.displayName = 'compile:styles'
  return taskFn
}

module.exports = {
  compileStyles
}

/**
 * Compile Sass options
 *
 * @typedef {object} CompileStylesOptions
 * @property {string} srcPath - Source directory
 * @property {string} destPath - Destination directory
 * @property {{ file?: string }} [output] - Output options
 */

/**
 * @import { ProcessOptions } from 'postcss'
 */
