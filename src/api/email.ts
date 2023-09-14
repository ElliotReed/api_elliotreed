import express, { NextFunction, Request, Response } from 'express';
import Joi = require('joi');

import { contactMessage } from '../services/email/contact';
import { sendEmail } from '../services/email/sendEmail';

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  type: Joi.string().required(),
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
    const emailOptions = contactMessage(value);
    sendEmail(emailOptions)
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
