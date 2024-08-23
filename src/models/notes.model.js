import { required } from '@hapi/joi';
import mongoose from 'mongoose';


const notesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        noteDetails: {
            type: String,
        },
        isArchive: {
            type: Boolean,
            default: false,
        },
        isInTrash: {
            type: Boolean,
            default: false,
        },
            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            
            
        }
);

const Notes = mongoose.model('Notes', notesSchema);

export default Notes;