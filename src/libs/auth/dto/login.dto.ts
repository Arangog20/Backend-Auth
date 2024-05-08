import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class StudentsLoginDto {
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    identification: string;

    @ApiProperty({ description: 'password would be', minimum: 6, maximum: 30 })
    @IsNotEmpty()
    @MinLength(8, { message: 'password should be minimun 8' })
    @MaxLength(50, { message: 'password should be maximium 50' })
    password: string;
};