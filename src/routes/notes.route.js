import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
// import * as userController from '../controllers/user.controller'; 
import * as notesController from '../controllers/notes.controller';


const router = express.Router();

router.get('/', (req, res) => {
    res.json('Notes route');
  });

//^    Route to CREATE Notes >>>
router.post('/createNote', userAuth, notesController.createNote);

//&    Route to GET ALL Notes >>>
router.get('/getAllNote',notesController.getAllNotes);


//*    Route to Update Notes >>>
router.put('/updateNote/:id', notesController.updateNote);


//!    Route to DELETE Notes >>>
router.delete('/deleteNote/:id', notesController.deleteNote);


//&    Route to Get Archive >>>
router.get('/archive', notesController.getArchivedNotes);


//&    Route to Get Trash >>>
router.get('/trash', notesController.getTrashedNotes);



export default router;

// isarchve and istrash false then show in getallnotes, 
// if isTrash true then show in getall/trash. 
// if isArchive true then show in getall/archieve. 
// if it is in Trash then, we can restore to archiev or delete permanently. 
// Forgot password. 