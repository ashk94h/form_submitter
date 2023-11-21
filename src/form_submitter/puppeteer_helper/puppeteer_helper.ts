import { Page } from "puppeteer";

const enter_text = async(page:Page, css_selector:string, text:string) =>{
    await page.click(css_selector);
    await page.type(css_selector, text);
}

const get_text_from_selector = async(page:Page, css_selector:string):Promise<string|undefined> => {
    const f = await page.$(css_selector);
    const text = await (await f!.getProperty('textContent')).jsonValue();
    return text?.trim();
}

const upload_file = async(page:Page, css_selector:string,file_path:string) =>{
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click(css_selector)
    ]);
    await fileChooser.accept([file_path]);
}

export default {enter_text, get_text_from_selector,upload_file};