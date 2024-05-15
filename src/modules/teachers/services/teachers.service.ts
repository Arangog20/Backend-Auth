import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Teachers } from '../entities/teachers.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterTeachersDto, TeacherLoginDto } from '../dtos';


@Injectable()
export class TeachersService {

    constructor (@InjectModel (Teachers.name) protected teacherModel: Model<Teachers>) {}

    async create (createTeahcerDtos: RegisterTeachersDto): Promise<Teachers>{
        const existingTeacher = await this.teacherModel
        .findOne({document: createTeahcerDtos.document})
        .exec();
        if (existingTeacher) {
            throw new HttpException(
                `Teacher with document ${createTeahcerDtos.document} already exists`,
                HttpStatus.BAD_REQUEST,   
            );
        }

        const createTeacher = new this.teacherModel(createTeahcerDtos)
        return await createTeacher.save();
    }

   async login(loginTeacherDto: TeacherLoginDto){
    const existingTeacher = await this.teacherModel
    .findOne({email: loginTeacherDto.email})
    .exec();
    if (!existingTeacher) {
        throw new HttpException(
            `Teacher with email ${loginTeacherDto.email}  does not exist`,
            HttpStatus.BAD_REQUEST,   
        );
    }

    if (existingTeacher.password !== loginTeacherDto.password) {
        throw new HttpException(
            `Incorrect password`,
            HttpStatus.BAD_REQUEST,   
        );
    }
    return existingTeacher;
   }
   
   async 
}
