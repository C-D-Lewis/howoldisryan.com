#!/usr/bin/env bash

set -eu

# Order dependent
SITE_URL=howoldisryan.com

# Get CloudFront distribution ID
CF_DIST_ID=$(aws cloudfront list-distributions | jq -r ".DistributionList.Items[] | select(.Aliases.Items[0] == \"$SITE_URL\") | .Id")

# Create new invalidation
RES=$(aws cloudfront create-invalidation --distribution-id $CF_DIST_ID --paths "/*")
INVALIDATION_ID=$(echo $RES | jq -r '.Invalidation.Id')

# Wait for invalidation complete
echo "Waiting for invalidation-completed for $INVALIDATION_ID..."
aws cloudfront wait invalidation-completed --distribution-id $CF_DIST_ID --id $INVALIDATION_ID

echo "Invalidation completed"
