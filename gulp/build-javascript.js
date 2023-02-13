const gulp = require('gulp');
var concat = require('gulp-concat');
var umd = require('gulp-umd');

gulp.task('build:javascript', () => {
  return gulp.src([
      'src/moj/namespace.js',
      'src/moj/helpers.js',
      'src/moj/main.js',
      'src/moj/components/**/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(umd({
      exports: function() {
        return 'MOJFrontend';
      },
      namespace: function() {
        return 'MOJFrontend';
      }
    }))
    .pipe(gulp.dest('src/moj/'));
});
