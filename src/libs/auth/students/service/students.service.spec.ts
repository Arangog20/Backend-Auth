import { Test, TestingModule } from '@nestjs/testing';
import { AuthStudentService } from './students.auth.service';


describe('StudentsService', () => {
  let service: AuthStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthStudentService],
    }).compile();

    service = module.get<AuthStudentService>(AuthStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
