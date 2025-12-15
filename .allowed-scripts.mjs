import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    'node_modules/@parcel/watcher@2.5.1': 'ALLOW',
    'node_modules/@sentry/cli@2.55.0': 'ALLOW',
    'node_modules/core-js@3.40.0': 'FORBID',
    'node_modules/gifsicle@5.3.0': 'ALLOW',
    'node_modules/govuk-prototype-kit/node_modules/@parcel/watcher@2.5.1':
      'ALLOW',
    'node_modules/govuk-prototype-kit/node_modules/fsevents@2.3.2': 'ALLOW',
    'node_modules/mozjpeg@8.0.0': 'ALLOW',
    'node_modules/optipng-bin@7.0.1': 'ALLOW',
    'node_modules/playwright/node_modules/fsevents@2.3.2': 'ALLOW',
    'node_modules/puppeteer@24.22.3': 'ALLOW',
    'node_modules/unrs-resolver@1.11.1': 'ALLOW'
  }
})
