const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');
const cache    = require('gulp-cache');

// Compresses png, jpeg, gif, png and svg images
gulp.task('build:compress-images', () => {
  return gulp.src('package/assets/images/' + '**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('package/assets/images/'));
});
