import { Injectable } from '@nestjs/common';
import { reportesData, estadisticasReportes, Reporte, Respuesta } from '../../data/comunicacion.data';

@Injectable()
export class ComunicacionService {
  private reportes: Reporte[] = [...reportesData];
  private nextId = this.reportes.length + 1;
  private nextRespuestaId = 100;

  // Obtener todos los reportes
  getAllReportes(): Reporte[] {
    return this.reportes.sort((a, b) =>
      new Date(b.fechaReporte).getTime() - new Date(a.fechaReporte).getTime()
    );
  }

  // Obtener reporte por ID
  getReporteById(id: number): Reporte | undefined {
    return this.reportes.find((r) => r.id === id);
  }

  // Crear nuevo reporte
  createReporte(data: Omit<Reporte, 'id' | 'fechaReporte' | 'estado' | 'respuestas'>): Reporte {
    const nuevoReporte: Reporte = {
      id: this.nextId++,
      fechaReporte: new Date().toISOString(),
      estado: 'nuevo',
      respuestas: [],
      ...data,
    };
    this.reportes.push(nuevoReporte);
    return nuevoReporte;
  }

  // Filtrar reportes
  filtrarReportes(filtros: {
    estado?: string;
    urgencia?: string;
    tipo?: string;
    region?: string;
    departamento?: string;
  }): Reporte[] {
    let reportesFiltrados = [...this.reportes];

    if (filtros.estado) {
      reportesFiltrados = reportesFiltrados.filter((r) => r.estado === filtros.estado);
    }

    if (filtros.urgencia) {
      reportesFiltrados = reportesFiltrados.filter((r) => r.nivelUrgencia === filtros.urgencia);
    }

    if (filtros.tipo) {
      reportesFiltrados = reportesFiltrados.filter((r) => r.tipoNecesidad === filtros.tipo);
    }

    if (filtros.region) {
      reportesFiltrados = reportesFiltrados.filter((r) => r.region === filtros.region);
    }

    if (filtros.departamento) {
      reportesFiltrados = reportesFiltrados.filter((r) => r.departamento === filtros.departamento);
    }

    return reportesFiltrados.sort((a, b) =>
      new Date(b.fechaReporte).getTime() - new Date(a.fechaReporte).getTime()
    );
  }

  // Agregar respuesta a un reporte
  agregarRespuesta(
    reporteId: number,
    data: Omit<Respuesta, 'id' | 'fecha'>,
  ): Reporte | undefined {
    const reporte = this.getReporteById(reporteId);
    if (!reporte) return undefined;

    const nuevaRespuesta: Respuesta = {
      id: this.nextRespuestaId++,
      fecha: new Date().toISOString(),
      ...data,
    };

    reporte.respuestas.push(nuevaRespuesta);

    // Si es la primera respuesta y el reporte está en estado "nuevo", cambiar a "en_revision"
    if (reporte.estado === 'nuevo' && reporte.respuestas.length === 1) {
      reporte.estado = 'en_revision';
    }

    return reporte;
  }

  // Cambiar estado de reporte
  cambiarEstado(
    reporteId: number,
    nuevoEstado: 'nuevo' | 'en_revision' | 'en_atencion' | 'resuelto',
  ): Reporte | undefined {
    const reporte = this.getReporteById(reporteId);
    if (!reporte) return undefined;

    reporte.estado = nuevoEstado;
    return reporte;
  }

  // Obtener estadísticas
  getEstadisticas() {
    return {
      totalReportes: this.reportes.length,
      reportesPorEstado: {
        nuevo: this.reportes.filter((r) => r.estado === 'nuevo').length,
        en_revision: this.reportes.filter((r) => r.estado === 'en_revision').length,
        en_atencion: this.reportes.filter((r) => r.estado === 'en_atencion').length,
        resuelto: this.reportes.filter((r) => r.estado === 'resuelto').length,
      },
      reportesPorUrgencia: {
        critica: this.reportes.filter((r) => r.nivelUrgencia === 'critica').length,
        alta: this.reportes.filter((r) => r.nivelUrgencia === 'alta').length,
        media: this.reportes.filter((r) => r.nivelUrgencia === 'media').length,
        baja: this.reportes.filter((r) => r.nivelUrgencia === 'baja').length,
      },
      reportesPorTipo: {
        'Agua Potable': this.reportes.filter((r) => r.tipoNecesidad === 'Agua Potable').length,
        Salud: this.reportes.filter((r) => r.tipoNecesidad === 'Salud').length,
        Alimentos: this.reportes.filter((r) => r.tipoNecesidad === 'Alimentos').length,
        Vivienda: this.reportes.filter((r) => r.tipoNecesidad === 'Vivienda').length,
        Educación: this.reportes.filter((r) => r.tipoNecesidad === 'Educación').length,
        'Apoyo Psicosocial': this.reportes.filter((r) => r.tipoNecesidad === 'Apoyo Psicosocial')
          .length,
      },
      personasAfectadasTotal: this.reportes.reduce(
        (sum, r) => sum + (r.personasAfectadas || 0),
        0,
      ),
    };
  }

  // Obtener regiones únicas
  getRegiones(): string[] {
    return [...new Set(this.reportes.map((r) => r.region))];
  }

  // Obtener departamentos únicos
  getDepartamentos(): string[] {
    return [...new Set(this.reportes.map((r) => r.departamento))].sort();
  }

  // Obtener tipos de necesidad únicos
  getTiposNecesidad(): string[] {
    return [...new Set(this.reportes.map((r) => r.tipoNecesidad))].sort();
  }

  // Buscar reportes por texto
  buscarReportes(texto: string): Reporte[] {
    const textoLower = texto.toLowerCase();
    return this.reportes.filter(
      (r) =>
        r.nombreReportante.toLowerCase().includes(textoLower) ||
        r.municipio.toLowerCase().includes(textoLower) ||
        r.departamento.toLowerCase().includes(textoLower) ||
        r.descripcion.toLowerCase().includes(textoLower) ||
        r.tipoNecesidad.toLowerCase().includes(textoLower),
    );
  }
}
