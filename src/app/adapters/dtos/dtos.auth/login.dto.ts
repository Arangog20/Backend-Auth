import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    name: 'Document',
    required: true,
    description: 'The document should be',
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    name: 'password',
    required: true,
    description: 'The password should be',
    minimum: 8,
    maximum: 50,
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'password should be minimum 8 characters' })
  @MaxLength(50, {
    message: 'The password must not exceed 50 characters maximum',
  })
  password: string;
}
