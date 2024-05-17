import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from 'src/modules/students/services/students.service';

import * as bcrypt from 'bcrypt';
import { TeachersService } from 'src/modules/teachers/services/teachers.service';
import { JwtService } from '@nestjs/jwt';
import { Students } from 'src/modules/students/entities/students.entity';
import { Payload } from '../model/token.model';
import { StudentsLoginDto } from 'src/modules/students/dtos';



@Injectable()
export class AuthService {
    constructor (
        private readonly studentsService: StudentsService,
        private readonly teachersService: TeachersService,
        private jwtService :JwtService ){}

    // async validateStudent (email: string, password: string): Promise<any>{
    //     const user =  await this.studentsService.findByEmail(email);
    //     if (user) {
    //         const isMatchS = await  bcrypt.compare(password, user.password);
    //     if(isMatchS){
    //         //const { password, ...rta} = user.toJSON();
    //         const final = this.generateJwt(user);
    //         return final;
    //     }      
    // }
    // return null;
    // }

    async LoginSrudent(studentsLoginDto:StudentsLoginDto) {
        const user =  await this.studentsService.findByEmail(studentsLoginDto.email);
    
        if (!user) {
            throw new UnauthorizedException('not allow');
        }

        const passwordValidate = await bcrypt.compare(studentsLoginDto.password, user.password);

        if (!passwordValidate) {
            throw new UnauthorizedException('not allow');
        }

        if(passwordValidate){
            const final = this.generateJwt(user);
            return final;  
        }

    }


    generateJwt (user: Students){
        const payload : Payload = { role: user.role, sub : user.id};
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async validateTeacher (email: string, password: string){
         const userT= await this.teachersService.findByEmail(email);
         const isMatchT = await bcrypt.compare(password, userT.password);
         if (userT && isMatchT) {
             return userT;
         }
    }
  
}
