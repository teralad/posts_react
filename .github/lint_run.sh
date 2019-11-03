#!/bin/sh

echo "Current path is $GITHUB_EVENT_PATH.."
PR_NUMBER=$(jq -r ".issue.number" "$GITHUB_EVENT_PATH")
echo "Collecting information about PR #$PR_NUMBER of $GITHUB_REPOSITORY..."
echo "Github token is $GITHUB_TOKEN..."

if [[ -z "$GITHUB_TOKEN" ]]; then
	echo "Set the GITHUB_TOKEN env variable."
	exit 1
fi

URI=https://api.github.com
API_HEADER="Accept: application/vnd.github.v3+json"
AUTH_HEADER="Authorization: token $GITHUB_TOKEN"

pr_resp=$(curl -X GET -s -H "${AUTH_HEADER}" -H "${API_HEADER}" \
          "${URI}/repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER")

BASE_REPO=$(echo "$pr_resp" | jq -r .base.repo.full_name)
BASE_BRANCH=$(echo "$pr_resp" | jq -r .base.ref)

if [[ -z "$BASE_BRANCH" ]]; then
	echo "Cannot get base branch information for PR #$PR_NUMBER!"
	echo "API response: $pr_resp"
	exit 1
fi

HEAD_REPO=$(echo "$pr_resp" | jq -r .head.repo.full_name)
HEAD_BRANCH=$(echo "$pr_resp" | jq -r .head.ref)

echo "Base branch for PR #$PR_NUMBER is $BASE_BRANCH and current branch is $HEAD_BRANCH"

# make sure branches are up-to-date
git fetch origin $BASE_BRANCH
git fetch origin $HEAD_BRANCH

# do the rebase

git checkout -b $HEAD_BRANCH origin/$HEAD_BRANCH
git rebase origin/$BASE_BRANCH

git diff -z --name-only --diff-filter=ACMRTUB `git merge-base HEAD $BASE_BRANCH` | xargs -0 npm run lint