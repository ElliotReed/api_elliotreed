import fs from 'node:fs';
import path from 'node:path';

import { EmailConfig } from './email.types';

const BASIC_TEMPLATE_FILE_PATH = path.join(__dirname, 'templates/basic.html');
const CONTACT_TEMPLATE_FILE_PATH = path.join(__dirname, 'templates/contentTemplates/contact.html');

function insertValuesIntoHtmlTemplate(template: string, options: EmailConfig): string {
  template = template.replace(/{title}/g, options.title);
  template = template.replace(/{siteURL}/g, options.siteURL);
  template = template.replace(/{footerText}/g, options.footerText);
  template = template.replace(/{preheaderText}/g, options.preheaderText);
  template = template.replace(/{heroImage}/g, options.heroImage);
  template = template.replace(/{brand}/g, options.brand);
  template = template.replace(/{bgColor}/g, options.bgColor);
  template = template.replace(/{brandColor}/g, options.brandColor);
  template = template.replace(/{textColor}/g, options.textColor);
  template = template.replace(/{lightColor}/g, options.lightColor);

  return template;
}

function templateLoader(templatePath: string) {
  if (!fs.existsSync(templatePath)) throw new Error("Template doesn't exist");
  return fs.readFileSync(templatePath, 'utf-8');
}

function addIncomingDataToContentTemplate(contentTemplateString: string, emailConfig: EmailConfig): string {
  contentTemplateString = contentTemplateString.replace(/{name}/g, emailConfig.incomingData?.name ?? '')
  contentTemplateString = contentTemplateString.replace(/{message}/g, emailConfig.incomingData?.message ?? '');
  return contentTemplateString;
}

export default function getHTML(emailConfig: EmailConfig): string {
  let htmlTemplateString = templateLoader(BASIC_TEMPLATE_FILE_PATH);
  let contentTemplateString = templateLoader(CONTACT_TEMPLATE_FILE_PATH);

  contentTemplateString = addIncomingDataToContentTemplate(contentTemplateString, emailConfig);

  htmlTemplateString = htmlTemplateString.replace(/{content}/g, contentTemplateString);

  htmlTemplateString = insertValuesIntoHtmlTemplate(htmlTemplateString, emailConfig);

  return htmlTemplateString
}
