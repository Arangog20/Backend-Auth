import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UtilsModule } from '../utils/utils.module';
import { StudentsModule } from '../../modules/students/students.module';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './Strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'hola',
      signOptions: { expiresIn: process.env.ACCES_TOKEN_EXPIRE || '1h' },
    }),
    UtilsModule,
    StudentsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,  JwtStrategy,],
})
export class AuthModule {}
