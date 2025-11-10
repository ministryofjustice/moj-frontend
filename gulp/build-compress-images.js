const { Transform } = require('stream')

const gulp = require('gulp')
const sharp = require('sharp')
const { optimize } = require('svgo')

function compressImages() {
  return new Transform({
    objectMode: true,
    async transform(file, _, callback) {
      if (file.isNull()) return callback(null, file)

      const ext = file.extname.toLowerCase()

      try {
        if (ext === '.svg') {
          const result = optimize(file.contents.toString(), { multipass: true })
          file.contents = Buffer.from(result.data)
          return callback(null, file)
        }

        let pipeline = sharp(file.contents)

        if (ext === '.png') {
          pipeline = pipeline.png({ compressionLevel: 9 })
        } else if (ext === '.jpg' || ext === '.jpeg') {
          pipeline = pipeline.jpeg({ quality: 80 })
        }

        file.contents = await pipeline.toBuffer()
        return callback(null, file)
      } catch (err) {
        console.error(err)
        return callback(err)
      }
    }
  })
}

// Compresses png, jpeg and svg images
gulp.task('build:compress-images', () => {
  return gulp
    .src('package/moj/assets/images/**/*.+(png|jpg|jpeg|svg)', {
      encoding: false
    })
    .pipe(compressImages())
    .pipe(gulp.dest('package/moj/assets/images/'))
})
