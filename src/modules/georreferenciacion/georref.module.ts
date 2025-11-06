import { Module } from '@nestjs/common';
import { GeorreferenciaController } from './georref.controller';
import { GeorreferenciaService } from './georref.service';

@Module({
  controllers: [GeorreferenciaController],
  providers: [GeorreferenciaService],
  exports: [GeorreferenciaService],
})
export class GeorreferenciaModule {}
