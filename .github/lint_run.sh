#!/bin/sh

PR_NUMBER=$(jq -r ".number" "$GITHUB_EVENT_PATH")

cat $GITHUB_EVENT_PATH

echo "Collecting information about PR #$PR_NUMBER of $GITHUB_REPOSITORY..."
echo "Github token is $GITHUB_TOKEN..."

BASE_SHA=$(jq -r ".pull_request.base.sha" "$GITHUB_EVENT_PATH")
HEAD_SHA=$(jq -r ".pull_request.head.sha" "$GITHUB_EVENT_PATH")

# do the lint only for changed files.
git diff -z --name-only --diff-filter=ACMRTUB $BASE_SHA..$HEAD_SHA -- '*.js' | xargs -0 npm run lint
