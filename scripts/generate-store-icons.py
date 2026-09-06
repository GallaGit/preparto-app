#!/usr/bin/env python3
"""Rasterize store icons from store/ios/AppIcon-1024.png into Capacitor assets.

Requires Pillow. The 1024 source is a full-bleed marketing mark (no baked iOS
mask). This script does not upscale from the 512 PWA icon.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "store" / "ios" / "AppIcon-1024.png"
ANDROID_STORE = ROOT / "store" / "android"
IOS_APPICON = (
    ROOT / "ios" / "App" / "App" / "Assets.xcassets" / "AppIcon.appiconset"
)
ANDROID_RES = ROOT / "android" / "app" / "src" / "main" / "res"

# Sampled from the 1024 marketing icon corners (blush pink).
BRAND_PINK = (238, 165, 170)
ANDROID_DENSITIES = {
    "mdpi": 48,
    "hdpi": 72,
    "xhdpi": 96,
    "xxhdpi": 144,
    "xxxhdpi": 192,
}
# Adaptive foreground canvas in px at xxxhdpi (108dp * 4).
ADAPTIVE_XXXHDPI = 432


def must_load_source() -> Image.Image:
    if not SRC.is_file():
        raise SystemExit(f"Missing {SRC}")
    image = Image.open(SRC)
    if image.size != (1024, 1024):
        image = image.resize((1024, 1024), Image.Resampling.LANCZOS)
    return image.convert("RGB")


def flatten_ios(image: Image.Image) -> Image.Image:
    """Apple rejects alpha on the 1024 marketing icon."""
    if image.mode == "RGB":
        return image
    canvas = Image.new("RGB", image.size, BRAND_PINK)
    canvas.paste(image, mask=image.split()[-1] if "A" in image.mode else None)
    return canvas


def extract_foreground(rgb: Image.Image) -> Image.Image:
    """Keep the white mark; punch the blush background to transparent."""
    rgba = rgb.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            red, green, blue, _alpha = pixels[x, y]
            distance = (
                abs(red - BRAND_PINK[0])
                + abs(green - BRAND_PINK[1])
                + abs(blue - BRAND_PINK[2])
            ) / 3
            if distance < 28 and red + green + blue < 720:
                pixels[x, y] = (255, 255, 255, 0)
    return rgba


def fit_in_safe_zone(foreground: Image.Image, size: int) -> Image.Image:
    """Center the mark in the Android adaptive safe zone (~66%)."""
    bbox = foreground.getbbox()
    if bbox is None:
        return Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cropped = foreground.crop(bbox)
    safe = int(size * 0.66)
    cropped.thumbnail((safe, safe), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    left = (size - cropped.width) // 2
    top = (size - cropped.height) // 2
    canvas.paste(cropped, (left, top), cropped)
    return canvas


def composite_on_pink(foreground: Image.Image, size: int) -> Image.Image:
    bg = Image.new("RGB", (size, size), BRAND_PINK)
    scaled = foreground.resize((size, size), Image.Resampling.LANCZOS)
    bg.paste(scaled, mask=scaled.split()[-1])
    return bg


def circular_mask(size: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((1, 1, size - 2, size - 2), fill=255)
    return mask.filter(ImageFilter.GaussianBlur(0.4))


def write_png(image: Image.Image, dest: Path, **save_kwargs: object) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, format="PNG", optimize=True, **save_kwargs)


def write_android_color(hex_color: str) -> None:
    dest = ANDROID_RES / "values" / "ic_launcher_background.xml"
    dest.write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n'
        "<resources>\n"
        f'    <color name="ic_launcher_background">{hex_color}</color>\n'
        "</resources>\n",
        encoding="utf-8",
    )


def write_solid_background_drawable() -> None:
    dest = ANDROID_RES / "drawable" / "ic_launcher_background.xml"
    dest.write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n'
        "<shape xmlns:android="
        '"http://schemas.android.com/apk/res/android" '
        'android:shape="rectangle">\n'
        '    <solid android:color="@color/ic_launcher_background" />\n'
        "</shape>\n",
        encoding="utf-8",
    )


def main() -> None:
    source = flatten_ios(must_load_source())
    write_png(source, SRC)
    if IOS_APPICON.is_dir():
        write_png(source, IOS_APPICON / "AppIcon-512@2x.png")

    foreground = extract_foreground(source)
    store_fg = fit_in_safe_zone(foreground, 1024)
    store_bg = Image.new("RGB", (1024, 1024), BRAND_PINK)
    ANDROID_STORE.mkdir(parents=True, exist_ok=True)
    write_png(store_fg, ANDROID_STORE / "ic_launcher_foreground.png")
    write_png(store_bg, ANDROID_STORE / "ic_launcher_background.png")
    write_png(source, ANDROID_STORE / "ic_launcher_full.png")

    hex_color = "#{:02X}{:02X}{:02X}".format(*BRAND_PINK)
    if ANDROID_RES.is_dir():
        write_android_color(hex_color)
        write_solid_background_drawable()
        for density, size in ANDROID_DENSITIES.items():
            mipmap = ANDROID_RES / f"mipmap-{density}"
            fg = fit_in_safe_zone(foreground, size)
            legacy = composite_on_pink(fg, size)
            rounded = legacy.convert("RGBA")
            rounded.putalpha(circular_mask(size))
            write_png(legacy, mipmap / "ic_launcher.png")
            write_png(rounded, mipmap / "ic_launcher_round.png")
            write_png(fg, mipmap / "ic_launcher_foreground.png")

        xxx_fg = fit_in_safe_zone(foreground, ADAPTIVE_XXXHDPI)
        write_png(
            xxx_fg,
            ANDROID_RES / "mipmap-xxxhdpi" / "ic_launcher_foreground.png",
        )

    print(f"Store icons written from {SRC}")
    print(f"  iOS App Icon: {IOS_APPICON / 'AppIcon-512@2x.png'}")
    print(f"  Android adaptive: {ANDROID_STORE}")


if __name__ == "__main__":
    main()
