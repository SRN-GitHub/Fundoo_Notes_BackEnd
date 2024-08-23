import notesModel from "../models/notes.model";
import userModel from "../models/user.model";
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
// import { getAllNotes } from "../controllers/notes.controller";



// ^    CREATE NOTE <<<
export const newNotes = async (body) => {
    try {
        const note = await notesModel.create(body);
        return note;
    } catch (error) {
        console.error('Error occurred while creating a note:', error.message, error.stack);
        throw new Error('Unable to Create Notes');
    }
};

// &    GET ALL NOTE <<<
export const getAllNote = async (createdBy) => {
    try {
        const notes = await notesModel.find({ isArchive: false, isInTrash: false, createdBy: createdBy });
        return notes;
    } catch (error) {
        console.error('Error occurred while retrieving notes:', error.message, error.stack);
        throw new Error('Unable to Retrieve Notes');
    }
};

// *    UPDATE NOTE <<<
export const updateNote = async (id, body) => {
    try {
        const updatedNote = await notesModel.findByIdAndUpdate(id, body, { new: true });
        return updatedNote;
    } catch (error) {
        console.error('Error occurred while updating the note:', error.message, error.stack);
        throw new Error('Unable to Update Note');
    }
};

// !    DELETE NOTE <<<
export const deleteNote = async (id) => {
    try {
        await notesModel.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error occurred while deleting the note:', error.message, error.stack);
        throw new Error('Unable to Delete Note');
    }
};

// *    IS ARCHIVE <<<
export const getArchivedNotes = async () => {
    try {
        const notes = await notesModel.find({ isArchive: true, isInTrash: false });
        return notes;
    } catch (error) {
        console.error('Error occurred while getting archived :', error.message, error.stack);
        throw new Error('Unable to Fetch Archived');
    }
};

// *    IS TRASH <<<
export const getTrashedNotes = async () => {
    try {
        const notes = await notesModel.find({ isInTrash: true });
        return notes;
    } catch (error) {
        console.error('Error occurred while getting trashed :', error.message, error.stack);
        throw new Error('Unable to Fetch Trashed');
    }
};

// ! OLD CODE
// // * FORGOT PASSWORD & RESET TOKEN GENERATE <<<
// export const forgotPassword = async (email) => {
//     try {
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             throw new Error('User with this email does not exist.');
//         }

//         // Generate a reset token
//         const resetToken = crypto.randomBytes(20).toString('hex');

//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

//         await user.save();

//         // Return the reset token
//         return resetToken;
//     } catch (error) {
//         console.error('Error during forgot password:', error.message, error.stack);
//         throw new Error('Unable to process forgot password request.');
//     }
// };

// // * RESET PASSWORD <<<
// export const resetPassword = async (token, newPassword) => {
//     try {
//         // Find the user by the reset token and check if the token is still valid
//         const user = await userModel.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() } // Ensure the token has not expired
//         });

//         if (!user) {
//             throw new Error('Password reset token is invalid or has expired.');
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         // Update the user's password and remove the reset token fields
//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         // Save the updated user
//         await user.save();

//         return user;
//     } catch (error) {
//         console.error('Error during password reset:', error.message, error.stack);
//         throw new Error('Unable to reset password.');
//     }
// };