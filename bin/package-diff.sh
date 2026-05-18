#!/bin/sh
set -ex

# Computes the diff of `package` between a provided base reference (branch, tag, commit SHA)
# and the current HEAD by building on both branches.
# Since package/ is gitignored, a fresh build is required for each branch.
# It outputs the resulting diff files in the provided workspace folder.
#
# Usage: `bin/package-diff.sh <base-reference> <workspace-folder>`

# Default the base branch to main to allow running locally quickly
base="${1:-main}"
# Default the head to the current branch or commit SHA when detached
head=$(git branch --show-current 2>/dev/null)
head=${head:-$(git rev-parse HEAD)}
# And the output folder to the current working directory
output_folder="${2:-$(pwd)}"

rm -Rf .cache/diff/package
mkdir -p .cache/diff/package

# Switch to base branch and build package
git checkout "$base"
npm ci --ignore-scripts
npm run build:package

# Switch back to original HEAD
# The built package/ files remain in place because package/ is gitignored
git checkout "$head"

# Commit build output from base branch
git add --force package/
git commit --allow-empty -m "Build package output for '$base'" --no-verify

# Build package for original HEAD
npm ci --ignore-scripts
npm run build:package

# Commit build output from original HEAD
git add --force package/
git commit --allow-empty -m "Build package output for '$head'" --no-verify

# Diff the minified JS file
git diff HEAD^ -- package/moj/moj-frontend.min.js \
  > "$output_folder/.cache/diff/package/js.diff"

# Diff the minified CSS file
git diff HEAD^ -- package/moj/moj-frontend.min.css \
  > "$output_folder/.cache/diff/package/css.diff"

# Diff the rest of the files, excluding source maps and minified files
# See https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec
git diff -M05 HEAD^ -- package \
  ":(exclude)package/**/*.min.*" \
  ":(exclude)package/**/*.map" \
  > "$output_folder/.cache/diff/package/other.diff"
