const gulp = require('gulp');
const uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var umd = require('gulp-umd');

gulp.task('build:javascript', () => {
  return gulp.src([
      'src/moj/namespace.js',
      'src/moj/helpers.js',
      'src/moj/all.js',
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
    .pipe(gulp.dest('package/moj/'));
});

gulp.task('build:javascript-with-jquery', () => {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'gulp/jquery/scope.js',
      'src/moj/namespace.js',
      'src/moj/helpers.js',
      'src/moj/all.js',
      'src/moj/components/**/*.js',
    ])
    .pipe(concat('all.jquery.min.js'))
    .pipe(umd({
      exports: function() {
        return 'MOJFrontend';
      },
      namespace: function() {
        return 'MOJFrontend';
      }
    }))
    .pipe(
      uglify({
        ie8: true,
      })
    )
    .pipe(gulp.dest('package/moj/'));
});
