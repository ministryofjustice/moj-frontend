# Versioning

The project uses semantic-release to automate changelog generation, release notes, deployment and publishing based on the content of commit messages.

Commit messages and PR titles must follow the angular commit message guidelines:
```
<type>(<scope>): <subject>

<BLANK LINE>

<body>

<BLANK LINE>

<footer>
```

The `<type>` and `<subject>` are mandatory and the `<scope>` is optional.

Type must be one of the following:

  - **feat:** A new feature
  - **fix:** A bug fix
  - **docs:** Documentation only changes
  - **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  - **refactor:** A code change that neither fixes a bug nor adds a feature
  - **perf:** A code change that improves performance
  - **test:** Adding missing or correcting existing tests
  - **chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation

Based on the content of the commit message, different actions will be performed see: default release rules

  - **fix:** will bump the patch version
  - **feat:** will bump the minor version
  - **perf:** will bump the patch version

> [!IMPORTANT]
> **fix:**, **feat:** and **perf:** should ONLY be used for changes within the `src/` directory.

To ensure this formatting, the repo is configured with a github action that will
validate that the PR title follows the angular commit message guidelines. If it
does not, the PR will be blocked from merging. This is because we use a squash
and merge strategy, so the PR title will be used as the commit message for the
merge commit.

