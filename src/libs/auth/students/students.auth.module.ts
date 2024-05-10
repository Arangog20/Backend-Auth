import { Module } from '@nestjs/common';
import { AuthStudentService } from './service/students.auth.service';
import { StudentsAuthController } from './controllers/students.controller';


@Module({
  controllers: [StudentsAuthController],
  providers: [AuthStudentService],
})
export class StudentsModule {}
