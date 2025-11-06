import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDashboardData() {
    return {
      title: 'Dashboard',
      totalCases: 156,
      activeCases: 42,
      resolvedCases: 98,
      totalUsers: 24,
      recentCases: [
        {
          id: 'C-001',
          title: 'Solicitud de información pública',
          status: 'activo',
          date: '2025-01-05',
        },
        {
          id: 'C-002',
          title: 'Queja por maltrato institucional',
          status: 'resuelto',
          date: '2025-01-04',
        },
        {
          id: 'C-003',
          title: 'Petición de derechos humanos',
          status: 'activo',
          date: '2025-01-03',
        },
        {
          id: 'C-004',
          title: 'Reclamo administrativo',
          status: 'pendiente',
          date: '2025-01-02',
        },
        {
          id: 'C-005',
          title: 'Denuncia de corrupción',
          status: 'activo',
          date: '2025-01-01',
        },
      ],
    };
  }
}
