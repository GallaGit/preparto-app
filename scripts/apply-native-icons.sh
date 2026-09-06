#!/usr/bin/env bash
# Generate Capacitor splash from the PWA 512 icon, and launcher assets from
# the 1024 store marketing icon when present (preferred).
# Requires ImageMagick (`convert`) for splash. Launcher icons: prefer
# `python3 scripts/generate-store-icons.py` (Pillow).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/pwa-512x512.png"
STORE_ICON="$ROOT/store/ios/AppIcon-1024.png"
ICON_SRC="$SRC"
if [[ -f "$STORE_ICON" ]]; then
  ICON_SRC="$STORE_ICON"
fi
BG='#fff8f7'

if [[ ! -f "$SRC" ]]; then
  echo "Missing $SRC" >&2
  exit 1
fi
if ! command -v convert >/dev/null 2>&1; then
  echo "ImageMagick convert is required." >&2
  exit 1
fi

splash() {
  local dest="$1"
  local w="$2"
  local h="$3"
  local shorter=$((w < h ? w : h))
  local icon=$((shorter * 4 / 10))
  convert -size "${w}x${h}" "xc:${BG}" \
    \( "$SRC" -resize "${icon}x${icon}" \) \
    -gravity center -compose over -composite -depth 8 -strip "$dest"
}

# Android splash (match Capacitor template sizes)
splash "$ROOT/android/app/src/main/res/drawable/splash.png" 480 320
splash "$ROOT/android/app/src/main/res/drawable-land-mdpi/splash.png" 480 320
splash "$ROOT/android/app/src/main/res/drawable-land-hdpi/splash.png" 800 480
splash "$ROOT/android/app/src/main/res/drawable-land-xhdpi/splash.png" 1280 720
splash "$ROOT/android/app/src/main/res/drawable-land-xxhdpi/splash.png" 1600 960
splash "$ROOT/android/app/src/main/res/drawable-land-xxxhdpi/splash.png" 1920 1280
splash "$ROOT/android/app/src/main/res/drawable-port-mdpi/splash.png" 320 480
splash "$ROOT/android/app/src/main/res/drawable-port-hdpi/splash.png" 480 800
splash "$ROOT/android/app/src/main/res/drawable-port-xhdpi/splash.png" 720 1280
splash "$ROOT/android/app/src/main/res/drawable-port-xxhdpi/splash.png" 960 1600
splash "$ROOT/android/app/src/main/res/drawable-port-xxxhdpi/splash.png" 1280 1920

# Android / iOS launcher: prefer the 1024 marketing icon via Pillow.
if command -v python3 >/dev/null 2>&1 && python3 -c 'import PIL' 2>/dev/null; then
  python3 "$ROOT/scripts/generate-store-icons.py"
else
  echo "Pillow missing; falling back to ImageMagick resize of $ICON_SRC" >&2
  for density_size in mdpi:48 hdpi:72 xhdpi:96 xxhdpi:144 xxxhdpi:192; do
    density="${density_size%%:*}"
    size="${density_size##*:}"
    dir="$ROOT/android/app/src/main/res/mipmap-${density}"
    convert "$ICON_SRC" -resize "${size}x${size}" -depth 8 -strip "$dir/ic_launcher.png"
    convert "$ICON_SRC" -resize "${size}x${size}" -depth 8 -strip "$dir/ic_launcher_round.png"
    convert "$ICON_SRC" -resize "${size}x${size}" -depth 8 -strip "$dir/ic_launcher_foreground.png"
  done
  convert "$ICON_SRC" -resize "1024x1024" -depth 8 -strip \
    "$ROOT/ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png"
fi

# iOS splash (background + centered mark; still from PWA 512 for splash only)
splash "$ROOT/ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732.png" 2732 2732
rm -f "$ROOT/ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-1.png" \
  "$ROOT/ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-2.png"

echo "Native splash updated from $SRC; launcher from $ICON_SRC"
