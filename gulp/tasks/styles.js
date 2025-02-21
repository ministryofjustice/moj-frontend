const { join, parse } = require('path')

const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const gulpSass = require('gulp-sass')
const dartSass = require('sass-embedded')

const sass = gulpSass(dartSass)

/**
 * Compile Sass task
 *
 * @param {string} assetPath
 * @param {CompileStylesOptions} entry
 */
function compileStyles(assetPath, { srcPath, destPath, output = {} }) {
  const { name } = parse(assetPath)

  /**
   * @type {TaskFunction}
   */
  const taskFn = (done) =>
    gulp
      .src(join(srcPath, assetPath))
      .pipe(
        sass({
          loadPaths: ['./'],
          quietDeps: true,
          silenceDeprecations: ['import']
        }).on('error', done)
      )
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(rename({ basename: name, ...output }))
      .pipe(gulp.dest(destPath))

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
 * @property {RenameOptions} [output] - Rename output options
 */

/**
 * @import { TaskFunction } from 'gulp'
 * @import { Options as RenameOptions } from 'gulp-rename'
 */
