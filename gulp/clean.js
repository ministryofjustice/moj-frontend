const del = require('del');
const gulp = require('gulp');

gulp.task('clean', (done) => {
  return del(['public',
    '.port.tmp'], done);
});