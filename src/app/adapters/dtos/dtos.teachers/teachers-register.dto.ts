import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterTeachersDto {
  @ApiProperty({
    name: 'photo',
    type:'string',
    required: true,
    example: 'https://example.com/photo.jpg',
    description: 'Photo URL',
  })
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({
    name: 'name',
    type: String,
    required: false,
    description: '  Teacher name',
    example: 'Teacher 1',
  })
  @IsOptional()
  @IsString()
  name: string;

 

  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'Teacher email',
    example: 'Teacher1@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    description: 'Teacher password',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    name: 'document',
    type: String,
    required: true,
    description: 'Teacher document',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  document: string;


  @ApiProperty({
    name: 'role',
    type: String,
    required: false,
    description: 'Teacher role',
    example: 'Teacher',
  })
  @IsOptional()
  @IsString()
  role: string;
}
