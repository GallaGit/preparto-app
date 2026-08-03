# ADR-004: Assessment Engine como núcleo del dominio

## Estado

Aceptada

---

## Fecha

2026-08-03

---

## Contexto

La funcionalidad principal de PreParto consiste en evaluar información proporcionada por la usuaria para generar una recomendación basada en reglas del dominio.

Era necesario definir cuál sería el núcleo funcional de la aplicación.

---

## Problema

Determinar dónde debe residir la lógica principal del negocio.

---

## Decisión

Se define el **Assessment Engine** como el núcleo del dominio de PreParto.

Su responsabilidad será evaluar información estructurada y generar una recomendación explicada.

---

## Justificación

Centralizar la lógica del dominio permite:

- Evitar duplicación de reglas.
- Mantener un comportamiento consistente.
- Facilitar las pruebas.
- Independizar la lógica de la interfaz.

El Assessment Engine no realiza diagnósticos ni sustituye el criterio de un profesional sanitario.

---

## Consecuencias

### Positivas

- Dominio desacoplado de React.
- Reglas centralizadas.
- Mayor mantenibilidad.
- Posibilidad de reutilizar el dominio en futuras plataformas.

### Negativas

- Requiere mantener una separación clara entre la interfaz y el dominio.

---

## Alternativas consideradas

### Implementar las reglas directamente en los componentes

Se descarta por aumentar el acoplamiento y dificultar el mantenimiento.

### Distribuir las reglas entre distintos servicios

Se descarta para evitar inconsistencias y duplicación de lógica.

---

## Revisión

Las reglas del Assessment Engine se implementarán inicialmente en TypeScript.

La forma de representarlas podrá revisarse en el futuro si el crecimiento del dominio lo requiere, manteniendo el Assessment Engine como único responsable de la evaluación.
