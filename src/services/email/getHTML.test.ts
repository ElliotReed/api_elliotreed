import { insertValuesIntoHtmlTemplate } from './getHTML';
import { TemplateValues } from './email.types';
import * as config from './config/config.json';

const options: TemplateValues = config['elliotreed.net'].templateValues;

describe('insertValuesIntoHtmlTemplate function', () => {
  it('should replace placeholders in the template with values from the options object', () => {
    const template = `
      <html>
      <head>
        <title>{{title}}</title>
      </head>
      <body>
        <h1>Welcome to {{siteURL}}</h1>
        <img src="{{heroImage}}" alt="Hero Image">
        <p>{{footerText}}</p>
      </body>
      </html>
    `;

    const result = insertValuesIntoHtmlTemplate(template, options);

    expect(result).toContain(`<title>${options.title}</title>`);
    expect(result).toContain(`<h1>Welcome to ${options.siteURL}</h1>`);
    expect(result).toContain(`<img src="${options.heroImage}" alt="Hero Image">`);
    expect(result).toContain(`<p>${options.footerText}</p>`);
    // Add more expectations for other placeholders
  });
});
