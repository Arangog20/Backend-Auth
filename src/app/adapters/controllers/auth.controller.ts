import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from '../../infrastructure/decorators/public.decorator';
import { Roles } from '../../infrastructure/decorators';
import { AuthService } from '../../core/services/auth.service';
import { UserLoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/signup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth/Student/Teacher')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Roles('admin')
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }
 }
