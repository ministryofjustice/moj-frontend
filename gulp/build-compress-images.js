const gulp = require('gulp')
const cache = require('gulp-cache')

// Compresses png, jpeg, gif, png and svg images
gulp.task('build:compress-images', async () => {
  const { default: imagemin } = await import('gulp-imagemin')

  return gulp
    .src('package/moj/assets/images/**/*.+(png|jpg|jpeg|gif|svg)', {
      encoding: false
    })
    .pipe(
      cache(
        imagemin({
          interlaced: true
        })
      )
    )
    .pipe(gulp.dest('package/moj/assets/images/'))
})
