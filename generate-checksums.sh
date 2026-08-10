#!/usr/bin/env bash
# Generates SHA-256 checksums for every APK in downloads/
# Usage: ./generate-checksums.sh
# Paste the output into the corresponding app page's download table
# and side panel — replace the placeholder hashes.

set -euo pipefail
DIR="$(dirname "$0")/downloads"

if ! ls "$DIR"/*.apk >/dev/null 2>&1; then
  echo "No .apk files found in $DIR — add your builds there first."
  exit 1
fi

for f in "$DIR"/*.apk; do
  name=$(basename "$f")
  size=$(du -h "$f" | cut -f1)
  hash=$(sha256sum "$f" | cut -d' ' -f1)
  echo "$name"
  echo "  size:   $size"
  echo "  sha256: $hash"
  echo ""
done
