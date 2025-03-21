const gulp = require('gulp')

gulp.task('build:copy-assets', () => {
  return gulp
    .src('src/moj/assets/**', {
      base: 'src/moj',
      encoding: false
    })
    .pipe(gulp.dest('package/moj'))
})

gulp.task('build:copy-templates', () => {
  return gulp
    .src('src/moj/**/*.{md,njk}', {
      base: 'src/moj',
      encoding: false
    })
    .pipe(gulp.dest('package/moj'))
})

gulp.task('build:copy-others', () => {
  return gulp
    .src(
      [
        'src/moj/filters/**',
        'src/moj/vendor/**',
        'src/moj/init.js',
        'README.md'
      ],
      {
        base: 'src/moj',
        encoding: false
      }
    )
    .pipe(gulp.dest('package/moj'))
})

gulp.task(
  'build:copy-files',
  gulp.parallel(
    'build:copy-assets',
    'build:copy-templates',
    'build:copy-others'
  )
)
