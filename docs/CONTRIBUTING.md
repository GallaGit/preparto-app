# Guía de Contribución

¡Gracias por tu interés en contribuir a PreParto!

Este documento describe las normas y buenas prácticas para colaborar en el proyecto. El objetivo es mantener una base de código consistente, fácil de mantener y alineada con la visión del producto.

---

# Filosofía del proyecto

PreParto es una Progressive Web App (PWA) diseñada para acompañar a mujeres embarazadas durante el preparto mediante herramientas de registro y recomendaciones basadas en evidencia.

Nuestros principios son:

- Priorizar la simplicidad antes que la complejidad.
- Evitar la sobrearquitectura.
- Diseñar componentes pequeños y reutilizables.
- Mantener el funcionamiento offline siempre que sea posible.
- Basar las recomendaciones en evidencia científica.
- Nunca sustituir el criterio de un profesional sanitario.
- Documentar las decisiones importantes.
- Priorizar la experiencia de la usuaria.

---

# Idioma

## Código

Todo el código debe escribirse en inglés.

Incluye:

- Variables
- Funciones
- Componentes
- Hooks
- Interfaces
- Tipos
- Carpetas
- Archivos

Ejemplo:

```ts
calculateContractionDuration()
saveMedicalEvent()
isHospitalRecommended()
```

No utilizar nombres en español.

---

## Documentación

Toda la documentación del proyecto se redactará en español mientras el proyecto permanezca en esta etapa.

Esto incluye:

- README
- Documentación técnica
- Arquitectura
- Roadmap
- Issues
- Pull Requests (preferiblemente)

---

# Flujo de ramas

Se utilizará un flujo basado en Git Flow simplificado.

```
main
develop
feature/*
release/*
hotfix/*
```

## main

Contiene únicamente versiones estables.

Nunca desarrollar directamente sobre esta rama.

---

## develop

Rama principal de desarrollo.

Todas las funcionalidades deben integrarse aquí antes de llegar a main.

---

## feature

Cada nueva funcionalidad debe desarrollarse en una rama independiente.

Ejemplos:

```
feature/contraction-timer
feature/offline-storage
feature/symptom-history
```

---

## release

Preparación de una nueva versión estable.

---

## hotfix

Correcciones urgentes sobre producción.

---

# Convención de Commits

Se utilizará Conventional Commits.

Ejemplos:

```
feat(timer): add contraction timer

fix(storage): prevent duplicated events

docs: update architecture

refactor(timer): simplify duration calculation

style: format code

test: add timer tests

build: update vite configuration

ci: update github actions
```

Tipos permitidos:

- feat
- fix
- docs
- refactor
- style
- test
- build
- ci
- chore

---

# Pull Requests

Todo cambio debe realizarse mediante Pull Request.

El objetivo es mantener un historial claro y facilitar la revisión del código.

Una Pull Request debe:

- Tener un objetivo claro.
- Resolver una única funcionalidad o problema.
- Estar relacionada con una Issue cuando exista.
- Describir brevemente los cambios realizados.
- Explicar cualquier decisión técnica relevante.

---

# Calidad del código

Antes de enviar una Pull Request verificar:

- El proyecto compila correctamente.
- No existen errores de TypeScript.
- No existen errores de ESLint.
- No se introducen warnings innecesarios.
- No se rompe funcionalidad existente.
- El código es legible.

---

# Definition of Done

Una tarea se considera terminada cuando:

- Cumple todos los criterios de aceptación.
- El código compila correctamente.
- No existen errores de lint.
- No existen errores de TypeScript.
- La funcionalidad ha sido revisada.
- La documentación se actualiza si corresponde.
- La Pull Request ha sido aprobada.

---

# Arquitectura

Antes de añadir una nueva funcionalidad preguntarse:

- ¿Puede resolverse reutilizando componentes existentes?
- ¿Introduce complejidad innecesaria?
- ¿Existe una solución más simple?
- ¿Respeta la arquitectura del proyecto?

La solución más sencilla que cumpla los requisitos suele ser la correcta.

---

# Componentes

Intentar que los componentes:

- Tengan una única responsabilidad.
- Sean reutilizables.
- Sean fáciles de probar.
- Mantengan una API simple.

Evitar componentes excesivamente grandes.

---

# Offline First

Siempre que sea posible:

- La aplicación debe funcionar sin conexión.
- Los datos importantes deben almacenarse localmente.
- La pérdida de conexión no debe impedir el uso de funciones críticas.

---

# Evidencia médica

Las recomendaciones implementadas deben estar respaldadas por documentación médica.

No deben añadirse reglas basadas en opiniones personales.

Las fuentes utilizadas deben documentarse en `MEDICAL_RULES.md`.

---

# Uso de Inteligencia Artificial

Se permite utilizar herramientas de IA como apoyo durante el desarrollo.

Sin embargo:

- Todo el código generado debe entenderse antes de integrarse.
- Ningún cambio debe aceptarse únicamente porque fue generado por IA.
- Las decisiones de arquitectura deben justificarse.
- La responsabilidad final del código siempre recae en quien realiza la contribución.

---

# Código limpio

Priorizar siempre:

- Funciones pequeñas.
- Nombres descriptivos.
- Evitar duplicación.
- Evitar comentarios innecesarios.
- Preferir código claro antes que código ingenioso.

---

# Comunicación

Las discusiones técnicas deben centrarse en argumentos objetivos.

Las decisiones importantes deberán documentarse para futuras referencias.

---

# Gracias

Gracias por dedicar tiempo a mejorar PreParto.

Cada contribución ayuda a construir una aplicación más útil, segura y mantenible para las futuras familias que la utilicen.
