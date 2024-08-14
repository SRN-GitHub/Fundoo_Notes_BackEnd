import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//* Login User


//route to get all users
// router.get('/getuser', userController.getAllUsers);

//route to create a new user
router.post('/createuser', newUserValidator, userController.newUser);

//*  route to login user
router.post('/login', userController.loginUser);

//route to get a single user by their user id
// router.get('/:_id', userController.getUser);

//route to update a single user by their user id
// router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
// router.delete('/:_id', userController.deleteUser);

export default router;
