[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![dxw-frontend](https://circleci.com/gh/dxw/dxw-frontend.svg?style=shield)](https://circleci.com/gh/dxw/dxw-frontend)

# dxw Frontend

dxw Frontend contains the code you need to start building user interfaces for internal and client-based projects.

## Getting started

Run these commands to setup (first-time run only):

`yarn && yarn run build:docs`

Start the server:

` yarn run start`

The dxw Frontend uses Browsersync so you can view and test it on multiple browsers devices connected to the same network. Once the server has started you should be able to access dxw Frontend on your localhost with whichever port is available on your computer, e.g. `http://localhost:8080`.

## Contribution Guidelines

If you want to help us build dxw Frontend, view our [contribution guidelines](CONTRIBUTING.md). This covers all areas from semvar commit messages to release process.

## Browser support

dxw Frontend will allow you to build services that comply with the [guidance in the Service Manual][service-manual-browsers].

[service-manual-browsers]: https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices#browsers-to-test-in

## Assistive technology support

dxw Frontend will allow you to build services that comply with the [guidance in the Service Manual][service-manual-assistive-technologies].

In addition, we test that all content is accessible with keyboard only.

We aim to support [users who adjust or override the colours of websites they visit][how-users-change-colours-on-websites]. We test this by [changing colours in Firefox][changing-colours-in-firefox], by [enabling 'High Contrast' mode in Windows][enabling-high-contrast-mode-in-windows] and by using the [High Contrast plugin for Chrome][high-contrast-plugin-for-chrome].

[service-manual-assistive-technologies]: https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies#what-to-test
[changing-colours-in-firefox]: https://support.mozilla.org/en-US/kb/change-fonts-and-colors-websites-use
[enabling-high-contrast-mode-in-windows]: https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode
[high-contrast-plugin-for-chrome]: https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en-US
[how-users-change-colours-on-websites]: https://accessibility.blog.gov.uk/2017/03/27/how-users-change-colours-on-websites/

### Further reading

- [Component principles](https://github.com/alphagov/govuk_publishing_components/blob/master/docs/component_principles.md)
- [Component conventions](https://github.com/alphagov/govuk_publishing_components/blob/master/docs/component_conventions.md)
