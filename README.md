[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![moj-frontend](https://circleci.com/gh/ministryofjustice/moj-frontend.svg?style=shield)](https://circleci.com/gh/ministryofjustice/moj-frontend)

# Ministry of Justice Frontend

MOJ Frontend contains the code you need to start building user interfaces for UK Ministry of Justice government services.

See live examples of MOJ Frontend components, and guidance on when to use them in your service, in the [MOJ Design System](https://moj-design-system.herokuapp.com/).

## Contribution Guidelines

If you want to help us build MOJ Frontend, view our [contribution guidelines](CONTRIBUTING.md). This covers all areas from semvar commit messages to release process.

## Contact the team

MOJ Frontend is maintained by the MOJ Design System team. If you need support [contact the Design System team](https://moj-design-system.herokuapp.com/get-in-touch).

## Quick start

We recommend [installing MOJ Frontend using node package manager (npm)](docs/installation/installing-with-npm.md).

Once installed, you will be able to use the code from the examples in the [MOJ Design System](https://moj-design-system.herokuapp.com/) in your service.

## Browser support

MOJ Frontend will allow you to build services that comply with the [guidance in the Service Manual][service-manual-browsers].

If you are including MOJ Frontend as part of a stylesheet that you are generating in your application's build pipeline, you will need to [generate and
include a separate stylesheet in order to support Internet Explorer 8](docs/installation/supporting-internet-explorer-8.md).

[service-manual-browsers]: https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices#browsers-to-test-in

## Assistive technology support

MOJ Frontend will allow you to build services that comply with the [guidance in the Service Manual][service-manual-assistive-technologies].

In addition, we test that all content is accessible with keyboard only.

We aim to support [users who adjust or override the colours of websites they visit][how-users-change-colours-on-websites]. We test this by [changing colours in Firefox][changing-colours-in-firefox], by [enabling 'High Contrast' mode in Windows][enabling-high-contrast-mode-in-windows] and by using the [High Contrast plugin for Chrome][high-contrast-plugin-for-chrome].

[service-manual-assistive-technologies]: https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies#what-to-test

[changing-colours-in-firefox]:
https://support.mozilla.org/en-US/kb/change-fonts-and-colors-websites-use

[enabling-high-contrast-mode-in-windows]:
https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode

[high-contrast-plugin-for-chrome]: https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en-US

[how-users-change-colours-on-websites]:
https://accessibility.blog.gov.uk/2017/03/27/how-users-change-colours-on-websites/

### Further reading

- [Component principles](https://github.com/alphagov/govuk_publishing_components/blob/master/docs/component_principles.md)
- [Component conventions](https://github.com/alphagov/govuk_publishing_components/blob/master/docs/component_conventions.md)
