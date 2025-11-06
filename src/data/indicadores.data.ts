export interface Indicadores {
  aportesTotales: {
    monto: number;
    cantidad: number;
    crecimiento: string;
  };
  personasBeneficiadas: {
    total: number;
    ninos: number;
    adultos: number;
    adultosMayores: number;
  };
  zonasIntervenidas: {
    total: number;
    porDepartamento: Record<string, number>;
  };
  tiposAyuda: Record<string, number>;
  voluntarios: {
    total: number;
    horasDonadas: number;
  };
}

export const indicadoresData: Indicadores = {
  aportesTotales: {
    monto: 12450000, // COP
    cantidad: 142,
    crecimiento: '+18% vs mes anterior',
  },
  personasBeneficiadas: {
    total: 1580,
    ninos: 420,
    adultos: 960,
    adultosMayores: 200,
  },
  zonasIntervenidas: {
    total: 15,
    porDepartamento: {
      'Chocó': 4,
      'Putumayo': 3,
      'La Guajira': 3,
      'Nariño': 3,
      'Cauca': 2,
    },
  },
  tiposAyuda: {
    'Agua potable': 35,
    'Alimentos': 42,
    'Salud': 28,
    'Vivienda': 18,
    'Educación': 12,
    'Apoyo psicosocial': 23,
  },
  voluntarios: {
    total: 87,
    horasDonadas: 1240,
  },
};

// Datos para gráficos
export interface DatosGraficos {
  aportePorMes: {
    labels: string[];
    valores: number[];
  };
  distribucionAyuda: {
    labels: string[];
    valores: number[];
  };
  beneficiadosPorRegion: {
    labels: string[];
    valores: number[];
  };
}

export const datosGraficosData: DatosGraficos = {
  aportePorMes: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    valores: [2500000, 3200000, 3800000, 2950000],
  },
  distribucionAyuda: {
    labels: ['Agua', 'Alimentos', 'Salud', 'Vivienda', 'Educación', 'Psicosocial'],
    valores: [35, 42, 28, 18, 12, 23],
  },
  beneficiadosPorRegion: {
    labels: ['Chocó', 'Putumayo', 'La Guajira', 'Nariño', 'Cauca'],
    valores: [450, 320, 380, 280, 150],
  },
};
