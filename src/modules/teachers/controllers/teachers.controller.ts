import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterTeachersDto } from '../dtos';
import { TeachersService } from '../services/teachers.service';
import { Public, Roles } from 'src/libs/decorators';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Public()
  @Roles('teacher')
  @Post('register')
  async register(@Body() registerDto: RegisterTeachersDto) {
    return this.teachersService.create(registerDto);
  }

  @Roles('teacher')
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.teachersService.findByEmail(email);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.teachersService.findOne(_id);
  }
}
