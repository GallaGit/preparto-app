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
