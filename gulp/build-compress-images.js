const gulp = require("gulp");
const cache = require("gulp-cache");

// Compresses png, jpeg, gif, png and svg images
gulp.task('build:compress-images', async () => {
  const { default: imagemin } = await import("gulp-imagemin");

  return gulp
    .src("src/moj/assets/images/" + "**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        })
      )
    )
    .pipe(gulp.dest("src/moj/assets/images/"));
});
