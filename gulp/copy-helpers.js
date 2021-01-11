const gulp = require('gulp');

gulp.task('copy-helpers', () => {
  return gulp.src([
      'src/moj/helpers.js',
      'src/moj/all.js'
    ])
    .pipe(gulp.dest('public/javascripts/'));
});
