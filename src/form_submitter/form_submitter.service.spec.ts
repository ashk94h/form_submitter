import { Test, TestingModule } from '@nestjs/testing';
import { FormSubmitterService } from './form_submitter.service';

describe('FormSubmitterService', () => {
  let service: FormSubmitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormSubmitterService],
    }).compile();

    service = module.get<FormSubmitterService>(FormSubmitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
