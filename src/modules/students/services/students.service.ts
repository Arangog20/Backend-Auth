import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Students } from "../entities/students.entity";
import { Model } from "mongoose";
import { RegisterStudentsDto, StudentsLoginDto } from "../dtos";

@Injectable()
export class StudentsService {

constructor(@InjectModel(Students.name) protected  studentModel: Model<Students>) {}

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

    const createStudent = new this.studentModel(createStudentDto);
    return await createStudent.save();
  }

  async login(loginStudentDto: StudentsLoginDto) {
    const existingStudent = await this.studentModel
     .findOne({ email: loginStudentDto.email })
     .exec();
    if (!existingStudent) {
      throw new HttpException(
        `Student with email ${loginStudentDto.email} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (existingStudent.password!== loginStudentDto.password) {
        throw new HttpException(
          `Incorrect password`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return existingStudent;
  }

}
