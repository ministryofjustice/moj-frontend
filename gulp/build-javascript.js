const { glob } = require('glob')
const gulp = require('gulp')

const { compileScripts } = require('./tasks/scripts')

gulp.task('build:javascript', async () => {
  const modulePaths = await glob('moj/components/**/*.{cjs,js,mjs}', {
    cwd: 'src',
    ignore: ['**/*.spec.{cjs,js,mjs}'],
    nodir: true
  })

  // Create Rollup bundle(s)
  for (const modulePath of [
    ...modulePaths,

    // Build entry scripts last to restore modules
    // removed from components due to tree-shaking
    'moj/version.mjs',
    'moj/helpers.mjs',
    'moj/all.mjs'
  ]) {
    await Promise.all([
      /**
       * Rollup output for each module:
       *
       * - ECMAScript (ES) modules for Node.js or bundler `import`
       *   (jQuery resolved via `node_modules`)
       */
      compileScripts(modulePath, {
        srcPath: 'src',
        destPath: 'package',

        // Customise input
        input: {
          external: ['jquery', 'govuk-frontend']
        },

        // Customise output
        output: {
          entryFileNames: '[name].mjs',
          preserveModules: true,
          preserveModulesRoot: 'src'
        }
      })(),

      /**
       * Rollup output for each module:
       *
       * - Universal Module Definition (UMD) bundle for browser <script>
       *   (jQuery resolved via `window.$`)
       */
      compileScripts(modulePath, {
        srcPath: 'src',
        destPath: 'package',

        // Customise input
        input: {
          external: ['jquery']
        },

        // Customise output
        output: {
          file: modulePath.replace('.mjs', '.js'),
          globals: { jquery: '$' },
          format: 'umd',
          name: 'MOJFrontend'
        }
      })()
    ])
  }
})

gulp.task('build:javascript-minified', async () =>
  Promise.all([
    /**
     * Rollup output (minified) without jQuery:
     *
     * - Universal Module Definition (UMD) bundle for browser <script>
     *   (jQuery resolved via `window.$`)
     */
    compileScripts('all.mjs', {
      srcPath: 'src/moj',
      destPath: 'package/moj',

      // Customise input
      input: {
        external: ['jquery']
      },

      // Customise output
      output: {
        compact: true,
        file: 'moj-frontend.min.js',
        globals: { jquery: '$' },
        format: 'umd',
        name: 'MOJFrontend'
      }
    })(),

    /**
     * Rollup output (minified) with jQuery:
     *
     * - Universal Module Definition (UMD) bundle for browser <script>
     *   (jQuery included in bundle)
     */
    compileScripts('all.mjs', {
      srcPath: 'src/moj',
      destPath: 'package/moj',

      // Customise output
      output: {
        compact: true,
        file: 'all.jquery.min.js',
        format: 'umd',
        name: 'MOJFrontend'
      }
    })()
  ])
)
