import { Injectable } from '@nestjs/common';
import {
  allAportesData,
  aportesMonetariosData,
  aportesEspecieData,
  voluntariadoData,
  Aporte,
  AporteMonetario,
  AporteEspecie,
  Voluntariado,
} from '../../data/aportes.data';

@Injectable()
export class AportesService {
  private aportes: Aporte[] = [...allAportesData];
  private nextId: number = this.aportes.length + 1;

  // Obtener todos los aportes
  getAllAportes(): Aporte[] {
    return this.aportes;
  }

  // Obtener aportes por tipo
  getAportesByTipo(tipo: 'monetario' | 'especie' | 'voluntariado'): Aporte[] {
    return this.aportes.filter((a) => a.tipoAporte === tipo);
  }

  // Obtener un aporte por ID
  getAporteById(id: number): Aporte | undefined {
    return this.aportes.find((a) => a.id === id);
  }

  // Crear aporte monetario
  createAporteMonetario(data: Omit<AporteMonetario, 'id' | 'tipoAporte'>): AporteMonetario {
    const newAporte: AporteMonetario = {
      id: this.nextId++,
      tipoAporte: 'monetario',
      ...data,
    };
    this.aportes.push(newAporte);
    return newAporte;
  }

  // Crear aporte en especie
  createAporteEspecie(data: Omit<AporteEspecie, 'id' | 'tipoAporte'>): AporteEspecie {
    const newAporte: AporteEspecie = {
      id: this.nextId++,
      tipoAporte: 'especie',
      ...data,
    };
    this.aportes.push(newAporte);
    return newAporte;
  }

  // Crear voluntariado
  createVoluntariado(data: Omit<Voluntariado, 'id' | 'tipoAporte'>): Voluntariado {
    const newAporte: Voluntariado = {
      id: this.nextId++,
      tipoAporte: 'voluntariado',
      ...data,
    };
    this.aportes.push(newAporte);
    return newAporte;
  }

  // Actualizar estado de aporte monetario
  updateAporteMonetarioStatus(id: number, activo: boolean): AporteMonetario | null {
    const aporte = this.aportes.find((a) => a.id === id && a.tipoAporte === 'monetario') as AporteMonetario;
    if (aporte) {
      aporte.activo = activo;
      return aporte;
    }
    return null;
  }

  // Eliminar aporte
  deleteAporte(id: number): boolean {
    const index = this.aportes.findIndex((a) => a.id === id);
    if (index !== -1) {
      this.aportes.splice(index, 1);
      return true;
    }
    return false;
  }

  // Obtener estadísticas de aportes
  getEstadisticas() {
    const monetarios = this.aportes.filter((a) => a.tipoAporte === 'monetario') as AporteMonetario[];
    const totalMonetario = monetarios.reduce((sum, a) => {
      const montoMensual = a.periodicidad === 'quincenal' ? a.monto * 2 : a.monto;
      return sum + (a.activo ? montoMensual : 0);
    }, 0);

    return {
      totalAportes: this.aportes.length,
      aportesMonetarios: monetarios.length,
      aportesEspecie: this.aportes.filter((a) => a.tipoAporte === 'especie').length,
      voluntarios: this.aportes.filter((a) => a.tipoAporte === 'voluntariado').length,
      montoMensualTotal: totalMonetario,
      aportesActivos: monetarios.filter((a) => a.activo).length,
    };
  }
}
