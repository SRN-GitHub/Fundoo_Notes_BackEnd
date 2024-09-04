import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

//&  AUTHENTICATION >>>
const authenticateToken = (secretKey) => {
  return async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        });
      }
      bearerToken = bearerToken.split(' ')[1];
      const decoded = jwt.verify(bearerToken, secretKey);
      req.body.createdBy = decoded.userId;  // Store the decoded token information
      next();
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token or authentication failed'
      });
    }
  };
};

export const userAuth = authenticateToken(process.env.SECRET_KEY);
export const resetAuth = authenticateToken(process.env.RESET_SECRET_KEY);
