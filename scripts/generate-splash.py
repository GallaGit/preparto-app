#!/usr/bin/env python3
"""Generate branded splash / launch assets for Capacitor, Android 12, and PWA.

Brand: cream #fff8f7, rose #874f4f, adaptive pink #EEA5AA.
Requires Pillow. Source mark: store/ios/AppIcon-1024.png (no upscale from 512).

Usage:
  python3 -m pip install --user Pillow
  npm run store:splash
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "store" / "ios" / "AppIcon-1024.png"
STORE_SPLASH = ROOT / "store" / "splash"
PUBLIC_SPLASH = ROOT / "public" / "splash"
IOS_SPLASH = (
    ROOT / "ios" / "App" / "App" / "Assets.xcassets" / "Splash.imageset"
)
ANDROID_RES = ROOT / "android" / "app" / "src" / "main" / "res"

CREAM = (255, 248, 247)  # #fff8f7
ROSE = (135, 79, 79)  # #874f4f
BRAND_PINK = (238, 165, 170)  # #EEA5AA

APPLE_SIZES = [
    (1290, 2796),
    (1284, 2778),
    (1242, 2688),
    (1179, 2556),
    (1170, 2532),
    (1242, 2208),
    (750, 1334),
]


def must_load_source() -> Image.Image:
    if not SRC.is_file():
        raise SystemExit(f"Missing {SRC}")
    image = Image.open(SRC)
    if image.size != (1024, 1024):
        image = image.resize((1024, 1024), Image.Resampling.LANCZOS)
    return image.convert("RGB")


def extract_foreground(rgb: Image.Image) -> Image.Image:
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


def write_png(image: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, format="PNG", optimize=True)


def compose_splash(foreground: Image.Image, width: int, height: int) -> Image.Image:
    canvas = Image.new("RGB", (width, height), CREAM)
    mark_size = int(min(width, height) * 0.38)
    mark = foreground.copy()
    mark.thumbnail((mark_size, mark_size), Image.Resampling.LANCZOS)
    left = (width - mark.width) // 2
    top = (height - mark.height) // 2
    canvas.paste(mark, (left, top), mark)
    return canvas


def android12_icon(foreground: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    inset = int(size * 0.72)
    mark = foreground.copy()
    mark.thumbnail((inset, inset), Image.Resampling.LANCZOS)
    left = (size - mark.width) // 2
    top = (size - mark.height) // 2
    canvas.paste(mark, (left, top), mark)
    return canvas


def status_bar_icon(foreground: Image.Image, size: int = 96) -> Image.Image:
    """White-on-transparent silhouette for Android notification smallIcon."""
    mark = foreground.copy()
    mark.thumbnail((size, size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    left = (size - mark.width) // 2
    top = (size - mark.height) // 2
    canvas.paste(mark, (left, top), mark)
    pixels = canvas.load()
    for y in range(size):
        for x in range(size):
            red, green, blue, alpha = pixels[x, y]
            if alpha == 0:
                continue
            luminance = (red + green + blue) / 3
            pixels[x, y] = (255, 255, 255, 255 if luminance > 40 else 0)
    return canvas.filter(ImageFilter.GaussianBlur(0.2))


def write_android_colors() -> None:
    dest = ANDROID_RES / "values" / "colors.xml"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n'
        "<resources>\n"
        "    <color name=\"colorPrimary\">#874F4F</color>\n"
        "    <color name=\"colorPrimaryDark\">#874F4F</color>\n"
        "    <color name=\"colorAccent\">#EEA5AA</color>\n"
        "    <color name=\"splashBackground\">#FFF8F7</color>\n"
        "</resources>\n",
        encoding="utf-8",
    )


def write_android_styles() -> None:
    dest = ANDROID_RES / "values" / "styles.xml"
    dest.write_text(
        """<?xml version="1.0" encoding="utf-8"?>
<resources>

    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    <style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:statusBarColor">@color/splashBackground</item>
        <item name="android:navigationBarColor">@color/splashBackground</item>
        <item name="android:windowLightStatusBar">true</item>
        <item name="android:background">@null</item>
    </style>

    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="windowSplashScreenBackground">@color/splashBackground</item>
        <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
        <item name="postSplashScreenTheme">@style/AppTheme.NoActionBar</item>
        <item name="android:windowSplashScreenBackground">@color/splashBackground</item>
        <item name="android:background">@drawable/splash</item>
    </style>
</resources>
""",
        encoding="utf-8",
    )


def main() -> None:
    source = must_load_source()
    foreground = extract_foreground(source)

    STORE_SPLASH.mkdir(parents=True, exist_ok=True)
    PUBLIC_SPLASH.mkdir(parents=True, exist_ok=True)

    universal = compose_splash(foreground, 2732, 2732)
    write_png(universal, STORE_SPLASH / "splash-2732x2732.png")
    if IOS_SPLASH.is_dir():
        write_png(universal, IOS_SPLASH / "splash-2732x2732.png")

    portrait = compose_splash(foreground, 1080, 1920)
    write_png(portrait, STORE_SPLASH / "splash-1080x1920.png")
    if ANDROID_RES.is_dir():
        write_android_colors()
        write_android_styles()
        write_png(portrait, ANDROID_RES / "drawable" / "splash.png")
        write_png(
            android12_icon(foreground, 288),
            ANDROID_RES / "drawable" / "splash_icon.png",
        )
        write_png(
            android12_icon(foreground, 1152),
            ANDROID_RES / "drawable-xxxhdpi" / "splash_icon.png",
        )
        write_png(
            status_bar_icon(foreground, 96),
            ANDROID_RES / "drawable" / "ic_stat_preparto.png",
        )

    for width, height in APPLE_SIZES:
        apple = compose_splash(foreground, width, height)
        name = f"apple-{width}x{height}.png"
        write_png(apple, PUBLIC_SPLASH / name)
        write_png(apple, STORE_SPLASH / name)

    print(f"Splash assets written from {SRC}")
    print(f"  iOS: {IOS_SPLASH / 'splash-2732x2732.png'}")
    print(f"  Android drawable/splash.png + splash_icon.png")
    print(f"  PWA apple-touch-startup-image: {PUBLIC_SPLASH}")


if __name__ == "__main__":
    main()
