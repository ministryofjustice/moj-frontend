import pkg from '@ministryofjustice/frontend/package.json' with { type: 'json' }
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcss from 'postcss'
import scss from 'postcss-scss'

/**
 * PostCSS config
 *
 * @type {ConfigFn}
 */
export default (ctx = {}) => {
  const { to } = ctx

  return {
    plugins: [
      // Add vendor prefixes
      autoprefixer({
        env: 'stylesheets'
      }),

      // Add GOV.UK Frontend release version
      {
        postcssPlugin: 'govuk-frontend-version',
        Declaration: {
          // Find CSS declaration for version, update value
          // https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md
          // https://postcss.org/api/#declaration
          '--moj-frontend-version': async (decl) => {
            decl.value = `"${pkg.version}"`
          }
        }
      },

      // Minify CSS only
      to?.endsWith('.css') &&
        cssnano({
          env: 'stylesheets'
        })
    ],

    // Sass syntax support
    syntax: to?.endsWith('.scss') ? scss : postcss
  }
}

/**
 * @import { ConfigFn } from 'postcss-load-config'
 */
