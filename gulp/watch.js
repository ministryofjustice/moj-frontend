const gulp = require('gulp');

gulp.task('watch-sass', (done) => {
  gulp.watch([
    'src/assets/images/**',
    'src/settings/**/*.scss',
    'src/objects/**/*.scss',
    'src/helpers/**/*.scss',
    'src/utilities/**/*.scss',
    'src/components/**/*.scss',
    'src/components/**/*.js',
    'src/namespace.js',
    'app/assets/sass/*.scss'
  ], gulp.series('sass', 'copy-component-javascript', 'copy-namespace'));
  done();
});

gulp.task('watch-assets', (done) => {
  gulp.watch([
    'app/assets/images/**',
    'app/components/**',
    'app/assets/javascripts/**'], {cwd: './'}, gulp.task('copy-assets'));
  done();
});