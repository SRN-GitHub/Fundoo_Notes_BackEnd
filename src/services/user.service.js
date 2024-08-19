import User from '../models/user.model';
import router from '../routes/user.route';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { error, id } from '@hapi/joi/lib/base';
import { token } from 'morgan';


//*   performs core oporations . CRUD operations performing. 
//&   create new user >>> BCRYPTS

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
// export const loginUserOne = async (Email, Password) => {
//   const user = await User.findOne({ Email });
//   if (!user) {
//     throw new Error('User Not Found');
//   }
//   const isMatch = await bcrypt.compare(Password, user.Password);
//   if (!isMatch) {
//     throw new Error('Invalid Password');
//   }
//   return { id: user.id, FirstName: user.FirstName, LastName: user.LastName,
//      email: user.Email };
// };

// Generate and return JWT token
export const generateToken = (userId, email, secret, expiresIn) => {
  return jwt.sign({ userId, email }, secret, { expiresIn });
};

// Login User and Generate Token
export const loginUserOne = async (Email, Password) => {
  const user = await User.findOne({ Email });
  if (!user) {
    throw new Error('User Not Found');
  }
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    throw new Error('Invalid Password');
  }
  
  // Generate a login token
  const token = generateToken(user.id, user.Email, process.env.SECRET_KEY, '5h');
  return { id: user.id, FirstName: user.FirstName, LastName: user.LastName, email: user.Email, token };
};

// Request Password Reset Token
export const forgotPassword = async (Email) => {
  const user = await User.findOne({ Email });
  if (!user) {
    throw new Error('User not found');
  }

  // Generate a reset token with a shorter expiration
  const resetToken = generateToken(user.id, user.Email, process.env.RESET_SECRET_KEY, '5h');
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
  await user.save();

  // Normally, you would send this token via email
  return { resetToken }; // In real applications, send an email to the user with this token
};

// Reset Password
export const resetPassword = async (resetToken, newPassword) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(resetToken, process.env.RESET_SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid or expired reset token');
  }

  const user = await User.findOne({
    _id: decodedToken.userId,
    resetToken,
    resetTokenExpiration: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  const saltRound = 12;
  user.Password = await bcrypt.hash(newPassword, saltRound);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  return { message: 'Password has been reset' };
};


//^ EXTRA ____________________
// get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

// update single user
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


