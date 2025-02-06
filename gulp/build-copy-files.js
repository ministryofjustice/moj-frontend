const gulp = require('gulp')

gulp.task('build:copy-files', () => {
  return gulp
    .src(
      [
        'src/**/*',
        '!src/moj/all.js', // this will get built
        'README.md',
        '!**/.DS_Store',
        '!src/README.md'
      ],
      {
        allowEmpty: true,
        encoding: false
      }
    )
    .pipe(gulp.dest('package/'))
})
