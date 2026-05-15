#!/bin/sh
set -ex

# Computes the diff of `dist` between a provided base reference (branch, tag, commit SHA)
# and the current HEAD by building on both branches.
# Since dist/ is gitignored, a fresh build is required for each branch.
# It outputs the resulting diff files in the provided workspace folder.
#
# Usage: `bin/dist-diff.sh <base-reference> <workspace-folder>`

# Default the base branch to main to allow running locally quickly
base="${1:-main}"
# Default the head to the current branch or commit SHA when detached
head=$(git branch --show-current 2>/dev/null || git rev-parse HEAD)
# And the output folder to the current working directory
output_folder="${2:-$(pwd)}"

rm -Rf .cache/diff/dist
mkdir -p .cache/diff/dist

# Switch to base branch and build dist
git checkout "$base"
npm ci --ignore-scripts
npm run build:dist

# Normalise versioned filenames (e.g. moj-frontend-1.0.0.min.js -> moj-frontend.min.js)
# so that git diff compares file content rather than showing delete + add when the version changes
for f in dist/*.min.js; do
  [ -f "$f" ] && mv "$f" dist/moj-frontend.min.js
done
for f in dist/*.min.css; do
  [ -f "$f" ] && mv "$f" dist/moj-frontend.min.css
done

# Switch back to original HEAD
# The built dist/ files remain in place because dist/ is gitignored
git checkout "$head"

# Commit build output from base branch
git add --force dist/
git commit --allow-empty -m "Build dist output for '$base'" --no-verify

# Build dist for original HEAD
npm ci --ignore-scripts
npm run build:dist

# Normalise versioned filenames
for f in dist/*.min.js; do
  [ -f "$f" ] && mv "$f" dist/moj-frontend.min.js
done
for f in dist/*.min.css; do
  [ -f "$f" ] && mv "$f" dist/moj-frontend.min.css
done

# Commit build output from original HEAD
git add --force dist/
git commit --allow-empty -m "Build dist output for '$head'" --no-verify

# Diff the minified JS file
git diff HEAD^ -- dist/moj-frontend.min.js \
  > "$output_folder/.cache/diff/dist/js.diff"

# Diff the minified CSS file
git diff HEAD^ -- dist/moj-frontend.min.css \
  > "$output_folder/.cache/diff/dist/css.diff"

# Diff the rest of the files, excluding source maps, minified files, and the release zip
# See https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec
git diff -M05 HEAD^ -- dist \
  ":(exclude)dist/*.min.*" \
  ":(exclude)dist/*.map" \
  ":(exclude)dist/release.zip" \
  > "$output_folder/.cache/diff/dist/other.diff"
