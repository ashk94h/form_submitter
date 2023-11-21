import { Test, TestingModule } from '@nestjs/testing';
import { FormSubmitterController } from './form_submitter.controller';

describe('FormSubmitterController', () => {
  let controller: FormSubmitterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormSubmitterController],
    }).compile();

    controller = module.get<FormSubmitterController>(FormSubmitterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
