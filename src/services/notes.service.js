import notesModel from "../models/notes.model";


//*     CREATE NOTES >>>

export const newNotes = async (body)=>{
    try {
        const note = await notesModel.create(body);
        return note;
    } catch (error) {
        console.log('errorrrrr');
        throw new Error('Unable to Create Notes');
    }
}