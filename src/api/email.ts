import express, { NextFunction, Request, Response } from 'express';
import Joi = require('joi');

import EmailService from '../services/email';

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
})

type ContactResponse = {
  status: "success",
  data: {
    info: object
    message: string
  }
} | NextFunction;

router.post<{}, ContactResponse>('/contact', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error)
  } else {
    const emailConfig = EmailService.initializeEmailConfig(value);
    const email = EmailService.getEmailToSend(emailConfig);

    EmailService.sendEmail(email)
      .then(info => {
        res.status(200).send({
          status: "success",
          data: {
            info: info,
            message: 'Your message has been sent!'
          }
        });
      })
      .catch(error => {
        next(error);
      });
  }
});

export default router;
