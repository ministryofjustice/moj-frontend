# Deploying the Design System website

The design system website uses a continuous integration and deployment (CI/CD)
pipeline to automatically build and deploy the website whenever changes are made
to the codebase. The deployment process is managed using GitHub Actions, which
runs a series of jobs to build the site and deploy it to the hosting
environment.

## Deploying a preview of your changes

To deploy a preview of your changes, create a pull request (PR) in the GitHub
repository. Add the `preview: request` label to the PR. This will trigger the
CI/CD pipeline to build the site and deploy a preview version of the website.
The preview will be available at a unique URL, which will be posted in the PR
comments. 

Any further pushes to the PR will automatically trigger a rebuild and redeploy
of the preview site. You can view the preview site to verify that your changes
look and function as expected before merging the PR.

## Deploying to production

Once your changes have been reviewed and approved, and all the GitHub automated
checks have passed, you can merge the PR into the `main` branch. This will
trigger the CI/CD pipeline to build the site and automatically deploy it to the production
environment. The changes will be live on the design system website within a few
minutes.
