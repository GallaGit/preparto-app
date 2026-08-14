# Assessment Engine

## Objetivo

El **Assessment Engine** es el núcleo del dominio de PreParto.

Su responsabilidad es evaluar la información proporcionada por la usuaria y generar una recomendación basada en reglas previamente definidas.

El Assessment Engine no toma decisiones médicas ni realiza diagnósticos. Su función es interpretar información estructurada y producir una evaluación coherente y explicable.

---

## Responsabilidades

El Assessment Engine es responsable de:

- Recibir información estructurada sobre el estado actual de la usuaria.
- Evaluar esa información mediante reglas del dominio.
- Clasificar la situación según las reglas aplicables.
- Generar una explicación de la evaluación.
- Generar una recomendación.

No es responsable de:

- Mostrar información en pantalla.
- Gestionar componentes React.
- Almacenar información.
- Acceder directamente al navegador.
- Realizar llamadas HTTP.
- Utilizar Inteligencia Artificial.

---

## Principios

### Independiente de la interfaz

El Assessment Engine no conoce React ni ningún componente visual.

Debe poder ejecutarse desde cualquier plataforma que proporcione la información necesaria.

### Basado en reglas

Todas las evaluaciones deben estar respaldadas por reglas explícitas del dominio.

No deben existir recomendaciones generadas mediante lógica implícita o difícil de interpretar.

### Explicable

Toda recomendación debe poder responder a la pregunta:

> ¿Por qué se ha generado esta recomendación?

La explicación forma parte del resultado de la evaluación.

### Determinista

Para una misma entrada, el Assessment Engine debe producir siempre el mismo resultado.

No debe depender de estados ocultos ni de factores externos.

---

## Flujo de evaluación

El proceso de evaluación sigue siempre el mismo orden:

1. Recibir información estructurada.
2. Validar los datos disponibles.
3. Evaluar las reglas aplicables.
4. Clasificar el resultado.
5. Generar una explicación.
6. Generar la recomendación.

---

## Entradas

El Assessment Engine trabaja únicamente con información estructurada.

Ejemplos:

- Contracciones.
- Síntomas.
- Eventos registrados.
- Contexto del embarazo.

No procesa texto libre.

La conversión desde lenguaje natural, si existe en el futuro, será responsabilidad de otro módulo.

---

## Salida

El resultado de una evaluación incluye:

- Clasificación (`classification`) y nivel (`level` 0–4).
- Recomendación orientativa (`recommendation`) y acciones (`actions`).
- Explicación (`explanation`) y reglas aplicadas (`matchedRules`).
- Color/icono para UI y `disclaimer` obligatorio.

Implementación: `src/services/assessmentEngine.ts` (`evaluate`).

---

## Dependencias

El Assessment Engine puede utilizar:

- Tipos del dominio.
- Reglas del dominio.
- Utilidades puras.

No debe depender de:

- React.
- Hooks.
- Componentes.
- LocalStorage.
- APIs.
- Backend.
- IA.

---

## Evolución

La primera versión implementará las reglas directamente en TypeScript.

En el futuro podrán evaluarse otras estrategias de configuración si el volumen de reglas lo justifica.

Hasta entonces se prioriza la simplicidad y la mantenibilidad.

---

## Objetivo de diseño

El Assessment Engine debe ser el componente más estable del proyecto.

Los cambios en la interfaz, el almacenamiento o la plataforma no deberían requerir modificaciones en su comportamiento.
