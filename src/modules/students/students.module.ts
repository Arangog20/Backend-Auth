import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Students, StudentsSchema } from './entities/students.entity';
import { StudentsService } from './services/students.service';
import { StudentsController } from './controller/students.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ 
            name: Students.name, 
            schema: StudentsSchema }])
    ],
    providers: [StudentsService],
    exports: [StudentsService],
    controllers: [StudentsController],
    
})
export class StudentsModule {}
