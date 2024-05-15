import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';

const authorize = (roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { user } = req;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      next(new HttpException(403, 'You do not have permission'));
    }
  };
};

export default authorize;
