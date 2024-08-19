import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
export const resetPassword = async (req, res, next) => {
    try {
      const { resetToken, newPassword } = req.body;
      const response = await UserService.resetPassword(resetToken, newPassword);
  
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: response,
        message: 'Password reset successful'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      });
      console.error('Reset password error:', error.message);
    }
  };
