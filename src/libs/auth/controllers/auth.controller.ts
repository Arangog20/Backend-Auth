import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { StudentsLoginDto } from 'src/modules/students/dtos';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

//    @UseGuards(AuthGuard('local'))
//     @Post('login')
//     @ApiTags('prueba')
//     login(@Req() req: Request){
//     return req.user;
//     }

    async loginStudent(@Body()studentsLoginDto:StudentsLoginDto){
        const student = await this.authService.LoginSrudent(studentsLoginDto);
        return ;
    }

}
