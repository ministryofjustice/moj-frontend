const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rev = require('gulp-rev')
const { createGulpEsbuild } = require('gulp-esbuild')
const esbuild = createGulpEsbuild({
  incremental: false, // enables the esbuild"s incremental build
  piping: true // enables piping
})

gulp.task('docs:clean', async (done) => {
  const { deleteSync } = await import('del')

  return deleteSync(['public/**/*'])
})

// Copy all the govuk-frontend assets across
gulp.task('docs:copy-dependencies', () => {
  return gulp
    .src([
      'node_modules/govuk-frontend/dist/govuk/assets/**/*',
      'src/moj/assets/**/*'
    ])
    .pipe(gulp.dest('public/assets'))
})

// Copy package vendor files across
gulp.task('docs:copy-vendor', () => {
  return gulp
    .src(['src/moj/vendor/**/*.js'])
    .pipe(gulp.dest('public/assets/javascript'))
})

gulp.task('docs:copy-images', () => {
  return gulp
    .src(['docs/assets/images/**/*'])
    .pipe(gulp.dest('public/assets/images'))
})

// Ordering is important here! - Docs > Package > GovUK frontend
gulp.task(
  'docs:copy-files',
  gulp.series('docs:copy-dependencies', 'docs:copy-vendor', 'docs:copy-images')
)

// Compile the docs site stylesheet
gulp.task('docs:styles', () => {
  return gulp
    .src('docs/assets/stylesheets/*.scss')
    .pipe(
      sass({
        loadPaths: ['./'],
        style: process.env.ENV === 'dev' ? 'expanded' : 'compressed',
        quietDeps: true
      })
    )
    .pipe(gulp.dest('public/assets/stylesheets/'))
})

// Bundle the docs site javascript
gulp.task('docs:scripts', () => {
  return gulp
    .src('docs/assets/javascript/application.mjs')
    .pipe(
      esbuild({
        outfile: 'application.js',
        target: 'es6',
        minify: process.env.ENV !== 'dev',
        bundle: true
      })
    )
    .pipe(gulp.dest('public/assets/javascript'))
})

gulp.task('docs:revision', () => {
  return gulp
    .src(
      [
        'public/assets/**/*.css',
        'public/assets/**/*.js',
        'public/assets/**/*.+(png|jpg|jpeg)'
      ],
      { base: 'public' }
    )
    .pipe(rev())
    .pipe(gulp.dest('public/')) // Write rev'd assets to build dir
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/assets/'))
})
