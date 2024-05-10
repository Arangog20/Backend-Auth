import { PartialType } from '@nestjs/mapped-types';
import { LoginStudentDto } from './login-student.dto';

export class SignUpStudentDto extends PartialType(LoginStudentDto) {}
