import express from 'express';
import * as userController from '../controllers/user.controller';
import { resetAuth } from '../middlewares/auth.middleware';
import { newUserValidator } from '../validators/user.validator';
// import { forgotPassword } from '../controllers/user.controller';

const router = express.Router();


//^ Route to create a new user
router.post('/createuser', newUserValidator, userController.newUser);

//*  Route to Login User >>>
router.post('/login', userController.loginUser);

//*  Forgot Password >>>
router.post('/forgot-Password', userController.forgotPassword);

//*  Reset Passowrd >>>
router.post('/reset-Password',resetAuth , userController.resetPassword);


//& Route to get a single user by their user id >>>
// router.get('/:_id', userController.getUser);

//^ Route to get all users
// router.get('/getuser', userController.getAllUsers);

//& Route to update a single user by their user id >>>
// router.put('/:_id', userController.updateUser);

//! Route to delete a single user by their user id >>>
// router.delete('/:_id', userController.deleteUser);   


export default router;