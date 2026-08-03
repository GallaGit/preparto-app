# PreParto

> Progressive Web App (PWA) diseñada para acompañar a mujeres embarazadas durante el preparto mediante herramientas de seguimiento de síntomas y recomendaciones orientativas basadas en evidencia.

> **⚠️ Aviso importante**
>
> PreParto **no sustituye la valoración de profesionales sanitarios**. La aplicación ofrece información y recomendaciones orientativas que deben utilizarse siempre junto con las indicaciones del equipo médico.

---

## Índice

- Descripción
- Objetivos
- Estado del proyecto
- Características
- Principios del proyecto
- Tecnologías
- Arquitectura
- Instalación
- Uso
- Scripts
- Documentación
- Roadmap
- Contribución
- Licencia
- Autor

---

## Descripción

El objetivo de **PreParto** es reducir la incertidumbre durante las últimas semanas del embarazo ofreciendo herramientas sencillas que ayuden a registrar acontecimientos importantes y comprender mejor cuándo puede ser necesario contactar con el hospital.

La aplicación está diseñada siguiendo un enfoque **Offline First**, **Mobile First** y basada en reglas documentadas, priorizando siempre la seguridad y la claridad de la información.

---

## Objetivos

PreParto pretende ayudar a las futuras madres y sus acompañantes a:

- Registrar contracciones.
- Registrar síntomas del preparto.
- Comprender la evolución de los síntomas.
- Recibir recomendaciones orientativas basadas en protocolos.
- Llevar un historial cronológico de los acontecimientos importantes.
- Reducir la incertidumbre antes del parto.

La aplicación **no realiza diagnósticos médicos** ni sustituye la atención sanitaria.

---

## Estado del proyecto

🚧 Desarrollo activo.

### Funcionalidades implementadas

- ✅ Progressive Web App (PWA)
- ✅ Instalable en dispositivos móviles
- ✅ Diseño Mobile First
- ✅ Cronómetro de contracciones
- ✅ Cronómetro persistente entre pantallas
- ✅ Historial de contracciones
- ✅ IndexedDB para almacenamiento local
- ✅ Estadísticas de contracciones
- ✅ Motor de reglas para recomendaciones orientativas
- ✅ Banner global de contracción activa
- ✅ Funcionamiento sin conexión para las funciones principales

### En desarrollo

- Registro de ruptura de bolsa
- Registro de síntomas
- Página de emergencia
- Configuración personalizada
- Historial ampliado

---

## Principios del proyecto

PreParto se desarrolla siguiendo estos principios:

- 📱 Mobile First
- 📶 Offline First
- 🧩 Componentes pequeños y reutilizables
- ⚙️ Arquitectura sencilla y mantenible
- 📖 Basado en evidencia científica
- ❤️ Diseñado para reducir la incertidumbre durante el preparto
- 🩺 Nunca sustituir el criterio médico
- ♿ Accesibilidad como prioridad
- 🔒 Privacidad de los datos de la usuaria

---

## Tecnologías

| Categoría | Tecnología |
|-----------|------------|
| Lenguaje | TypeScript |
| UI | React 19 |
| Build | Vite |
| Estilos | Tailwind CSS |
| Routing | React Router DOM |
| Persistencia | IndexedDB |
| PWA | Vite Plugin PWA |
| Calidad | ESLint + Prettier |
| Testing | Vitest |

---

## Arquitectura

```text
App
│
├── Providers
│
├── Pages
│
├── Components
│
├── Services
│
├── IndexedDB
│
└── Rule Engine
```

La arquitectura completa puede consultarse en **`docs/ARCHITECTURE.md`**.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/GallaGit/preparto-app.git
```

Entrar en el proyecto:

```bash
cd preparto-app
```

Instalar dependencias:

```bash
npm install
```

Si aparece el error:

```text
UNABLE_TO_VERIFY_LEAF_SIGNATURE
```

Ejecutar:

```bash
npm install --strict-ssl=false
```

---

## Uso

Servidor de desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Vista previa del build:

```bash
npm run preview
```

---

## Scripts

| Script | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila TypeScript y genera el build |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea el código con Prettier |
| `npm run test` | Ejecuta Vitest |
| `npm run test:watch` | Ejecuta Vitest en modo observación |

---

## Testing

Actualmente el proyecto incluye pruebas unitarias para el motor de reglas de contracciones.

Conforme evolucione el proyecto se incorporarán:

- Tests unitarios de utilidades.
- Tests de hooks.
- Tests de componentes críticos.
- Tests End-to-End para los flujos principales.

---

## Documentación

Toda la documentación técnica se encuentra en la carpeta **`docs/`**.

| Documento | Descripción |
|-----------|-------------|
| `PRODUCT.md` | Visión del producto y objetivos |
| `ARCHITECTURE.md` | Arquitectura técnica |
| `ROADMAP.md` | Plan de desarrollo |
| `DECISION_ENGINE.md` | Motor de recomendaciones |
| `MEDICAL_RULES.md` | Reglas médicas y referencias |
| `UX_PRINCIPLES.md` | Principios de experiencia de usuario |
| `CONTRIBUTING.md` | Guía para colaboradores |
| `CODE_OF_CONDUCT.md` | Código de conducta |
| `DEVELOPMENT_LOG.md` | Registro histórico del desarrollo |

---

## Roadmap

Las próximas fases incluyen:

- Registro completo de síntomas.
- Seguimiento de ruptura de bolsa.
- Checklist dinámico para el hospital.
- Historial cronológico del preparto.
- Exportación de informes.
- Internacionalización.
- Sincronización entre dispositivos.
- Notificaciones.

Consulta **`docs/ROADMAP.md`** para el plan completo.

---

## Contribución

Las contribuciones son bienvenidas.

Antes de colaborar, por favor consulta:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`

---

## Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

Consulta el archivo `LICENSE` para más información.

---

## Autor

**Ociel Gallardo Estiven**

GitHub:

https://github.com/GallaGit

---

> PreParto nace con un objetivo sencillo: ofrecer una herramienta útil, clara y responsable que ayude a las futuras familias a afrontar el preparto con mayor tranquilidad, siempre complementando —y nunca sustituyendo— la atención de los profesionales sanitarios.