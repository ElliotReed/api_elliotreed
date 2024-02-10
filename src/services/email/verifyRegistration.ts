import { emailTemplate } from './getHTML';
import { sendEmail } from './sendEmail';
import { EmailOptions } from './emailOptions';

export function verifyRegistration(email: string, confirmationURL: string) {
  const emailOptions: any = new EmailOptions(email);
  emailOptions.subject = 'lifeManager: Verify registration';
  emailOptions.text = `Go to this address in your browser to verify your account.
                      ${confirmationURL}`;

  const content = `
    <tr>
    <td bgcolor="#fdfdfd"
      style="padding: 10px 40px 0px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #777777; text-align: center;">
      <p>
        Click here to complete your registration.
      </p>
      <p style="margin: 50px;">
        <a style="
                border-radius: 3px;
                padding: 15px 30px;
                background-color:#dfdfdf;
                color: #fdfdfd;
                text-decoration: none;
              " href="${confirmationURL}">Complete Registration</a>
      </p>
    </td>
    </tr>
  `;

  emailOptions.html = emailTemplate(emailOptions.email, content, "developer");
  sendEmail(emailOptions);
  return true;
}
