import { Module } from '@nestjs/common';
import { FormSubmitterController } from './form_submitter.controller';
import { FormSubmitterService } from './form_submitter.service';

@Module({
  controllers: [FormSubmitterController],
  providers: [FormSubmitterService]
})
export class FormSubmitterModule {}
