# Capturas de revisión

Capturas reales de la UI (Vite `preview`) en **es / en / de**. Sin marcos de dispositivo fotográficos: el lienzo coincide con el tamaño de tienda.

**Copy:** la app muestra el descargo existente («no sustituye una valoración médica» / equivalente EN/DE). Estas capturas **no añaden afirmaciones clínicas**.

## Tamaños (evidencia 2026-09-07)

| Dispositivo | Lienzo | Viewport lógico | Densidad | Carpeta |
| ----------- | ------ | --------------- | -------- | ------- |
| iPhone 6,7" | **1290×2796** | 430×932 | 3× | `{locale}/iphone-67/` |
| iPhone 6,5" | **1284×2778** | 428×926 | 3× | `{locale}/iphone-65/` |
| iPhone 5,5" | **1242×2208** | 414×736 | 3× | `{locale}/iphone-55/` |
| Android teléfono | **1080×1920** | 360×640 | 3× | `{locale}/android-phone/` |

Locales: `es`, `en`, `de` (72 PNG + alias).

Alias:

| Carpeta | Origen |
| ------- | ------ |
| `store/screenshots/ios/` | `es/iphone-67/` |
| `store/screenshots/android/` | `es/android-phone/` (nombres `*-phone-1080x1920.png`) |

## Flujos

| Archivo | Pantalla |
| ------- | -------- |
| `01-home-*` | Inicio |
| `02-contracciones-*` | Contracciones |
| `03-sintomas-*` | Síntomas |
| `04-historial-*` | Historial |
| `05-hospital-bag-*` | Qué llevar al hospital |
| `06-privacidad-*` | Privacidad (incluye borrar datos + aviso sanitario) |

Los datos del historial y la maleta son semilla local del script (intervalos holgados, síntomas leves). No representan un caso clínico.

## Regenerar

```bash
npm install
npx playwright install chromium
npm run store:screenshots:ci
```

O en dos terminales: `npm run build` + `preview` en `:4173`, luego `npm run store:screenshots`.

Variables: `STORE_SHOT_BASE_URL` (por defecto `http://127.0.0.1:4173`), `STORE_SHOT_LOCALES` (por defecto `es,en,de`).

Linux/CI usa viewports Playwright (no recorte desde un master único). Los alias iOS/Android ES se copian al final.

## Huecos

Aún no hay iPad ni Play tablet 7"/10".
