import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AportesModule } from './modules/aportes/aportes.module';
import { GeorreferenciaModule } from './modules/georreferenciacion/georref.module';
import { SeguimientoModule } from './modules/seguimiento/seguimiento.module';
import { KidsModule } from './modules/kids/kids.module';

@Module({
  imports: [DashboardModule, AportesModule, GeorreferenciaModule, SeguimientoModule, KidsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
