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

gulp.task(
  "docs:copy-dependencies", () => {
    return gulp.src([
      'node_modules/govuk-frontend/dist/govuk/assets/**/*',
      'src/moj/assets/**/*'
    ])
    .pipe(gulp.dest('public/assets'))
  }
)

gulp.task(
  "docs:copy-vendor", () => {
    return gulp.src([
      'src/moj/vendor/**/*.js'
    ])
    .pipe(gulp.dest('public/assets/javascript'))
  }
)

gulp.task(
  "build:docs",
  gulp.series(
    "docs:copy-dependencies",
    "docs:copy-vendor",
    buildPackage
  )
)

gulp.task('watch:package', function() {
  gulp.watch([
    'src/moj/components/**/*.scss',
    'src/moj/components/**/*.js'
  ],
  buildPackage);
})
