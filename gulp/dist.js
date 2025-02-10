const { mkdir, readFile, writeFile } = require('fs/promises')
const { dirname } = require('path')

const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const gulpSass = require('gulp-sass')
const dartSass = require('sass-embedded')
const { minify } = require('terser')

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

gulp.task('dist:javascript', async () => {
  for (const { srcPath, destPath } of [
    {
      srcPath: 'package/moj/all.js',
      destPath: 'dist/moj-frontend.min.js'
    }
  ]) {
    const output = await minify(
      { [srcPath]: await readFile(srcPath, 'utf8') },
      {
        format: { comments: false },
        safari10: true
      }
    )

    await mkdir(dirname(destPath), { recursive: true })
    await writeFile(destPath, output.code)
  }
})

gulp.task('dist:css', (done) => {
  return gulp
    .src('gulp/dist-scss/*.scss')
    .pipe(
      sass({
        loadPaths: ['./'],
        quietDeps: true,
        silenceDeprecations: ['import']
      }).on('error', done)
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
