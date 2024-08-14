import { Http } from "winston/lib/winston/transports";
import notesModel from "../models/notes.model"
import { newNotes } from "../models/notes.model";


//*     CREATE NEW NOTES  >>>
export const createNote = async (req, res, next) => {
    try {
        const noteData = await notesModel.create(req.body);

        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: noteData, // Return the created note data
            message: 'NOTE created successfully'
        });
    } catch (error) {
        throw new Error('Error Unable to Create!!!')
    }
};