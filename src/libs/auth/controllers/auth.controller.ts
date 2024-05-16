import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

   @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiTags('prueba')
    login(@Req() req: Request){
    return req.user;
    }
}
