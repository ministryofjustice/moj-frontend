import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';

// Compresses png, jpeg, gif, png and svg images
gulp.task('build:compress-images', () => {
  return gulp.src('package/moj/assets/images/' + '**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('package/moj/assets/images/'));
});
