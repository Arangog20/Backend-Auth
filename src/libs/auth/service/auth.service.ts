import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthServices {
  constructor (
    private readonly jwtService: JwtService,
  ){}
};
