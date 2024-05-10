import { Test, TestingModule } from '@nestjs/testing';
import { StudentsAuthController } from './students.controller';
import { AuthStudentService } from '../service/students.auth.service';

describe('StudentsController', () => {
  let controller: StudentsAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsAuthController],
      providers: [AuthStudentService],
    }).compile();

    controller = module.get<StudentsAuthController>(StudentsAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
