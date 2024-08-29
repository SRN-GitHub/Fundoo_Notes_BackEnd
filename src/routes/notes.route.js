import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { cacheMiddleware } from '../middlewares/redis.middleware';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Notes route');
});

//^    Route to CREATE Notes >>>
router.post('/createNote', userAuth, notesController.createNote);

//&    Route to GET ALL Notes >>>
// router.get('/getAllNote', userAuth, notesController.getAllNotes);
router.get('/getAllNote', userAuth, cacheMiddleware(3600), notesController.getAllNotes);

//*    Route to Update Notes >>>
router.put('/updateNote/:id', userAuth, notesController.updateNote);

//!    Route to DELETE Notes >>>
router.delete('/deleteNote/:id', userAuth, notesController.deleteNote);

//&    Route to Get Archive >>>
router.get('/archive', userAuth, cacheMiddleware(3600), notesController.getArchivedNotes);


//&    Route to Get Trash >>>
router.get('/trash', userAuth, cacheMiddleware(3600), notesController.getTrashedNotes);


//&    Route to Archive Note by ID
router.put('/archiveNote/:id', userAuth, notesController.archiveNoteById);

//&    Route to Trash Note by ID
router.put('/trashNote/:id', userAuth, notesController.trashNoteById);

//&    Route to Unarchive Note by ID
router.put('/unarchiveNote/:id', userAuth, notesController.unarchiveNoteById);

//&    Route to Untrash Note by ID
router.put('/untrashNote/:id', userAuth, notesController.untrashNoteById);


export default router;