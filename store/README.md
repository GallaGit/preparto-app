# Assets de tienda (App Store / Play)

Iconos, splash y capturas de revisión para Capacitor. **No hay envío a tiendas en este ciclo.**

Los pies de foto y el copy de las capturas **no afirman diagnóstico** ni sustituyen valoración médica.

## Iconos

| Archivo | Uso |
| ------- | --- |
| `store/ios/AppIcon-1024.png` | Icono de marketing iOS **1024×1024**, RGB, sin alpha ni esquinas recortadas. |
| `store/android/ic_launcher_foreground.png` | Capa foreground adaptive (marca blanca, fondo transparente, zona segura). |
| `store/android/ic_launcher_background.png` | Capa background adaptive (rosa `#EEA5AA`). |
| `store/android/ic_launcher_full.png` | Composición completa para legado / referencia. |

Regenerar y copiar a `ios/` y `android/`:

```bash
python3 -m pip install --user Pillow
npm run store:icons
```

El script `scripts/generate-store-icons.py` parte del 1024 (no hace upscale del PWA 512). Actualiza:

- `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`
- `android/app/src/main/res/mipmap-*/ic_launcher*.png`
- `android/app/src/main/res/values/ic_launcher_background.xml`

## Splash / launch

Marca: cream `#fff8f7`, rosa `#EEA5AA`, rose `#874f4f`.

```bash
python3 -m pip install --user Pillow
npm run store:splash
```

Escribe `store/splash/`, `public/splash/apple-*.png`, iOS `Splash.imageset` (2732²) y Android `splash.png` / `splash_icon.png` (incl. Android 12 `Theme.SplashScreen`). Las metas `apple-touch-startup-image` están en `index.html`.

## Capturas

Ver [screenshots/README.md](./screenshots/README.md).

Canónico: `store/screenshots/{es,en,de}/{iphone-67,iphone-65,iphone-55,android-phone}/`.

Alias ES para herramientas antiguas:

- `store/screenshots/ios/` ← ES iPhone 6,7"
- `store/screenshots/android/` ← ES teléfono 1080×1920 (`*-phone-1080x1920.png`)

## Qué no cubre este set

- iPad y tablets Play 7" / 10".
- Ficha comercial / envío a consola.
- Validación visual en hardware real (splash Android 12 / iOS LaunchScreen).
