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
    'build:package',
    gulp.parallel('docs:styles', 'docs:scripts'),
    'docs:revision'
  )
)

// Watch the docs site sass and all component sass files and recompile
gulp.task('watch:styles', () => {
  gulp.watch(
    ['docs/assets/**/*.scss', 'src/moj/**/*.scss'],
    gulp.series(['docs:styles'])
  )
})

// Watch all the component js files and build the package
gulp.task('watch:package-js', () => {
  gulp.watch(
    ['src/moj/components/**/*.mjs'],
    { ignored: ['**/*.spec.*'] },
    gulp.series('build:javascript')
  )
})

// Watch the docs js files and the bundled package js and rebuild
gulp.task('watch:docs-js', () => {
  gulp.watch(
    ['docs/assets/**/*.mjs', 'package/moj/all.js'],
    { ignored: ['**/*.spec.*'] },
    gulp.series(['docs:scripts'])
  )
})

// Watch all the files in dev
gulp.task(
  'watch:dev',
  gulp.parallel('watch:styles', 'watch:package-js', 'watch:docs-js')
)
