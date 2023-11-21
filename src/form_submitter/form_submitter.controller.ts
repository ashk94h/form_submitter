import { Controller, Get } from '@nestjs/common';
import { FormSubmitterService } from './form_submitter.service';

@Controller('form-submitter')
export class FormSubmitterController {
    constructor(private formSubmitterService: FormSubmitterService) {}

    @Get()
    scrapperController() {
      return this.formSubmitterService.fill_and_submit_form();
    }
}
