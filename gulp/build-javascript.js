const gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build:javascript', () => {
  return gulp.src([
      'src/helpers.js',
      'src/namespace.js',
      'src/components/**/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('package/'));
});
