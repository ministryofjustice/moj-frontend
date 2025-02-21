const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')
const gulp = require('gulp')
const gulpSass = require('gulp-sass')
const { rollup } = require('rollup')
const externalGlobals = require('rollup-plugin-external-globals')
const dartSass = require('sass-embedded')

const sass = gulpSass(dartSass)

gulp.task('docs:clean', async (done) => {
  const { deleteSync } = await import('del')

  return deleteSync(['public/**/*'])
})

// Copy all the govuk-frontend assets across
gulp.task('docs:copy-dependencies', () => {
  return gulp
    .src(
      [
        'node_modules/govuk-frontend/dist/govuk/assets/**/*',
        'src/moj/assets/**/*'
      ],
      { encoding: false }
    )
    .pipe(gulp.dest('public/assets'))
})

// Copy package vendor files across
gulp.task('docs:copy-vendor', () => {
  return gulp
    .src(['src/moj/vendor/**/*.js'])
    .pipe(gulp.dest('public/assets/javascript'))
})

gulp.task('docs:copy-images', () => {
  return gulp
    .src(['docs/assets/images/**/*'], { encoding: false })
    .pipe(gulp.dest('public/assets/images'))
})

// Ordering is important here! - Docs > Package > GovUK frontend
gulp.task(
  'docs:copy-files',
  gulp.series('docs:copy-dependencies', 'docs:copy-vendor', 'docs:copy-images')
)

// Compile the docs site stylesheet
gulp.task('docs:styles', (done) => {
  return gulp
    .src('docs/assets/stylesheets/*.scss')
    .pipe(
      sass({
        loadPaths: ['./'],
        quietDeps: true,
        silenceDeprecations: ['import'],
        style: process.env.ENV === 'dev' ? 'expanded' : 'compressed'
      }).on('error', done)
    )
    .pipe(gulp.dest('public/assets/stylesheets/'))
})

// Bundle the docs site javascript
gulp.task('docs:scripts', async () => {
  const options = /** @satisfies {RollupOptions} */ ({
    input: 'docs/assets/javascript/application.mjs',
    output: {
      file: 'public/assets/javascript/application.js',
      format: 'esm'
    },
    external: ['jquery'],
    plugins: [
      externalGlobals({
        jquery: 'window.jQuery'
      }),
      nodeResolve(),
      commonjs()
    ]
  })

  // Create bundle
  const bundle = await rollup(options)

  // Add minifier plugin (optional)
  if (process.env.ENV !== 'dev') {
    options.output.plugins = [
      terser({
        format: { comments: false },
        safari10: true
      })
    ]
  }

  // Write to output format
  await bundle.write(options.output)
})

gulp.task('docs:revision', async () => {
  const { default: rev } = await import('gulp-rev')

  return gulp
    .src(
      [
        'public/assets/**/*.css',
        'public/assets/**/*.js',
        'public/assets/**/*.+(png|jpg|jpeg)'
      ],
      {
        base: 'public',
        encoding: false
      }
    )
    .pipe(rev())
    .pipe(gulp.dest('public/')) // Write rev'd assets to build dir
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/assets/'))
})

/**
 * @import { RollupOptions } from 'rollup'
 */
