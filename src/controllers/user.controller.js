import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import { json } from 'express';
import { http } from 'winston';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';

//* Entry point of the API and Handles HTTP reqsts and invoke services.
//* LOGIN USER VALIDATE

export const loginUser = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    const user = await UserService.loginUserOne(Email, Password);

    //& GENERATE JWT TOEKEN
    const token = jwt.sign(
      { userId: user.id, Email: user.email, data: token},
      process.env.SECRET_KEY,
      { expiresIn: '5h' }
    )
    res.status(HttpStatus.OK).json({ code: HttpStatus.OK, data:{user, token}, message: 'User Logged in Succesfully'});
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({code: HttpStatus.UNAUTHORIZED, message: error.message})
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
// export const getAllUsers = async (req, res, next) => {
//   try {
//     const data = await UserService.getAllUsers();
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'All users fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

//&   TO GET A SIGNLE USER >>>
//  * Controller to get a single user
//  //* @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
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
  //  * Controller to update a user
  //  * @param  {object} req - request object
  //  * @param {object} res - response object
  //  * @param {Function} next
  //  */
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

//!  DELETE USER
//  * Controller to delete a user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
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