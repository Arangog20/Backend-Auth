import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentsService } from 'src/modules/students/services/students.service';
import { UserLoginDto } from '../dtos/login.dto';
import { HashService } from "../../utils/hash.service";
import { SignUpDto } from '../dtos/signup.dto';
import { JwtPayload } from '../types/jwtPayload.type';
import { Tokens } from '../types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { Students } from 'src/modules/students/entities/students.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly hash: HashService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(payload: JwtPayload) {
    const user = await this.studentsService.findOne(payload.sub.toString());
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginDto: UserLoginDto): Promise<Tokens> {
    const { document, password } = loginDto;
    const user = await this.studentsService.findOneByDocument(document);

    if (!user || !(await this.hash.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.getTokens({ sub: user.id });
  }

  async register(SignUpDto: SignUpDto): Promise<Students> {
    await this.validateEmailForSignUp(SignUpDto.email);

    const hashedPassword = await this.hash.hash(SignUpDto.password);

    const user = await this.studentsService.create({
      _id: '',
      email: SignUpDto.email,
      password: hashedPassword,
      name: SignUpDto.name,
      lastname: SignUpDto.lastname,
      phone: SignUpDto.phone,
      document: SignUpDto.document,
      clan: SignUpDto.clan,
      role: SignUpDto.role,
      dateBirth: SignUpDto.dateBirth
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
