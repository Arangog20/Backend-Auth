import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    name: 'photo',
    type:'string',
    required: false,
    example: 'https://example.com/photo.jpg',
    description: 'Photo URL',
  })
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty({
    name: 'name',
    type: 'string',
    required: false,
    example: 'Manuela',
    description: 'Student name',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    required: true,
    example: 'Manuela@gmail.com',
    description: 'Student email',
  })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    name: 'password',
    type:'string',
    required: true,
    example: '123456',
    description: 'Student password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    name: 'phone',
    type:'string',
    required: false,
    example: '123456789',
    description: 'Student phone',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    name: 'document',
    type:'string',
    required: true,
    example: '123456789',
    description: 'Student document',
  })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({
    name: 'dateBirth',
    type:'string',
    required: false,
    example: '2021-01-01',
    description: 'Student date of birth',
  })
  @IsOptional()
  @IsDate()
  dateBirth: Date;

  @ApiProperty({
    name: 'clan',
    type:'string',
    required: false,
    example: '123456789',
    description: 'Student clan',
  })
  @IsString()
  @IsOptional()
  clan: string;

  @ApiProperty({
    name: 'role',
    type:'string',
    required: false,
    example: '123456789',
    description: 'Student role',
  })
  @IsOptional()
  @IsString()
  role: string;
}
