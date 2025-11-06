# ESTRUCTURA DE MÓDULOS Y RUTAS

Este documento define la estructura de módulos, rutas y componentes de la aplicación LA NATURALEZA.

---

## ARQUITECTURA DEL PROYECTO

```
defensoria-demo/
├── src/
│   ├── modules/
│   │   ├── dashboard/
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── dashboard.service.ts
│   │   │   └── dashboard.module.ts
│   │   ├── aportes/
│   │   │   ├── aportes.controller.ts
│   │   │   ├── aportes.service.ts
│   │   │   └── aportes.module.ts
│   │   ├── georreferenciacion/
│   │   │   ├── georref.controller.ts
│   │   │   ├── georref.service.ts
│   │   │   └── georref.module.ts
│   │   ├── seguimiento/
│   │   │   ├── seguimiento.controller.ts
│   │   │   ├── seguimiento.service.ts
│   │   │   └── seguimiento.module.ts
│   │   ├── comunicacion/
│   │   │   ├── comunicacion.controller.ts
│   │   │   ├── comunicacion.service.ts
│   │   │   └── comunicacion.module.ts
│   │   ├── kids/
│   │   │   ├── kids.controller.ts
│   │   │   ├── kids.service.ts
│   │   │   └── kids.module.ts
│   │   ├── alertas/
│   │   │   ├── alertas.controller.ts
│   │   │   ├── alertas.service.ts
│   │   │   └── alertas.module.ts
│   │   └── interoperabilidad/
│   │       ├── interop.controller.ts
│   │       ├── interop.service.ts
│   │       └── interop.module.ts
│   ├── data/
│   │   ├── aportes.data.ts
│   │   ├── zonas.data.ts
│   │   ├── reportes.data.ts
│   │   ├── alertas.data.ts
│   │   ├── indicadores.data.ts
│   │   └── educacion.data.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── main.ts
│   └── styles.css
├── views/
│   ├── layouts/
│   │   └── main.hbs
│   ├── partials/
│   │   ├── header.hbs
│   │   ├── footer.hbs
│   │   ├── navbar.hbs
│   │   ├── card.hbs
│   │   └── alert.hbs
│   ├── dashboard/
│   │   └── index.hbs
│   ├── aportes/
│   │   ├── index.hbs
│   │   ├── monetario.hbs
│   │   ├── especie.hbs
│   │   └── voluntariado.hbs
│   ├── georreferenciacion/
│   │   └── mapa.hbs
│   ├── seguimiento/
│   │   └── index.hbs
│   ├── comunicacion/
│   │   ├── index.hbs
│   │   ├── nuevo-reporte.hbs
│   │   └── ver-reportes.hbs
│   ├── kids/
│   │   ├── index.hbs
│   │   ├── aprende.hbs
│   │   ├── juega.hbs
│   │   ├── crea.hbs
│   │   └── cuentos.hbs
│   ├── alertas/
│   │   ├── index.hbs
│   │   └── suscripcion.hbs
│   ├── interoperabilidad/
│   │   └── index.hbs
│   └── landing.hbs
├── public/
│   ├── styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── mapa.js
│   │   ├── charts.js
│   │   └── kids.js
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── kids/
│   └── icons/
└── Documentation/
    ├── PLAN_DE_TRABAJO.md
    ├── DATOS_SIMULADOS.md
    └── ESTRUCTURA_MODULOS.md
```

---

## MAPA DE RUTAS

### Rutas Principales

| Ruta | Módulo | Vista | Descripción |
|------|--------|-------|-------------|
| `/` | Landing | `landing.hbs` | Página de inicio/presentación |
| `/dashboard` | Dashboard | `dashboard/index.hbs` | Panel principal con indicadores |

### Módulo: Aportes Solidarios

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/aportes` | `aportes/index.hbs` | Listado de aportes |
| `/aportes/monetario` | `aportes/monetario.hbs` | Formulario aporte monetario |
| `/aportes/especie` | `aportes/especie.hbs` | Formulario aporte en especie |
| `/aportes/voluntariado` | `aportes/voluntariado.hbs` | Formulario voluntariado |
| `/aportes/certificado/:id` | - | Generar certificado PDF |

### Módulo: Georreferenciación

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/mapa` | `georreferenciacion/mapa.hbs` | Mapa interactivo de zonas |
| `/mapa/zona/:id` | - | Detalle de zona (modal) |

### Módulo: Seguimiento en Tiempo Real

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/seguimiento` | `seguimiento/index.hbs` | Dashboard de métricas |
| `/seguimiento/reporte` | - | Exportar reporte (PDF/Excel) |

### Módulo: Comunicación Comunitaria

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/comunicacion` | `comunicacion/index.hbs` | Ver reportes comunitarios |
| `/comunicacion/nuevo` | `comunicacion/nuevo-reporte.hbs` | Crear nuevo reporte |
| `/comunicacion/reporte/:id` | `comunicacion/ver-reportes.hbs` | Ver detalle de reporte |

### Módulo: LA NATURALEZA KIDS

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/kids` | `kids/index.hbs` | Página principal KIDS |
| `/kids/aprende` | `kids/aprende.hbs` | Contenidos educativos |
| `/kids/juega` | `kids/juega.hbs` | Juegos interactivos |
| `/kids/crea` | `kids/crea.hbs` | Actividades creativas |
| `/kids/cuentos` | `kids/cuentos.hbs` | Biblioteca de cuentos |
| `/kids/cuento/:id` | - | Leer cuento específico |

### Módulo: Alertas

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/alertas` | `alertas/index.hbs` | Ver alertas activas |
| `/alertas/suscripcion` | `alertas/suscripcion.hbs` | Suscribirse a alertas |
| `/alertas/albergues` | - | Mapa de albergues |

### Módulo: Interoperabilidad

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/interoperabilidad` | `interoperabilidad/index.hbs` | Dashboard de sistemas |

---

## API ENDPOINTS (Internos)

Aunque la aplicación usa Server-Side Rendering con Handlebars, algunos endpoints devuelven JSON para operaciones AJAX.

### Dashboard
```
GET  /api/dashboard/indicadores
GET  /api/dashboard/estadisticas
```

### Aportes
```
GET  /api/aportes
POST /api/aportes/monetario
POST /api/aportes/especie
POST /api/aportes/voluntariado
GET  /api/aportes/:id
```

### Georreferenciación
```
GET  /api/zonas
GET  /api/zonas/:id
GET  /api/zonas/tipo/:tipo
```

### Comunicación
```
GET  /api/reportes
POST /api/reportes
GET  /api/reportes/:id
PUT  /api/reportes/:id/respuesta
```

### Alertas
```
GET  /api/alertas
GET  /api/alertas/activas
POST /api/alertas/suscripcion
```

### Kids
```
GET  /api/kids/cuentos
GET  /api/kids/juegos
GET  /api/kids/puntos/:usuario
POST /api/kids/progreso
```

---

## ESTRUCTURA DE SERVICIOS

### DashboardService
```typescript
class DashboardService {
  getIndicadores(): Indicadores
  getEstadisticas(): Estadisticas
  getMapaGeneral(): ZonaAfectada[]
}
```

### AportesService
```typescript
class AportesService {
  getAllAportes(): Aporte[]
  createAporteMonetario(data: AporteMonetarioDTO): Aporte
  createAporteEspecie(data: AporteEspecieDTO): Aporte
  createVoluntariado(data: VoluntariadoDTO): Aporte
  getAporteById(id: number): Aporte
  generateCertificado(id: number): Buffer
}
```

### GeorreferenciaService
```typescript
class GeorreferenciaService {
  getAllZonas(): ZonaAfectada[]
  getZonaById(id: number): ZonaAfectada
  getZonasByTipo(tipo: TipoNecesidad): ZonaAfectada[]
  getZonasByPrioridad(nivel: NivelPrioridad): ZonaAfectada[]
}
```

### ComunicacionService
```typescript
class ComunicacionService {
  getAllReportes(): Reporte[]
  createReporte(data: ReporteDTO): Reporte
  getReporteById(id: number): Reporte
  addRespuesta(id: number, respuesta: string): Reporte
}
```

### AlertasService
```typescript
class AlertasService {
  getAlertasActivas(): Alerta[]
  getAllAlertas(): Alerta[]
  suscribirAlertas(data: SuscripcionDTO): Suscripcion
  getAlbergues(region: string): Albergue[]
}
```

### KidsService
```typescript
class KidsService {
  getAllCuentos(idioma?: string): Cuento[]
  getCuentoById(id: number): Cuento
  getAllJuegos(): Juego[]
  getProgresoUsuario(usuario: string): Progreso
  updateProgreso(usuario: string, puntos: number): Progreso
}
```

---

## COMPONENTES REUTILIZABLES (Partials)

### Navbar
```handlebars
{{> navbar active="dashboard" }}
```
Props:
- `active`: Nombre de la sección activa

### Card
```handlebars
{{> card title="Título" value="1,234" icon="users" color="blue" }}
```
Props:
- `title`: Título de la card
- `value`: Valor a mostrar
- `icon`: Nombre del icono
- `color`: Color de acento

### Alert
```handlebars
{{> alert type="success" message="Operación exitosa" }}
```
Props:
- `type`: success | error | warning | info
- `message`: Mensaje a mostrar

### Chart
```handlebars
{{> chart type="bar" data=chartData }}
```
Props:
- `type`: bar | line | pie | doughnut
- `data`: Datos del gráfico

---

## FLUJO DE NAVEGACIÓN

```
LANDING PAGE
     │
     ├─→ DASHBOARD ──────┬─→ Ver indicadores
     │                   ├─→ Ver mapa general
     │                   └─→ Acceder a módulos
     │
     ├─→ APORTES ────────┬─→ Ver aportes registrados
     │                   ├─→ Registrar aporte monetario
     │                   ├─→ Registrar aporte en especie
     │                   └─→ Registrar voluntariado
     │
     ├─→ MAPA ───────────┬─→ Ver zonas afectadas
     │                   ├─→ Filtrar por tipo
     │                   └─→ Ver detalles de zona
     │
     ├─→ SEGUIMIENTO ────┬─→ Ver métricas
     │                   ├─→ Ver gráficos
     │                   └─→ Exportar reportes
     │
     ├─→ COMUNICACIÓN ───┬─→ Ver reportes
     │                   ├─→ Crear reporte
     │                   └─→ Responder reporte
     │
     ├─→ KIDS ───────────┬─→ Aprende
     │                   ├─→ Juega
     │                   ├─→ Crea
     │                   └─→ Lee cuentos
     │
     ├─→ ALERTAS ────────┬─→ Ver alertas activas
     │                   ├─→ Suscribirse
     │                   └─→ Ver albergues
     │
     └─→ INTEROPERABILIDAD ─→ Ver sistemas conectados
```

---

## PALETA DE COLORES

### Colores Principales
```css
:root {
  /* Institucional */
  --color-primary: #1e40af;      /* Azul institucional */
  --color-secondary: #059669;    /* Verde solidaridad */
  --color-accent: #f59e0b;       /* Naranja alerta */

  /* Semánticos */
  --color-success: #10b981;      /* Verde éxito */
  --color-warning: #f59e0b;      /* Amarillo advertencia */
  --color-danger: #ef4444;       /* Rojo peligro */
  --color-info: #3b82f6;         /* Azul información */

  /* Neutrales */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-700: #374151;
  --color-gray-900: #111827;

  /* KIDS */
  --color-kids-primary: #ec4899;  /* Rosa alegre */
  --color-kids-secondary: #8b5cf6; /* Morado */
  --color-kids-accent: #10b981;    /* Verde brillante */
}
```

### Colores por Tipo de Necesidad
```javascript
const coloresPorNecesidad = {
  agua: '#3b82f6',        // Azul
  alimentos: '#f59e0b',   // Naranja
  salud: '#ef4444',       // Rojo
  vivienda: '#8b5cf6',    // Morado
  educacion: '#10b981',   // Verde
  psicosocial: '#ec4899'  // Rosa
};
```

---

## ICONOGRAFÍA

Usar **Heroicons** (https://heroicons.com/) para consistencia visual.

### Iconos por Módulo
- Dashboard: `ChartBarIcon`, `MapIcon`
- Aportes: `HeartIcon`, `GiftIcon`, `ClockIcon`
- Mapa: `MapPinIcon`, `GlobeAltIcon`
- Seguimiento: `ChartPieIcon`, `DocumentReportIcon`
- Comunicación: `ChatBubbleLeftRightIcon`, `PaperAirplaneIcon`
- Kids: `StarIcon`, `SparklesIcon`, `AcademicCapIcon`
- Alertas: `BellAlertIcon`, `ExclamationTriangleIcon`
- Interoperabilidad: `ServerStackIcon`, `ArrowPathIcon`

---

## RESPONSIVIDAD

### Breakpoints (Tailwind CSS)
```
sm:  640px   (móvil horizontal)
md:  768px   (tablet)
lg:  1024px  (desktop pequeño)
xl:  1280px  (desktop)
2xl: 1536px  (desktop grande)
```

### Estrategia Mobile-First
1. Diseñar primero para móvil
2. Agregar complejidad en pantallas más grandes
3. Menú hamburguesa en móvil, menú horizontal en desktop
4. Cards en columna en móvil, grid en desktop
5. Ocultar elementos secundarios en móvil

---

## ESTADO DE LA APLICACIÓN

### Datos en Memoria
```typescript
// src/data/app-state.ts
export class AppState {
  private aportes: Aporte[] = [];
  private zonas: ZonaAfectada[] = [];
  private reportes: Reporte[] = [];
  private alertas: Alerta[] = [];
  private progresoKids: Map<string, Progreso> = new Map();

  // Métodos de acceso y mutación...
}
```

Nota: Como es una demo sin base de datos, los datos se resetean al reiniciar el servidor.

---

## LIBRERÍAS EXTERNAS RECOMENDADAS

### Mapas
- **Leaflet.js** (https://leafletjs.com/)
- **Leaflet.markercluster** para clustering

### Gráficos
- **Chart.js** (https://www.chartjs.org/)

### Generación de PDFs
- **jsPDF** (https://github.com/parallax/jsPDF)

### Animaciones
- **Animate.css** (https://animate.style/)

### Validación de Formularios
- **Class-validator** (integrado con NestJS)

---

## PRÓXIMOS PASOS

1. Crear estructura de carpetas de módulos
2. Implementar controladores y servicios base
3. Crear archivos de datos simulados
4. Desarrollar vistas principales
5. Integrar librerías externas
6. Implementar interactividad con JavaScript
7. Pruebas y refinamiento

---

**Última actualización**: Noviembre 6, 2025
