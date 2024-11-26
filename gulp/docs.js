const fs = require("fs");
const clean = require("gulp-clean")
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rev = require("gulp-rev");
const {createGulpEsbuild} = require("gulp-esbuild");
const esbuild = createGulpEsbuild({
	incremental: false, // enables the esbuild"s incremental build
	piping: true,      // enables piping
})

gulp.task("docs:clean", () => {
  return gulp.src('public', {read: false})
  .pipe(clean())
})

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
      .pipe(gulp.dest("public/assets/stylesheets/"))
  }
);

// Bundle the docs site javascript
gulp.task(
  "docs:scripts", () => {
    return gulp
      .src("docs/assets/javascript/all.js")
      .pipe(esbuild({
          outfile: `all.js`,
          target: "es6",
          bundle: true,
      }))
      .pipe(gulp.dest("public/assets/javascript"))
  }
);

gulp.task(
  "docs:revision", () => {
    return gulp
    .src(["public/assets/**/*.css", "public/assets/**/*js"], {base: "public"})
    .pipe(rev())
    .pipe(gulp.dest("public/"))  // Write rev'd assets to build dir
		.pipe(rev.manifest())
    .pipe(gulp.dest("public/assets/"))
  }
)




