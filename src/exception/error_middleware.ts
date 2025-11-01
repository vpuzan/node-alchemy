import { Request, Response, NextFunction } from 'express';
import Exception from './exception';

function errorHandler(err: Exception, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(err.status).json({
    error: err.message });
}

export default errorHandler;