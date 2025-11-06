export interface AporteMonetario {
  id: number;
  nombre: string;
  cargo: string;
  tipoAporte: 'monetario';
  monto: number;
  periodicidad: 'mensual' | 'quincenal';
  fechaInicio: string;
  activo: boolean;
}

export interface AporteEspecie {
  id: number;
  nombre: string;
  cargo: string;
  tipoAporte: 'especie';
  tipoAyuda: string;
  descripcion: string;
  fechaEntrega: string;
  destino: string;
}

export interface Voluntariado {
  id: number;
  nombre: string;
  cargo: string;
  tipoAporte: 'voluntariado';
  actividad: string;
  horas: number;
  fecha: string;
  lugar: string;
}

export type Aporte = AporteMonetario | AporteEspecie | Voluntariado;

export const aportesMonetariosData: AporteMonetario[] = [
  {
    id: 1,
    nombre: 'María González Pérez',
    cargo: 'Defensora Regional',
    tipoAporte: 'monetario',
    monto: 50000,
    periodicidad: 'mensual',
    fechaInicio: '2025-01-15',
    activo: true,
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    cargo: 'Coordinador Territorial',
    tipoAporte: 'monetario',
    monto: 30000,
    periodicidad: 'quincenal',
    fechaInicio: '2025-02-01',
    activo: true,
  },
  {
    id: 3,
    nombre: 'Ana Martínez López',
    cargo: 'Profesional Especializado',
    tipoAporte: 'monetario',
    monto: 100000,
    periodicidad: 'mensual',
    fechaInicio: '2025-01-01',
    activo: true,
  },
  {
    id: 4,
    nombre: 'Luis Fernando Castro',
    cargo: 'Asesor Técnico',
    tipoAporte: 'monetario',
    monto: 75000,
    periodicidad: 'mensual',
    fechaInicio: '2025-02-10',
    activo: true,
  },
  {
    id: 5,
    nombre: 'Patricia Romero',
    cargo: 'Coordinadora de Proyectos',
    tipoAporte: 'monetario',
    monto: 40000,
    periodicidad: 'quincenal',
    fechaInicio: '2025-01-20',
    activo: true,
  },
];

export const aportesEspecieData: AporteEspecie[] = [
  {
    id: 6,
    nombre: 'Pedro Sánchez',
    cargo: 'Asesor Jurídico',
    tipoAporte: 'especie',
    tipoAyuda: 'Alimentos',
    descripcion: '50 kg de arroz, 30 kg de frijoles',
    fechaEntrega: '2025-03-10',
    destino: 'Chocó - Comunidad El Progreso',
  },
  {
    id: 7,
    nombre: 'Laura Díaz',
    cargo: 'Psicóloga',
    tipoAporte: 'especie',
    tipoAyuda: 'Medicamentos',
    descripcion: 'Botiquín de primeros auxilios completo',
    fechaEntrega: '2025-03-15',
    destino: 'Putumayo - Zona rural',
  },
  {
    id: 8,
    nombre: 'Roberto Vargas',
    cargo: 'Profesional de Apoyo',
    tipoAporte: 'especie',
    tipoAyuda: 'Material Educativo',
    descripcion: '100 kits escolares con cuadernos, lápices y colores',
    fechaEntrega: '2025-03-20',
    destino: 'Nariño - Tumaco',
  },
];

export const voluntariadoData: Voluntariado[] = [
  {
    id: 9,
    nombre: 'Jorge Morales',
    cargo: 'Profesional de Apoyo',
    tipoAporte: 'voluntariado',
    actividad: 'Talleres de resiliencia comunitaria',
    horas: 20,
    fecha: '2025-04-20',
    lugar: 'Nariño - Tumaco',
  },
  {
    id: 10,
    nombre: 'Sandra Ruiz',
    cargo: 'Trabajadora Social',
    tipoAporte: 'voluntariado',
    actividad: 'Atención psicosocial a familias afectadas',
    horas: 15,
    fecha: '2025-04-18',
    lugar: 'Cauca - Argelia',
  },
  {
    id: 11,
    nombre: 'Miguel Ángel Torres',
    cargo: 'Educador',
    tipoAporte: 'voluntariado',
    actividad: 'Clases de refuerzo para niños afectados',
    horas: 25,
    fecha: '2025-04-15',
    lugar: 'Chocó - Quibdó',
  },
];

export const allAportesData: Aporte[] = [
  ...aportesMonetariosData,
  ...aportesEspecieData,
  ...voluntariadoData,
];
