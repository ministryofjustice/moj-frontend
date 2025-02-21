const gulp = require('gulp')

const { compileStyles } = require('./tasks/styles')

gulp.task(
  'build:css',
  compileStyles('all.scss', {
    srcPath: 'gulp/dist-scss',
    destPath: 'package/moj',

    // Customise output
    output: {
      basename: 'moj-frontend',
      extname: '.min.css'
    }
  })
)
