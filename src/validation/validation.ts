import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Exception from '../exception/exception';

export const validateRequest = (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const dataToValidate = req.method === 'GET' ? req.query : req.body;
    const { error } = schema.validate(dataToValidate, { abortEarly: false });
    if (error) {
      next(new Exception(400, `Validation error ${error.message}`));
    }
    next();
  };