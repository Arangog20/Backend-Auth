import { 
    Controller,
    Body,
    Post,
} from '@nestjs/common';
import { StudentsLoginDto } from '../dtos';
import { RegisterStudentsDto } from '../dtos';
import { StudentsService } from '../services/students.service';


@Controller('students')
export class StudentsController {
    
    constructor(private readonly StudentsService : StudentsService){}

    @Post('register')
    async register(@Body() registerDto: RegisterStudentsDto) {
        return this.StudentsService.create(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: StudentsLoginDto) {
        return this.StudentsService.login(loginDto);
    }

}
