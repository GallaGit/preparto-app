# Gestión del estado

## Objetivo

Definir cómo se gestiona el estado de la aplicación de forma sencilla, mantenible y escalable.

La gestión del estado debe facilitar el desarrollo sin introducir complejidad innecesaria.

---

## Principios

- Mantener el estado lo más cercano posible a donde se utiliza.
- Evitar un estado global para toda la aplicación.
- Separar el estado de la lógica del negocio.
- No duplicar información.

---

## Estrategia

En la primera versión, la aplicación utilizará las herramientas nativas de React para gestionar el estado.

La incorporación de una librería de gestión de estado se evaluará únicamente si el crecimiento del proyecto lo hace necesario.

---

## Tipos de estado

### Estado local

Se utilizará para información exclusiva de un componente o pantalla.

Ejemplos:

- apertura de un modal;
- valores temporales de un formulario;
- estados visuales.

### Estado compartido

Se utilizará cuando varias partes de la aplicación necesiten acceder a la misma información.

Su alcance deberá ser el mínimo posible.

---

## Estado y dominio

La lógica del dominio no debe depender del estado de React.

Los hooks serán responsables de comunicar la interfaz con los servicios del dominio.

---

## Principio final

La gestión del estado debe permanecer simple.

Si una solución puede resolverse con React sin añadir nuevas dependencias, esa será la opción preferida.
