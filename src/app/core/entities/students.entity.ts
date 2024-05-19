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

  @IsOptional()
  @IsString()
  @Prop({ required: true })
  photo: string;

  @IsString()
  @Length(3, 50)
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true, unique: true })
  document: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @IsString()
  @Length(6, 15)
  @Prop({ required: true, min: 6, max: 15 })
  password: string;

  @IsString()
  @Prop({ required: true })
  phone: string;

  @IsOptional()
  @Prop()
  dateBirth: Date;

  @Prop({ required: true })
  clan: string;

  @IsOptional()
  @IsString()
  @Prop({ required: true })
  role: string;

}

export const StudentsSchema = SchemaFactory.createForClass(Students);
