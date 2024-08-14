import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//* Route to get all users
// router.get('/getuser', userController.getAllUsers);

//* Route to create a new user
router.post('/createuser', newUserValidator, userController.newUser);

//*  Route to Login User >>>
router.post('/login', userController.loginUser);

//* Route to get a single user by their user id
// router.get('/:_id', userController.getUser);

//* Route to update a single user by their user id
// router.put('/:_id', userController.updateUser);

//* Route to delete a single user by their user id
// router.delete('/:_id', userController.deleteUser);

export default router;
