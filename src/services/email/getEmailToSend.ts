import { EmailConfig, NodeEmail } from "./email.types";
import getHTML from "./getHTML";

export default function getEmailToSend(emailConfig: EmailConfig): NodeEmail {
  const nodeEmail = emailConfig.nodeEmail;
  nodeEmail.from = `${emailConfig.incomingData?.name} <${emailConfig.incomingData?.email}>`;
  nodeEmail.subject = 'New contact from elliotreed.net';
  nodeEmail.text = emailConfig.incomingData?.message ?? '';
  nodeEmail.html = getHTML(emailConfig);
  return nodeEmail;
}