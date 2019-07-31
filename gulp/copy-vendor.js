const gulp = require('gulp');

gulp.task('copy-vendor-javascript', () => {
  return gulp.src([
      'src/moj/vendor/*.js'
    ])
    .pipe(gulp.dest('public/javascripts/vendor'));
});