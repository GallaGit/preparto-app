# Almacenamiento

## Objetivo

Definir cómo se almacena la información durante la primera versión de PreParto.

---

## Estrategia

La primera versión almacenará la información únicamente en el dispositivo del usuario.

No existirá sincronización con servidores ni almacenamiento remoto.

---

## Principios

- Todo el almacenamiento será local.
- El dominio no accederá directamente al mecanismo de almacenamiento.
- El acceso al almacenamiento estará centralizado.

---

## Acceso al almacenamiento

La aplicación utilizará un servicio encargado de almacenar y recuperar información.

El resto del sistema no deberá acceder directamente a la tecnología utilizada para persistir los datos.

---

## Responsabilidades

El almacenamiento es responsable de:

- guardar información;
- recuperar información;
- eliminar información cuando sea necesario.

No es responsable de aplicar reglas del dominio.

---

## Evolución

La arquitectura permitirá incorporar un backend en el futuro sin modificar la lógica del dominio.

Cuando exista sincronización remota, el mecanismo de almacenamiento podrá cambiar sin afectar al resto de la aplicación.
