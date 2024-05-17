import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Teachers } from '../entities/teachers.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterTeachersDto } from '../dtos';

import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teachers.name) protected teacherModel: Model<Teachers>,
  ) {}

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

    const createTeacher = new this.teacherModel(createTeahcerDtos);
    return await createTeacher.save();
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
}
