import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
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


@Schema({ timestamps: true })
export class Students extends Document {
  @IsOptional()
  @IsString()
  _id: string;

  @IsString()
  @Length(3, 50)
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @IsString()
  @Prop({ required: true, unique: true })
  document: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @IsString()
  @Length(6, 10)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password too weak',
  })
  @Prop({ required: true, min: 6, max: 10 })
  password: string;

  @IsNumber()
  @Prop({ required: true })
  phone: number;

  @IsOptional()
  @Prop()
  dateBirth: Date;

  @Prop({ required: true })
  clan: string;

}

export const StudentsSchema = SchemaFactory.createForClass(Students);
