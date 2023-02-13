const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const zip = require("gulp-zip");

gulp.task("dist:clean", async () => {
  const { deleteSync } = await import("del");

  return deleteSync(["dist/**/*"]);
});

gulp.task("dist:assets", () => {
  return gulp.src("src/moj/assets/**/*").pipe(gulp.dest("dist/assets/"));
});

gulp.task("dist:javascript", () => {
  return gulp
    .src("src/moj/all.js")
    .pipe(
      uglify({
        ie8: true,
      })
    )
    .pipe(rename("moj-frontend.min.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("dist:css", () => {
  return gulp
    .src("src/moj/*.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(
      rename((path) => ({
        dirname: path.dirname,
        basename: path.basename.replace("all", "moj-frontend"),
        extname: ".min.css",
      }))
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("dist:zip", () => {
  return gulp.src("dist/**").pipe(zip("release.zip")).pipe(gulp.dest("dist"));
});
