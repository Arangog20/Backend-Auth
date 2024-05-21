import { Module } from '@nestjs/common';
import { HashService } from '../../utils/hash.service';

const providers = [HashService];
//es un array que contiene `HashService`. Esta  se utiliza para registrar los proveedores de servicios en el módulo.   
@Module({
  providers,
  exports: [...providers],
})
export class UtilsModule {}
