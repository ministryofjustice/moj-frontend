const gulp = require('gulp')

const { compileScripts } = require('./tasks/scripts')
const { compileStyles } = require('./tasks/styles')

gulp.task('docs:clean', async () => {
  const { deleteSync } = await import('del')

  return deleteSync(['public/**/*'])
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
      'node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js?(.map)',
      'node_modules/jquery/dist/jquery.min.js'
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
  compileStyles('application.scss', {
    srcPath: 'docs/stylesheets',
    destPath: 'public/stylesheets'
  })
)

// Bundle the docs site javascript
gulp.task(
  'docs:javascripts',
  compileScripts('application.mjs', {
    srcPath: 'docs/javascripts',
    destPath: 'public/javascripts',
    output: { compact: true }
  })
)

gulp.task('docs:revision', async () => {
  const { default: rev } = await import('gulp-rev')

  return gulp
    .src(
      [
        'public/assets/**/*.+(png|jpg|jpeg)',
        'public/javascripts/**/*.js',
        'public/stylesheets/**/*.css'
      ],
      {
        base: 'public',
        encoding: false,
        sourcemaps: true
      }
    )
    .pipe(rev())
    .pipe(
      // Write rev'd assets to build dir
      gulp.dest('public/', {
        sourcemaps: '.'
      })
    )
    .pipe(rev.manifest())
    .pipe(gulp.dest('public'))
})
