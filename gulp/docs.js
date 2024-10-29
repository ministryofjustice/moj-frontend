const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const rev = require("gulp-rev");
// import rev from 'gulp-rev';
// const rewrite = require("gulp-rev-rewrite");
// import revRewrite from 'gulp-rev-rewrite';
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
      .pipe(gulp.dest("public/assets/stylesheets/"))
    //   .pipe(rev())
    //   .pipe(gulp.dest("public/assets/stylesheets/"))  // Write rev'd assets to build dir
		  // .pipe(rev.manifest({
    //     base: 'public/assets',
			 //  merge: true
    //   }))
		  // .pipe(gulp.dest("public/assets/"))  // Write manifest to build dir
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
    //   .pipe(rev())
    //   .pipe(gulp.dest("public/assets/javascript/"))  // Write rev'd assets to build dir
		  // .pipe(rev.manifest({
    //     base: 'build/assets',
			 //  merge: true
    //   }))
		  // .pipe(gulp.dest("public/assets/"))
  }
);

gulp.task(
  "docs:revision", () => {
    return gulp
    .src(["public/assets/**/*.css", "public/assets/**/*js"])
    .pipe(rev())
    .pipe(gulp.dest("public/assets/"))  // Write rev'd assets to build dir
		.pipe(rev.manifest())
    .pipe(gulp.dest("public/assets/"))
  }
)

// gulp.task(
//   "docs:rewrite", () => {
//       const manifest = readFileSync('dist/assets/rev-manifest.json');
//
//       return gulp
//       .src('public/**/*.html')
//       .pipe(revRewrite({ manifest }))
//       .pipe(gulp.dest('public'));
//   }
// );



