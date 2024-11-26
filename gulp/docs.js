const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const {createGulpEsbuild} = require("gulp-esbuild");
const esbuild = createGulpEsbuild({
	incremental: false, // enables the esbuild"s incremental build
	piping: true,      // enables piping
})
const VERSION = "20241126"

// Copy all the govuk-frontend assets across
gulp.task(
  "docs:copy-dependencies", () => {
    return gulp.src([
      "node_modules/govuk-frontend/dist/govuk/assets/**/*",
      "src/moj/assets/**/*"
    ])
    .pipe(gulp.dest("public/assets"))
  }
);

// Copy package vendor files across
gulp.task(
  "docs:copy-vendor", () => {
    return gulp.src([
      "src/moj/vendor/**/*.js"
    ])
    .pipe(gulp.dest("public/assets/javascript"))
  }
);

// Ordering is important here! - Docs > Package > GovUK frontend
gulp.task(
  "docs:copy-files", gulp.series(
    "docs:copy-dependencies",
    "docs:copy-vendor",
  )
);

// Compile the docs site stylesheet
gulp.task(
  "docs:styles", () => {
    return gulp
      .src("docs/assets/stylesheets/application.scss")
      .pipe(sass())
      .pipe(rename({
        suffix: `-${VERSION}`
      }))
      .pipe(gulp.dest("public/assets/stylesheets/"));
  }
);

// Bundle the docs site javascript
gulp.task(
  "docs:scripts", () => {
    return gulp
      .src("docs/assets/javascript/all.js")
      .pipe(esbuild({
          outfile: `all-${VERSION}.js`,
          target: "es6",
          bundle: true,
      }))
      .pipe(gulp.dest("public/assets/javascript"))
  }
);



