const gulp = require('gulp')

gulp.task('build:clean', async () => {
  const { deleteAsync } = await import('del')

  return deleteAsync(
    [
      'package/**',
      '!package',
      '!package/package.json',
      '!package/govuk-prototype-kit.config.json',
      '!package/README.md'
    ],
    {
      dot: true
    }
  )
})
