const gulp = require("gulp");
const requireDir = require("require-dir");

requireDir("./gulp", {
  recurse: true,
});

gulp.task("build:package", async (done) => {
  await import("./gulp/build-compress-images.mjs");

  gulp.series(
    "build:clean",
    "build:copy-files",
    "build:javascript",
    "build:compress-images"
  );

  done();
});

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
