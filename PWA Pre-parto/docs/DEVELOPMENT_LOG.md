# 📖 PreParto - Bitácora de Desarrollo

## Proyecto

**Nombre:** PreParto

**Tipo:** Progressive Web App (PWA)

**Objetivo:**
Ayudar a mujeres embarazadas durante el preparto mediante herramientas de apoyo e información basada en protocolos, sin sustituir la valoración médica.

---

# Fase 1 - Base del proyecto

**Fecha:** 2026-06-29

## Objetivos

- Crear la estructura inicial del proyecto.
- Configurar React + TypeScript + Vite.
- Configurar Tailwind CSS.
- Configurar la PWA.
- Implementar la navegación.
- Crear la pantalla principal.
- Implementar el primer cronómetro de contracciones.

## Funcionalidades implementadas

- Arquitectura inicial.
- Componentes reutilizables (`Button`, `Card`, `Layout`, `TimerDisplay`).
- Layout principal.
- React Router.
- Pantalla Home.
- Pantalla Contracciones.
- Cronómetro funcional (Iniciar → Finalizar → Nueva contracción).

## Decisiones técnicas

- React + TypeScript.
- Vite.
- Tailwind CSS.
- Arquitectura basada en componentes.
- Preparado para escalar por módulos.
- Lógica del cronómetro aislada en `useTimer`.
- Sin persistencia en esta fase.

## Problemas encontrados

- `npm install` falló por certificado SSL (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`).

## Soluciones aplicadas

- Instalación con `npm install --strict-ssl=false`.

## Próximos pasos

- Historial de contracciones.
- Persistencia con IndexedDB.
- Estadísticas.
- Recomendaciones automáticas.

---

# Fase 2 - Historial y persistencia de contracciones

**Fecha:** 2026-07-03

## Objetivos

- Convertir el cronómetro en una herramienta útil con historial persistente.
- Calcular automáticamente duración e intervalos.
- Mostrar estadísticas y recomendaciones orientativas.

## Funcionalidades implementadas

- Tipo `Contraction` con tipado estricto.
- Servicio `contractionsStorage.ts` con IndexedDB (`save`, `getAll`, `deleteContraction`, `clear`).
- Hook `useContractions` que encapsula timer, persistencia, estadísticas y recomendaciones.
- Componentes: `ContractionCard`, `HistoryList`, `StatisticsCard`, `RecommendationBanner`.
- Historial automático al finalizar cada contracción.
- Eliminación individual y borrado total con confirmación.
- Estadísticas: última duración, promedio de duración, promedio de intervalo, total.
- Recomendación basada en reglas (patrón 5-1-1 orientativo) con aviso legal.

## Decisiones técnicas

- **IndexedDB nativo** sin librerías adicionales para mantener el bundle ligero.
- **Separación de capas:** servicio de almacenamiento → hook → componentes de presentación.
- **Intervalo** calculado entre el inicio de una contracción y el inicio de la anterior (estándar clínico).
- **Utilidades puras** para estadísticas (`contractionStats.ts`) y recomendaciones (`contractionRecommendation.ts`).
- **Confirmación nativa** (`window.confirm`) para borrar historial, sin dependencias de UI.
- El resto de la app no conoce la implementación de IndexedDB.

## Problemas encontrados

- Ninguno bloqueante durante la implementación.

## Soluciones aplicadas

- N/A

## Próximos pasos

- Cronómetro de ruptura de bolsa.
- Checklist de síntomas.
- Página de emergencia con contactos.
- Configuración de usuario.
- Tests unitarios y E2E.
- Exportación de historial.

---

# Mejora — Cronómetro global persistente

**Fecha:** 2026-07-09

## Objetivos

- Convertir el cronómetro en estado global de la aplicación.
- Mantener el temporizador activo al navegar entre páginas.
- Mostrar banner global y permitir finalizar desde cualquier pantalla.
- Advertir al usuario si intenta abandonar la app con una contracción activa.

## Cambios realizados

- `TimerProvider` con React Context como única fuente de verdad del cronómetro.
- `ContractionsProvider` con `finishActiveContraction()` compartido (sin duplicar lógica).
- Hook `useTimer()` refactorizado para consumir el contexto global.
- Componente `ActiveContractionBanner` visible en todas las páginas vía `PageHeader`.
- Indicador "En curso" en la tarjeta de Contracciones en Home.
- Evento `beforeunload` cuando hay contracción activa.
- Componente `PageHeader` unificado para títulos y banner en todas las páginas.

## Nueva arquitectura

```
App
└── BrowserRouter
    └── TimerProvider          ← isRunning, startedAt, duration (Date.now() - startedAt)
        └── ContractionsProvider   ← finishActiveContraction(), historial, stats
            └── Routes (páginas consumen hooks)
```

- La duración se calcula con `Date.now() - startedAt`, no con contador incremental.
- `setInterval` (1 s) solo actualiza la interfaz.
- `finishActiveContraction()` es el único flujo de finalización (banner y página Contracciones).

## Motivo del cambio

El cronómetro vivía dentro de `useContractions`, acoplado al ciclo de vida de la página Contracciones. Al navegar, el componente se desmontaba y el temporizador se perdía. Elevar el estado a un Provider global desacopla el timer de cualquier ruta y garantiza precisión basada en timestamps.

## Problemas encontrados

- Ninguno bloqueante.

## Soluciones aplicadas

- N/A

## Próximos pasos

- Persistir estado del timer en IndexedDB para recuperación tras recarga.
- Modal accesible de confirmación en lugar de `window.confirm`.
- Cronómetro de ruptura de bolsa con la misma arquitectura global.

---

# Mejora — Motor de reglas de contracciones

**Fecha:** 2026-07-09

## Objetivos

- Implementar un motor de evaluación independiente de React.
- Clasificar patrones de contracciones en 5 niveles orientativos (0–4).
- Validar el comportamiento con pruebas unitarias.

## Funcionalidades implementadas

- Servicio `contractionAnalyzer.ts` con niveles 0–4.
- Tipos `ContractionAnalysis` y `ContractionAnalysisColor`.
- 12 pruebas unitarias con Vitest cubriendo los 10 escenarios requeridos.
- Integración en `ContractionsProvider` y `RecommendationBanner`.
- Eliminación del antiguo `contractionRecommendation.ts`.

## Decisiones técnicas

- **Motor puro en `services/`** — sin dependencias de React, reutilizable en API futura.
- **Coeficiente de variación** para detectar irregularidad vs regularidad.
- **Prioridad de evaluación:** nivel 4 (muy frecuentes) > nivel 3 (patrón 5-1-1) > nivel 2 (regulares separadas) > nivel 1 (irregulares).
- **Periodo prolongado** evaluado sobre el historial completo (≥ 1 hora).
- **Aviso legal** añadido automáticamente a todos los mensajes.

## Problemas encontrados

- El criterio de "periodo prolongado" fallaba al medir solo las últimas 6 contracciones (25 min máx. a 5 min de intervalo).

## Soluciones aplicadas

- Evaluar el timespan sobre todo el historial registrado.

## Próximos pasos

- Tests de integración del banner con el analizador.
- Parametrizar umbrales desde configuración médica validada.
- Exportar análisis en informe PDF.

---

## Historial de decisiones

### Convenciones

- Conventional Commits.
- Componentes pequeños y reutilizables.
- Lógica desacoplada de la interfaz.
- Tipado estricto con TypeScript.

### Objetivos del proyecto

- Mobile First.
- Accesibilidad.
- Funcionar sin conexión.
- Código mantenible.
- Escalable para futuras funcionalidades (rotura de bolsa, movimientos fetales, síntomas, checklist y exportación de datos).
