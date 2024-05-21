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
// URL de la API de Spring Boot
   private readonly springBootUrl = 'http://localhost:8080/api/v1/coders';

// Función para enviar datos a Spring Boot
   async sendDataToSpringBoot(data: any): Promise<string> {
     try {
         const response = await axios.post(this.springBootUrl, data);
         return response.data;
     } catch (error) {
         throw new Error(`Error sending data to Spring Boot: ${error.message}`);
     }
 }

// Función para crear un nuevo estudiante
  async create(createStudentDto: RegisterStudentsDto): Promise<Students> {
// Buscar si ya existe un estudiante con el mismo documento
    const existingStudent = await this.studentModel
      .findOne({ document: createStudentDto.document })
      .exec();
    if (existingStudent) {
      throw new HttpException(
        `Student with document ${createStudentDto.document} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
// Hash de la contraseña del estudiante
    const hashPassword = await hash(createStudentDto.password, 10);
    createStudentDto.password = hashPassword;

  // Crear un nuevo estudiante en la base de datos
    const createStudent = await this.studentModel.create(createStudentDto);
    let crear = createStudent.save();
    this.sendDataToSpringBoot(await crear);
    console.log(await crear);
    return await crear;
  }

  // Función para buscar un estudiante por email
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

  // Función para buscar un estudiante por ID
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

  // Función para buscar un estudiante por Documento
  async findOneByDocument(document: string): Promise<Students> {
    const admin = await this.studentModel.findOne({ document }).exec();
    if (!admin) {
      throw new NotFoundException(`user with document address ${document} not found`);
    }
    return admin;
  }

  // Función para buscar un estudiante por email
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

  // Función para eliminar estudiante de la base de datos
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
