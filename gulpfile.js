const gulp = require("gulp");
const requireDir = require("require-dir");

requireDir("./gulp");

const buildPackage = gulp.series(
    "build:clean",
    "build:copy-files",
    "build:javascript",
    "build:javascript-with-jquery",
    "build:compress-images",
  );

gulp.task(
  "build:package", buildPackage
);

gulp.task(
  "build:dist",
  gulp.series(
    "dist:clean",
    "dist:javascript",
    "dist:css",
    "dist:assets",
    "dist:zip"
  )
);

gulp.task('watch:package', function() {
  gulp.watch([
    'src/moj/components/**/*.scss',
    'src/moj/components/**/*.js'
  ],
  buildPackage);
})
