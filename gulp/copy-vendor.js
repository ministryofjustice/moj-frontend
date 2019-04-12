const gulp = require('gulp');

gulp.task('copy-vendor-javascript', () => {
  return gulp.src([
      'src/vendor/*.js'
    ])
    .pipe(gulp.dest('public/javascripts/vendor'));
});