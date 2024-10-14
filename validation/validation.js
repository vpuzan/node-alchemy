import Exception from "../exception/exception.js";

export const validateRequest = (schema) => (req, res, next) => {
    let error;
    if (Object.keys(req.body).length === 0){
        error = schema.validate(req.query);
    } else{
        error = schema.validate(req.body);
    }
    if (error.error) {
        throw new Exception(400, error.error.stack);
    }
    next();
};