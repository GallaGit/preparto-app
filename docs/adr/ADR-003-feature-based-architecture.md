# ADR-003: Arquitectura modular por funcionalidades

## Estado

Aceptada

---

## Fecha

2026-08-03

---

## Contexto

El proyecto crecerá de forma incremental incorporando nuevas capacidades relacionadas con el preparto.

La organización del código debe facilitar ese crecimiento sin aumentar el acoplamiento entre módulos.

---

## Problema

Definir cómo organizar el código fuente de la aplicación.

---

## Decisión

Se utilizará una **arquitectura modular basada en funcionalidades del dominio (Feature-Based Architecture)**.

Cada funcionalidad agrupará sus propios componentes, hooks, servicios y tipos.

---

## Justificación

Esta organización permite:

- Separar responsabilidades.
- Reducir el acoplamiento.
- Mantener alta cohesión dentro de cada módulo.
- Facilitar la incorporación de nuevas funcionalidades.

Además, evita la complejidad de una Clean Architecture completa, que actualmente no está justificada.

---

## Consecuencias

### Positivas

- Código más organizado.
- Mayor facilidad de mantenimiento.
- Escalabilidad progresiva.
- Responsabilidades claramente definidas.

### Negativas

- Requiere mantener una disciplina constante para evitar dependencias entre módulos.

---

## Alternativas consideradas

### Organización por tipo de archivo

Se descarta porque dificulta la evolución del proyecto conforme aumenta el número de funcionalidades.

### Clean Architecture

Se descarta para la primera versión por introducir una complejidad que no aporta un beneficio proporcional al tamaño actual del proyecto.

---

## Revisión

La organización de los módulos podrá evolucionar conforme crezca el dominio, manteniendo siempre la separación de responsabilidades.
