import { Controller, Get, Render } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Render('dashboard/index')
  index() {
    const data = this.dashboardService.getDashboardData();
    return {
      title: 'Dashboard',
      active: 'dashboard',
      ...data,
    };
  }

  @Get('api/indicadores')
  getIndicadores() {
    return this.dashboardService.getIndicadores();
  }

  @Get('api/estadisticas')
  getEstadisticas() {
    return this.dashboardService.getEstadisticas();
  }
}
