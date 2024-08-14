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
        }
    }
);

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
// export default Notes;
