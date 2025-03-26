const gulp = require('gulp')

const { version } = require('../src/moj/version.mjs')

const { compileScripts } = require('./tasks/scripts')
const { compileStyles } = require('./tasks/styles')

gulp.task('dist:clean', async () => {
  const { deleteAsync } = await import('del')

  return deleteAsync(['dist/**', '!dist'], {
    dot: true
  })
})

gulp.task('dist:assets', () => {
  return gulp
    .src('package/moj/assets/**/*', { encoding: false })
    .pipe(gulp.dest('dist/assets/'))
})

gulp.task(
  'dist:javascripts',
  compileScripts('all.mjs', {
    srcPath: 'src/moj',
    destPath: 'dist',

    // Customise output
    output: {
      compact: true,
      file: `moj-frontend-${version}.min.js`,
      format: 'esm'
    }
  })
)

gulp.task(
  'dist:stylesheets',
  compileStyles('all.scss', {
    srcPath: 'src/moj',
    destPath: 'dist',

    // Customise output
    output: { file: `moj-frontend-${version}.min.css` }
  })
)

gulp.task('dist:zip', async () => {
  const { default: zip } = await import('gulp-zip')

  return gulp
    .src('dist/**', { encoding: false })
    .pipe(zip('release.zip'))
    .pipe(gulp.dest('dist'))
})
