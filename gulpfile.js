const gulp = require('gulp')
const requireDir = require('require-dir')

requireDir('./gulp')

// Copy ./src directory and build scripts into ./package
gulp.task(
  'build:package',
  gulp.series(
    'build:clean',
    'build:copy-files',
    'build:javascript',
    'build:javascript-minified',
    'build:css',
    'build:compress-images'
  )
)

// Build the dist bundle of the package
gulp.task(
  'build:dist',
  gulp.series(
    'dist:clean',
    'dist:javascript',
    'dist:css',
    'dist:assets',
    'dist:zip'
  )
)

// Initial build of the docs site to ./public
gulp.task(
  'build:docs',
  gulp.series(
    'docs:clean',
    'docs:copy-files',
    gulp.parallel('docs:styles', 'docs:scripts'),
    'docs:revision'
  )
)

// Watch the docs site sass and all component sass files and recompile
gulp.task('watch:styles', () => {
  gulp.watch(
    ['docs/assets/**/*.scss', 'src/moj/**/*.scss'],
    gulp.series('docs:styles')
  )
})

// Watch all the component js files and build the package
gulp.task('watch:package-js', () => {
  gulp.watch(
    ['src/moj/**/*.mjs'],
    { ignored: ['**/*.spec.*', '**/vendor/**'] },
    gulp.series('build:javascript')
  )
})

// Watch the docs js files and the bundled package js and rebuild
gulp.task('watch:docs-js', () => {
  gulp.watch(
    ['docs/assets/**/*.mjs', 'src/moj/**/*.mjs'],
    { ignored: ['**/*.spec.*', '**/vendor/**'] },
    gulp.series('docs:scripts')
  )
})

// Watch all the files in dev
gulp.task(
  'watch:dev',
  gulp.parallel('watch:styles', 'watch:package-js', 'watch:docs-js')
)
