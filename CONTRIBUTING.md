# Contribution guidelines

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](https://github.com/ministryofjustice/moj-frontend/blob/main/CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Contributing

If you’ve got an idea or suggestion you can:

- [Contact the Design System team](https://design-patterns.service.justice.gov.uk/community/help-and-feedback)
- [Create a GitHub issue](https://github.com/ministryofjustice/moj-frontend/issues)

## Raising bugs

When raising bugs, please explain the issue in reasonable detail and provide a guide on how to replicate it.

When describing the bug, it's useful to follow the format:

- What you did
- What you expected to happen
- What happened

## Suggesting features

Please [raise feature requests as issues](https://github.com/ministryofjustice/moj-frontend/issues) before contributing any code.

Raising an issue ensures they are openly discussed and before spending any time on them.

## Contributing code

### Node Versions

We recommend using [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating) while working on this project.

The version of node to use while working on this project is set in the [.nvmrc](./.nvmrc) file. This file is used for the CI and local development.

To ensure you are using the correct version of Node, run the following commands using `nvm`.

`nvm use` - will read the `.nvmrc` file and set your node version to it.

If you get an error saying it is not installed, run the following command to install ther required version and enable it.

`nvm install` - will read the `.nvmrc` file, download that version and set your node version to it.

If you need to install a newer version of node, you should set the version in this file and run the above steps. The CI will automatically read this file and install the appropriate version.

### Setup

- Run `nvm use`
- Run `npm install`
- Run `npm run build:package`

You can now run `npm run start` to run a local version of the site.

### Versioning

Versioning is now handled automatically based on your commit messages by using [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) and [commitizen](https://www.npmjs.com/package/commitizen).

With these 2 packages and a few helper ones, we are able to construct reliable versioning based off of descriptive commit messages.

To aid with the formatting of messages we use commitizen to guide us through our commits.

Below are instructions on how the git workflow goes now

- Ensure you have run `npm install`
- When you are ready to commit, run `git add .` as usual
- Now from the command line run `git commit`
- You will have a range of prompts asking you what type of commit it is to descriptions on what the changes are
- Once you have filled these out a linter will check everything is okay and allow the commit to happen

From here you can push as you always have done.

When you come to do a Pull request, be sure to use a [pull request template](https://github.com/ministryofjustice/moj-frontend/blob/main/.github/PULL_REQUEST_TEMPLATE)

### Release

Due to the descriptive commits, we are now able to release automatically via CircleCI when a branch is merged into `main`. This takes roughly 5 minutes and then will appear on `npm` for people to consume.
