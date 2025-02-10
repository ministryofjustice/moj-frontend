const gulp = require('gulp')

gulp.task('build:copy-files', () => {
  return gulp
    .src(
      [
        'src/moj/assets/**',
        'src/moj/filters/**',
        'src/moj/vendor/**',
        'src/moj/**/*.{md,njk,scss}',
        'src/moj/init.js',
        'README.md',
        '!**/.DS_Store'
      ],
      {
        allowEmpty: true,
        base: 'src/moj',
        encoding: false
      }
    )
    .pipe(gulp.dest('package/moj'))
})
