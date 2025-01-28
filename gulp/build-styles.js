const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))

gulp.task('build:css', () => {
  return gulp
    .src('gulp/dist-scss/*.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(
      rename((path) => ({
        dirname: path.dirname,
        basename: path.basename.replace('all', 'moj-frontend'),
        extname: '.min.css'
      }))
    )
    .pipe(gulp.dest('package/moj'))
})
