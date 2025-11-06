export interface Reporte {
  id: number;
  nombreReportante: string;
  contacto: string;
  region: string;
  tipoNecesidad: 'agua' | 'alimentos' | 'salud' | 'vivienda' | 'educacion' | 'psicosocial';
  urgencia: 'urgente' | 'alta' | 'media' | 'baja';
  descripcion: string;
  archivosAdjuntos: string[];
  fechaReporte: string;
  estado: 'nuevo' | 'en_proceso' | 'resuelto';
  respuesta: string | null;
}

export const reportesData: Reporte[] = [
  {
    id: 1,
    nombreReportante: 'Consejo Comunitario del Río Atrato',
    contacto: 'consejo.atrato@example.com',
    region: 'Chocó',
    tipoNecesidad: 'agua',
    urgencia: 'urgente',
    descripcion:
      'Se requiere urgente suministro de agua potable. El río está contaminado por derrames y las familias no tienen acceso a agua limpia. Hay casos de enfermedades gastrointestinales en niños.',
    archivosAdjuntos: ['foto_rio_contaminado.jpg', 'reporte_salud.pdf'],
    fechaReporte: '2025-04-12',
    estado: 'nuevo',
    respuesta: null,
  },
  {
    id: 2,
    nombreReportante: 'Líder Indígena María Kudry',
    contacto: 'maria.kudry@example.com',
    region: 'La Guajira',
    tipoNecesidad: 'salud',
    urgencia: 'urgente',
    descripcion:
      'Necesitamos brigada médica urgente. Hay 15 niños con desnutrición severa y no hay centro de salud cercano. La sequía ha agravado la situación alimentaria.',
    archivosAdjuntos: ['casos_desnutricion.xlsx'],
    fechaReporte: '2025-04-10',
    estado: 'en_proceso',
    respuesta: 'Brigada médica programada para el 18 de abril. Se enviarán kits nutricionales.',
  },
  {
    id: 3,
    nombreReportante: 'Defensor Comunitario - Tumaco',
    contacto: 'defensor.tumaco@example.com',
    region: 'Nariño',
    tipoNecesidad: 'educacion',
    urgencia: 'alta',
    descripcion:
      'La escuela quedó inundada. 80 niños sin clases hace 2 semanas. Necesitamos carpas para aulas temporales y materiales educativos.',
    archivosAdjuntos: ['fotos_escuela.jpg'],
    fechaReporte: '2025-04-09',
    estado: 'nuevo',
    respuesta: null,
  },
  {
    id: 4,
    nombreReportante: 'Junta de Acción Comunal El Porvenir',
    contacto: 'jac.elporvenir@example.com',
    region: 'Putumayo',
    tipoNecesidad: 'vivienda',
    urgencia: 'alta',
    descripcion:
      'El deslizamiento dejó 12 familias sin hogar. Urge albergue temporal y evaluación de riesgo en la zona.',
    archivosAdjuntos: ['video_deslizamiento.mp4', 'censo_afectados.pdf'],
    fechaReporte: '2025-04-11',
    estado: 'nuevo',
    respuesta: null,
  },
  {
    id: 5,
    nombreReportante: 'Asociación de Pescadores Pacífico',
    contacto: 'pescadores.pacifico@example.com',
    region: 'Chocó',
    tipoNecesidad: 'alimentos',
    urgencia: 'media',
    descripcion:
      'Las inundaciones dañaron los cultivos de pancoger. 45 familias necesitan alimentos mientras recuperan sus siembras.',
    archivosAdjuntos: ['fotos_cultivos.jpg'],
    fechaReporte: '2025-04-08',
    estado: 'en_proceso',
    respuesta: 'Se están coordinando kits alimentarios. Llegarán en 5 días.',
  },
];
