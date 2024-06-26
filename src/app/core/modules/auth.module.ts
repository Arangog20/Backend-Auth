import { Module } from '@nestjs/common';
import { AuthController } from '../../adapters/controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UtilsModule } from './utils.module';
import { StudentsModule } from './students.module';
import { AuthService } from '../services/auth.student.service';
import { JwtStrategy } from '../../infrastructure/auth/strategy/jwt.strategy';
import { TeachersModule } from './teachers.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'hola',
      signOptions: { expiresIn: process.env.ACCES_TOKEN_EXPIRE || '1h' },
    }),
    UtilsModule,
    StudentsModule,
    TeachersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,  JwtStrategy,],
})
export class AuthModule {}
