import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserLoginDto } from '../../adapters/dtos/dtos.auth/login.dto';
import { HashService } from "../../utils/hash.service";
import { SignUpDto } from '../../adapters/dtos/dtos.auth/signup.dto';
import { JwtPayload } from '../../infrastructure/types/jwtPayload.type';
import { Tokens } from '../../infrastructure/types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { TeachersService } from './teachers.service';
import { Teachers } from '../entities/teachers.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly hash: HashService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(payload: JwtPayload) {
    const user = await this.teachersService.findOne(payload.sub.toString());
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginDto: UserLoginDto): Promise<Tokens> {
    const { document, password } = loginDto;
    const user = await this.teachersService.findOneByDocument(document);

    if (!user || !(await this.hash.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.getTokens({ sub: user.role });
  }

  async register(SignUpDto: SignUpDto): Promise<Teachers> {
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
    const user = await this.teachersService.findByEmail(email);

    if (user) {
      throw new HttpException('Email already exists! Try again', 400);
    }
    return true;
  }


}
