import HttpStatus from 'http-status-codes';
import {
    newNotes,
    getAllNote,
    updateNote as updateNoteService,
    deleteNote as deleteNoteService,
    getArchivedNotes as getArchivedNotesOk,
    getTrashedNotes as getTrashedNotesOk,
    archiveNoteById as archiveNoteService,
    trashNoteById as trashNoteService,
    unarchiveNoteById as unarchiveNoteService,
    untrashNoteById as untrashNoteService,
} from '../services/notes.service';
import { publishToQueue } from '../utils/rabbitmq/publisher';

// ^ CREATE NOTES >>>
export const createNote = async (req, res) => {
    try {
        const note = await newNotes(req.body);
        await publishToQueue('notesQueue', JSON.stringify({ action: 'create', note }));
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: note,
            message: 'Note created successfully',
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

// & GET ALL NOTES >>>
export const getAllNotes = async (req, res) => {
    try {
        const notes = await getAllNote(req.body.createdBy);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'All notes fetched successfully',
            source: 'mongodb'  // Indicate the data source
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

// * UPDATE NOTE >>>
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await updateNoteService(id, req.body);
        await publishToQueue('notesQueue', JSON.stringify({ action: 'update', note: updatedNote }));
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: updatedNote,
            message: 'Note updated successfully',
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

// ! DELETE NOTE >>>
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteNoteService(id);
        await publishToQueue('notesQueue', JSON.stringify({ action: 'delete', noteId: id }));
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Note deleted successfully',
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

// & GET ARCHIVED NOTES >>>
export const getArchivedNotes = async (req, res) => {
    try {
        const notes = await getArchivedNotesOk();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'Archived notes fetched successfully',
            source: 'mongodb'  // Indicate the data source
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

// & GET TRASHED NOTES >>>
export const getTrashedNotes = async (req, res) => {
    try {
        const notes = await getTrashedNotesOk();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'Trashed notes fetched successfully',
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
            source: 'mongodb'  // Indicate the data source
        });
    }
};

// * ARCHIVE NOTE BY ID
export const archiveNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await archiveNoteService(id);
        await publishToQueue('notesQueue', JSON.stringify({ action: 'archive', note: updatedNote }));
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: updatedNote,
            message: 'Note archived successfully',
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

// * TRASH NOTE BY ID
export const trashNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await trashNoteService(id);
        await publishToQueue('notesQueue', JSON.stringify({ action: 'trash', note: updatedNote }));
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: updatedNote,
            message: 'Note trashed successfully',
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

// * UNARCHIVE NOTE BY ID
export const unarchiveNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await unarchiveNoteService(id);
        await publishToQueue('notesQueue', JSON.stringify({ action: 'unarchive', note: updatedNote }));
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: updatedNote,
            message: 'Note unarchived successfully',
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

// * UNTRASH NOTE BY ID
export const untrashNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await untrashNoteService(id);
        await publishToQueue('notesQueue', JSON.stringify({ action: 'untrash', note: updatedNote }));
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: updatedNote,
            message: 'Note untrashed successfully',
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};