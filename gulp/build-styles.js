const gulp = require('gulp')

const { compileStyles } = require('./tasks/styles')

gulp.task(
  'build:css',
  compileStyles('all.scss', {
    srcPath: 'src/moj',
    destPath: 'package/moj',

    // Customise output
    output: { file: 'moj-frontend.min.css' }
  })
)
