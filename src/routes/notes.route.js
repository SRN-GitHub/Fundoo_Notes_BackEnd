import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as notesController from '../controllers/notes.controller';


const router = express.Router();

//^    Route to CREATE Notes >>>
router.post('/createNote', userAuth, notesController.createNote);

//&    Route to GET Notes >>>
    

//*    Route to Update Notes >>>


//!    Route to DELETE Notes >>>



export default router;