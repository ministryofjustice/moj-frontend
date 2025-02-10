const { mkdir, readFile, writeFile } = require('fs/promises')
const { dirname, join } = require('path')

const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const { glob } = require('glob')
const gulp = require('gulp')
const { rollup } = require('rollup')
const externalGlobals = require('rollup-plugin-external-globals')
const { minify } = require('terser')

gulp.task('build:javascript', async () => {
  const modulePaths = await glob('moj/**/*.{cjs,js,mjs}', {
    cwd: 'src',
    ignore: [
      '**/*.spec.{cjs,js,mjs}',
      '**/filters/**',
      '**/vendor/**',
      '**/init.js'
    ],
    nodir: true
  })

  // Create Rollup bundle(s)
  for (const modulePath of modulePaths) {
    const options = /** @satisfies {RollupOptions} */ ({
      input: join('src', modulePath),
      output: [
        {
          dir: 'package',
          entryFileNames: '[name].mjs',
          format: 'esm',
          preserveModules: true,
          preserveModulesRoot: 'src'
        },
        {
          extend: true,
          file: join('package', modulePath.replace('.mjs', '.js')),
          format: 'umd',
          name: 'MOJFrontend'
        }
      ],
      external: ['jquery'],
      plugins: [
        externalGlobals({
          jquery: 'window.jQuery'
        }),
        nodeResolve(),
        commonjs()
      ]
    })

    // Create bundle
    const bundle = await rollup(options)

    // Write to output format(s)
    for (const output of options.output) {
      await bundle.write(output)
    }

    // Add minified bundle output
    if (options.input.endsWith('all.mjs')) {
      await bundle.write({
        banner: await readFile('node_modules/jquery/dist/jquery.js', 'utf8'),
        extend: true,
        file: 'package/moj/all.jquery.js',
        format: 'umd',
        name: 'MOJFrontend'
      })
    }
  }
})

gulp.task('build:javascript-minified', async () => {
  for (const { srcPath, destPath } of [
    {
      srcPath: 'package/moj/all.js',
      destPath: 'package/moj/moj-frontend.min.js'
    },
    {
      srcPath: 'package/moj/all.jquery.js',
      destPath: 'package/moj/all.jquery.min.js'
    }
  ]) {
    const output = await minify(
      { [srcPath]: await readFile(srcPath, 'utf8') },
      {
        format: { comments: false },
        safari10: true
      }
    )

    await mkdir(dirname(destPath), { recursive: true })
    await writeFile(destPath, output.code)
  }
})

/**
 * @import { ModuleFormat, OutputOptions, RollupOptions } from 'rollup'
 */
