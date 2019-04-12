const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('server', (done) => {
  nodemon({
    script: 'server.js',
    ext: 'js, json',
  }).on('quit', () => {
    process.exit(0);
  });
  done();
});