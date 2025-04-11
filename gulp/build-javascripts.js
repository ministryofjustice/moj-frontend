const { glob } = require('glob')
const gulp = require('gulp')

const { compileScripts } = require('./tasks/scripts')

gulp.task('build:javascripts', async () => {
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
    'moj/helpers.mjs',
    'moj/all.mjs'
  ]) {
    await Promise.all([
      /**
       * Rollup output for each module:
       *
       * - ECMAScript (ES) modules for Node.js or bundler `import`
       *   (GOV.UK Frontend resolved via `node_modules/govuk-frontend`)
       */
      compileScripts(modulePath, {
        srcPath: 'src',
        destPath: 'package',

        // Customise input
        input: {
          external: ['govuk-frontend']
        },

        // Customise output
        output: {
          entryFileNames: '[name].mjs',
          format: 'esm',
          preserveModules: true,
          preserveModulesRoot: 'src'
        }
      })(),

      /**
       * Rollup output for each module:
       *
       * - ECMAScript (ES) bundles for browser <script type="module">
       *   (GOV.UK Frontend used exports included in bundle)
       */
      compileScripts(modulePath, {
        srcPath: 'src',
        destPath: 'package',

        // Customise output
        output: {
          file: modulePath.replace('.mjs', '.bundle.mjs'),
          format: 'esm'
        }
      })(),

      /**
       * Rollup output for each module:
       *
       * - Universal Module Definition (UMD) bundle for browser <script>
       *   (GOV.UK Frontend resolved via `window.GOVUKFrontend`)
       */
      compileScripts(modulePath, {
        srcPath: 'src',
        destPath: 'package',

        // Customise input
        input: {
          external: ['govuk-frontend']
        },

        // Customise output
        output: {
          file: modulePath.replace('.mjs', '.bundle.js'),
          format: 'umd',
          globals: { 'govuk-frontend': 'GOVUKFrontend' },
          name: 'MOJFrontend'
        }
      })()
    ])
  }
})

gulp.task('build:javascripts-minified', async () =>
  Promise.all([
    /**
     * Rollup output (minified):
     *
     * - ECMAScript (ES) module bundle for browser <script type="module">
     *   (GOV.UK Frontend used exports included in bundle)
     */
    compileScripts('all.mjs', {
      srcPath: 'src/moj',
      destPath: 'package/moj',

      // Customise output
      output: {
        compact: true,
        file: 'moj-frontend.min.js',
        format: 'esm'
      }
    })()
  ])
)
