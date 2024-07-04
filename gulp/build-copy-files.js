const gulp = require('gulp');

gulp.task('build:copy-files', () => {
  return gulp.src([
      'src/**/*',
      '!src/moj/all.js', // this will get built
      'README.md',
      '!**/.DS_Store',
      '!src/README.md'
    ])
    .pipe(gulp.dest('package/'));
});
