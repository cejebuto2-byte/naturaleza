# DATOS SIMULADOS PARA LA DEMO

Este documento contiene ejemplos de datos que se utilizarán en la demo. Todos estos datos serán almacenados en memoria (arrays y objetos JavaScript) sin necesidad de base de datos.

---

## 1. APORTES SOLIDARIOS

### Aportes Monetarios
```javascript
const aportes = [
  {
    id: 1,
    nombre: "María González Pérez",
    cargo: "Defensora Regional",
    tipoAporte: "monetario",
    monto: 50000,
    periodicidad: "mensual",
    fechaInicio: "2025-01-15",
    activo: true
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    cargo: "Coordinador Territorial",
    tipoAporte: "monetario",
    monto: 30000,
    periodicidad: "quincenal",
    fechaInicio: "2025-02-01",
    activo: true
  },
  {
    id: 3,
    nombre: "Ana Martínez López",
    cargo: "Profesional Especializado",
    tipoAporte: "monetario",
    monto: 100000,
    periodicidad: "mensual",
    fechaInicio: "2025-01-01",
    activo: true
  }
];
```

### Aportes en Especie
```javascript
const aportesEspecie = [
  {
    id: 1,
    nombre: "Pedro Sánchez",
    cargo: "Asesor Jurídico",
    tipoAyuda: "Alimentos",
    descripcion: "50 kg de arroz, 30 kg de frijoles",
    fechaEntrega: "2025-03-10",
    destino: "Chocó - Comunidad El Progreso"
  },
  {
    id: 2,
    nombre: "Laura Díaz",
    cargo: "Psicóloga",
    tipoAyuda: "Medicamentos",
    descripcion: "Botiquín de primeros auxilios completo",
    fechaEntrega: "2025-03-15",
    destino: "Putumayo - Zona rural"
  }
];
```

### Voluntariado
```javascript
const voluntariado = [
  {
    id: 1,
    nombre: "Jorge Morales",
    cargo: "Profesional de Apoyo",
    actividad: "Talleres de resiliencia comunitaria",
    horas: 20,
    fecha: "2025-04-20",
    lugar: "Nariño - Tumaco"
  },
  {
    id: 2,
    nombre: "Sandra Ruiz",
    cargo: "Trabajadora Social",
    actividad: "Atención psicosocial a familias afectadas",
    horas: 15,
    fecha: "2025-04-18",
    lugar: "Cauca - Argelia"
  }
];
```

---

## 2. ZONAS AFECTADAS (GEORREFERENCIACIÓN)

```javascript
const zonasAfectadas = [
  {
    id: 1,
    nombre: "Comunidad El Progreso",
    departamento: "Chocó",
    municipio: "Quibdó",
    coordenadas: { lat: 5.6947, lng: -76.6611 },
    tipoEmergencia: "Inundación",
    nivelPrioridad: "urgente",
    necesidades: [
      { tipo: "agua", descripcion: "Agua potable", cantidad: "500 litros/día" },
      { tipo: "alimentos", descripcion: "Alimentos no perecederos", cantidad: "150 kits" },
      { tipo: "vivienda", descripcion: "Albergue temporal", cantidad: "40 familias" }
    ],
    poblacionAfectada: 230,
    fechaReporte: "2025-04-01",
    estado: "activa"
  },
  {
    id: 2,
    nombre: "Vereda La Esperanza",
    departamento: "Putumayo",
    municipio: "Mocoa",
    coordenadas: { lat: 1.1533, lng: -76.6411 },
    tipoEmergencia: "Deslizamiento",
    nivelPrioridad: "alta",
    necesidades: [
      { tipo: "salud", descripcion: "Atención médica urgente", cantidad: "2 brigadas" },
      { tipo: "vivienda", descripcion: "Carpas y lonas", cantidad: "25 unidades" },
      { tipo: "psicosocial", descripcion: "Apoyo psicológico", cantidad: "80 personas" }
    ],
    poblacionAfectada: 180,
    fechaReporte: "2025-04-05",
    estado: "activa"
  },
  {
    id: 3,
    nombre: "Cabildo Indígena Wayúu",
    departamento: "La Guajira",
    municipio: "Uribia",
    coordenadas: { lat: 11.7289, lng: -72.2686 },
    tipoEmergencia: "Sequía",
    nivelPrioridad: "urgente",
    necesidades: [
      { tipo: "agua", descripcion: "Agua potable para consumo", cantidad: "1000 litros/día" },
      { tipo: "alimentos", descripcion: "Alimentos y nutrición", cantidad: "200 kits" },
      { tipo: "salud", descripcion: "Atención pediátrica", cantidad: "120 niños" }
    ],
    poblacionAfectada: 450,
    fechaReporte: "2025-03-28",
    estado: "activa"
  },
  {
    id: 4,
    nombre: "Corregimiento San José",
    departamento: "Nariño",
    municipio: "Tumaco",
    coordenadas: { lat: 1.8, lng: -78.8 },
    tipoEmergencia: "Inundación costera",
    nivelPrioridad: "alta",
    necesidades: [
      { tipo: "alimentos", descripcion: "Alimentos básicos", cantidad: "100 kits" },
      { tipo: "educacion", descripcion: "Kits escolares", cantidad: "80 niños" },
      { tipo: "vivienda", descripcion: "Reparación de viviendas", cantidad: "30 casas" }
    ],
    poblacionAfectada: 320,
    fechaReporte: "2025-04-10",
    estado: "activa"
  },
  {
    id: 5,
    nombre: "Zona Rural Los Alpes",
    departamento: "Cauca",
    municipio: "Argelia",
    coordenadas: { lat: 2.2, lng: -77.2 },
    tipoEmergencia: "Sismo",
    nivelPrioridad: "media",
    necesidades: [
      { tipo: "vivienda", descripcion: "Evaluación estructural", cantidad: "50 viviendas" },
      { tipo: "psicosocial", descripcion: "Atención trauma post-sismo", cantidad: "150 personas" }
    ],
    poblacionAfectada: 200,
    fechaReporte: "2025-04-08",
    estado: "activa"
  }
];
```

---

## 3. REPORTES COMUNITARIOS

```javascript
const reportes = [
  {
    id: 1,
    nombreReportante: "Consejo Comunitario del Río Atrato",
    contacto: "consejo.atrato@example.com",
    region: "Chocó",
    tipoNecesidad: "agua",
    urgencia: "urgente",
    descripcion: "Se requiere urgente suministro de agua potable. El río está contaminado por derrames y las familias no tienen acceso a agua limpia. Hay casos de enfermedades gastrointestinales en niños.",
    archivosAdjuntos: ["foto_rio_contaminado.jpg", "reporte_salud.pdf"],
    fechaReporte: "2025-04-12",
    estado: "nuevo",
    respuesta: null
  },
  {
    id: 2,
    nombreReportante: "Líder Indígena María Kudry",
    contacto: "maria.kudry@example.com",
    region: "La Guajira",
    tipoNecesidad: "salud",
    urgencia: "urgente",
    descripcion: "Necesitamos brigada médica urgente. Hay 15 niños con desnutrición severa y no hay centro de salud cercano. La sequía ha agravado la situación alimentaria.",
    archivosAdjuntos: ["casos_desnutricion.xlsx"],
    fechaReporte: "2025-04-10",
    estado: "en_proceso",
    respuesta: "Brigada médica programada para el 18 de abril. Se enviarán kits nutricionales."
  },
  {
    id: 3,
    nombreReportante: "Defensor Comunitario - Tumaco",
    contacto: "defensor.tumaco@example.com",
    region: "Nariño",
    tipoNecesidad: "educacion",
    urgencia: "alta",
    descripcion: "La escuela quedó inundada. 80 niños sin clases hace 2 semanas. Necesitamos carpas para aulas temporales y materiales educativos.",
    archivosAdjuntos: ["fotos_escuela.jpg"],
    fechaReporte: "2025-04-09",
    estado: "nuevo",
    respuesta: null
  },
  {
    id: 4,
    nombreReportante: "Junta de Acción Comunal El Porvenir",
    contacto: "jac.elporvenir@example.com",
    region: "Putumayo",
    tipoNecesidad: "vivienda",
    urgencia: "alta",
    descripcion: "El deslizamiento dejó 12 familias sin hogar. Urge albergue temporal y evaluación de riesgo en la zona.",
    archivosAdjuntos: ["video_deslizamiento.mp4", "censo_afectados.pdf"],
    fechaReporte: "2025-04-11",
    estado: "nuevo",
    respuesta: null
  }
];
```

---

## 4. ALERTAS CLIMÁTICAS

```javascript
const alertas = [
  {
    id: 1,
    tipo: "Inundación",
    nivel: "Naranja",
    region: "Chocó - Zona del Atrato",
    descripcion: "Se esperan lluvias intensas en las próximas 24 horas. Posibles crecientes del río Atrato.",
    recomendaciones: [
      "Mantenerse alejado de las riberas del río",
      "Preparar kit de emergencia",
      "Identificar rutas de evacuación",
      "Estar atentos a instrucciones de autoridades"
    ],
    alberguesDisponibles: [
      { nombre: "Colegio San José", direccion: "Calle 5 #12-34", capacidad: 150 },
      { nombre: "Polideportivo Municipal", direccion: "Carrera 8 #20-10", capacidad: 200 }
    ],
    fechaEmision: "2025-04-13 08:00",
    vigenciaHasta: "2025-04-15 18:00",
    estado: "activa"
  },
  {
    id: 2,
    tipo: "Sequía",
    nivel: "Rojo",
    region: "La Guajira - Alta y Media Guajira",
    descripcion: "Sequía severa. Temperaturas superiores a 38°C. Bajo nivel en fuentes hídricas.",
    recomendaciones: [
      "Racionar el agua disponible",
      "Protegerse del sol entre 10am y 4pm",
      "Hidratarse constantemente",
      "Proteger a niños y adultos mayores del calor"
    ],
    alberguesDisponibles: [],
    fechaEmision: "2025-04-01 06:00",
    vigenciaHasta: "2025-04-30 23:59",
    estado: "activa"
  },
  {
    id: 3,
    tipo: "Deslizamiento",
    nivel: "Amarillo",
    region: "Cauca - Zona montañosa",
    descripcion: "Riesgo de deslizamientos en zonas de ladera por saturación del suelo.",
    recomendaciones: [
      "Evitar transitar por zonas de ladera",
      "Reportar grietas o señales de movimiento de tierra",
      "Tener plan familiar de evacuación",
      "Estar atentos a sonidos inusuales"
    ],
    alberguesDisponibles: [
      { nombre: "Casa Comunal", direccion: "Centro del municipio", capacidad: 80 }
    ],
    fechaEmision: "2025-04-12 14:00",
    vigenciaHasta: "2025-04-14 14:00",
    estado: "activa"
  }
];
```

---

## 5. INDICADORES DEL DASHBOARD

```javascript
const indicadores = {
  aportesTotales: {
    monto: 12450000, // COP
    cantidad: 142,
    crecimiento: "+18% vs mes anterior"
  },
  personasBeneficiadas: {
    total: 1580,
    ninos: 420,
    adultos: 960,
    adultosMayores: 200
  },
  zonasIntervenidas: {
    total: 15,
    porDepartamento: {
      "Chocó": 4,
      "Putumayo": 3,
      "La Guajira": 3,
      "Nariño": 3,
      "Cauca": 2
    }
  },
  tiposAyuda: {
    "Agua potable": 35,
    "Alimentos": 42,
    "Salud": 28,
    "Vivienda": 18,
    "Educación": 12,
    "Apoyo psicosocial": 23
  },
  voluntarios: {
    total: 87,
    horasDonadas: 1240
  }
};
```

---

## 6. CONTENIDO EDUCATIVO (LA NATURALEZA KIDS)

### Cuentos
```javascript
const cuentos = [
  {
    id: 1,
    titulo: "El árbol protector",
    autor: "Equipo LA NATURALEZA",
    idioma: "español",
    categoria: "Solidaridad",
    resumen: "Historia sobre un árbol que protege a los animales del bosque durante una tormenta, enseñando el valor de la solidaridad.",
    contenido: "...",
    edadRecomendada: "6-10 años",
    duracionLectura: "5 minutos"
  },
  {
    id: 2,
    titulo: "María y el río de colores",
    autor: "Equipo LA NATURALEZA",
    idioma: "español",
    categoria: "Medio Ambiente",
    resumen: "María descubre cómo cuidar el río de su comunidad y enseña a otros niños sobre la importancia del agua.",
    contenido: "...",
    edadRecomendada: "8-12 años",
    duracionLectura: "7 minutos"
  }
];
```

### Juegos
```javascript
const juegos = [
  {
    id: 1,
    nombre: "Evacua Rápido",
    tipo: "Simulación",
    descripcion: "Aprende las rutas de evacuación en caso de emergencia",
    puntos: 100,
    nivelDificultad: "Fácil",
    tematicas: ["Evacuación", "Prevención", "Seguridad"]
  },
  {
    id: 2,
    nombre: "Detective del Agua",
    tipo: "Trivia",
    descripcion: "Responde preguntas sobre el cuidado del agua",
    puntos: 150,
    nivelDificultad: "Medio",
    tematicas: ["Agua", "Medio Ambiente"]
  }
];
```

---

## 7. DATOS DE INTEROPERABILIDAD (SIMULADA)

```javascript
const sistemasIntegrados = [
  {
    nombre: "Vision Web",
    estado: "Conectado",
    ultimaSincronizacion: "2025-04-13 10:30",
    datosCompartidos: [
      "Ubicación de defensores regionales",
      "Casos en seguimiento"
    ]
  },
  {
    nombre: "Sistema de Alertas Tempranas",
    estado: "Conectado",
    ultimaSincronizacion: "2025-04-13 10:15",
    datosCompartidos: [
      "Alertas meteorológicas",
      "Zonas de riesgo"
    ]
  },
  {
    nombre: "Sistema de Gestión Territorial",
    estado: "Conectado",
    ultimaSincronizacion: "2025-04-13 09:45",
    datosCompartidos: [
      "Mapas territoriales",
      "Comunidades registradas"
    ]
  },
  {
    nombre: "IRIS (Gestión Documental)",
    estado: "Conectado",
    ultimaSincronizacion: "2025-04-13 10:00",
    datosCompartidos: [
      "Reportes de campo",
      "Documentos de seguimiento"
    ]
  }
];
```

---

## NOTAS DE USO

1. **Actualización de datos**: Los datos pueden ser actualizados directamente en los archivos de configuración del proyecto
2. **Formato de fechas**: Usar formato ISO (YYYY-MM-DD) para consistencia
3. **Montos**: En pesos colombianos (COP)
4. **Coordenadas**: Formato decimal (lat, lng)
5. **Estados**: Mantener nomenclatura consistente (activa, en_proceso, resuelta, etc.)

---

**Última actualización**: Noviembre 6, 2025
