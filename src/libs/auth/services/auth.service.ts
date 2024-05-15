import { Injectable } from '@nestjs/common';
import { StudentsService } from 'src/modules/students/services/students.service';
import { TeachersService } from 'src/modules/teachers/services/teachers.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private readonly studentsServices : StudentsService,
        /* private teachersService : TeachersService */){}

    async validateStudent (email: string, password: string): Promise<any>{
        const user=  await this.studentsServices.findByEmail(email);
        const isMatchS = await  bcrypt.compare(password, user.password);
        if (user && isMatchS) {
            return user;
        }
    }

    //async validateTeacher (email: string, password: string){
   //     const userT= await this.teachersService.findByEmail(email);
   //     const isMatchT = await bcrypt.compare(password, userT.password);
    //}

  
}
