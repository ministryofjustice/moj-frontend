[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![NPM License](https://img.shields.io/npm/l/@ministryofjustice/frontend)

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ministryofjustice/moj-frontend/Build%20and%20deploy%20docs)
![NPM Downloads](https://img.shields.io/npm/v/@ministryofjustice/frontend)
![NPM Downloads](https://img.shields.io/npm/dw/@ministryofjustice/frontend)

# Ministry of Justice Frontend

MOJ Frontend contains the code you need to start building user interfaces for UK Ministry of Justice government services.

See live examples of MOJ Frontend components, and guidance on when to use them in your service, in the [MOJ Pattern Library documentation](https://design-patterns.service.justice.gov.uk/).

## Contribution Guidelines

If you want to help us build MOJ Frontend, view our [contribution guidelines](CONTRIBUTING.md). This covers all areas from semvar commit messages to release process.

## Contact the team

MOJ Frontend is maintained by staff in the Ministry of Justice. If you need support, you can use [GitHub discussions](https://github.com/ministryofjustice/moj-frontend/discussions) or one of our Slack channels:
- [#moj-pattern-library-support](https://mojdt.slack.com/archives/CH5RUSB27) on Justice Digital Slack
- [#moj-design-system channel](https://ukgovernmentdigital.slack.com/archives/CJ6QDRDGC) on UK Government Digital Slack

## Quick start

We recommend [installing MOJ Frontend using node package manager (npm)](https://design-patterns.service.justice.gov.uk/get-started/installing-with-npm/).

Once installed, you will be able to use the code from the examples in the [MOJ Pattern Library](https://design-patterns.service.justice.gov.uk/) in your service.

## Browser support

MOJ Frontend will allow you to build services that comply with the [guidance in the Service Manual][service-manual-browsers].

MOJ Frontend no longer supports Internet Explorer 8. If you need IE8 support, then [you must use an old version or provide your own support](docs/installation/supporting-internet-explorer-8.md).

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
