export type NodeEmail = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export type ContactFormData = {
  name: string,
  email: string,
  message: string,
}

export type EmailConfig = {
  nodeEmail: NodeEmail;
  title: string;
  preheaderText: string;
  heroImage: string;
  footerText: string;
  brand: string;
  siteURL: string;
  bgColor: string;
  brandColor: string;
  textColor: string;
  lightColor: string;
  incomingData?: ContactFormData | null;
}