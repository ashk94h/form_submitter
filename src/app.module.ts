import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormSubmitterModule } from './form_submitter/form_submitter.module';

@Module({
  imports: [FormSubmitterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
