import { Injectable } from '@nestjs/common';
import { indicadoresData, datosGraficosData } from '../../data/indicadores.data';
import { allAportesData } from '../../data/aportes.data';
import { zonasAfectadasData } from '../../data/zonas.data';

@Injectable()
export class SeguimientoService {
  // Obtener indicadores generales
  getIndicadores() {
    return indicadoresData;
  }

  // Obtener datos para gráficos
  getDatosGraficos() {
    return datosGraficosData;
  }

  // Obtener línea de tiempo de intervenciones
  getLineaTiempo() {
    const intervenciones = [
      {
        id: 1,
        fecha: '2025-04-13',
        tipo: 'Entrega de Ayuda',
        titulo: 'Entrega de kits alimentarios en Chocó',
        descripcion: '150 kits alimentarios entregados a familias afectadas por inundación',
        zona: 'Comunidad El Progreso',
        beneficiados: 230,
        estado: 'completado',
      },
      {
        id: 2,
        fecha: '2025-04-12',
        tipo: 'Brigada Médica',
        titulo: 'Brigada de salud en La Guajira',
        descripcion: 'Atención médica a comunidad Wayúu, con enfoque en nutrición infantil',
        zona: 'Cabildo Indígena Wayúu',
        beneficiados: 120,
        estado: 'completado',
      },
      {
        id: 3,
        fecha: '2025-04-11',
        tipo: 'Evaluación',
        titulo: 'Evaluación de daños en Putumayo',
        descripcion: 'Equipo técnico evaluó daños estructurales y necesidades urgentes',
        zona: 'Vereda La Esperanza',
        beneficiados: 180,
        estado: 'completado',
      },
      {
        id: 4,
        fecha: '2025-04-10',
        tipo: 'Entrega de Ayuda',
        titulo: 'Kits escolares en Nariño',
        descripcion: '80 kits escolares entregados a niños afectados',
        zona: 'Corregimiento San José',
        beneficiados: 80,
        estado: 'completado',
      },
      {
        id: 5,
        fecha: '2025-04-14',
        tipo: 'Taller',
        titulo: 'Taller de resiliencia comunitaria',
        descripcion: 'Jornada de fortalecimiento psicosocial programada',
        zona: 'Zona Rural Los Alpes',
        beneficiados: 150,
        estado: 'programado',
      },
      {
        id: 6,
        fecha: '2025-04-15',
        tipo: 'Entrega de Ayuda',
        titulo: 'Suministro de agua potable',
        descripcion: 'Instalación de sistema de purificación de agua',
        zona: 'Resguardo Indígena Embera',
        beneficiados: 150,
        estado: 'programado',
      },
    ];

    return intervenciones.sort((a, b) =>
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
  }

  // Obtener resumen de impacto
  getResumenImpacto() {
    const totalAportes = allAportesData.length;
    const totalZonas = zonasAfectadasData.length;
    const totalBeneficiados = indicadoresData.personasBeneficiadas.total;
    const montoTotal = indicadoresData.aportesTotales.monto;

    // Calcular intervenciones completadas
    const intervencionesCompletadas = this.getLineaTiempo().filter(
      (i) => i.estado === 'completado'
    ).length;

    return {
      totalAportes,
      totalZonas,
      totalBeneficiados,
      montoTotal,
      intervencionesCompletadas,
      tasaCrecimiento: '+18%',
      eficienciaEntrega: '94%',
    };
  }

  // Obtener datos de evolución temporal
  getEvolucionTemporal() {
    return {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
      datasets: [
        {
          label: 'Personas Beneficiadas',
          data: [280, 450, 680, 1580],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Zonas Intervenidas',
          data: [3, 5, 9, 15],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
        },
      ],
    };
  }

  // Obtener distribución de recursos
  getDistribucionRecursos() {
    return {
      labels: Object.keys(indicadoresData.tiposAyuda),
      datasets: [
        {
          data: Object.values(indicadoresData.tiposAyuda),
          backgroundColor: [
            '#3b82f6', // Agua - Azul
            '#f59e0b', // Alimentos - Naranja
            '#ef4444', // Salud - Rojo
            '#8b5cf6', // Vivienda - Morado
            '#10b981', // Educación - Verde
            '#ec4899', // Psicosocial - Rosa
          ],
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  }

  // Obtener eficiencia por región
  getEficienciaPorRegion() {
    return {
      labels: Object.keys(indicadoresData.zonasIntervenidas.porDepartamento),
      datasets: [
        {
          label: 'Zonas Intervenidas',
          data: Object.values(indicadoresData.zonasIntervenidas.porDepartamento),
          backgroundColor: 'rgba(139, 92, 246, 0.6)',
          borderColor: '#8b5cf6',
          borderWidth: 2,
        },
      ],
    };
  }

  // Generar reporte (simulado)
  generarReporte(tipo: 'pdf' | 'excel') {
    const fecha = new Date().toISOString().split('T')[0];
    const resumen = this.getResumenImpacto();

    return {
      exito: true,
      tipo,
      nombreArchivo: `reporte_seguimiento_${fecha}.${tipo === 'pdf' ? 'pdf' : 'xlsx'}`,
      fechaGeneracion: fecha,
      datos: resumen,
      mensaje: `Reporte ${tipo.toUpperCase()} generado exitosamente`,
    };
  }
}
