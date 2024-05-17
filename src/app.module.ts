import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db_config';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { StudentsModule } from './modules/students/students.module';
import { AuthModule } from './libs/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),

    AuthModule,
    StudentsModule,
    TeachersModule,
    PersistenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
