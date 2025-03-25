const gulp = require('gulp')

const { compileScripts } = require('./tasks/scripts')
const { compileStyles } = require('./tasks/styles')

gulp.task('docs:clean', async () => {
  const { deleteAsync } = await import('del')

  return deleteAsync(['public/**', '!public'], {
    dot: true
  })
})

// Copy assets across
gulp.task('docs:copy-assets', () => {
  return gulp
    .src(
      [
        'docs/assets/**',
        'node_modules/@ministryofjustice/frontend/moj/assets/**',
        'node_modules/govuk-frontend/dist/govuk/assets/**'
      ],
      { encoding: false }
    )
    .pipe(gulp.dest('public/assets'))
})

// Copy stylesheets across
gulp.task('docs:copy-stylesheets', () => {
  return gulp
    .src([
      'node_modules/@ministryofjustice/frontend/moj/moj-frontend.min.css?(.map)',
      'node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css?(.map)'
    ])
    .pipe(gulp.dest('public/stylesheets'))
})

// Copy javascripts across
gulp.task('docs:copy-javascripts', () => {
  return gulp
    .src([
      'node_modules/@ministryofjustice/frontend/moj/moj-frontend.min.js?(.map)',
      'node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js?(.map)'
    ])
    .pipe(gulp.dest('public/javascripts'))
})

gulp.task(
  'docs:copy',
  gulp.parallel(
    'docs:copy-assets',
    'docs:copy-stylesheets',
    'docs:copy-javascripts'
  )
)

// Compile the docs site stylesheet
gulp.task(
  'docs:stylesheets',
  gulp.parallel(
    compileStyles('application.scss', {
      srcPath: 'docs/stylesheets',
      destPath: 'public/stylesheets'
    }),
    compileStyles('example.scss', {
      srcPath: 'docs/stylesheets',
      destPath: 'public/stylesheets'
    })
  )
)

// Bundle the docs site javascript
gulp.task(
  'docs:javascripts',
  compileScripts('application.mjs', {
    srcPath: 'docs/javascripts',
    destPath: 'public/javascripts',
    output: {
      compact: true,
      format: 'esm'
    }
  })
)

gulp.task('docs:revision', async () => {
  const { default: filter } = await import('gulp-filter')
  const { default: rev } = await import('gulp-rev')

  return (
    gulp
      .src(
        [
          'public/assets/**',
          'public/javascripts/**/*.js',
          'public/stylesheets/**/*.css'
        ],
        {
          base: 'public',
          encoding: false,
          sourcemaps: true,
          debug: true
        }
      )

      // Filter assets for cache busting
      .pipe(
        filter([
          '**',
          '!**/fonts/**',
          '!**/images/{govuk,moj,icon}-*',
          '!**/images/favicon.*',
          '!**/*.json'
        ])
      )

      // Generate file hashes
      .pipe(rev())

      // Write to files with hashes
      .pipe(
        gulp.dest('public', {
          sourcemaps: (file) =>
            !['.css', '.js'].includes(file.extname)
              ? undefined // Skip source maps
              : '.'
        })
      )

      // Write to manifest
      .pipe(rev.manifest())
      .pipe(gulp.dest('public'))
  )
})
