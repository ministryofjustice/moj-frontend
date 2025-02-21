const { mkdir, readFile, writeFile } = require('fs/promises')
const { dirname } = require('path')

const gulp = require('gulp')
const { minify } = require('terser')

const { compileStyles } = require('./tasks/styles')

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

gulp.task(
  'dist:css',
  compileStyles('all.scss', {
    srcPath: 'gulp/dist-scss',
    destPath: 'dist',

    // Customise output
    output: {
      basename: 'moj-frontend',
      extname: '.min.css'
    }
  })
)

gulp.task('dist:zip', async () => {
  const { default: zip } = await import('gulp-zip')

  return gulp
    .src('dist/**', { encoding: false })
    .pipe(zip('release.zip'))
    .pipe(gulp.dest('dist'))
})
