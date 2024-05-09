import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TeachersModule } from '../../modules/teachers/teachers.module';
import { StudentsModule } from '../../modules/students/students.module';
import { AuthServices } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controller/auth.controller';


@Module({
  imports: [AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRRY || '15m',
      },
    }),
    TeachersModule,
    StudentsModule,
  ],
  controllers: [AuthController],
  providers: [AuthServices, JwtStrategy],
})
export class AuthModule { }
