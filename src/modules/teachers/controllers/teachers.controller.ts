import { Body, Controller, Post } from '@nestjs/common';
import { RegisterTeachersDto, TeacherLoginDto } from '../dtos';
import { TeachersService } from '../services/teachers.service';

@Controller('teachers')
export class TeachersController {

    constructor(private readonly TeacherService: TeachersService){}

    @Post('register')
    async register(@Body() registerTeacherDto: RegisterTeachersDto) {
        return this.TeacherService.create(registerTeacherDto);
    }

    @Post('login')
    async login(@Body() loginTeacherDto: TeacherLoginDto) {
        return this.TeacherService.login(loginTeacherDto);
    }
}
