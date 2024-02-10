import * as config from './config/config.json';
import { EmailConfig, ContactFormData } from "./email.types";

export default function initializeEmailConfig(incomingData: ContactFormData | null): EmailConfig {
  const emailConfig: EmailConfig = config['elliotreed.net'];

  emailConfig.incomingData = incomingData;
  return emailConfig
}