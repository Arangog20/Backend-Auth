import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';

export class RegisterStudentsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  document: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  dateBirth: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  clan: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: string;
}
