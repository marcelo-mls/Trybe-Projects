import 'dotenv/config';
import * as JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { IUser } from './Interfaces';
import statusCode from './errorMap';

type CredentialJWT = {
  email: string;
};

export default class TokenJWT {
  private _secret: string;
  private _jwtConfig: JWT.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
    this._jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };
  }

  createToken = (data: IUser) => {
    const token = JWT.sign(data, this._secret, this._jwtConfig);

    return token;
  };

  authentication = (token: string) => {
    const credential = JWT.verify(token, this._secret);

    return credential as CredentialJWT;
  };

  authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization || !JWT.verify(authorization, this._secret)) {
        return res.status(statusCode.unauthorized).json({ message: 'Unauthorized' });
      }

      next();
    } catch (error) {
      res.status(statusCode.unauthorized).json({ message: 'Token must be a valid token' });
    }
  };
}
