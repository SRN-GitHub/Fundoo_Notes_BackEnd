import HttpStatus from 'http-status-codes';
import { json } from 'express';
import { http } from 'winston';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';
import * as UserService from '../services/user.service';
import { forgotPassword as forgotPasswordService, resetPassword as resetPasswordService } from '../services/notes.service';
// import { resetPassword as resetPasswordService } from '../services/notes.service';



//* Entry point of the API and Handles HTTP reqsts and invoke services.
//* LOGIN USER VALIDATE <<<
export const loginUser = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    const user = await UserService.loginUserOne(Email, Password);

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, Email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '5h' }
    );

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: { user, token },
      message: 'User logged in successfully'
    });
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: error.message
    });
    console.error('Login error:', error.message);
  }
};


//&   CREATE A NEW USER >>>
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};


//&   TO GETTING ALL USER >>>
//  * Controller to get all users available
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

//&   TO GET A SIGNLE USER >>>
//  * Controller to get a single user
// export const getUser = async (req, res, next) => {
//   try {
//     const data = await UserService.getUser(req.params._id);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'User fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };


//& UPDATE USER >>>
// export const updateUser = async (req, res, next) => {
//   try {
//     const data = await UserService.updateUser(req.params._id, req.body);
//     res.status(HttpStatus.ACCEPTED).json({
//       code: HttpStatus.ACCEPTED,
//       data: data,
//       message: 'User updated successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

//!  DELETE USER >>>
// export const deleteUser = async (req, res, next) => {
//   try {
//     await UserService.deleteUser(req.params._id);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: [],
//       message: 'User deleted successfully'
//     });
//   } catch (error) {
//     next(error);
//   }

// };

//^_____________________________________________________________
//*  Request a password reset method >>>
export const forgotPassword = async (req, res, next) => {
  try {
    const { Email } = req.body;
    const { resetToken } = await UserService.forgotPassword(Email);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: { resetToken },
      message: 'Password reset token sent'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
    console.error('Forgot password error:', error.message);
  }
};


//*  Reset the password method >>>
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



//!  OLD CODE
// // & FORGOT PASSWORD >>>
// export const forgotPassword = async (req, res, next) => {
//   try {
//       const { email } = req.body;
//       const resetToken = await forgotPasswordService(email);
//       res.status(HttpStatus.OK).json({
//           code: HttpStatus.OK,
//           data: { resetToken },
//           message: 'Password reset token generated successfully'
//       });
//   } catch (error) {
//       if (error.message === 'User with this email does not exist.') {
//           res.status(HttpStatus.NOT_FOUND).json({
//               code: HttpStatus.NOT_FOUND,
//               message: error.message
//           });
//       } else {
//           res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//               code: HttpStatus.INTERNAL_SERVER_ERROR,
//               message: error.message
//           });
//       }
//   }
// };

// // & RESET PASSWORD >>>
// export const resetPassword = async (req, res, next) => {
//   try {
//       const { token, newPassword } = req.body;
//       const user = await resetPasswordService(token, newPassword);
//       res.status(HttpStatus.OK).json({
//           code: HttpStatus.OK,
//           data: { userId: user._id },
//           message: 'Password has been reset successfully'
//       });
//   } catch (error) {
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//           code: HttpStatus.INTERNAL_SERVER_ERROR,
//           message: error.message
//       });
//   }
// };