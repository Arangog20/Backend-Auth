import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentsService } from 'src/app/core/services/students.service';
import { UserLoginDto } from '../../adapters/dtos/dtos.auth/login.dto';
import { HashService } from "../../utils/hash.service";
import { SignUpDto } from '../../adapters/dtos/dtos.auth/signup.dto';
import { JwtPayload } from '../../infrastructure/types/jwtPayload.type';
import { Tokens } from '../../infrastructure/types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { Students } from 'src/app/core/entities/students.entity';
import { Teachers } from '../entities/teachers.entity';
import { TeachersService } from './teachers.service';


@Injectable()
export class AuthService {
  // Constructor de la clase: Inicializa los servicios que se usarán en las funciones de la clase.
  constructor(
    private readonly teachersService: TeachersService,
    private readonly studentsService: StudentsService,
    private readonly hash: HashService,
    private readonly jwtService: JwtService
  ) {}

  // Valida a un usuario estudiante usando el payload del JWT.
  async validateUser(payload: JwtPayload) {
    const user = await this.studentsService.findOne(payload.sub.toString());
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginDto: UserLoginDto): Promise<Tokens> {
    const { document, password } = loginDto;
    // Busca al usuario estudiante por su ID (sub) extraído del payload.
    const user = await this.studentsService.findOneByDocument(document);

    if (!user || !(await this.hash.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Devuelve los tokens de acceso generados.
    return this.getTokens({
       sub: user._id,
       role: user.role,
       });
  }

  // Registra a un nuevo estudiante
  async register(SignUpDto: SignUpDto): Promise<Students> {
    await this.validateEmailForSignUp(SignUpDto.email);

    const hashedPassword = await this.hash.hash(SignUpDto.password);

    // Crea un nuevo usuario estudiante con los datos proporcionados.
    const user = await this.studentsService.create({
      photo:SignUpDto.photo,
      email: SignUpDto.email,
      password: hashedPassword,
      name: SignUpDto.name,
      phone: SignUpDto.phone,
      document: SignUpDto.document,
      clan: SignUpDto.clan,
      role: SignUpDto.role,
      dateBirth: SignUpDto.dateBirth
    });

    await user.save();
    return user;
  }

  // se repite el mismo proceso anterior pero para los profesores
  async validateUserT(payload: JwtPayload) {
    const user = await this.teachersService.findOne(payload.sub.toString());
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async loginT(loginDto: UserLoginDto): Promise<Tokens> {
    const { document, password } = loginDto;
    const user = await this.teachersService.findOneByDocument(document);

    if (!user || !(await this.hash.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.getTokens({ 
      sub: user._id,
      role: user.role
    });
  }

  async registerT(SignUpDto: SignUpDto): Promise<Teachers> {
    await this.validateEmailForSignUp(SignUpDto.email);

    const hashedPassword = await this.hash.hash(SignUpDto.password);

    const user = await this.teachersService.create({
      photo:SignUpDto.photo,
      name: SignUpDto.name,
      document: SignUpDto.document,
      email: SignUpDto.email,
      password: hashedPassword,
      role: SignUpDto.role
    });

    await user.save();
    return user;
  }

  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not set or es invalit');
    }
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '30m',
    };

    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    return { access_token: accessToken };
  }

  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }

  async validateEmailForSignUp(email: string): Promise<boolean | undefined> {
    const user = await this.studentsService.findOneByEmailRegister(email);

    if (user) {
      throw new HttpException('Email already exists! Try again', 400);
    }
    return true;
  }


}
