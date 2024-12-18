var concat = require('gulp-concat');
const gulp = require('gulp');
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
var umd = require('gulp-umd');

gulp.task('build:javascript', () => {
  return gulp.src([
      'src/moj/namespace.js',
      'src/moj/helpers.js',
      'src/moj/all.js',
      'src/moj/version.js',
      'src/moj/components/**/!(*.spec).js'
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

gulp.task('build:javascript-minified', () => {
  return gulp
    .src("package/moj/all.js")
    .pipe(uglify())
    .pipe(rename("moj-frontend.min.js"))
    .pipe(gulp.dest("package/moj"));
})

gulp.task('build:javascript-minified-with-jquery', () => {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'gulp/jquery/scope.js',
      'package/moj/all.js',
    ])
    .pipe(concat('all.jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('package/moj/'));
});
