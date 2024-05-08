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
}
