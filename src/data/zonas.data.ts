export interface Necesidad {
  tipo: 'agua' | 'alimentos' | 'salud' | 'vivienda' | 'educacion' | 'psicosocial';
  descripcion: string;
  cantidad: string;
}

export interface ZonaAfectada {
  id: number;
  nombre: string;
  departamento: string;
  municipio: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  tipoEmergencia: string;
  nivelPrioridad: 'urgente' | 'alta' | 'media' | 'baja';
  necesidades: Necesidad[];
  poblacionAfectada: number;
  fechaReporte: string;
  estado: 'activa' | 'en_proceso' | 'resuelta';
}

export const zonasAfectadasData: ZonaAfectada[] = [
  {
    id: 1,
    nombre: 'Comunidad El Progreso',
    departamento: 'Chocó',
    municipio: 'Quibdó',
    coordenadas: { lat: 5.6947, lng: -76.6611 },
    tipoEmergencia: 'Inundación',
    nivelPrioridad: 'urgente',
    necesidades: [
      { tipo: 'agua', descripcion: 'Agua potable', cantidad: '500 litros/día' },
      { tipo: 'alimentos', descripcion: 'Alimentos no perecederos', cantidad: '150 kits' },
      { tipo: 'vivienda', descripcion: 'Albergue temporal', cantidad: '40 familias' },
    ],
    poblacionAfectada: 230,
    fechaReporte: '2025-04-01',
    estado: 'activa',
  },
  {
    id: 2,
    nombre: 'Vereda La Esperanza',
    departamento: 'Putumayo',
    municipio: 'Mocoa',
    coordenadas: { lat: 1.1533, lng: -76.6411 },
    tipoEmergencia: 'Deslizamiento',
    nivelPrioridad: 'alta',
    necesidades: [
      { tipo: 'salud', descripcion: 'Atención médica urgente', cantidad: '2 brigadas' },
      { tipo: 'vivienda', descripcion: 'Carpas y lonas', cantidad: '25 unidades' },
      { tipo: 'psicosocial', descripcion: 'Apoyo psicológico', cantidad: '80 personas' },
    ],
    poblacionAfectada: 180,
    fechaReporte: '2025-04-05',
    estado: 'activa',
  },
  {
    id: 3,
    nombre: 'Cabildo Indígena Wayúu',
    departamento: 'La Guajira',
    municipio: 'Uribia',
    coordenadas: { lat: 11.7289, lng: -72.2686 },
    tipoEmergencia: 'Sequía',
    nivelPrioridad: 'urgente',
    necesidades: [
      { tipo: 'agua', descripcion: 'Agua potable para consumo', cantidad: '1000 litros/día' },
      { tipo: 'alimentos', descripcion: 'Alimentos y nutrición', cantidad: '200 kits' },
      { tipo: 'salud', descripcion: 'Atención pediátrica', cantidad: '120 niños' },
    ],
    poblacionAfectada: 450,
    fechaReporte: '2025-03-28',
    estado: 'activa',
  },
  {
    id: 4,
    nombre: 'Corregimiento San José',
    departamento: 'Nariño',
    municipio: 'Tumaco',
    coordenadas: { lat: 1.8, lng: -78.8 },
    tipoEmergencia: 'Inundación costera',
    nivelPrioridad: 'alta',
    necesidades: [
      { tipo: 'alimentos', descripcion: 'Alimentos básicos', cantidad: '100 kits' },
      { tipo: 'educacion', descripcion: 'Kits escolares', cantidad: '80 niños' },
      { tipo: 'vivienda', descripcion: 'Reparación de viviendas', cantidad: '30 casas' },
    ],
    poblacionAfectada: 320,
    fechaReporte: '2025-04-10',
    estado: 'activa',
  },
  {
    id: 5,
    nombre: 'Zona Rural Los Alpes',
    departamento: 'Cauca',
    municipio: 'Argelia',
    coordenadas: { lat: 2.2, lng: -77.2 },
    tipoEmergencia: 'Sismo',
    nivelPrioridad: 'media',
    necesidades: [
      { tipo: 'vivienda', descripcion: 'Evaluación estructural', cantidad: '50 viviendas' },
      { tipo: 'psicosocial', descripcion: 'Atención trauma post-sismo', cantidad: '150 personas' },
    ],
    poblacionAfectada: 200,
    fechaReporte: '2025-04-08',
    estado: 'activa',
  },
  {
    id: 6,
    nombre: 'Resguardo Indígena Embera',
    departamento: 'Chocó',
    municipio: 'Alto Baudó',
    coordenadas: { lat: 5.1, lng: -76.8 },
    tipoEmergencia: 'Inundación',
    nivelPrioridad: 'alta',
    necesidades: [
      { tipo: 'agua', descripcion: 'Purificación de agua', cantidad: '300 litros/día' },
      { tipo: 'salud', descripcion: 'Brigada médica', cantidad: '1 brigada' },
      { tipo: 'alimentos', descripcion: 'Alimentos tradicionales', cantidad: '80 kits' },
    ],
    poblacionAfectada: 150,
    fechaReporte: '2025-04-12',
    estado: 'activa',
  },
];
