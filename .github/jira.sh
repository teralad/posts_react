#!/bin/sh

TITLE=$(jq -r ".pull_request.title" "$GITHUB_EVENT_PATH")

echo "Collecting information about PR #$TITLE of $GITHUB_REPOSITORY..."

REGEX_PATTERN='^[Dd][Pp].*'

if [[ $TITLE =~ $REGEX_PATTERN ]]; then 
    echo "true"
else
    echo "false"
    exit 1
fi
