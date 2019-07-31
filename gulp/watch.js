const gulp = require('gulp');

gulp.task('watch-sass', (done) => {
  gulp.watch([
    'src/moj/assets/images/**',
    'src/moj/settings/**/*.scss',
    'src/moj/objects/**/*.scss',
    'src/moj/helpers/**/*.scss',
    'src/moj/utilities/**/*.scss',
    'src/moj/components/**/*.scss',
    'src/moj/components/**/*.js',
    'src/moj/namespace.js',
    'src/moj/helpers.js',
    'app/assets/sass/*.scss'
  ], gulp.series('sass', 'copy-component-javascript', 'copy-namespace', 'copy-helpers'));
  done();
});

gulp.task('watch-assets', (done) => {
  gulp.watch([
    'app/assets/images/**',
    'app/components/**',
    'app/assets/javascripts/**'], {cwd: './'}, gulp.task('copy-assets'));
  done();
});
