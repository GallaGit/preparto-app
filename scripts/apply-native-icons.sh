#!/usr/bin/env bash
# Generate Capacitor splash / launcher assets from the existing PWA 512 icon.
# Requires ImageMagick (`convert`). Output quality is limited by the 512 source.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/pwa-512x512.png"
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

icon() {
  local dest="$1"
  local size="$2"
  convert "$SRC" -resize "${size}x${size}" -depth 8 -strip "$dest"
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

# Android launcher (from 512; not a full adaptive set)
for density_size in mdpi:48 hdpi:72 xhdpi:96 xxhdpi:144 xxxhdpi:192; do
  density="${density_size%%:*}"
  size="${density_size##*:}"
  dir="$ROOT/android/app/src/main/res/mipmap-${density}"
  icon "$dir/ic_launcher.png" "$size"
  icon "$dir/ic_launcher_round.png" "$size"
  icon "$dir/ic_launcher_foreground.png" "$size"
done

# iOS splash + App Icon (1024 is an upscale of the 512 PWA icon)
splash "$ROOT/ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732.png" 2732 2732
rm -f "$ROOT/ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-1.png" \
  "$ROOT/ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-2.png"
icon "$ROOT/ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png" 1024

echo "Native icons/splash updated from $SRC"
