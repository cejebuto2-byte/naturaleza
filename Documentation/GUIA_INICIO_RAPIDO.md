# GUÍA DE INICIO RÁPIDO

Esta guía te ayudará a comenzar el desarrollo de la demo LA NATURALEZA de manera eficiente.

---

## CHECKLIST INICIAL

### Antes de comenzar
- [ ] Tener Node.js instalado (v18 o superior)
- [ ] Tener npm o yarn instalado
- [ ] Tener un editor de código (VS Code recomendado)
- [ ] Tener Git instalado
- [ ] Leer el documento PLAN_DE_TRABAJO.md completo

### Configuración del proyecto
- [x] Proyecto NestJS inicializado
- [x] Tailwind CSS configurado
- [x] Express Handlebars instalado
- [ ] Estructura de carpetas de módulos creada
- [ ] Datos simulados implementados

---

## COMANDOS ÚTILES

### Instalación de dependencias
```bash
npm install
```

### Desarrollo
```bash
# Iniciar servidor en modo desarrollo (con watch)
npm run start:dev

# Compilar CSS de Tailwind en modo watch
npm run build:css:watch
```

### Producción
```bash
# Compilar CSS
npm run build:css

# Compilar proyecto completo
npm run build

# Iniciar en producción
npm run start:prod
```

### Utilidades
```bash
# Formatear código
npm run format

# Linting
npm run lint

# Tests
npm run test
```

---

## ORDEN DE DESARROLLO RECOMENDADO

### SEMANA 1: Fundamentos

#### Día 1-2: Estructura base
1. Crear estructura de carpetas de módulos en `src/modules/`
2. Crear archivos de datos en `src/data/`
3. Configurar layout principal en `views/layouts/main.hbs`
4. Crear partials básicos (header, footer, navbar)

```bash
# Crear estructura de módulos
mkdir -p src/modules/{dashboard,aportes,georreferenciacion,seguimiento,comunicacion,kids,alertas,interoperabilidad}
mkdir -p src/data
mkdir -p views/{partials,dashboard,aportes,georreferenciacion,seguimiento,comunicacion,kids,alertas,interoperabilidad}
mkdir -p public/{js,images,icons}
```

#### Día 3: Landing y Dashboard
1. Crear página landing atractiva
2. Implementar dashboard principal
3. Agregar indicadores simulados
4. Crear sistema de navegación

#### Día 4-5: Diseño y componentes
1. Definir componentes reutilizables (cards, buttons, forms)
2. Implementar paleta de colores
3. Crear sistema de grid responsive
4. Agregar animaciones básicas

### SEMANA 2: Módulos Core

#### Día 6-7: Registro de Aportes
1. Crear formularios de aportes
2. Implementar validaciones
3. Crear vista de listado
4. Agregar funcionalidad de certificados

#### Día 8-10: Georreferenciación
1. Integrar Leaflet.js
2. Implementar mapa con marcadores
3. Crear pop-ups informativos
4. Agregar filtros y clustering

#### Día 11-12: Seguimiento
1. Integrar Chart.js
2. Crear dashboard de métricas
3. Implementar gráficos interactivos
4. Agregar exportación de reportes

### SEMANA 3: Módulos de Comunicación

#### Día 13-14: Comunicación Comunitaria
1. Crear formulario de reportes
2. Implementar galería de reportes
3. Agregar sistema de respuestas
4. Crear filtros y búsquedas

#### Día 15-17: LA NATURALEZA KIDS
1. Crear layout especial para niños
2. Implementar secciones educativas
3. Agregar juegos interactivos
4. Crear sistema de gamificación

### SEMANA 4: Finalización

#### Día 18-19: Alertas e Interoperabilidad
1. Crear módulo de alertas
2. Implementar suscripciones
3. Crear dashboard de interoperabilidad
4. Agregar mapa de albergues

#### Día 20-21: Refinamiento
1. Revisar responsive en todos los módulos
2. Optimizar rendimiento
3. Corregir bugs
4. Mejorar animaciones y transiciones

#### Día 22: Documentación y presentación
1. Completar documentación técnica
2. Crear manual de usuario
3. Preparar material de presentación
4. Grabar video demo (opcional)

---

## PLANTILLAS DE CÓDIGO

### Crear un nuevo módulo

1. **Estructura del controlador**
```typescript
// src/modules/[nombre]/[nombre].controller.ts
import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { NombreService } from './nombre.service';

@Controller('nombre')
export class NombreController {
  constructor(private readonly nombreService: NombreService) {}

  @Get()
  @Render('nombre/index')
  index() {
    const data = this.nombreService.getData();
    return { data };
  }

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.nombreService.create(createDto);
  }
}
```

2. **Estructura del servicio**
```typescript
// src/modules/[nombre]/[nombre].service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class NombreService {
  private data = []; // Datos en memoria

  getData() {
    return this.data;
  }

  create(item: any) {
    this.data.push(item);
    return item;
  }
}
```

3. **Estructura del módulo**
```typescript
// src/modules/[nombre]/[nombre].module.ts
import { Module } from '@nestjs/common';
import { NombreController } from './nombre.controller';
import { NombreService } from './nombre.service';

@Module({
  controllers: [NombreController],
  providers: [NombreService],
  exports: [NombreService],
})
export class NombreModule {}
```

4. **Registrar en app.module.ts**
```typescript
import { NombreModule } from './modules/nombre/nombre.module';

@Module({
  imports: [
    // ... otros módulos
    NombreModule,
  ],
})
export class AppModule {}
```

### Crear una vista Handlebars

```handlebars
{{!-- views/[modulo]/[vista].hbs --}}
<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">{{title}}</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {{#each items}}
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-2">{{this.nombre}}</h3>
        <p class="text-gray-600">{{this.descripcion}}</p>
      </div>
    {{/each}}
  </div>
</div>
```

---

## DATOS SIMULADOS - IMPLEMENTACIÓN

### Crear archivo de datos
```typescript
// src/data/aportes.data.ts
export interface Aporte {
  id: number;
  nombre: string;
  cargo: string;
  monto: number;
  periodicidad: string;
  fechaInicio: string;
}

export const aportesData: Aporte[] = [
  {
    id: 1,
    nombre: "María González Pérez",
    cargo: "Defensora Regional",
    monto: 50000,
    periodicidad: "mensual",
    fechaInicio: "2025-01-15"
  },
  // ... más datos
];
```

### Importar datos en servicio
```typescript
// src/modules/aportes/aportes.service.ts
import { aportesData } from '../../data/aportes.data';

@Injectable()
export class AportesService {
  private aportes = [...aportesData]; // Clonar datos iniciales

  getAllAportes() {
    return this.aportes;
  }

  createAporte(aporte: Aporte) {
    const newId = Math.max(...this.aportes.map(a => a.id)) + 1;
    const newAporte = { id: newId, ...aporte };
    this.aportes.push(newAporte);
    return newAporte;
  }
}
```

---

## INTEGRACIÓN DE LIBRERÍAS EXTERNAS

### Leaflet.js para mapas

1. **Instalar**
```bash
npm install leaflet
npm install --save-dev @types/leaflet
```

2. **Agregar CSS en layout**
```html
<!-- views/layouts/main.hbs -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

3. **Agregar JS**
```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

4. **Usar en vista**
```html
<div id="mapa" style="height: 600px;"></div>

<script>
  const mapa = L.map('mapa').setView([4.5709, -74.2973], 6); // Colombia

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);

  // Agregar marcadores
  const zonas = {{{json zonas}}};
  zonas.forEach(zona => {
    L.marker([zona.coordenadas.lat, zona.coordenadas.lng])
      .addTo(mapa)
      .bindPopup(`<b>${zona.nombre}</b><br>${zona.tipoEmergencia}`);
  });
</script>
```

### Chart.js para gráficos

1. **Instalar**
```bash
npm install chart.js
```

2. **Agregar script**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

3. **Usar en vista**
```html
<canvas id="grafico" width="400" height="200"></canvas>

<script>
  const ctx = document.getElementById('grafico').getContext('2d');
  const datos = {{{json datos}}};

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: datos.labels,
      datasets: [{
        label: 'Aportes por mes',
        data: datos.values,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
</script>
```

### jsPDF para generar PDFs

1. **Instalar**
```bash
npm install jspdf
```

2. **Usar en servicio**
```typescript
import { jsPDF } from 'jspdf';

generateCertificado(aporteId: number): Buffer {
  const aporte = this.getAporteById(aporteId);
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Certificado de Aporte Solidario', 20, 20);
  doc.setFontSize(12);
  doc.text(`Nombre: ${aporte.nombre}`, 20, 40);
  doc.text(`Monto: $${aporte.monto.toLocaleString()}`, 20, 50);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 60);

  return Buffer.from(doc.output('arraybuffer'));
}
```

---

## HELPERS DE HANDLEBARS

Agregar helpers personalizados para formateo:

```typescript
// src/main.ts
import { create } from 'express-handlebars';

const hbs = create({
  extname: '.hbs',
  helpers: {
    // Formatear números
    formatNumber: (num: number) => {
      return num.toLocaleString('es-CO');
    },

    // Formatear moneda
    formatCurrency: (amount: number) => {
      return `$${amount.toLocaleString('es-CO')}`;
    },

    // Formatear fecha
    formatDate: (date: string) => {
      return new Date(date).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    // Convertir objeto a JSON
    json: (context: any) => {
      return JSON.stringify(context);
    },

    // Condicional de igualdad
    eq: (a: any, b: any) => a === b,

    // Color por tipo de necesidad
    colorNecesidad: (tipo: string) => {
      const colores = {
        agua: 'blue',
        alimentos: 'orange',
        salud: 'red',
        vivienda: 'purple',
        educacion: 'green',
        psicosocial: 'pink'
      };
      return colores[tipo] || 'gray';
    }
  }
});
```

---

## COMPONENTES TAILWIND REUTILIZABLES

### Botón primario
```html
<button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
  Texto del botón
</button>
```

### Card básica
```html
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
  <h3 class="text-xl font-semibold mb-2">Título</h3>
  <p class="text-gray-600">Contenido de la card</p>
</div>
```

### Formulario
```html
<form class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      Nombre
    </label>
    <input
      type="text"
      name="nombre"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
    Enviar
  </button>
</form>
```

### Alert
```html
<!-- Success -->
<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
  <p class="font-bold">Éxito</p>
  <p>Operación completada correctamente</p>
</div>

<!-- Error -->
<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
  <p class="font-bold">Error</p>
  <p>Algo salió mal</p>
</div>
```

---

## TIPS DE DESARROLLO

### 1. Responsive First
Siempre empieza con el diseño móvil y agrega complejidad para pantallas más grandes:
```html
<!-- Móvil: 1 columna, Tablet: 2 columnas, Desktop: 3 columnas -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- contenido -->
</div>
```

### 2. Usar variables CSS para colores
Define colores en tu CSS principal:
```css
/* src/styles.css */
@layer base {
  :root {
    --color-primary: #1e40af;
    --color-secondary: #059669;
  }
}
```

### 3. Debugging Handlebars
Para ver datos disponibles en una vista:
```handlebars
<pre>{{json this}}</pre>
```

### 4. Hot Reload
Mantén dos terminales abiertas:
- Terminal 1: `npm run start:dev` (servidor)
- Terminal 2: `npm run build:css:watch` (Tailwind)

### 5. Commits frecuentes
Haz commits pequeños y frecuentes:
```bash
git add .
git commit -m "feat: implementar módulo de aportes"
```

---

## SOLUCIÓN DE PROBLEMAS COMUNES

### El CSS de Tailwind no se actualiza
```bash
# Detener el proceso y reconstruir
npm run build:css
```

### Puerto 3000 ya está en uso
```bash
# En Windows
npm run prekill

# O manualmente
npx kill-port 3000
```

### Handlebars no encuentra la vista
Verificar:
1. Que la vista esté en la carpeta correcta
2. Que el nombre en `@Render()` coincida con el archivo
3. Que tenga la extensión `.hbs`

### Datos no aparecen en la vista
Verificar:
1. Que el servicio retorne los datos
2. Que el controlador pase los datos a la vista
3. Usar `{{json datos}}` para debugging

---

## RECURSOS ÚTILES

### Documentación
- [NestJS Docs](https://docs.nestjs.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Handlebars Docs](https://handlebarsjs.com/guide/)
- [Leaflet Docs](https://leafletjs.com/reference.html)
- [Chart.js Docs](https://www.chartjs.org/docs/latest/)

### Herramientas
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (VS Code)
- [Heroicons](https://heroicons.com/) (Iconos)
- [Coolors](https://coolors.co/) (Paletas de colores)
- [Font Awesome](https://fontawesome.com/) (Iconos alternativos)

### Inspiración de diseño
- [Dribbble](https://dribbble.com/tags/dashboard)
- [Behance](https://www.behance.net/)
- [Tailwind UI](https://tailwindui.com/components) (componentes de pago)

---

## CHECKLIST FINAL

Antes de presentar la demo, verificar:

### Funcionalidad
- [ ] Todas las páginas cargan correctamente
- [ ] Todos los formularios funcionan
- [ ] No hay errores en consola
- [ ] Los mapas se renderizan correctamente
- [ ] Los gráficos muestran datos

### Diseño
- [ ] Responsive en móvil, tablet y desktop
- [ ] Colores consistentes en toda la aplicación
- [ ] Tipografía legible
- [ ] Espaciado apropiado
- [ ] Animaciones suaves

### Contenido
- [ ] Textos sin errores ortográficos
- [ ] Datos simulados realistas
- [ ] Imágenes de buena calidad
- [ ] Información clara y concisa

### Rendimiento
- [ ] La aplicación carga rápido
- [ ] No hay lag en interacciones
- [ ] Imágenes optimizadas

### Documentación
- [ ] README.md actualizado
- [ ] Manual de usuario creado
- [ ] Código comentado
- [ ] Guía de instalación clara

---

**¡Éxito con el desarrollo!**

Recuerda: Es una demo para concurso, prioriza la experiencia visual y la claridad del concepto sobre la complejidad técnica.

---

**Última actualización**: Noviembre 6, 2025
