import sendEmail from "./sendEmail";
import getEmailToSend from "./getEmailToSend";
import initializeEmailConfig from "./initializeEmailConfig";

const EmailService = {
  getEmailToSend,
  initializeEmailConfig,
  sendEmail,
}
export default EmailService;