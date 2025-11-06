import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AportesModule } from './modules/aportes/aportes.module';

@Module({
  imports: [DashboardModule, AportesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
