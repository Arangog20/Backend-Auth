import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterTeachersDto, TeacherLoginDto } from '../dtos';
import { TeachersService } from '../services/teachers.service';
import { Roles } from 'src/libs/decorators';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Roles('teacher')
  @Post('register')
  async register(@Body() registerDto: RegisterTeachersDto) {
    return this.teachersService.create(registerDto);
  }

  @Roles('teacher')
  @Get('email')
  findByEmail(@Body('email') email: string) {
    return this.teachersService.findByEmail(email);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.teachersService.findOne(_id);
  }
}
