const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const gulpSass = require('gulp-sass')
const uglify = require('gulp-uglify')
const dartSass = require('sass-embedded')

const sass = gulpSass(dartSass)

gulp.task('dist:clean', async () => {
  const { deleteSync } = await import('del')

  return deleteSync(['dist/**/*'])
})

gulp.task('dist:assets', () => {
  return gulp
    .src('package/moj/assets/**/*', { encoding: false })
    .pipe(gulp.dest('dist/assets/'))
})

gulp.task('dist:javascript', () => {
  return gulp
    .src('package/moj/all.js')
    .pipe(uglify())
    .pipe(rename('moj-frontend.min.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('dist:css', () => {
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
        basename: path.basename.replace('dist', 'moj-frontend'),
        extname: '.min.css'
      }))
    )
    .pipe(gulp.dest('dist'))
})

gulp.task('dist:zip', async () => {
  const { default: zip } = await import('gulp-zip')

  return gulp
    .src('dist/**', { encoding: false })
    .pipe(zip('release.zip'))
    .pipe(gulp.dest('dist'))
})
