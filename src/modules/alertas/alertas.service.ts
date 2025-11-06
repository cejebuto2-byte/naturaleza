import { Injectable } from '@nestjs/common';
import {
  alertasData,
  alberguesData,
  rutasEvacuacionData,
  medidasAutocuidadoData,
  type Alerta,
  type Albergue,
  type RutaEvacuacion,
  type MedidasAutocuidado,
  type Suscripcion,
} from '../../data/alertas.data';

@Injectable()
export class AlertasService {
  private alertas: Alerta[] = [...alertasData];
  private albergues: Albergue[] = [...alberguesData];
  private rutasEvacuacion: RutaEvacuacion[] = [...rutasEvacuacionData];
  private medidasAutocuidado: MedidasAutocuidado[] = [...medidasAutocuidadoData];
  private suscripciones: Suscripcion[] = [];
  private nextSuscripcionId = 1;

  // ==================== ALERTAS ====================

  getAllAlertas(): Alerta[] {
    return this.alertas;
  }

  getAlertasActivas(): Alerta[] {
    return this.alertas.filter((alerta) => alerta.estado === 'activa');
  }

  getAlertaById(id: number): Alerta | undefined {
    return this.alertas.find((alerta) => alerta.id === id);
  }

  filtrarAlertas(filtros: {
    severidad?: string;
    tipo?: string;
    region?: string;
    estado?: string;
  }): Alerta[] {
    let resultado = [...this.alertas];

    if (filtros.severidad) {
      resultado = resultado.filter((a) => a.nivelSeveridad === filtros.severidad);
    }

    if (filtros.tipo) {
      resultado = resultado.filter((a) => a.tipo === filtros.tipo);
    }

    if (filtros.region) {
      resultado = resultado.filter((a) => a.regiones.includes(filtros.region!));
    }

    if (filtros.estado) {
      resultado = resultado.filter((a) => a.estado === filtros.estado);
    }

    return resultado;
  }

  getAlertasPorSeveridad(): Record<string, number> {
    const contador = { rojo: 0, naranja: 0, amarillo: 0, verde: 0 };
    this.getAlertasActivas().forEach((alerta) => {
      contador[alerta.nivelSeveridad]++;
    });
    return contador;
  }

  getAlertasPorTipo(): Record<string, number> {
    const contador: Record<string, number> = {};
    this.getAlertasActivas().forEach((alerta) => {
      contador[alerta.tipo] = (contador[alerta.tipo] || 0) + 1;
    });
    return contador;
  }

  // ==================== ALBERGUES ====================

  getAllAlbergues(): Albergue[] {
    return this.albergues;
  }

  getAlberguesDisponibles(): Albergue[] {
    return this.albergues.filter((albergue) => albergue.estado === 'disponible');
  }

  getAlbergueById(id: number): Albergue | undefined {
    return this.albergues.find((albergue) => albergue.id === id);
  }

  filtrarAlbergues(filtros: {
    departamento?: string;
    municipio?: string;
    estado?: string;
    capacidadMinima?: number;
  }): Albergue[] {
    let resultado = [...this.albergues];

    if (filtros.departamento) {
      resultado = resultado.filter((a) => a.departamento === filtros.departamento);
    }

    if (filtros.municipio) {
      resultado = resultado.filter((a) => a.municipio === filtros.municipio);
    }

    if (filtros.estado) {
      resultado = resultado.filter((a) => a.estado === filtros.estado);
    }

    if (filtros.capacidadMinima) {
      const espaciosDisponibles = (albergue: Albergue) =>
        albergue.capacidad - albergue.ocupacionActual;
      resultado = resultado.filter(
        (a) => espaciosDisponibles(a) >= filtros.capacidadMinima!,
      );
    }

    return resultado;
  }

  getCapacidadTotal(): { total: number; ocupada: number; disponible: number } {
    const total = this.albergues.reduce((sum, a) => sum + a.capacidad, 0);
    const ocupada = this.albergues.reduce((sum, a) => sum + a.ocupacionActual, 0);
    return {
      total,
      ocupada,
      disponible: total - ocupada,
    };
  }

  // ==================== RUTAS DE EVACUACIÓN ====================

  getAllRutasEvacuacion(): RutaEvacuacion[] {
    return this.rutasEvacuacion;
  }

  getRutaById(id: number): RutaEvacuacion | undefined {
    return this.rutasEvacuacion.find((ruta) => ruta.id === id);
  }

  filtrarRutasPorMunicipio(municipio: string): RutaEvacuacion[] {
    return this.rutasEvacuacion.filter((ruta) => ruta.municipio === municipio);
  }

  // ==================== MEDIDAS DE AUTOCUIDADO ====================

  getAllMedidasAutocuidado(): MedidasAutocuidado[] {
    return this.medidasAutocuidado;
  }

  getMedidasPorTipo(tipoEmergencia: string): MedidasAutocuidado | undefined {
    return this.medidasAutocuidado.find(
      (medidas) =>
        medidas.tipoEmergencia.toLowerCase() === tipoEmergencia.toLowerCase(),
    );
  }

  // ==================== SUSCRIPCIONES ====================

  getAllSuscripciones(): Suscripcion[] {
    return this.suscripciones;
  }

  getSuscripcionPorEmail(email: string): Suscripcion | undefined {
    return this.suscripciones.find((s) => s.email === email);
  }

  crearSuscripcion(data: {
    nombre: string;
    email: string;
    telefono?: string;
    departamento: string;
    municipio: string;
    tiposAlerta: string[];
    nivelesInteres: string[];
  }): Suscripcion {
    // Verificar si ya existe una suscripción con ese email
    const existente = this.getSuscripcionPorEmail(data.email);
    if (existente) {
      // Actualizar la suscripción existente
      existente.nombre = data.nombre;
      existente.telefono = data.telefono;
      existente.departamento = data.departamento;
      existente.municipio = data.municipio;
      existente.tiposAlerta = data.tiposAlerta;
      existente.nivelesInteres = data.nivelesInteres;
      return existente;
    }

    // Crear nueva suscripción
    const nuevaSuscripcion: Suscripcion = {
      id: this.nextSuscripcionId++,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      departamento: data.departamento,
      municipio: data.municipio,
      tiposAlerta: data.tiposAlerta,
      nivelesInteres: data.nivelesInteres,
      fechaSuscripcion: new Date().toISOString(),
      activa: true,
    };

    this.suscripciones.push(nuevaSuscripcion);
    return nuevaSuscripcion;
  }

  actualizarSuscripcion(
    id: number,
    data: Partial<Omit<Suscripcion, 'id' | 'fechaSuscripcion'>>,
  ): Suscripcion | undefined {
    const suscripcion = this.suscripciones.find((s) => s.id === id);
    if (!suscripcion) return undefined;

    Object.assign(suscripcion, data);
    return suscripcion;
  }

  desactivarSuscripcion(id: number): boolean {
    const suscripcion = this.suscripciones.find((s) => s.id === id);
    if (!suscripcion) return false;

    suscripcion.activa = false;
    return true;
  }

  getSuscripcionesPorDepartamento(departamento: string): Suscripcion[] {
    return this.suscripciones.filter(
      (s) => s.activa && s.departamento === departamento,
    );
  }

  // ==================== ESTADÍSTICAS ====================

  getEstadisticas() {
    const alertasActivas = this.getAlertasActivas();
    const capacidadAlbergues = this.getCapacidadTotal();

    return {
      totalAlertas: alertasActivas.length,
      alertasPorSeveridad: this.getAlertasPorSeveridad(),
      alertasPorTipo: this.getAlertasPorTipo(),
      totalAlbergues: this.albergues.length,
      alberguesDisponibles: this.getAlberguesDisponibles().length,
      capacidadAlbergues,
      porcentajeOcupacion:
        capacidadAlbergues.total > 0
          ? Math.round((capacidadAlbergues.ocupada / capacidadAlbergues.total) * 100)
          : 0,
      totalRutasEvacuacion: this.rutasEvacuacion.length,
      totalSuscripciones: this.suscripciones.filter((s) => s.activa).length,
    };
  }

  // ==================== UTILIDADES ====================

  getRegionesAfectadas(): string[] {
    const regiones = new Set<string>();
    this.getAlertasActivas().forEach((alerta) => {
      alerta.regiones.forEach((region) => regiones.add(region));
    });
    return Array.from(regiones);
  }

  getDepartamentosAfectados(): string[] {
    const departamentos = new Set<string>();
    this.getAlertasActivas().forEach((alerta) => {
      alerta.departamentos.forEach((dep) => departamentos.add(dep));
    });
    return Array.from(departamentos);
  }

  getTiposAlertaDisponibles(): string[] {
    return [
      'meteorologica',
      'sismica',
      'inundacion',
      'deslizamiento',
      'incendio',
      'sequia',
    ];
  }

  getNivelesSeveridad(): string[] {
    return ['rojo', 'naranja', 'amarillo', 'verde'];
  }
}
