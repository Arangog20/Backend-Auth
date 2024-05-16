import { Injectable } from '@nestjs/common';
import { StudentsService } from 'src/modules/students/services/students.service';

import * as bcrypt from 'bcrypt';
import { TeachersService } from 'src/modules/teachers/services/teachers.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly studentsService: StudentsService,
        private readonly teachersService: TeachersService,){}

    async validateStudent (email: string, password: string): Promise<any>{
        const user=  await this.studentsService.findByEmail(email);
        const isMatchS = await  bcrypt.compare(password, user.password);
        if (user && isMatchS) {
            return user;
        }
    }

    async validateTeacher (email: string, password: string){
         const userT= await this.teachersService.findByEmail(email);
         const isMatchT = await bcrypt.compare(password, userT.password);
         if (userT && isMatchT) {
             return userT;
         }
    }
  
}
