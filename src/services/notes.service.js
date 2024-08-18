import notesModel from "../models/notes.model";
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
        const notes = await notesModel.find({});
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