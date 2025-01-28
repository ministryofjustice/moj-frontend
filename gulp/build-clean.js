const gulp = require('gulp')

gulp.task('build:clean', async (done) => {
  const { deleteSync } = await import('del')

  return deleteSync([
    'package/*',
    '!package',
    '!package/package.json',
    '!package/govuk-prototype-kit.config.json',
    '!package/README.md'
  ])
})
