import Joi, { any } from '@hapi/joi';
import userModel from '../models/user.model';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().min(2).required(),
    LastName: Joi.string().min(2).required(),
    Email: Joi.string().email().required(),
    Age: Joi.number().required(),
    Password: Joi.string().min(8).required().label('Paaassword L1'),
  });

  const { error, value } = schema.validate(req.body);
  
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};