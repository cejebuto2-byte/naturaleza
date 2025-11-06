import { Module } from '@nestjs/common';
import { ComunicacionController } from './comunicacion.controller';
import { ComunicacionService } from './comunicacion.service';

@Module({
  controllers: [ComunicacionController],
  providers: [ComunicacionService],
  exports: [ComunicacionService],
})
export class ComunicacionModule {}
