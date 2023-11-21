import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';
import css_selector from './data/css_selectors.json';
import test_data from './data/data.json';
import configuration from './data/configuration.json';
import puppeteer_helper from './puppeteer_helper/puppeteer_helper';

@Injectable()
export class FormSubmitterService {
  fill_and_submit_form = async () => {
    try {
      const browser = await puppeteer.launch({
        headless: configuration.headless,
        args: ['--start-maximized'],
      });
      const page = await browser.newPage();
      const URL = test_data.url;
      await page.setViewport({
        width: configuration.width,
        height: configuration.height,
        deviceScaleFactor: configuration.device_scale_factor,
      });

      await page.goto(URL, { waitUntil: 'networkidle2' });

      try {
        //check if we are on correct from
        const is_title_correct = await this.validate_text(
          page,
          css_selector.title_of_form,
          test_data.title_of_form,
        );
        if (is_title_correct == true) {
          console.log('Landed on correct form!!!');
          //fill all text fields
          await this.fill_text_fields(page);

          //select is owner of intellectual property
          if (test_data.is_owner_of_intellectual_property == true) {
            await page.click(
              css_selector.is_owner_of_intellectual_property_true,
            );
          } else {
            await page.click(
              css_selector.is_owner_of_intellectual_property_false,
            );
          }

          //upload files
          await puppeteer_helper.upload_file(
            page,
            css_selector.file_location_1,
            test_data.file_location,
          );
          await puppeteer_helper.upload_file(
            page,
            css_selector.file_location_2,
            test_data.file_location,
          );

          //click on checkbox
          await page.click(css_selector.checkbox);

          await page.focus(css_selector.submit);

          //click on submit button
          await page.click(css_selector.submit);

          //wait until next page is loaded
          await page.waitForSelector(css_selector.success_text);

          //validate success message
          const success = await this.validate_text(
            page,
            css_selector.success_text,
            test_data.success_message,
          );

          //close the browser

          setTimeout(() => {
            console.log('Browser closed after delay of 5 seconds');
            browser.close();
          }, 5000);

          if (success == true) {
            console.log('Form submitted successfully!');
            return 'Form submitted successfully!';
          } else {
            console.log('Something went wrong....');
            return 'Something went wrong....';
          }
        } else {
          console.log('wrong form page');
          return 'wrong form page';
        }
      } catch (e) {
        browser.close();
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  validate_text = async (page: Page, css_selector: string, text: string) => {
    const retrived_text = await puppeteer_helper.get_text_from_selector(
      page,
      css_selector,
    );
    if (retrived_text == text) {
      return true;
    } else {
      return false;
    }
  };

  fill_text_fields = async (page: Page) => {
    const selectors = css_selector.text_fields;
    const texts = test_data.text_fields;
    for (let key in selectors) {
      await puppeteer_helper.enter_text(
        page,
        selectors[key as keyof typeof selectors],
        test_data[key as keyof typeof selectors],
      );
    }
  };
}
