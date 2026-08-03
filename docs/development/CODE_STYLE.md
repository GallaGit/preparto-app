# Estilo de código

## Objetivo

Mantener un código consistente, legible y fácil de mantener durante toda la vida del proyecto.

Estas reglas aplican a todo el código fuente de PreParto.

---

## Principios

- La legibilidad tiene prioridad sobre escribir menos código.
- El código debe ser fácil de entender antes que ingenioso.
- La consistencia es más importante que las preferencias personales.
- Cada archivo debe tener una única responsabilidad.

---

## Lenguaje

El proyecto utiliza:

- TypeScript
- React

No se utilizará JavaScript para nuevo código.

---

## Formato

El formato del código será gestionado automáticamente por las herramientas configuradas en el proyecto.

No deben realizarse cambios únicamente por diferencias de formato.

---

## Nombres

### Componentes

Los componentes React utilizarán **PascalCase**.

Ejemplos:

```text
AssessmentCard
ContractionTimer
SymptomForm
```

### Hooks

Los hooks comenzarán siempre con `use`.

Ejemplos:

```text
useAssessment
useContractionTimer
useTimeline
```

### Funciones

Las funciones utilizarán **camelCase**.

Ejemplos:

```text
buildAssessment
calculateFrequency
saveAssessment
```

### Variables

Las variables utilizarán **camelCase**.

Los nombres deberán describir claramente su propósito.

Evitar abreviaturas innecesarias.

### Constantes

Las constantes globales utilizarán **UPPER_SNAKE_CASE**.

Ejemplo:

```text
MAX_CONTRACTIONS
```

### Tipos e interfaces

Utilizarán **PascalCase**.

Ejemplos:

```text
Assessment
Symptom
PregnancyProfile
```

---

## Componentes

Los componentes deben:

- tener una única responsabilidad;
- mantenerse pequeños siempre que sea posible;
- contener únicamente lógica relacionada con la interfaz.

Las reglas del dominio no deben implementarse dentro de componentes React.

---

## Hooks

Los hooks coordinan la comunicación entre la interfaz y los servicios.

No deben contener reglas del dominio.

---

## Servicios

Los servicios contienen la lógica propia de cada funcionalidad.

No deben contener lógica de presentación.

---

## Funciones

Las funciones deben ser pequeñas y resolver una única tarea.

Cuando una función comience a asumir varias responsabilidades, deberá dividirse.

---

## Comentarios

Los comentarios deben explicar **por qué** se hace algo, no **qué** hace el código.

El código debe ser suficientemente claro para minimizar la necesidad de comentarios.

---

## Imports

Los imports deberán mantenerse ordenados y eliminarse cuando no sean utilizados.

---

## Principio final

Antes de añadir una nueva capa, utilidad o abstracción, debe existir una necesidad real que la justifique.

La simplicidad tiene prioridad sobre la sobreingeniería.
