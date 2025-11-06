export interface Alerta {
  id: number;
  titulo: string;
  tipo: 'meteorologica' | 'sismica' | 'inundacion' | 'deslizamiento' | 'incendio' | 'sequia';
  nivelSeveridad: 'rojo' | 'naranja' | 'amarillo' | 'verde';
  descripcion: string;
  regiones: string[];
  departamentos: string[];
  fechaEmision: string;
  fechaExpiracion: string;
  estado: 'activa' | 'expirada';
  recomendaciones: string[];
  fuente: string;
}

export interface Albergue {
  id: number;
  nombre: string;
  direccion: string;
  municipio: string;
  departamento: string;
  coordenadas: { lat: number; lng: number };
  capacidad: number;
  ocupacionActual: number;
  servicios: string[];
  contacto: string;
  estado: 'disponible' | 'lleno' | 'en_preparacion';
}

export interface RutaEvacuacion {
  id: number;
  nombre: string;
  puntoInicio: string;
  puntoFinal: string;
  municipio: string;
  departamento: string;
  distancia: string;
  tiempoEstimado: string;
  coordenadas: Array<{ lat: number; lng: number }>;
  tipo: 'peatonal' | 'vehicular' | 'mixta';
  estado: 'habilitada' | 'bloqueada' | 'precaucion';
}

export interface MedidasAutocuidado {
  tipoEmergencia: string;
  icono: string;
  color: string;
  medidas: {
    antes: string[];
    durante: string[];
    despues: string[];
  };
}

export interface Suscripcion {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  regiones: string[];
  tiposAlerta: string[];
  canales: string[];
  activa: boolean;
  fechaSuscripcion: string;
}

export const alertasData: Alerta[] = [
  {
    id: 1,
    titulo: 'Alerta Roja por Lluvias Intensas',
    tipo: 'meteorologica',
    nivelSeveridad: 'rojo',
    descripcion:
      'Se pronostican lluvias intensas en las próximas 24 horas con riesgo de inundaciones y deslizamientos. Se recomienda a la población mantenerse alerta y seguir las instrucciones de las autoridades.',
    regiones: ['Caribe', 'Andina'],
    departamentos: ['Bolívar', 'Atlántico', 'Antioquia', 'Cundinamarca'],
    fechaEmision: '2025-01-06T06:00:00',
    fechaExpiracion: '2025-01-07T18:00:00',
    estado: 'activa',
    recomendaciones: [
      'Evitar circular por zonas inundables',
      'Mantener kit de emergencia preparado',
      'Estar atento a las indicaciones de evacuación',
      'No cruzar ríos o quebradas crecidas',
      'Resguardarse en lugar seguro',
    ],
    fuente: 'IDEAM - Instituto de Hidrología, Meteorología y Estudios Ambientales',
  },
  {
    id: 2,
    titulo: 'Alerta Naranja por Actividad Sísmica',
    tipo: 'sismica',
    nivelSeveridad: 'naranja',
    descripcion:
      'Se ha registrado actividad sísmica inusual en la región. Existe la posibilidad de réplicas. La población debe mantenerse informada y preparada.',
    regiones: ['Pacífico', 'Andina'],
    departamentos: ['Valle del Cauca', 'Cauca', 'Nariño'],
    fechaEmision: '2025-01-05T14:30:00',
    fechaExpiracion: '2025-01-08T23:59:00',
    estado: 'activa',
    recomendaciones: [
      'Identificar zonas seguras en su vivienda',
      'Tener plan de evacuación familiar',
      'Mantener documentos importantes a mano',
      'Evitar pánico y seguir protocolos de seguridad',
      'Estar atento a información oficial',
    ],
    fuente: 'Servicio Geológico Colombiano',
  },
  {
    id: 3,
    titulo: 'Alerta Amarilla por Creciente de Ríos',
    tipo: 'inundacion',
    nivelSeveridad: 'amarillo',
    descripcion:
      'Los niveles de varios ríos están en aumento. Se recomienda precaución a las comunidades ribereñas y mantenerse informados sobre la evolución de las condiciones.',
    regiones: ['Amazonía', 'Orinoquía'],
    departamentos: ['Amazonas', 'Caquetá', 'Meta', 'Casanare'],
    fechaEmision: '2025-01-04T10:00:00',
    fechaExpiracion: '2025-01-09T10:00:00',
    estado: 'activa',
    recomendaciones: [
      'Alejarse de zonas ribereñas',
      'Preparar kit de emergencia',
      'Estar atento a comunicados oficiales',
      'No acercarse a ríos o quebradas',
    ],
    fuente: 'IDEAM',
  },
  {
    id: 4,
    titulo: 'Alerta Verde - Condiciones Normales',
    tipo: 'meteorologica',
    nivelSeveridad: 'verde',
    descripcion:
      'Las condiciones meteorológicas son normales. No hay amenazas inmediatas. Se recomienda mantener medidas preventivas habituales.',
    regiones: ['Insular'],
    departamentos: ['San Andrés y Providencia'],
    fechaEmision: '2025-01-06T00:00:00',
    fechaExpiracion: '2025-01-13T23:59:00',
    estado: 'activa',
    recomendaciones: [
      'Mantener planes de emergencia actualizados',
      'Revisar kit de emergencia periódicamente',
      'Mantenerse informado sobre el clima',
    ],
    fuente: 'IDEAM',
  },
  {
    id: 5,
    titulo: 'Alerta Naranja por Riesgo de Deslizamientos',
    tipo: 'deslizamiento',
    nivelSeveridad: 'naranja',
    descripcion:
      'Las lluvias recientes han saturado el suelo en zonas de ladera. Existe alto riesgo de deslizamientos de tierra. Población en zonas de riesgo debe estar preparada para evacuar.',
    regiones: ['Andina'],
    departamentos: ['Quindío', 'Risaralda', 'Caldas'],
    fechaEmision: '2025-01-05T16:00:00',
    fechaExpiracion: '2025-01-08T16:00:00',
    estado: 'activa',
    recomendaciones: [
      'Evacuar viviendas en zonas de alto riesgo',
      'No transitar por carreteras de montaña en mal estado',
      'Reportar grietas o movimientos de tierra',
      'Seguir rutas de evacuación establecidas',
    ],
    fuente: 'Servicio Geológico Colombiano',
  },
];

export const alberguesData: Albergue[] = [
  {
    id: 1,
    nombre: 'Polideportivo Municipal de Cartagena',
    direccion: 'Calle 30 # 50-25, Barrio Bosque',
    municipio: 'Cartagena',
    departamento: 'Bolívar',
    coordenadas: { lat: 10.4067, lng: -75.5143 },
    capacidad: 500,
    ocupacionActual: 150,
    servicios: [
      'Agua potable',
      'Alimentación',
      'Atención médica',
      'Baños',
      'Duchas',
      'Área de descanso',
    ],
    contacto: '+57 300 123 4567',
    estado: 'disponible',
  },
  {
    id: 2,
    nombre: 'Coliseo El Pueblo - Cali',
    direccion: 'Carrera 44 # 5-100',
    municipio: 'Cali',
    departamento: 'Valle del Cauca',
    coordenadas: { lat: 3.4516, lng: -76.532 },
    capacidad: 800,
    ocupacionActual: 620,
    servicios: [
      'Agua potable',
      'Alimentación',
      'Primeros auxilios',
      'Baños',
      'Área infantil',
      'Atención psicosocial',
    ],
    contacto: '+57 300 234 5678',
    estado: 'disponible',
  },
  {
    id: 3,
    nombre: 'Centro Comunitario de Popayán',
    direccion: 'Calle 5 # 8-40, Centro',
    municipio: 'Popayán',
    departamento: 'Cauca',
    coordenadas: { lat: 2.4419, lng: -76.6063 },
    capacidad: 300,
    ocupacionActual: 300,
    servicios: ['Agua potable', 'Alimentación', 'Atención médica', 'Baños'],
    contacto: '+57 300 345 6789',
    estado: 'lleno',
  },
  {
    id: 4,
    nombre: 'Estadio de Fútbol - Quibdó',
    direccion: 'Barrio Kennedy',
    municipio: 'Quibdó',
    departamento: 'Chocó',
    coordenadas: { lat: 5.6947, lng: -76.6611 },
    capacidad: 600,
    ocupacionActual: 0,
    servicios: [
      'Agua potable',
      'Cocina comunitaria',
      'Enfermería',
      'Baños',
      'Electricidad',
    ],
    contacto: '+57 300 456 7890',
    estado: 'en_preparacion',
  },
  {
    id: 5,
    nombre: 'Institución Educativa La Esperanza',
    direccion: 'Calle 15 # 20-30',
    municipio: 'Tumaco',
    departamento: 'Nariño',
    coordenadas: { lat: 1.8006, lng: -78.7655 },
    capacidad: 400,
    ocupacionActual: 80,
    servicios: [
      'Agua potable',
      'Alimentación',
      'Atención médica',
      'Baños',
      'Aulas acondicionadas',
    ],
    contacto: '+57 300 567 8901',
    estado: 'disponible',
  },
];

export const rutasEvacuacionData: RutaEvacuacion[] = [
  {
    id: 1,
    nombre: 'Ruta de Evacuación Centro - Polideportivo',
    puntoInicio: 'Plaza Principal',
    puntoFinal: 'Polideportivo Municipal',
    municipio: 'Cartagena',
    departamento: 'Bolívar',
    distancia: '2.5 km',
    tiempoEstimado: '30 minutos',
    coordenadas: [
      { lat: 10.3932, lng: -75.4832 },
      { lat: 10.3978, lng: -75.4901 },
      { lat: 10.4025, lng: -75.5021 },
      { lat: 10.4067, lng: -75.5143 },
    ],
    tipo: 'peatonal',
    estado: 'habilitada',
  },
  {
    id: 2,
    nombre: 'Ruta Principal Cali Norte',
    puntoInicio: 'Terminal de Transporte',
    puntoFinal: 'Coliseo El Pueblo',
    municipio: 'Cali',
    departamento: 'Valle del Cauca',
    distancia: '5 km',
    tiempoEstimado: '15 minutos en vehículo',
    coordenadas: [
      { lat: 3.4372, lng: -76.5225 },
      { lat: 3.4428, lng: -76.5275 },
      { lat: 3.4489, lng: -76.5303 },
      { lat: 3.4516, lng: -76.532 },
    ],
    tipo: 'vehicular',
    estado: 'habilitada',
  },
  {
    id: 3,
    nombre: 'Ruta de Evacuación Sur Popayán',
    puntoInicio: 'Parque Caldas',
    puntoFinal: 'Centro Comunitario',
    municipio: 'Popayán',
    departamento: 'Cauca',
    distancia: '1.2 km',
    tiempoEstimado: '15 minutos',
    coordenadas: [
      { lat: 2.4422, lng: -76.6065 },
      { lat: 2.4425, lng: -76.6064 },
      { lat: 2.4419, lng: -76.6063 },
    ],
    tipo: 'peatonal',
    estado: 'precaucion',
  },
];

export const medidasAutocuidadoData: MedidasAutocuidado[] = [
  {
    tipoEmergencia: 'Inundación',
    icono: '🌊',
    color: 'blue',
    medidas: {
      antes: [
        'Identifique las zonas de mayor riesgo en su comunidad',
        'Prepare un kit de emergencia con documentos, agua, alimentos no perecederos',
        'Establezca un plan de evacuación familiar',
        'Mantenga limpios desagües y canales de agua',
      ],
      durante: [
        'Evacue inmediatamente si las autoridades lo indican',
        'Diríjase a terrenos altos',
        'No intente cruzar corrientes de agua',
        'Desconecte aparatos eléctricos',
        'Manténgase informado por medios oficiales',
      ],
      despues: [
        'No regrese a su hogar hasta que las autoridades lo autoricen',
        'Revise daños estructurales antes de ingresar',
        'No consuma agua no potable',
        'Limpie y desinfecte todo lo que tuvo contacto con agua',
        'Reporte daños a las autoridades',
      ],
    },
  },
  {
    tipoEmergencia: 'Sismo',
    icono: '🏚️',
    color: 'orange',
    medidas: {
      antes: [
        'Identifique zonas seguras en su hogar (bajo mesas, marcos de puertas)',
        'Asegure objetos pesados que puedan caer',
        'Tenga kit de emergencia preparado',
        'Practique simulacros de evacuación',
      ],
      durante: [
        'Mantenga la calma',
        'Ubíquese en zona segura: Agáchese, Cúbrase, Agárrese',
        'Aléjese de ventanas y objetos que puedan caer',
        'Si está en la calle, aléjese de edificios',
        'No use ascensores',
      ],
      despues: [
        'Verifique que no haya heridos',
        'Revise daños estructurales',
        'Esté preparado para réplicas',
        'No encienda fósforos si hay olor a gas',
        'Evacue si hay riesgo de derrumbe',
      ],
    },
  },
  {
    tipoEmergencia: 'Deslizamiento',
    icono: '⛰️',
    color: 'brown',
    medidas: {
      antes: [
        'Identifique si vive en zona de riesgo (laderas, suelos inestables)',
        'Observe señales de alerta (grietas, árboles inclinados, agua turbia)',
        'Reporte anomalías a las autoridades',
        'Tenga plan de evacuación establecido',
      ],
      durante: [
        'Evacue inmediatamente si ve señales de movimiento',
        'Aléjese de la zona de riesgo',
        'No intente recuperar pertenencias',
        'Diríjase a zonas altas y estables',
        'Alerte a vecinos',
      ],
      despues: [
        'No regrese a la zona hasta que sea seguro',
        'Esté atento a posibles réplicas',
        'Reporte víctimas o daños',
        'No construya ni habite en zonas de alto riesgo',
      ],
    },
  },
  {
    tipoEmergencia: 'Incendio Forestal',
    icono: '🔥',
    color: 'red',
    medidas: {
      antes: [
        'Mantenga limpia la vegetación alrededor de su vivienda',
        'No arroje colillas ni vidrios que puedan causar incendios',
        'Tenga extintores y agua disponible',
        'Conozca rutas de evacuación',
      ],
      durante: [
        'Llame inmediatamente a bomberos',
        'Evacue si el fuego se acerca',
        'Cierre puertas y ventanas',
        'Cubra nariz y boca con paño húmedo',
        'Diríjase al punto de encuentro establecido',
      ],
      despues: [
        'No regrese hasta que sea seguro',
        'Revise que no haya focos activos',
        'Ventile bien antes de entrar a la vivienda',
        'Busque atención médica si tiene problemas respiratorios',
      ],
    },
  },
];

export const estadisticasAlertas = {
  totalAlertas: alertasData.filter((a) => a.estado === 'activa').length,
  alertasPorSeveridad: {
    rojo: alertasData.filter((a) => a.nivelSeveridad === 'rojo' && a.estado === 'activa').length,
    naranja: alertasData.filter((a) => a.nivelSeveridad === 'naranja' && a.estado === 'activa')
      .length,
    amarillo: alertasData.filter((a) => a.nivelSeveridad === 'amarillo' && a.estado === 'activa')
      .length,
    verde: alertasData.filter((a) => a.nivelSeveridad === 'verde' && a.estado === 'activa').length,
  },
  alberguesDisponibles: alberguesData.filter((a) => a.estado === 'disponible').length,
  capacidadTotal: alberguesData.reduce((sum, a) => sum + a.capacidad, 0),
  ocupacionTotal: alberguesData.reduce((sum, a) => sum + a.ocupacionActual, 0),
};
