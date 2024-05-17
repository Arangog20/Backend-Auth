import {
  Controller,
  Body,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { RegisterStudentsDto } from '../dtos';
import { StudentsService } from '../services/students.service';
import { Public, Roles } from 'src/libs/decorators';

@Controller('students')
export class StudentsController {
  constructor(private readonly StudentsService: StudentsService) {}

  @Public()
  @Roles('student')
  @Post('register')
  async register(@Body() registerDto: RegisterStudentsDto) {
    return this.StudentsService.create(registerDto);
  }

  @Roles('student')
  @Get('email')
  findByEmail(@Body('email') email: string) {
    return this.StudentsService.findByEmail(email);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.StudentsService.findOne(_id);
  }
}
