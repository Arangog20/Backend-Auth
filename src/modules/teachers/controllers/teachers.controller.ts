import { Body, Controller, Post } from '@nestjs/common';
import { RegisterTeachersDto, TeacherLoginDto } from '../dtos';
import { TeachersService } from '../services/teachers.service';


@Controller('teachers')
export class TeachersController {

    constructor(private readonly TeachersService: TeachersService){}

    @Post('register')
    async register(@Body() registerDto: RegisterTeachersDto) {
        return this.TeachersService.create(registerDto);
    }

    @Post('login')
    async login(@Body() loginTeacherDto: TeacherLoginDto) {
        return this.TeachersService.login(loginTeacherDto);
    }

    
}
