# Publishing

To publish a new version of the moj-frontend package, you need to create a pull
request (PR) with the changes you want to release. The PR title should follow
the angular commit message guidelines, as described in the
[Versioning](versioning.md) section.

Once the PR has been approved and merged, the CI/CD pipeline will automatically
build and publish any changes to the design system website.

A new version of the moj-frontend package must be published manually to npm.
This is done using a GitHub Action.

## Do a dry run

Before publishing a new version of the package, **you must do a dry run** to check
what the next version will be. This is done using the "Publish package" workflow
in dry run mode.

1. Open the [**Actions** tab](https://github.com/ministryofjustice/moj-frontend/actions) on the `ministryofjustice/moj-frontend` repo.

2. Select the ["Publish package" workflow](https://github.com/ministryofjustice/moj-frontend/actions/workflows/publish-package.yml) and run the workflow:
   1. Set the **Use workflow from** select field to `main`.
   2. Set the **Publish mode** to `dryrun`.
   3. Select **Run workflow**.

3. Inspect the running workflow - within the build job there will be a step
   called "Get next version" which will output the results of semantic-release's
   versioning analysis. This will show you what the next version of the package
   will be, based on the commit messages in the PR. Check that this is the
   version you expect to be published.

4. If the next version is not what you expect, you will need to amend the PR
   commit messages to ensure that they follow the angular commit message
   guidelines. You can then re-run the dry run workflow to check that the next
   version is now correct.

## Publish the package

1. Open the [**Actions** tab](https://github.com/ministryofjustice/moj-frontend/actions) on the `ministryofjustice/moj-frontend` repo.

2. Select the ["Publish package" workflow](https://github.com/ministryofjustice/moj-frontend/actions/workflows/publish-package.yml) and run the workflow:
   1. Set the **Use workflow from** select field to `main`.
   2. Set the **Publish mode** to `publish`.
   3. Select **Run workflow**.

3. When the workflow has completed, check the [npm package
   page](https://www.npmjs.com/package/@ministryofjustice/moj-frontend) to
   confirm that the new version has been published. Also check the [GitHub
   releases page](https://://github.com/ministryofjustice/moj-frontend/releases)
   to confirm that a new release has been created with the correct version
   number and edit the release note.
