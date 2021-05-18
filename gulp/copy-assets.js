const gulp = require("gulp");
var concat = require("gulp-concat");
var umd = require("gulp-umd");

gulp.task("copy-assets", () => {
  return gulp
    .src([
      "!app/assets/sass{,/**/*}",
      "app/assets/**",
      "node_modules/govuk-frontend/govuk/assets/**",
    ])
    .pipe(gulp.dest("public/assets/"));
});

gulp.task("build-docs-javascript", () => {
  return gulp
    .src([
      "src/moj/namespace.js",
      "src/moj/helpers.js",
      "src/moj/all.js",
      "src/moj/components/**/*.js",
      "app/assets/javascript/**/*.js",
    ])
    .pipe(concat("all.js"))
    .pipe(
      umd({
        exports: function () {
          return "MOJFrontend";
        },
        namespace: function () {
          0;
          return "MOJFrontend";
        },
      })
    )
    .pipe(gulp.dest("public/assets/javascript"));
});
