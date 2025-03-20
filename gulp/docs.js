const gulp = require('gulp')

const { compileScripts } = require('./tasks/scripts')
const { compileStyles } = require('./tasks/styles')

gulp.task('docs:clean', async () => {
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
gulp.task(
  'docs:styles',
  gulp.parallel(
    compileStyles('application.scss', {
      srcPath: 'docs/assets/stylesheets',
      destPath: 'public/assets/stylesheets'
    }),
    compileStyles('govuk-frontend.scss', {
      srcPath: 'docs/assets/stylesheets',
      destPath: 'public/assets/stylesheets'
    }),
    compileStyles('moj-frontend.scss', {
      srcPath: 'docs/assets/stylesheets',
      destPath: 'public/assets/stylesheets'
    })
  )
)

// Bundle the docs site javascript
gulp.task(
  'docs:scripts',
  compileScripts('application.mjs', {
    srcPath: 'docs/assets/javascript',
    destPath: 'public/assets/javascript',
    output: { compact: true }
  })
)

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
    .pipe(gulp.dest('public/assets/'))
})
