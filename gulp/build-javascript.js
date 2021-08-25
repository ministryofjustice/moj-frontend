const gulp = require('gulp');
var concat = require('gulp-concat');
var umd = require('gulp-umd');

gulp.task('build:javascript', () => {
  return gulp.src([
      'src/dxw/namespace.js',
      'src/dxw/helpers.js',
      'src/dxw/all.js',
      'src/dxw/components/**/*.js'
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
    .pipe(gulp.dest('package/moj/'));
});
