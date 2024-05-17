import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teachers, TeachersSchema } from './entities/teachers.entity';
import { TeachersController } from './controllers/teachers.controller';
import { TeachersService } from './services/teachers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Teachers.name,
        schema: TeachersSchema,
      },
    ]),
  ],
  providers: [TeachersService],
  exports: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}
