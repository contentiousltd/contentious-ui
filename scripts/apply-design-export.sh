#!/usr/bin/env bash
#
# Apply a Claude Design export to skills/contentious-design/.
#
#   npm run design:apply              # newest *.zip in ~/Downloads
#   npm run design:apply -- path.zip  # a specific zip
#   npm run design:apply -- some/dir  # an already-extracted design-system/ parent
#
# Replaces the download -> copy -> delete-old -> unzip-in-place -> tell-Claude loop with
# one command. Every step below is in docs/design-system-sync.md; this only stops them
# being done by hand.
#
# Two things it exists to prevent, both of which nearly bit us on 1 August 2026:
#
#   1. A STALE EXTRACTED FOLDER. ~/Downloads held design-system/ from 14:31 and a newer
#      zip from 14:46, and the folder was the obvious thing to rsync from. It was two
#      revisions behind. This script always extracts fresh into a temp dir and never
#      reads a previously-extracted folder unless you point at one explicitly.
#   2. A SILENTLY REVERTED SKILL DESCRIPTION. The description in SKILL.md is authored in
#      the design project, so an export overwrites it -- and on the first apply it came
#      back Content Health Check-shaped. It is the skill's invocation trigger, so a
#      narrowed one stops the skill loading in the sibling repos. Restored automatically
#      here, from git, with a note.

set -euo pipefail

cd "$(dirname "$0")/.."
DEST="skills/contentious-design"
SRC_ARG="${1:-}"

if [[ -z "$SRC_ARG" ]]; then
  SRC_ARG=$(ls -t "$HOME"/Downloads/*.zip 2>/dev/null | head -1 || true)
  [[ -n "$SRC_ARG" ]] || { echo "No zip found in ~/Downloads. Pass one explicitly."; exit 1; }
  echo "Newest zip: $SRC_ARG"
fi

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

if [[ -d "$SRC_ARG" ]]; then
  SRC="$SRC_ARG"
else
  # ditto rather than unzip: it handles the resource forks and the AppleDouble entries a
  # macOS-authored zip carries, which unzip scatters as ._ files through the tree.
  ditto -xk "$SRC_ARG" "$WORK/x"
  SRC="$WORK/x"
fi

# The export's payload is a design-system/ directory; accept either its parent or itself.
if [[ -d "$SRC/design-system" ]]; then
  PAYLOAD="$SRC/design-system"
elif [[ -f "$SRC/SKILL.md" ]]; then
  PAYLOAD="$SRC"
else
  echo "No design-system/ in $SRC_ARG -- is that the right archive?"; exit 1
fi

# Sanity: an export that has lost its tokens is a truncated download, not a change.
for required in SKILL.md styles.css tokens/semantic.css components/components.css; do
  [[ -f "$PAYLOAD/$required" ]] || { echo "Refusing: $required missing from the export."; exit 1; }
done

echo
echo "Applying $PAYLOAD -> $DEST"
# --delete because an export is a replacement, not a merge. --delete-excluded because
# without it an --exclude protects a matching directory in the DESTINATION from deletion
# too, so a previously-committed fonts/ would survive every future export untouched.
rsync -a --delete --delete-excluded \
  --exclude 'fonts/' --exclude 'uploads/' --exclude '.DS_Store' --exclude '.thumbnail' \
  "$PAYLOAD/" "$DEST/"

# The family-wide description is the skill's invocation trigger. Narrow it and the skill
# stops loading in the sibling repos that need it.
if ! grep -q 'Voice Tone & Style' "$DEST/SKILL.md"; then
  echo "SKILL.md description reverted to a product-shaped one -- restoring from git."
  DESC=$(git show HEAD:"$DEST/SKILL.md" | grep '^description:')
  # shellcheck disable=SC2016
  awk -v d="$DESC" '/^description:/ {print d; next} {print}' "$DEST/SKILL.md" > "$WORK/skill" \
    && mv "$WORK/skill" "$DEST/SKILL.md"
fi

npm run --silent check:design-sync -- --update

echo
echo "Changed:"
git status --short "$DEST" | sed 's/^/  /'
ADDED_REMOVED=$(git status --short "$DEST" | grep -cv '^ M' || true)
if [[ "$ADDED_REMOVED" != "0" ]]; then
  echo
  echo "  ^ note: $ADDED_REMOVED addition(s)/deletion(s), not just edits. Worth a look."
fi
echo
echo "Next: review the diff, then commit. If a token VALUE moved, this needs a release"
echo "and a consumer bump; if it is purely additive, consumers can pick it up when ready."
