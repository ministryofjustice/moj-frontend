const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp', {
  recurse: true
});

gulp.task('generate-assets', gulp.series(
  'clean',
  gulp.parallel(
    'copy-assets',
    'copy-component-javascript',
    'copy-vendor-javascript',
    'copy-namespace',
    'sass'
  )
));

gulp.task('watch', gulp.parallel(
  'watch-sass',
  'watch-assets'
));

gulp.task('build:package', gulp.series(
  'build:clean',
  'build:copy-files',
  'build:javascript',
  'build:compress-images'
));

gulp.task('default', gulp.series(
  'generate-assets',
  gulp.parallel(
    'watch',
    'server'
  )
));
