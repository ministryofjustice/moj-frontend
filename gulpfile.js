const gulp = require("gulp");
const requireDir = require("require-dir");

requireDir("./gulp");

gulp.task(
  "build:package",
  gulp.series(
    "build:clean",
    "build:copy-files",
    "build:javascript",
    "build:javascript-with-jquery",
    "build:compress-images",
  )
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
