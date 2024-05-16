import { 
    Controller,
    Body,
    Post,
    Get,
    Param,
    UseGuards,
    SetMetadata,
} from '@nestjs/common';
import { RegisterStudentsDto } from '../dtos';
import { StudentsService } from '../services/students.service';
import { Public, Roles } from 'src/libs/auth/decorators';
import { ApikeyGuard } from 'src/libs/auth/guards/apikey/apikey.guard';


@UseGuards(ApikeyGuard)
@Controller('students')
export class StudentsController {
    
    constructor(private readonly StudentsService : StudentsService){}
    
    @Public()
    @Roles('student')
    @Post('register')
    async register(@Body() registerDto: RegisterStudentsDto) {
        return this.StudentsService.create(registerDto);
    }

    @Roles('student')
    @Get('email/:email')
    findByEmail(@Param('email') email: string) {
        return this.StudentsService.findByEmail(email);
    }
    
    @Get (':_id')
    findOne(@Param('_id') _id: string) {
        return this.StudentsService.findOne(_id);
    }
    
}
