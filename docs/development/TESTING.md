# Testing

## Objetivo

Garantizar que la lógica principal de PreParto funcione de forma correcta y predecible.

Las pruebas deben centrarse en proteger el comportamiento del dominio y facilitar la evolución del proyecto.

---

## Principios

- Probar primero la lógica del dominio.
- Mantener las pruebas simples y fáciles de entender.
- Evitar pruebas innecesarias.
- Cada prueba debe validar un único comportamiento.

---

## Prioridades

### Alta prioridad

- Assessment Engine.
- Reglas del dominio.
- Servicios.
- Funciones puras.

### Prioridad media

- Hooks con lógica propia.

### Baja prioridad

- Componentes de presentación.
- Elementos puramente visuales.

---

## Qué probar

Las pruebas deben verificar que:

- una misma entrada produce siempre el mismo resultado;
- las reglas generan la recomendación esperada;
- los servicios procesan correctamente la información;
- las funciones auxiliares devuelven resultados válidos.

---

## Qué evitar

Evitar pruebas que dependan de:

- detalles internos de implementación;
- estilos visuales;
- comportamiento del navegador que no aporte valor al dominio.

---

## Evolución

La estrategia de pruebas crecerá junto con el proyecto.

Las nuevas funcionalidades deberán incorporar pruebas cuando añadan lógica del dominio o comportamiento crítico.

---

## Principio final

La prioridad del proyecto es garantizar la fiabilidad del Assessment Engine y de las reglas del dominio.

Las pruebas deben aportar confianza para evolucionar el sistema sin modificar su comportamiento esperado.
