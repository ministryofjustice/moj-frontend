const gulp = require('gulp');

gulp.task('copy-helpers', () => {
  return gulp.src([
      'src/moj/helpers.js'
    ])
    .pipe(gulp.dest('public/javascripts/'));
});