const gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build:javascript', () => {
  return gulp.src([
      'src/moj/namespace.js',
      'src/moj/helpers.js',
      'src/moj/components/**/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('package/moj/'));
});
