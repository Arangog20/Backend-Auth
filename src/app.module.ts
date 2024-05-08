import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './libs/auth/auth.module';
import dbConfig from './libs/persistence/db.config';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),

    StudentsModule,
    TeachersModule,
    PersistenceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
