import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { StudentsModule } from 'src/modules/students/students.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { StudentsService } from 'src/modules/students/services/students.service';
import { UtilsModule } from '../utils/utils.module';


@Module({
  imports :[
    StudentsModule,
    PassportModule,
    UtilsModule
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
