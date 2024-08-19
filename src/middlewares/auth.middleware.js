// auth.middleware.js

import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const userAuth = async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken) {
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      }
      bearerToken = bearerToken.split(' ')[1];
  
      const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
      res.locals.user = decoded;
      res.locals.token = bearerToken;
      next();
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token or authentication failed'
      });
    }
  };