import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TeachersModule } from './core/modules/teachers.module';
import { StudentsModule } from './core/modules/students.module';
import { AuthModule } from './core/modules/auth.module';
import db_config from './infrastructure/persistence/db_config';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [db_config],
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
