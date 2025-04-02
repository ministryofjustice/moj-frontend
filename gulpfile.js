const gulp = require('gulp')
const requireDir = require('require-dir')

requireDir('./gulp')

// Copy ./src directory and build scripts into ./package
gulp.task(
  'build:package',
  gulp.series(
    'build:clean',
    'build:copy',
    'build:javascripts',
    'build:javascripts-minified',
    'build:stylesheets',
    'build:stylesheets-minified',
    'build:compress-images'
  )
)

// Build the dist bundle of the package
gulp.task(
  'build:dist',
  gulp.series(
    'dist:clean',
    'dist:javascripts',
    'dist:stylesheets',
    'dist:assets',
    'dist:zip'
  )
)

// Initial build of the docs site to ./public
gulp.task(
  'build:docs',
  gulp.series(
    'docs:clean',
    'docs:copy',
    gulp.parallel('docs:stylesheets', 'docs:javascripts'),
    'docs:revision'
  )
)

// Watch all the component sass files and build the package
gulp.task('watch:stylesheets', () => {
  gulp.watch(
    ['src/moj/**/*.scss'],
    gulp.series('build:stylesheets', 'build:stylesheets-minified')
  )
})

// Watch all the component js files and build the package
gulp.task('watch:javascripts', () => {
  gulp.watch(
    ['src/moj/**/*.mjs'],
    { ignored: ['**/*.spec.*'] },
    gulp.series('build:javascripts', 'build:javascripts-minified')
  )
})

// Watch the docs sass files and the bundled package sass and rebuild
gulp.task('watch:docs-stylesheets', () => {
  gulp.watch(
    ['docs/stylesheets/**/*.scss', 'package/moj/all.scss?(.map)'],
    gulp.series('docs:stylesheets')
  )
})

// Watch the docs js files and the bundled package js and rebuild
gulp.task('watch:docs-javascript', () => {
  gulp.watch(
    ['docs/javascripts/**/*.mjs', 'package/moj/all.mjs?(.map)'],
    { ignored: ['**/*.spec.*'] },
    gulp.series('docs:javascripts')
  )
})

// Watch and copy the docs minified CSS
gulp.task('watch:docs-copy-stylesheets', () => {
  gulp.watch(
    ['package/moj/*.min.css?(.map)'],
    gulp.series('docs:copy-stylesheets')
  )
})

// Watch and copy the docs minified JS
gulp.task('watch:docs-copy-javascripts', () => {
  gulp.watch(
    ['package/moj/*.min.js?(.map)'],
    gulp.series('docs:copy-javascripts')
  )
})

// Watch all the files in dev
gulp.task(
  'watch',
  gulp.parallel(
    'watch:stylesheets',
    'watch:javascripts',
    'watch:docs-stylesheets',
    'watch:docs-javascript',
    'watch:docs-copy-stylesheets',
    'watch:docs-copy-javascripts'
  )
)
