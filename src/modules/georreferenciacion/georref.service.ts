import { Injectable } from '@nestjs/common';
import { zonasAfectadasData, ZonaAfectada } from '../../data/zonas.data';

@Injectable()
export class GeorreferenciaService {
  private zonas: ZonaAfectada[] = [...zonasAfectadasData];

  // Obtener todas las zonas
  getAllZonas(): ZonaAfectada[] {
    return this.zonas;
  }

  // Obtener zona por ID
  getZonaById(id: number): ZonaAfectada | undefined {
    return this.zonas.find((z) => z.id === id);
  }

  // Obtener zonas por tipo de necesidad
  getZonasByTipoNecesidad(tipo: string): ZonaAfectada[] {
    return this.zonas.filter((z) =>
      z.necesidades.some((n) => n.tipo === tipo)
    );
  }

  // Obtener zonas por nivel de prioridad
  getZonasByPrioridad(nivel: 'urgente' | 'alta' | 'media' | 'baja'): ZonaAfectada[] {
    return this.zonas.filter((z) => z.nivelPrioridad === nivel);
  }

  // Obtener zonas por departamento
  getZonasByDepartamento(departamento: string): ZonaAfectada[] {
    return this.zonas.filter((z) =>
      z.departamento.toLowerCase() === departamento.toLowerCase()
    );
  }

  // Obtener zonas por estado
  getZonasByEstado(estado: 'activa' | 'en_proceso' | 'resuelta'): ZonaAfectada[] {
    return this.zonas.filter((z) => z.estado === estado);
  }

  // Obtener estadísticas generales
  getEstadisticas() {
    const totalZonas = this.zonas.length;
    const totalAfectados = this.zonas.reduce((sum, z) => sum + z.poblacionAfectada, 0);

    // Contar por prioridad
    const porPrioridad = {
      urgente: this.zonas.filter((z) => z.nivelPrioridad === 'urgente').length,
      alta: this.zonas.filter((z) => z.nivelPrioridad === 'alta').length,
      media: this.zonas.filter((z) => z.nivelPrioridad === 'media').length,
      baja: this.zonas.filter((z) => z.nivelPrioridad === 'baja').length,
    };

    // Contar por tipo de emergencia
    const tiposEmergencia = {};
    this.zonas.forEach((z) => {
      tiposEmergencia[z.tipoEmergencia] = (tiposEmergencia[z.tipoEmergencia] || 0) + 1;
    });

    // Contar necesidades
    const necesidadesPorTipo = {
      agua: 0,
      alimentos: 0,
      salud: 0,
      vivienda: 0,
      educacion: 0,
      psicosocial: 0,
    };

    this.zonas.forEach((z) => {
      z.necesidades.forEach((n) => {
        necesidadesPorTipo[n.tipo]++;
      });
    });

    return {
      totalZonas,
      totalAfectados,
      porPrioridad,
      tiposEmergencia,
      necesidadesPorTipo,
      zonasActivas: this.zonas.filter((z) => z.estado === 'activa').length,
    };
  }

  // Obtener zonas para el mapa (formato GeoJSON compatible)
  getZonasParaMapa() {
    return this.zonas.map((zona) => ({
      type: 'Feature',
      properties: {
        id: zona.id,
        nombre: zona.nombre,
        departamento: zona.departamento,
        municipio: zona.municipio,
        tipoEmergencia: zona.tipoEmergencia,
        nivelPrioridad: zona.nivelPrioridad,
        poblacionAfectada: zona.poblacionAfectada,
        necesidades: zona.necesidades,
        fechaReporte: zona.fechaReporte,
        estado: zona.estado,
      },
      geometry: {
        type: 'Point',
        coordinates: [zona.coordenadas.lng, zona.coordenadas.lat],
      },
    }));
  }

  // Obtener centro del mapa (promedio de coordenadas de Colombia)
  getCentroMapa() {
    return {
      lat: 4.5709, // Centro aproximado de Colombia
      lng: -74.2973,
      zoom: 6,
    };
  }
}
