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

export type TemplateValues = {
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
  [key: string]: string;
}

export type IncomingData = {
  [key: string]: string;
}

export type EmailConfig = {
  nodeEmail: NodeEmail;
  templateValues: TemplateValues;
  incomingData?: IncomingData | null;
}