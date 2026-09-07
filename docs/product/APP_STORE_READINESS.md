# Preparación para App Store / Play

Checklist actualizado en el ciclo de implementación (2026-09-07). Contrasta requisitos de tienda con el repositorio. **No afirma que la app esté lista para enviar a App Store o Play.**

Estados:

| Marca | Significado |
| ----- | ----------- |
| **Hecho** | Evidencia en el repo (código, assets o docs). |
| **Parcial** | Existe una base, pero no cubre el requisito de tienda. |
| **Hueco** | No hay evidencia; bloquea o retrasa una ficha de tienda. |

---

## Decisión de este ciclo: Capacitor (scaffold), no envío a tiendas

PreParto sigue siendo una **PWA** (Vite + `vite-plugin-pwa`) en GitHub Pages. Este ciclo añade **scaffolding Capacitor** para iOS y Android que empaqueta el build Vite (`dist`) en un WebView. **No hay publicación** en App Store Connect ni Play Console.

| Opción | Cubierta | Estado en este repo | Riesgo |
| ------ | -------- | ------------------- | ------ |
| **PWA** | Instalación web / «Añadir a pantalla de inicio». | Hecho (Pages). | iOS Safari limita notificaciones y UX de instalación. |
| **Capacitor** | Proyectos nativos iOS + Android que sirven `dist`. | **Parcial:** `capacitor.config.ts`, `@capacitor/*`, carpetas `android/` e `ios/`. | Apple **4.2 Minimum Functionality**: un wrapper fino que solo muestra la web suele rechazarse. Capacitor empaqueta `dist` (offline) y ahora usa APIs nativas (StatusBar, Haptics, App, Keyboard, Share, Preferences, Local Notifications, KeepAwake). **Sigue siendo un WebView**, no una UI nativa. Riesgo 4.2 **mitigado, no eliminado**. **No enviar a App Store en este estado.** |
| **TWA** (Play) | Envolver la PWA hospedada. | **Hueco.** No hay Bubblewrap / Digital Asset Links. Alternativa a Capacitor para Play. | No cubre App Store. |

---

## Cómo abrir los proyectos nativos

Requisitos: Node 22, Java 17+ (Android), Xcode (solo macOS, iOS), Android Studio.

```bash
npm install
npm run cap:sync    # build Vite → dist y `npx cap sync`
npm run cap:android # abre Android Studio (`npx cap open android`)
npm run cap:ios     # abre Xcode (`npx cap open ios`) — solo macOS
```

- App id: `com.gallagit.preparto`
- Nombre: `PreParto`
- `webDir`: `dist` (salida de Vite)

Tras cambiar el frontend: `npm run cap:sync` de nuevo. No uses `npx cap copy` sin un `dist` reciente.

`npx cap open ios` **no funciona en Linux**; el proyecto `ios/` se genera y se versiona para abrirlo en un Mac.

---

## Checklist

### Empaquetado y presencia en tienda

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| PWA instalable (`display: standalone`, SW, manifest) | **Hecho** | `vite.config.ts` (`VitePWA`, `registerType: 'prompt'`), `UpdateBanner`. |
| Hosting HTTPS de la PWA | **Hecho** | `.github/workflows/deploy-github-pages.yml` → `gh-pages`. |
| Wrapper TWA (Play) | **Hueco** | Sin Bubblewrap, `assetlinks.json` ni TWA. |
| Wrapper Capacitor (iOS/Android) | **Parcial** | `@capacitor/core`, `cli`, `ios`, `android` + plugins nativos (ver 4.2). `capacitor.config.ts` (`webDir: dist`). Falta firmar, cuentas de consola y una revisión humana de 4.2. |
| Cuenta / ficha App Store Connect | **Hueco** | Fuera del repo (legal, acuerdos, categoría Salud). |
| Cuenta / ficha Google Play Console | **Hueco** | Fuera del repo (Data safety, categoría). |
| Dominio / URL canónica estable para TWA | **Parcial** | Pages en `https://gallagit.github.io/preparto-app/` (base `/preparto-app/`). Un TWA suele pedir dominio propio y Digital Asset Links. |

### Iconos

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Favicon + mask icon | **Hecho** | `public/favicon.svg`, `public/mask-icon.svg`. |
| Iconos PWA 192 / 512 / maskable | **Hecho** | `public/pwa-192x192.png`, `pwa-512x512.png`, `pwa-512x512-maskable.png`. |
| Apple touch icon | **Hecho** | `public/apple-touch-icon.png` (180×180); ahora también en `index.html`. |
| Juego de iconos nativos (iOS 1024, Adaptive Android, etc.) | **Hecho** | Marketing 1024 RGB en `store/ios/AppIcon-1024.png` (marca a sangrado completo, sin máscara iOS horneada). Adaptive Android: `store/android/ic_launcher_foreground.png` + `ic_launcher_background.png` (`#EEA5AA`) y densidades en `android/app/src/main/res/mipmap-*`. Regenerar: `npm run store:icons`. |
| Enlaces `apple-touch-icon` en `index.html` fuente | **Hecho** | Declarado en `index.html`. |

### Splash / pantalla de lanzamiento

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| `theme_color` / `background_color` del manifest | **Hecho** | `#874f4f` / `#fff8f7` en `vite.config.ts`; `theme-color` en `index.html`. |
| Splash nativo Capacitor / Android 12 | **Hecho** (assets) | `npm run store:splash` (`scripts/generate-splash.py`): cream `#fff8f7`, rosa `#EEA5AA`, marca `#874f4f`. Capacitor `SplashScreen` (`launchAutoHide: false`, hide desde JS). Android 12 `Theme.SplashScreen` + `splash.png` / `splash_icon.png`. Falta validar en dispositivo físico. |
| Splash Apple (`apple-touch-startup-image`) | **Hecho** (PWA) | Tamaños en `public/splash/apple-*.png` y metas en `index.html` (6,7" / 6,5" / 5,5" / 14 Pro / 13 / SE). iOS `Splash.imageset` 2732². No cubre todos los iPad. |
| `apple-mobile-web-app-capable` / título | **Hecho** | En `index.html` fuente. |

### Privacidad

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Datos solo en el dispositivo | **Hecho** | IndexedDB local (`docs/architecture/STORAGE.md`). Sin backend ni analytics de terceros en `src/`. |
| Exportar / borrar historial en la app | **Hecho** | Compartir/PDF y limpiar historial en `/history`. Flujo **eliminar todos mis datos** (perfil, teléfono, preferencias, maleta, historial) en Configuración y `/privacy`, con confirmación. Solo en dispositivo. |
| Política de privacidad **pública (URL)** | **Parcial** | Página in-app `/privacy` (ES/EN/DE), enlace en Configuración e Inicio. Tras el deploy de Pages: `https://gallagit.github.io/preparto-app/privacy`. Aún no hay ficha de tienda que apunte a esa URL. |
| Privacy Nutrition Labels / Data safety | **Hueco** | Hay que declararlos en las consolas (notificaciones locales, datos de salud en dispositivo). |
| Licencia en el repo | **Hecho** | `LICENSE` MIT, autor Ociel Gallardo Estiven, 2026. |

### Disclaimer médico

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Descargo en documentación | **Hecho** | `docs/medical/DISCLAIMER.md` (ES) + [DISCLAIMER.en.md](../medical/DISCLAIMER.en.md) + [DISCLAIMER.de.md](../medical/DISCLAIMER.de.md). |
| Descargo en la UI | **Hecho** | Home, recomendaciones, Emergencia, export, y enlace desde `/privacy`. |
| Sin reglas clínicas nuevas en este ciclo | **Hecho** | Este ciclo no cambia `MEDICAL_RULES.md` ni el motor. |
| Página legal pública / URL para el listing | **Parcial** | `/privacy` apunta a `DISCLAIMER.md` en GitHub. No hay página legal aparte solo del disclaimer. |
| Copy de tienda no terapéutico | **Parcial** | Borrador ES/EN en [STORE_LISTING.md](./STORE_LISTING.md). No enviado a consolas. |

### Offline

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Precache + runtime Workbox | **Hecho** | `vite.config.ts`. |
| Persistencia local | **Hecho** | IndexedDB `preparto` v4. |
| Indicadores offline / update | **Hecho** | `OfflineBanner`, `UpdateBanner`. |
| Comprobado E2E «recargar sin red» | **Parcial** | `e2e/critical-flows.spec.ts` cubre flujos con red; no hay caso offline. |

### Capturas de revisión (review screenshots)

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Mockup de diseño | **Parcial** | `docs/design/stitch/screen.png`. |
| Set App Store (6,7" / 6,5" / 5,5", iPad si aplica) | **Parcial** | iPhone **6,7" (1290×2796)**, **6,5" (1284×2778)** y **5,5" (1242×2208)** vía Playwright (`npm run store:screenshots`). Alias ES 6,7" en `store/screenshots/ios/`. **Falta iPad.** |
| Set Play (teléfono, 7" / 10" si se declara tablet) | **Parcial** | Teléfono **1080×1920** en `store/screenshots/android/` (alias ES) y `store/screenshots/{locale}/android-phone/`. Faltan 7" / 10" si se declara tablet. |
| Capturas localizadas ES/EN/DE | **Hecho** (teléfono) | Sets ES/EN/DE en `store/screenshots/{locale}/`. Pies de foto no afirman diagnóstico. Falta iPad/tablet. Regenerar: `npm run store:screenshots:ci`. |

### Otros requisitos de revisión

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Idioma del documento HTML | **Hecho** (con límite) | `index.html` arranca en `lang="es"`; un script lee `preparto:v1:locale` y `I18nProvider` actualiza `document.documentElement.lang` (es/en/de). El **web manifest estático** declara `lang: "es"` (`vite.config.ts`): no puede seguir el selector in-app. |
| Notificaciones: permiso y toggles | **Hecho** | Notification API local; Settings. Declarar en Data safety. |
| Llamadas de emergencia (`tel:`) | **Hecho** | `/emergency` + SOS. |
| Edad / categoría salud y embarazo | **Hueco** | Decisión de consola. |
| Guideline Apple 4.2 (no «solo un sitio web») | **Parcial / riesgo residual** | Valor nativo añadido (ciclo 2026-09-07): assets empaquetados (no abre una URL remota); StatusBar de marca; Keyboard resize; back Android = `history.back` (sin `exitApp` en Home); Haptics (timer, SOS, guardar, borrar); Share nativo del historial; Preferences para locale; Local Notifications nativas; KeepAwake / Wake Lock mientras corre el cronómetro; splash de marca. **Residual:** la UI sigue siendo React en WebView. Un revisor puede seguir viendo un sitio empaquetado. No enviar sin revisión humana de 4.2. |
| Cuenta de usuario / login | N/A (hecho por ausencia) | No hay auth; no aplica borrado de cuenta App Store 5.1.1(v). |

---

## Qué no entra en este ciclo

- Envío o publicación en App Store / Play.
- Backend, sincronización o cuentas.
- Nuevas reglas del Assessment Engine / `MEDICAL_RULES.md`.
- Marketing Business ni envío de ficha comercial (hay placeholders en STORE_LISTING.md).
- TWA / Digital Asset Links.
- Capturas iPad / tablet Play 7" y 10".

---

## Qué queda para las tiendas

1. Decidir si Play irá por **TWA** (PWA hospedada) o por el **APK/AAB Capacitor**.
2. ~~Icono 1024 y set nativo (iOS AppIcon, Android adaptive).~~ **Hecho.**
3. ~~Splash por dispositivo.~~ Assets **hechos**; falta validar en hardware.
4. Capturas iPad / tablet Play. Teléfono 6,7" / 6,5" / 5,5" + Android + ES/EN/DE **hecho** (Playwright).
5. Pegar el copy de [STORE_LISTING.md](./STORE_LISTING.md) en consolas + Data safety / Nutrition Labels.
6. Revisión humana de Apple **4.2** (riesgo residual: WebView + plugins).
7. Cuentas de desarrollador, firma y revisión. **Este repo no envía a tiendas.**

---

## Relación

- Estado del producto: [README.md](../../README.md)
- Roadmap Fase 4: [ROADMAP.md](./ROADMAP.md)
- Offline: [OFFLINE_FIRST.md](../architecture/OFFLINE_FIRST.md)
- Disclaimer: [DISCLAIMER.md](../medical/DISCLAIMER.md) · [DISCLAIMER.en.md](../medical/DISCLAIMER.en.md)
- Copy de ficha: [STORE_LISTING.md](./STORE_LISTING.md)
- Bitácora: [DEVELOPMENT_LOG.md](../development/DEVELOPMENT_LOG.md)
