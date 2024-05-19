import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Students } from '../entities/students.entity';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

import axios from 'axios';
import { RegisterStudentsDto } from 'src/app/adapters/dtos/dtos.student';


@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students.name) private readonly studentModel: Model<Students>,
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

  async create(createStudentDto: RegisterStudentsDto): Promise<Students> {
    const existingStudent = await this.studentModel
      .findOne({ document: createStudentDto.document })
      .exec();
    if (existingStudent) {
      throw new HttpException(
        `Student with document ${createStudentDto.document} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await hash(createStudentDto.password, 10);
    createStudentDto.password = hashPassword;

    const createStudent = await this.studentModel.create(createStudentDto);
    let crear = createStudent.save();
    this.sendDataToSpringBoot(await crear);
    console.log(await crear);
    return await crear;
  }

  async findByEmail(email: string): Promise<Students> {
    const existingStudent = await this.studentModel
      .findOne({ email: email })
      .exec();
    if (!existingStudent) {
      throw new HttpException(
        `Student with email ${email} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return existingStudent;
  }

  async findOne(_id: string): Promise<Students> {
    const findId = await this.studentModel.findById(_id).exec();

    if (!findId) {
      throw new HttpException(
        `Student with id ${_id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return findId;
  }

  async findOneByDocument(document: string): Promise<Students> {
    const admin = await this.studentModel.findOne({ document }).exec();
    if (!admin) {
      throw new NotFoundException(`user with document address ${document} not found`);
    }
    return admin;
  }

  async findOneByEmailRegister(email: string): Promise<Students> {
    const admin = await this.studentModel.findOne({ email }).exec();
    if (admin) {
      throw new HttpException(
        `user with email   ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return admin;
  }

  async removeStudentBydocument(document: string): Promise<Students> {
    const admin = await this.studentModel.findOneAndDelete({ document }).exec();
    if (!admin) {
      throw new HttpException(
        `Student with document ${document} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return admin;
  }
  
}
