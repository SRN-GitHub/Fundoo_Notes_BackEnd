import express from 'express';
// import * as userController from '../controllers/user.controller';
import * as notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Notes route');
});

//^    Route to CREATE Notes >>>
router.post('/createNote', userAuth, notesController.createNote);

//&    Route to GET ALL Notes >>>
router.get('/getAllNote', userAuth, notesController.getAllNotes);

//*    Route to Update Notes >>>
router.put('/updateNote/:id', userAuth, notesController.updateNote);

//!    Route to DELETE Notes >>>
router.delete('/deleteNote/:id', userAuth, notesController.deleteNote);

//&    Route to Get Archive >>>
router.get('/archive', userAuth, notesController.getArchivedNotes);

//&    Route to Get Trash >>>
router.get('/trash', userAuth, notesController.getTrashedNotes);

export default router;

// isarchve and istrash false then show in getallnotes,
// if isTrash true then show in getall/trash.
// if isArchive true then show in getall/archieve.
// if it is in Trash then, we can restore to archiev or delete permanently.
// Forgot password.
