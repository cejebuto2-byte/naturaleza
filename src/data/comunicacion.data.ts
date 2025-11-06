export interface Reporte {
  id: number;
  nombreReportante: string;
  cargoRol: string;
  region: string;
  departamento: string;
  municipio: string;
  tipoNecesidad: string;
  descripcion: string;
  nivelUrgencia: 'critica' | 'alta' | 'media' | 'baja';
  fechaReporte: string;
  estado: 'nuevo' | 'en_revision' | 'en_atencion' | 'resuelto';
  archivoAdjunto?: string;
  personasAfectadas?: number;
  respuestas: Respuesta[];
}

export interface Respuesta {
  id: number;
  autor: string;
  cargo: string;
  mensaje: string;
  fecha: string;
  tipo: 'comentario' | 'accion' | 'solicitud_info';
}

export const reportesData: Reporte[] = [
  {
    id: 1,
    nombreReportante: 'María Gonzalez',
    cargoRol: 'Lideresa Comunitaria',
    region: 'Caribe',
    departamento: 'Bolívar',
    municipio: 'Cartagena',
    tipoNecesidad: 'Agua Potable',
    descripcion:
      'La comunidad de Pasacaballos lleva 3 días sin suministro de agua potable. Las tuberías principales fueron afectadas por las inundaciones recientes. Hay más de 500 familias afectadas que necesitan agua urgentemente.',
    nivelUrgencia: 'critica',
    fechaReporte: '2025-01-04T10:30:00',
    estado: 'en_atencion',
    personasAfectadas: 2500,
    respuestas: [
      {
        id: 1,
        autor: 'Carlos Mendez',
        cargo: 'Defensor Regional',
        mensaje:
          'Hemos recibido su reporte. Estamos coordinando con la alcaldía municipal y el acueducto para solución inmediata.',
        fecha: '2025-01-04T14:20:00',
        tipo: 'accion',
      },
      {
        id: 2,
        autor: 'Ana Rojas',
        cargo: 'Técnica de Emergencias',
        mensaje:
          'Carrotanques programados para mañana temprano. Se entregarán 10,000 litros de agua.',
        fecha: '2025-01-05T08:15:00',
        tipo: 'accion',
      },
    ],
  },
  {
    id: 2,
    nombreReportante: 'Pedro Ramírez',
    cargoRol: 'Defensor Regional',
    region: 'Pacífico',
    departamento: 'Chocó',
    municipio: 'Quibdó',
    tipoNecesidad: 'Salud',
    descripcion:
      'Se requiere brigada médica urgente en las comunidades ribereñas del río Atrato. Reportes de enfermedades gastrointestinales y respiratorias en niños menores de 5 años. Sin acceso a centro de salud.',
    nivelUrgencia: 'critica',
    fechaReporte: '2025-01-03T16:45:00',
    estado: 'en_atencion',
    personasAfectadas: 800,
    archivoAdjunto: 'reporte_salud_atrato.pdf',
    respuestas: [
      {
        id: 1,
        autor: 'Dr. Luis Torres',
        cargo: 'Coordinador de Salud',
        mensaje:
          'Brigada médica confirmada para el 7 de enero. Incluye pediatras, medicamentos y vacunas.',
        fecha: '2025-01-04T09:00:00',
        tipo: 'accion',
      },
    ],
  },
  {
    id: 3,
    nombreReportante: 'Sandra Patiño',
    cargoRol: 'Docente',
    region: 'Andina',
    departamento: 'Cauca',
    municipio: 'Popayán',
    tipoNecesidad: 'Educación',
    descripcion:
      'La escuela rural "El Porvenir" fue afectada por el sismo del pasado 28 de diciembre. Estructura comprometida, imposible dictar clases. 120 niños sin escolaridad.',
    nivelUrgencia: 'alta',
    fechaReporte: '2025-01-02T11:20:00',
    estado: 'en_revision',
    personasAfectadas: 120,
    archivoAdjunto: 'fotos_escuela_danos.zip',
    respuestas: [
      {
        id: 1,
        autor: 'Ingeniero Obras',
        cargo: 'Secretaría de Infraestructura',
        mensaje:
          '¿Podrían enviar fotos más detalladas de las grietas en las paredes? Necesitamos evaluar nivel de daño estructural.',
        fecha: '2025-01-03T14:30:00',
        tipo: 'solicitud_info',
      },
    ],
  },
  {
    id: 4,
    nombreReportante: 'José Martínez',
    cargoRol: 'Líder Indígena',
    region: 'Amazonía',
    departamento: 'Amazonas',
    municipio: 'Leticia',
    tipoNecesidad: 'Alimentos',
    descripcion:
      'Comunidad indígena Ticuna en situación de inseguridad alimentaria. Las lluvias destruyeron cultivos de yuca y plátano. Se necesitan alimentos no perecederos para 45 familias.',
    nivelUrgencia: 'alta',
    fechaReporte: '2025-01-01T08:00:00',
    estado: 'resuelto',
    personasAfectadas: 180,
    respuestas: [
      {
        id: 1,
        autor: 'Laura Gomez',
        cargo: 'Coordinadora de Aportes',
        mensaje:
          'Hemos destinado kits alimentarios de emergencia. Envío programado vía fluvial.',
        fecha: '2025-01-02T10:00:00',
        tipo: 'accion',
      },
      {
        id: 2,
        autor: 'José Martínez',
        cargo: 'Líder Indígena',
        mensaje:
          'Recibimos los kits alimentarios el día de hoy. Muchas gracias por la pronta respuesta. La comunidad está muy agradecida.',
        fecha: '2025-01-05T16:00:00',
        tipo: 'comentario',
      },
    ],
  },
  {
    id: 5,
    nombreReportante: 'Diana Herrera',
    cargoRol: 'Defensora Comunitaria',
    region: 'Orinoquía',
    departamento: 'Arauca',
    municipio: 'Saravena',
    tipoNecesidad: 'Vivienda',
    descripcion:
      'Familias desplazadas por inundaciones necesitan albergue temporal. Aproximadamente 30 familias sin lugar donde vivir. Se requiere espacio seguro y dotación básica.',
    nivelUrgencia: 'critica',
    fechaReporte: '2025-01-05T07:30:00',
    estado: 'nuevo',
    personasAfectadas: 150,
    respuestas: [],
  },
  {
    id: 6,
    nombreReportante: 'Roberto Silva',
    cargoRol: 'Defensor Regional',
    region: 'Andina',
    departamento: 'Cundinamarca',
    municipio: 'Guaduas',
    tipoNecesidad: 'Apoyo Psicosocial',
    descripcion:
      'Comunidad afectada emocionalmente tras deslizamiento que cobró 3 vidas. Se requiere acompañamiento psicosocial urgente, especialmente para niños y adultos mayores.',
    nivelUrgencia: 'alta',
    fechaReporte: '2025-01-04T18:00:00',
    estado: 'nuevo',
    personasAfectadas: 200,
    respuestas: [],
  },
  {
    id: 7,
    nombreReportante: 'Claudia Moreno',
    cargoRol: 'Promotora de Salud',
    region: 'Caribe',
    departamento: 'Magdalena',
    municipio: 'Santa Marta',
    tipoNecesidad: 'Agua Potable',
    descripcion:
      'Barrio Pescadito sin agua potable hace una semana. Tanque de almacenamiento dañado. Familias comprando agua a altos precios. Situación insostenible.',
    nivelUrgencia: 'media',
    fechaReporte: '2024-12-30T12:00:00',
    estado: 'en_revision',
    personasAfectadas: 300,
    respuestas: [
      {
        id: 1,
        autor: 'Técnico Acueducto',
        cargo: 'Empresa de Servicios',
        mensaje: 'Evaluación técnica programada para el 6 de enero. Estimamos reparación en 3 días.',
        fecha: '2025-01-04T11:00:00',
        tipo: 'comentario',
      },
    ],
  },
  {
    id: 8,
    nombreReportante: 'Fernando López',
    cargoRol: 'Líder Comunitario',
    region: 'Pacífico',
    departamento: 'Nariño',
    municipio: 'Tumaco',
    tipoNecesidad: 'Salud',
    descripcion:
      'Brote de dengue en zona rural. Más de 50 casos confirmados. Se necesitan fumigación y kits de prevención urgentes.',
    nivelUrgencia: 'alta',
    fechaReporte: '2025-01-03T09:15:00',
    estado: 'en_atencion',
    personasAfectadas: 500,
    respuestas: [
      {
        id: 1,
        autor: 'Epidemióloga Regional',
        cargo: 'Secretaría de Salud',
        mensaje:
          'Brigada de fumigación iniciará el 6 de enero. Se distribuirán toldillos y repelentes.',
        fecha: '2025-01-04T15:00:00',
        tipo: 'accion',
      },
    ],
  },
];

// Estadísticas de reportes
export const estadisticasReportes = {
  totalReportes: reportesData.length,
  reportesPorEstado: {
    nuevo: reportesData.filter((r) => r.estado === 'nuevo').length,
    en_revision: reportesData.filter((r) => r.estado === 'en_revision').length,
    en_atencion: reportesData.filter((r) => r.estado === 'en_atencion').length,
    resuelto: reportesData.filter((r) => r.estado === 'resuelto').length,
  },
  reportesPorUrgencia: {
    critica: reportesData.filter((r) => r.nivelUrgencia === 'critica').length,
    alta: reportesData.filter((r) => r.nivelUrgencia === 'alta').length,
    media: reportesData.filter((r) => r.nivelUrgencia === 'media').length,
    baja: reportesData.filter((r) => r.nivelUrgencia === 'baja').length,
  },
  reportesPorTipo: {
    'Agua Potable': reportesData.filter((r) => r.tipoNecesidad === 'Agua Potable').length,
    Salud: reportesData.filter((r) => r.tipoNecesidad === 'Salud').length,
    Alimentos: reportesData.filter((r) => r.tipoNecesidad === 'Alimentos').length,
    Vivienda: reportesData.filter((r) => r.tipoNecesidad === 'Vivienda').length,
    Educación: reportesData.filter((r) => r.tipoNecesidad === 'Educación').length,
    'Apoyo Psicosocial': reportesData.filter((r) => r.tipoNecesidad === 'Apoyo Psicosocial')
      .length,
  },
  personasAfectadasTotal: reportesData.reduce(
    (sum, r) => sum + (r.personasAfectadas || 0),
    0,
  ),
};
