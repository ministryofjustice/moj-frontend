const { glob } = require('glob')
const gulp = require('gulp')

const { compileStyles } = require('./tasks/styles')

gulp.task('build:stylesheets', async () => {
  const modulePaths = await glob('moj/**/*.scss', {
    cwd: 'src',
    nodir: true
  })

  // Apply PostCSS transforms (e.g. vendor prefixes)
  for (const modulePath of modulePaths) {
    await compileStyles(modulePath, {
      srcPath: 'src',
      destPath: 'package',

      // Customise output
      output: { file: modulePath }
    })()
  }
})

gulp.task(
  'build:stylesheets-minified',
  compileStyles('all.scss', {
    srcPath: 'src/moj',
    destPath: 'package/moj',

    // Customise output
    output: { file: 'moj-frontend.min.css' }
  })
)
