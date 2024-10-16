import Exception from '../exception/exception.js';

export const validateRequest = (schema) => (req, res, next) => {
  const {error} =
    req.method === 'GET'
      ? schema.validate(req.query)
      : schema.validate(req.body);
  if (error) {
    next(new Exception(400, error.stack));
  }
  next();
};
