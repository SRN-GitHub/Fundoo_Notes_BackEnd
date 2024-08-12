import User from '../models/user.model';
import router from '../routes/user.route';
const bcrypt = require('bcryptjs');


//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  if (!body.Password) {
    throw new Error('Password is requireddd');
  }
   let saltRound = 12;
  const hashedPassword = await bcrypt.hash(body.Password, saltRound);
  const data = await User.create({...body, Password: hashedPassword});
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
