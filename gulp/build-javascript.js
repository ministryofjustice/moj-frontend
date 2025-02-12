const { join } = require('path')

const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const { glob } = require('glob')
const gulp = require('gulp')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const { rollup } = require('rollup')

gulp.task('build:javascript', async () => {
  const modulePaths = await glob('moj/components/**/*.{cjs,js,mjs}', {
    cwd: 'src',
    ignore: ['**/*.spec.{cjs,js,mjs}'],
    nodir: true
  })

  // Create Rollup bundle(s)
  for (const modulePath of [
    ...modulePaths,

    // Build entry scripts last to restore modules
    // removed from components due to tree-shaking
    'moj/version.js',
    'moj/helpers.js',
    'moj/all.js'
  ]) {
    const options = /** @satisfies {RollupOptions} */ ({
      input: join('src', modulePath),
      output: [
        {
          extend: true,
          file: join('package', modulePath),
          format: 'umd',
          name: 'MOJFrontend'
        }
      ],
      plugins: [nodeResolve(), commonjs()]
    })

    // Create bundle
    const bundle = await rollup(options)

    // Write to output format(s)
    for (const output of options.output) {
      await bundle.write(output)
    }
  }
})

gulp.task('build:javascript-minified', () => {
  return gulp
    .src('package/moj/all.js')
    .pipe(uglify())
    .pipe(rename('moj-frontend.min.js'))
    .pipe(gulp.dest('package/moj'))
})

gulp.task('build:javascript-minified-with-jquery', () => {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.js',
      'gulp/jquery/scope.js',
      'package/moj/all.js'
    ])
    .pipe(concat('all.jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('package/moj/'))
})

/**
 * @import { RollupOptions } from 'rollup'
 */
