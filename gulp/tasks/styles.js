const { mkdir, writeFile } = require('fs/promises')
const { dirname, join, parse } = require('path')

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
    const { css } = await compileAsync(from, {
      loadPaths: ['node_modules'],
      quietDeps: true,
      silenceDeprecations: [
        'color-functions',
        'global-builtin',
        'import',
        'mixed-decls',
        'slash-div'
      ]
    })

    const processor = postcss([autoprefixer(), cssnano()])
    const result = await processor.process(css, { from, to })

    await mkdir(dirname(to), { recursive: true })
    await writeFile(to, result.css)
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
