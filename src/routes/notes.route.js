import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as notesController from '../controllers/notes.controller';


const router = express.Router();

//^    Route to CREATE Notes >>>
router.post('/createNote', userAuth, notesController.createNote);

//&    Route to GET ALL Notes >>>
router.get('/getAllNote',notesController.getAllNotes);


//*    Route to Update Notes >>>
router.put('/updateNote/:id', notesController.updateNote);


//!    Route to DELETE Notes >>>
router.delete('/deleteNote/:id', notesController.deleteNote);



export default router;

// isarchve and istrash false then show in getallnotes, 
// if isTrash true then show in getall/trash. 
// if isArchive true then show in getall/archieve. 
// if it is in Trash then, we can restore to archiev or delete permanently.  