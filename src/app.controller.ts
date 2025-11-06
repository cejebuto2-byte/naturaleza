import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('landing')
  getLanding() {
    return { title: 'Inicio' };
  }

  @Get('dashboard')
  @Render('dashboard')
  getDashboard() {
    return this.appService.getDashboardData();
  }
}
