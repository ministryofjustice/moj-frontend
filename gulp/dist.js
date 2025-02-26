const gulp = require('gulp')

const { compileScripts } = require('./tasks/scripts')
const { compileStyles } = require('./tasks/styles')

gulp.task('dist:clean', async () => {
  const { deleteSync } = await import('del')

  return deleteSync(['dist/**/*'])
})

gulp.task('dist:assets', () => {
  return gulp
    .src('package/moj/assets/**/*', { encoding: false })
    .pipe(gulp.dest('dist/assets/'))
})

gulp.task(
  'dist:javascript',
  compileScripts('all.mjs', {
    srcPath: 'src/moj',
    destPath: 'dist',

    // Customise output
    output: {
      compact: true,
      file: 'moj-frontend.min.js',
      format: 'umd',
      name: 'MOJFrontend'
    }
  })
)

gulp.task(
  'dist:css',
  compileStyles('all.scss', {
    srcPath: 'src/moj',
    destPath: 'dist',

    // Customise output
    output: { file: 'moj-frontend.min.css' }
  })
)

gulp.task('dist:zip', async () => {
  const { default: zip } = await import('gulp-zip')

  return gulp
    .src('dist/**', { encoding: false })
    .pipe(zip('release.zip'))
    .pipe(gulp.dest('dist'))
})
