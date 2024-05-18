import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Teachers } from '../entities/teachers.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterTeachersDto } from '../dtos';
import  axios  from 'axios';

import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
  constructor(
    
    @InjectModel(Teachers.name) protected teacherModel: Model<Teachers>,
  ) {}

  private readonly springBootUrl = 'http://localhost:8080/api/v1/coders';

  async sendDataToSpringBoot(data: any): Promise<string> {
    try {
        const response = await axios.post(this.springBootUrl, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error sending data to Spring Boot: ${error.message}`);
    }
}

  async create(createTeahcerDtos: RegisterTeachersDto): Promise<Teachers> {
    const existingTeacher = await this.teacherModel
      .findOne({ document: createTeahcerDtos.document })
      .exec();
    if (existingTeacher) {
      throw new HttpException(
        `Teacher with document ${createTeahcerDtos.document} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createTeahcerDtos.password,
      saltRounds,
    );
    createTeahcerDtos.password = hashedPassword;

    const createTeacher = await this.teacherModel.create(createTeahcerDtos);
    let crear = createTeacher.save();
    this.sendDataToSpringBoot(await crear);
    console.log(await crear);
    return await crear;
  }

  async findByEmail(email: string): Promise<Teachers> {
    const existingTeacher = await this.teacherModel
      .findOne({ email: email })
      .exec();
    if (!existingTeacher) {
      throw new HttpException(
        `Student with email ${email} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return existingTeacher;
  }

  async findOne(_id: string): Promise<Teachers> {
    const findId = await this.teacherModel.findById(_id).exec();

    if (!findId) {
      throw new HttpException(
        `teacher with id ${_id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return findId;
  }
  async findOneByDocument(document: string): Promise<Teachers> {
    const admin = await this.teacherModel.findOne({ document }).exec();
    if (!admin) {
      throw new NotFoundException(`user with document address ${document} not found`);
    }
    return admin;
  }

  async revomeTeacher(document: string): Promise<Teachers> {
    const teacher = await this.teacherModel.findOne({ document }).exec();
    if (!teacher) {
      throw new NotFoundException(`user with document address ${document} not found`);
    }
    return teacher;
  }
  
  
}
