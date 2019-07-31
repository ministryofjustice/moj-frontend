const gulp = require('gulp');

gulp.task('copy-component-javascript', () => {
  return gulp.src([
      'src/moj/components/**/*.js'
    ])
    .pipe(gulp.dest('public/javascripts/components/'));
});
