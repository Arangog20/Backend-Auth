import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsEnum,
    IsNumber,
    IsString,
    IsDate,
    IsOptional,
    Length,
    Matches,
} from 'class-validator';

export enum Role {
    ADMIN = 'admin',
    STUDENT = 'student',
    TEACHER = 'teacher',
}
@Schema({timestamps: true})
export class Teachers extends Document {
    
    @IsString()
    @Length(3,50)
    @Prop({required:true})
    name: string;

    @Prop({required:true})
    lastname: string;

    @IsNumber()
    @Prop({required:true, unique:true})
    document: number;

    @IsEmail()
    //@Transform(({value} => value.toLowerCase()))
    @Prop({required:true, unique:true})
    email: string;

    @IsString()
    @Length(6,8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'password too weak',})
    @Prop({required:true, min: 6, max:8})
    password: string;

    @IsOptional()
    @IsEnum(Role)
    @Prop({type:String, enum:Role, default: Role.STUDENT})
    role: Role;
}

export const TeachersSchema = SchemaFactory.createForClass(Teachers);

