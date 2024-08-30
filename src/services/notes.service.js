import notesModel from '../models/notes.model';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { publishToQueue } from '../utils/rabbitmq/publisher'; // RabbitMQ publisher

// ^    CREATE NOTE <<<
export const newNotes = async (body) => {
    try {
        const note = await notesModel.create(body);

        // Publish a message to RabbitMQ
        await publishToQueue('notes', JSON.stringify({
            action: 'create',
            note
        }));

        return note;
    } catch (error) {
        console.error('Error occurred while creating a note:', error.message, error.stack);
        throw new Error('Unable to Create Notes');
    }
};

// &    GET ALL NOTE <<<
export const getAllNote = async (createdBy) => {
    try {
        const notes = await notesModel.find({
            createdBy: createdBy,
            isArchive: false,
            isInTrash: false
        });

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

        // Publish a message to RabbitMQ
        await publishToQueue('notes', JSON.stringify({
            action: 'update',
            updatedNote
        }));

        return updatedNote;
    } catch (error) {
        console.error('Error occurred while updating the note:', error.message, error.stack);
        throw new Error('Unable to Update Note');
    }
};

// !    DELETE NOTE <<<
export const deleteNote = async (id) => {
    try {
        const deletedNote = await notesModel.findByIdAndDelete(id);

        // Publish a message to RabbitMQ
        await publishToQueue('notes', JSON.stringify({
            action: 'delete',
            deletedNote
        }));

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
        console.error('Error occurred while getting archived notes:', error.message, error.stack);
        throw new Error('Unable to Fetch Archived');
    }
};

// *    IS TRASH <<<
export const getTrashedNotes = async () => {
    try {
        const notes = await notesModel.find({ isInTrash: true });
        return notes;
    } catch (error) {
        console.error('Error occurred while getting trashed notes:', error.message, error.stack);
        throw new Error('Unable to Fetch Trashed');
    }
};

// &    ARCHIVE NOTE BY ID <<<
export const archiveNoteById = async (id) => {
    try {
        const archivedNote = await notesModel.findByIdAndUpdate(id, { isArchive: true }, { new: true });

        // Publish a message to RabbitMQ
        await publishToQueue('notes', JSON.stringify({
            action: 'archive',
            archivedNote
        }));

        return archivedNote;
    } catch (error) {
        console.error('Error occurred while archiving the note:', error.message, error.stack);
        throw new Error('Unable to Archive Note');
    }
};

// &    TRASH NOTE BY ID <<<
export const trashNoteById = async (id) => {
    try {
        const trashedNote = await notesModel.findByIdAndUpdate(id, { isInTrash: true }, { new: true });

        // Publish a message to RabbitMQ
        await publishToQueue('notes', JSON.stringify({
            action: 'trash',
            trashedNote
        }));

        return trashedNote;
    } catch (error) {
        console.error('Error occurred while trashing the note:', error.message, error.stack);
        throw new Error('Unable to Trash Note');
    }
};

// &    UNARCHIVE NOTE BY ID <<<
export const unarchiveNoteById = async (id) => {
    try {
        const unarchivedNote = await notesModel.findByIdAndUpdate(id, { isArchive: false }, { new: true });

        // Publish a message to RabbitMQ
        await publishToQueue('notes', JSON.stringify({
            action: 'unarchive',
            unarchivedNote
        }));

        return unarchivedNote;
    } catch (error) {
        console.error('Error occurred while unarchiving the note:', error.message, error.stack);
        throw new Error('Unable to Unarchive Note');
    }
};

// &    UNTRASH NOTE BY ID <<<
export const untrashNoteById = async (id) => {
    try {
        const untrashedNote = await notesModel.findByIdAndUpdate(id, { isInTrash: false }, { new: true });

        // Publish a message to RabbitMQ
        await publishToQueue('notes', JSON.stringify({
            action: 'untrash',
            untrashedNote
        }));

        return untrashedNote;
    } catch (error) {
        console.error('Error occurred while untrashing the note:', error.message, error.stack);
        throw new Error('Unable to Untrash Note');
    }
};
