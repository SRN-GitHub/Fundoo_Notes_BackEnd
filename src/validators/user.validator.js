import Joi, { any } from '@hapi/joi';
import userModel from '../models/user.model';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().min(2).required(),
    LastName: Joi.string().min(2).required(),
    Email: Joi.string().email().required(),
    Age: Joi.number().required(),
    Password: Joi.string().min(8).required().label('Paaassword L1'),
    // confirmPassword: Joi.any().equal(Joi.ref('Passsword L2'))
    // .required().label('Confrim PasssWord L3')
    // .options({ messages:{ 'any.only': '{{#label}} does not match L4' } })
  });

  

  const { error, value } = schema.validate(req.body);
  
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
