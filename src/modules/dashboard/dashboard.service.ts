import { Injectable } from '@nestjs/common';
import { indicadoresData, datosGraficosData } from '../../data/indicadores.data';
import { zonasAfectadasData } from '../../data/zonas.data';
import { alertasData } from '../../data/alertas.data';

@Injectable()
export class DashboardService {
  getDashboardData() {
    return {
      indicadores: indicadoresData,
      graficos: datosGraficosData,
      zonasRecientes: zonasAfectadasData.slice(0, 5),
      alertasActivas: alertasData.filter((a) => a.estado === 'activa').slice(0, 3),
    };
  }

  getIndicadores() {
    return indicadoresData;
  }

  getEstadisticas() {
    return {
      totalAportes: indicadoresData.aportesTotales.monto,
      totalBeneficiados: indicadoresData.personasBeneficiadas.total,
      zonasActivas: indicadoresData.zonasIntervenidas.total,
      voluntarios: indicadoresData.voluntarios.total,
    };
  }

  getZonasRecientes(limit: number = 5) {
    return zonasAfectadasData
      .sort((a, b) => new Date(b.fechaReporte).getTime() - new Date(a.fechaReporte).getTime())
      .slice(0, limit);
  }
}
