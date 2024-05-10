import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoginStudentDto } from '../dto/login-student.dto';
import { AuthStudentService } from '../service/students.auth.service';

@Controller('auth')
export class StudentsAuthController {
  constructor(private readonly AuthStudentService: AuthStudentService) {}

  @Post('login')

 async login(@Body() LoginStudentDto: LoginStudentDto) {
    const token = await this.AuthStudentService;
  }

}
