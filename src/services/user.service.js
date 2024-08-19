import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
// import router from '../routes/user.route';
// import { error, id } from '@hapi/joi/lib/base';
// import { token } from 'morgan';


//*   performs core oporations . CRUD operations performing. 

//* CREATE NEW USER >>>
export const newUser = async (body) => {
  if (!body.Password) {
    throw new Error('Password is required');
  }
  const saltRound = 12;
  const hashedPassword = await bcrypt.hash(body.Password, saltRound);
  const data = await User.create({ ...body, Password: hashedPassword });
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

  // Return user details without a token
  return { id: user.id, FirstName: user.FirstName, LastName: user.LastName, email: user.Email };
};


//* FORGOT PASSWORD >>>


//* RESET PASSWORD >>>
export const generateResetToken = async (Email) => {
  const user = await User.findOne({ Email });
  if (!user) {
    throw new Error('User Not Found');
  }

  // Generate a reset token (JWT)
  const resetToken = jwt.sign(
    { userId: user.id, Email: user.Email },
    process.env.SECRET_KEY,
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  return { resetToken };
};
    //& this is to reset the password
export const resetPassword = async (resetToken, newPassword) => {
  try {
    const decoded = jwt.verify(resetToken, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User Not Found');
    }

    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRound);

    user.Password = hashedPassword;
    await user.save();

    return { message: 'Password updated successfully' };
  } catch (error) {
    throw new Error('Invalid or expired reset token');
  }
};


//^ EXTRA ____________________
// get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

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


