# Assets de tienda (App Store / Play)

Iconos y capturas de revisión para Capacitor. **No hay envío a tiendas en este ciclo.**

La UI de las capturas está en **español**. Los pies de foto no afirman diagnóstico ni sustituyen valoración médica.

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

## Capturas

Ver [screenshots/README.md](./screenshots/README.md).

## Qué no cubre este set

- Tamaños iPhone 6,5" / 5,5" e iPad.
- Tablets Play 7" / 10".
- Capturas localizadas en inglés.
- Ficha comercial / envío a consola.
