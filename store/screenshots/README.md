# Capturas de revisión

Capturas reales de la UI (Vite `preview`) en español. Sin marcos de dispositivo fotográficos: el lienzo coincide con el tamaño de tienda.

**Copy:** la app muestra el descargo existente («no sustituye una valoración médica»). Estas capturas no añaden afirmaciones clínicas.

## Tamaños

| Plataforma | Lienzo | Viewport lógico | Densidad | Carpeta |
| ---------- | ------ | --------------- | -------- | ------- |
| iPhone 6,7" | **1290×2796** | 430×932 | 3× | `store/screenshots/ios/` |
| Android teléfono | **1080×1920** | 360×640 | 3× | `store/screenshots/android/` |

## Flujos (ES)

| Archivo | Pantalla |
| ------- | -------- |
| `01-home-*.png` | Inicio |
| `02-contracciones-*.png` | Contracciones |
| `03-sintomas-*.png` | Síntomas |
| `04-historial-*.png` | Historial |
| `05-hospital-bag-*.png` | Qué llevar al hospital |
| `06-privacidad-*.png` | Privacidad / aviso sanitario |

Los datos del historial y la maleta son semilla local del script (intervalos holgados, síntomas leves). No representan un caso clínico.

## Regenerar

```bash
npm install
npx playwright install chromium
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
# en otra terminal:
npm run store:screenshots
```

O en un solo proceso:

```bash
npm run store:screenshots:ci
```

Variables: `STORE_SHOT_BASE_URL` (por defecto `http://127.0.0.1:4173`).

## Huecos

Aún no hay sets 6,5" / 5,5" / iPad ni Play tablet, ni el mismo set en inglés.
