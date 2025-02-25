const { mkdir, writeFile } = require('fs/promises')
const { dirname, join, parse, relative } = require('path')
const { fileURLToPath } = require('url')

const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('postcss')
const { compileAsync } = require('sass-embedded')

/**
 * Compile Sass task
 *
 * @param {string} assetPath
 * @param {CompileStylesOptions} entry
 */
function compileStyles(assetPath, { srcPath, destPath, output = {} }) {
  const { name } = parse(assetPath)

  // PostCSS options
  const from = join(srcPath, assetPath)
  const to = join(destPath, output.file ?? `${name}.css`)

  const taskFn = async () => {
    const { css, sourceMap } = await compileAsync(from, {
      loadPaths: ['.', 'node_modules'],
      quietDeps: true,
      sourceMap: true,
      sourceMapIncludeSources: true
    })

    // Make source file:// paths relative
    if (sourceMap?.sources) {
      sourceMap.sources = sourceMap.sources.map((path) =>
        path.startsWith('file:') ? relative(from, fileURLToPath(path)) : path
      )
    }

    // Apply PostCSS transforms (e.g. vendor prefixes)
    const processor = postcss([
      autoprefixer({ env: 'stylesheets' }),
      cssnano({ env: 'stylesheets' })
    ])

    const result = await processor.process(css, {
      from,
      to,

      // Include Sass sources
      map: {
        annotation: true,
        inline: false,
        prev: sourceMap
      }
    })

    await mkdir(dirname(to), { recursive: true })
    await writeFile(to, result.css)

    if (result.map) {
      await writeFile(`${to}.map`, result.map.toString())
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
 * @property {{ file: string }} [output] - Output options
 */
