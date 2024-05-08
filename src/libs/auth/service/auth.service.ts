import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from 'src/modules/students/services/students.service';


@Injectable()
export class AuthServices {
  constructor (
    private readonly jwtService: JwtService,
    private readonly studentSerice: StudentsService,
  ){}
};
