# ADR-001: Uso de React como framework principal

## Estado

Aceptada

---

## Fecha

2026-08-03

---

## Contexto

PreParto es una Progressive Web App (PWA) cuyo objetivo es ofrecer una solución sencilla y mantenible para acompañar a la usuaria durante el preparto.

La interfaz requiere un desarrollo basado en componentes reutilizables y una buena experiencia de desarrollo sin añadir complejidad innecesaria.

---

## Problema

Seleccionar el framework sobre el que se desarrollará toda la interfaz de usuario.

---

## Decisión

Se utilizará **React** como framework principal para el desarrollo de la interfaz de usuario.

La lógica del dominio permanecerá desacoplada de React siempre que sea posible.

---

## Justificación

React ofrece:

- Un modelo basado en componentes reutilizables.
- Un ecosistema maduro.
- Integración natural con TypeScript.
- Compatibilidad con el stack tecnológico ya definido para el proyecto.
- Facilidad para evolucionar hacia una futura aplicación móvil reutilizando parte del conocimiento adquirido.

Además, React ya forma parte del proyecto desde su inicio, por lo que cambiar de tecnología no aportaría beneficios que justifiquen el coste.

---

## Consecuencias

### Positivas

- Desarrollo consistente con el stack actual.
- Amplia documentación y comunidad.
- Curva de aprendizaje alineada con el equipo.
- Buena mantenibilidad a largo plazo.

### Negativas

- La lógica del dominio deberá mantenerse separada para evitar dependencias innecesarias con React.

---

## Alternativas consideradas

### Vue

No aporta una ventaja clara respecto a React para los objetivos actuales del proyecto.

### Svelte

Aunque ofrece un enfoque interesante, introduciría un cambio completo del stack sin un beneficio proporcional.

---

## Revisión

Esta decisión solo deberá revisarse si el proyecto cambia de plataforma o aparecen necesidades que React no pueda cubrir razonablemente.
