import { Injectable } from '@nestjs/common';
import { LoginStudentDto } from '../dto/login-student.dto';

@Injectable()
export class AuthStudentService {
  create(LoginStudentDt: LoginStudentDto) {
    return 'This action adds a new student';
  }

  

  }

 

