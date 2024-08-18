import notesModel from "../models/notes.model";
import userModel from "../models/user.model";
import crypto from 'crypto';
import { getAllNotes } from "../controllers/notes.controller";


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
export const getAllNote = async () => {
    try {
        const notes = await notesModel.find({ isArchive: false, isInTrash: false });
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

//*     FORGOT PASSWORD & RESET TOKEN<<<
export const forgotPassword = async (email) => {
    try {
      // Check if the user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error('User with this email does not exist.');
      }else{
          // Generate a reset token
          const resetToken = crypto.randomBytes(20).toString('hex');
          // Store the token and its expiration in the database
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
      
          await user.save();
          return resetToken;
      }
      // Return the reset token (you may also want to send it via email in a real-world scenario)
    } catch (error) {
      console.error('Error during forgot password:', error.message, error.stack);
      throw new Error('Unable to process forgot password request.');
    }
  };