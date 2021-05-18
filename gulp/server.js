const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('server', shell.task('npm run build:docs -- --serve --watch'));
