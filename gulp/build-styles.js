const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const gulpSass = require('gulp-sass')
const dartSass = require('sass')

const sass = gulpSass(dartSass)

gulp.task('build:css', () => {
  return gulp
    .src('gulp/dist-scss/*.scss')
    .pipe(
      sass({
        loadPaths: ['./'],
        quietDeps: true
      })
    )
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
