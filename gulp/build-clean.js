const del = require('del');
const gulp = require('gulp');

gulp.task('build:clean', (done) => {
  return del([
    'package/*',
    '!package',
    '!package/package.json',
    '!package/govuk-prototype-kit.config.json',
    '!package/README.md'
  ], done)
});
