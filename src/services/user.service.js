import { error, id } from '@hapi/joi/lib/base';
import User from '../models/user.model';
import router from '../routes/user.route';
import { token } from 'morgan';
const bcrypt = require('bcryptjs');

//*   performs core oporations . CRUD operations performing. 
//&   create new user >>>

export const newUser = async (body) => {
  if (!body.Password) {
    throw new Error('Password is requiredd');
  }
   let saltRound = 12;
  const hashedPassword = await bcrypt.hash(body.Password, saltRound);
  const data = await User.create({...body, Password: hashedPassword});
  return data;
};

//* LOGIN USER >>>

export const loginUserOne = async (Email, Password) => {
  const user = await User.findOne({ Email });
  if (!user) {
    throw new Error('User Not Found');
  }
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    throw new Error('Invalid Password');
  }
  return { id: user.id, FirstName: user.FirstName, LastName: user.LastName,
     email: user.Email, token };
};


// get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

//update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

//delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

//get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };
