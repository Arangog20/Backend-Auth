import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { StudentsModule } from 'src/modules/students/students.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { UtilsModule } from '../utils/utils.module';
import { TeachersModule } from 'src/modules/teachers/teachers.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports :[
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi-secret',
      signOptions: { expiresIn: process.env.JWT_SECRET_EXPIRATION || '15m' },
    }),
    
    TeachersModule,
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
