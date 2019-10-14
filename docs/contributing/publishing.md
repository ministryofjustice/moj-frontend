# Publishing MOJ Frontend

1. Checkout **master** and pull latest changes.

2. Run `nvm use` to ensure you are using the right version of Node.js and npm.

3. Run `npm install` to ensure you have the latest dependencies installed.

4. Update [`CHANGELOG.md`](../../CHANGELOG.md) "Unreleased" heading with the new version number.
   This should be incremented based on [Semantic versioning](https://semver.org/) from the unreleased changes listed.

5. Update [`package/package.json`](../../package/package.json) version with the new version number.
This should be incremented based on [Semantic versioning](https://semver.org/) from the unreleased changes listed.

6. Update [`VERSION.md`](../../VERSION.md) version with the new version number.
This should be incremented based on [Semantic versioning](https://semver.org/) from the unreleased changes listed.

7. Save the changes. Do not commit.

8. (Optional) Test in [MOJ Design System](git@github.com:ministryofjustice/moj-design-system.git)

  If you want to test your changes work correctly when used in the MOJ Design System you can use [npm link](https://docs.npmjs.com/cli/link) to test before publishing.

  ```bash
  cd ../mojdt-design-system
  git checkout master
  npm install # note running `npm install` after `npm link` will destroy the link.
  npm link ../@ministryofjustice/frontend/package/
  ```

  When you have finished you need to unlink the package

  ```bash
  npm unlink ../@ministryofjustice/frontend/package/
  ```

9. Commit changes with a message of “Release v0.0.16-alpha” message

12. Create a release on [Github](https://github.com/ministryofjustice/moj-frontend/releases/new)
  - enter the tag version
  - set "MOJ Frontend release v[version-number]" as the title
  - add release notes from changelog
  - mark the release as a pre-release

13. Publish on NPM

- `npm run build:package`
- `cd package`
- `npm login`
- (Enter login credentials - username, password, email address, 2FA code)
- npm publish
- You will get a success or failure message. Publishing will fail if the version number hasn’t been incremented.