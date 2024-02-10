import fs from 'node:fs';
import path from 'node:path';

import { EmailConfig, TemplateValues } from './email.types';

const BASIC_TEMPLATE_FILE_PATH = path.join(__dirname, 'templates/basic.html');
const CONTACT_TEMPLATE_FILE_PATH = path.join(__dirname, 'templates/contentTemplates/contact.html');

export function insertValuesIntoHtmlTemplate(template: string, options: TemplateValues): string {
  const findRegex = /\{\{([^}]+)\}\}/g;
  let matches = [];
  let match;

  while ((match = findRegex.exec(template)) !== null) {
    matches.push(match[1]);
  }

  const uniqueMatches = [...new Set(matches)]

  for (const element of uniqueMatches) {
    if (options[element] !== undefined) {
      const regex = new RegExp('{{' + element + '}}', 'g');
      template = template.replace(regex, options[element]);
    } else {
      console.error(`No value found for placeholder ${element}`);
    }
  }

  return template;
}

function templateLoader(templatePath: string) {
  if (!fs.existsSync(templatePath)) throw new Error("Template doesn't exist");
  return fs.readFileSync(templatePath, 'utf-8');
}

function addIncomingDataToContentTemplate(contentTemplateString: string, emailConfig: EmailConfig): string {
  contentTemplateString = contentTemplateString.replace(/{{name}}/g, emailConfig.incomingData?.name ?? '')
  contentTemplateString = contentTemplateString.replace(/{{message}}/g, emailConfig.incomingData?.message ?? '');
  return contentTemplateString;
}

export default function getHTML(emailConfig: EmailConfig): string {
  let htmlTemplateString = templateLoader(BASIC_TEMPLATE_FILE_PATH);
  let contentTemplateString = templateLoader(CONTACT_TEMPLATE_FILE_PATH);

  contentTemplateString = addIncomingDataToContentTemplate(contentTemplateString, emailConfig);

  htmlTemplateString = htmlTemplateString.replace(/{{content}}/g, contentTemplateString);

  htmlTemplateString = insertValuesIntoHtmlTemplate(htmlTemplateString, emailConfig.templateValues);

  return htmlTemplateString
}
