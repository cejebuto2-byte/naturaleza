export interface Albergue {
  nombre: string;
  direccion: string;
  capacidad: number;
}

export interface Alerta {
  id: number;
  tipo: string;
  nivel: 'Rojo' | 'Naranja' | 'Amarillo' | 'Verde';
  region: string;
  descripcion: string;
  recomendaciones: string[];
  alberguesDisponibles: Albergue[];
  fechaEmision: string;
  vigenciaHasta: string;
  estado: 'activa' | 'vencida';
}

export const alertasData: Alerta[] = [
  {
    id: 1,
    tipo: 'Inundación',
    nivel: 'Naranja',
    region: 'Chocó - Zona del Atrato',
    descripcion:
      'Se esperan lluvias intensas en las próximas 24 horas. Posibles crecientes del río Atrato.',
    recomendaciones: [
      'Mantenerse alejado de las riberas del río',
      'Preparar kit de emergencia',
      'Identificar rutas de evacuación',
      'Estar atentos a instrucciones de autoridades',
    ],
    alberguesDisponibles: [
      { nombre: 'Colegio San José', direccion: 'Calle 5 #12-34', capacidad: 150 },
      { nombre: 'Polideportivo Municipal', direccion: 'Carrera 8 #20-10', capacidad: 200 },
    ],
    fechaEmision: '2025-04-13 08:00',
    vigenciaHasta: '2025-04-15 18:00',
    estado: 'activa',
  },
  {
    id: 2,
    tipo: 'Sequía',
    nivel: 'Rojo',
    region: 'La Guajira - Alta y Media Guajira',
    descripcion: 'Sequía severa. Temperaturas superiores a 38°C. Bajo nivel en fuentes hídricas.',
    recomendaciones: [
      'Racionar el agua disponible',
      'Protegerse del sol entre 10am y 4pm',
      'Hidratarse constantemente',
      'Proteger a niños y adultos mayores del calor',
    ],
    alberguesDisponibles: [],
    fechaEmision: '2025-04-01 06:00',
    vigenciaHasta: '2025-04-30 23:59',
    estado: 'activa',
  },
  {
    id: 3,
    tipo: 'Deslizamiento',
    nivel: 'Amarillo',
    region: 'Cauca - Zona montañosa',
    descripcion: 'Riesgo de deslizamientos en zonas de ladera por saturación del suelo.',
    recomendaciones: [
      'Evitar transitar por zonas de ladera',
      'Reportar grietas o señales de movimiento de tierra',
      'Tener plan familiar de evacuación',
      'Estar atentos a sonidos inusuales',
    ],
    alberguesDisponibles: [{ nombre: 'Casa Comunal', direccion: 'Centro del municipio', capacidad: 80 }],
    fechaEmision: '2025-04-12 14:00',
    vigenciaHasta: '2025-04-14 14:00',
    estado: 'activa',
  },
  {
    id: 4,
    tipo: 'Tormenta tropical',
    nivel: 'Naranja',
    region: 'Nariño - Costa Pacífica',
    descripcion: 'Vientos fuertes y lluvias torrenciales esperadas. Oleaje alto en zonas costeras.',
    recomendaciones: [
      'Asegurar techos y objetos que puedan volar',
      'Alejarse de la costa',
      'Permanecer en lugares seguros',
      'No cruzar ríos o quebradas',
    ],
    alberguesDisponibles: [
      { nombre: 'Escuela Central', direccion: 'Av. Principal #45-12', capacidad: 120 },
    ],
    fechaEmision: '2025-04-13 10:00',
    vigenciaHasta: '2025-04-14 20:00',
    estado: 'activa',
  },
];
