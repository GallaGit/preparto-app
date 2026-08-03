# Arquitectura

## Objetivo

La arquitectura de **PreParto** está diseñada para ofrecer una base sólida, sencilla y mantenible que permita desarrollar la aplicación de forma incremental sin introducir complejidad innecesaria.

El objetivo no es implementar una arquitectura académica o sobreingenierizada, sino una estructura que facilite el desarrollo, la evolución del producto y la incorporación de nuevas funcionalidades conforme el proyecto crezca.

---

## Principios arquitectónicos

La arquitectura de PreParto se basa en los siguientes principios:

- **Separación clara de responsabilidades.**
- **Modularidad por dominio del negocio.**
- **Bajo acoplamiento entre módulos.**
- **Alta cohesión dentro de cada módulo.**
- **Offline First.**
- **Lógica de negocio independiente de React.**
- **Escalabilidad progresiva sin sobrearquitectura.**

Cada decisión técnica debe respetar estos principios.

---

## Arquitectura seleccionada

PreParto utiliza una **arquitectura modular basada en funcionalidades del dominio (Feature-Based Architecture)** con una separación ligera de responsabilidades dentro de cada módulo.

No se adopta una implementación completa de Clean Architecture porque añadiría una complejidad innecesaria para el tamaño y los objetivos actuales del proyecto.

La organización busca un equilibrio entre simplicidad y mantenibilidad.

---

## Organización por dominio

La aplicación se organiza alrededor de capacidades del negocio y no alrededor de páginas o componentes.

Cada módulo representa una responsabilidad concreta y contiene todo lo necesario para desarrollar esa parte del sistema de forma independiente.

La comunicación entre módulos debe realizarse únicamente a través de sus interfaces públicas, evitando dependencias innecesarias entre implementaciones internas.

---

## Separación de responsabilidades

La arquitectura distingue claramente entre:

- **Interfaz de usuario (UI):** responsable únicamente de presentar información e interactuar con el usuario.
- **Lógica de aplicación:** coordina el flujo entre la interfaz y el dominio.
- **Dominio:** contiene las reglas y el comportamiento propio del negocio.
- **Infraestructura:** proporciona servicios técnicos como almacenamiento, configuración o notificaciones.

Esta separación permite modificar una capa sin afectar al resto del sistema.

---

## Independencia del dominio

La lógica del negocio no debe depender de React ni de ninguna tecnología específica de interfaz.

Esto permite reutilizar el dominio en futuras plataformas como aplicaciones móviles o cualquier otra interfaz sin necesidad de reescribir las reglas de negocio.

---

## Assessment Engine

El núcleo funcional de PreParto es el **Assessment Engine**.

Su responsabilidad consiste en evaluar la información disponible y generar una recomendación basada en reglas previamente definidas.

El Assessment Engine:

- no contiene componentes de interfaz;
- no depende de React;
- no realiza diagnósticos médicos;
- no sustituye el criterio de un profesional sanitario.

Su única responsabilidad es transformar información estructurada en una evaluación explicada.

---

## Gestión del crecimiento

La arquitectura está preparada para incorporar nuevas funcionalidades sin modificar la estructura existente.

Nuevas capacidades deberán implementarse como módulos independientes siempre que sea posible, evitando concentrar responsabilidades en componentes o servicios de gran tamaño.

---

## Escalabilidad

La primera versión de PreParto funcionará completamente en el dispositivo utilizando almacenamiento local.

Aunque actualmente no existe un backend, la arquitectura evita dependencias directas con el mecanismo de persistencia para facilitar una futura incorporación de sincronización o servicios remotos sin afectar al dominio.

---

## Decisiones arquitectónicas

Las siguientes decisiones forman parte de la arquitectura oficial del proyecto:

- React como framework de la interfaz.
- TypeScript como lenguaje principal.
- Progressive Web App (PWA) como plataforma inicial.
- Arquitectura modular basada en funcionalidades del dominio.
- Offline First como principio de diseño.
- Lógica de negocio desacoplada de React.
- Assessment Engine como núcleo funcional.
- Persistencia local para la primera versión.
- Preparación para una futura integración con backend sin modificar el dominio.

---

## Decisiones descartadas

Actualmente se descartan las siguientes alternativas por no aportar beneficios proporcionales a la complejidad que introducen:

- Clean Architecture completa.
- Microservicios.
- Backend obligatorio desde la primera versión.
- Estado global único para toda la aplicación.
- Abstracciones anticipadas para funcionalidades que aún no existen.

Estas decisiones podrán revisarse si las necesidades del proyecto cambian en el futuro.

---

## Filosofía

La arquitectura de PreParto seguirá siempre un principio fundamental:

> **Incorporar complejidad únicamente cuando el dominio la requiera.**

Mientras una solución sencilla cumpla los requisitos del producto, será la opción preferida.
