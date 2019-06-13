const gulp = require('gulp');

gulp.task('copy-helpers', () => {
  return gulp.src([
      'src/helpers.js'
    ])
    .pipe(gulp.dest('public/javascripts/'));
});