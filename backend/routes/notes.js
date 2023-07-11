const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const { wait } = require('@testing-library/user-event/dist/utils');

router.get('/', (req, res)=>{

  res.json([])
})

// ROUTER 1 : Get all notes from the user using GET :"/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

// ROUTER 2 : Add new notes from the user using POST :"/api/notes/addnotes". Login required 
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
      try {

          const { title, description, tag } = req.body;

          // If there are errors, return Bad request and the errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          const note = new Note({
              title, description, tag, user: req.user.id
          })
          const savedNote = await note.save()

          res.json(savedNote)

      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })


  // ROUTER 3 : Update notes from the user using PUT :"/api/notes/updatenote". Login required 
  router.put('/updatenote/:id', fetchuser , async (req, res) => {
    try {
    const {title,description,tag}=req.body;
    // create newNote object
    const newNote= {};
    if (title) {
        newNote.title=title
    }
    if (description) {
        newNote.description=description
    }
    if (tag) {
        newNote.tag=tag
    }

    // find the note to be updated and update it.
    let note = await Note.findById(req.params.id); // getting note id that if it even exists
    if(!note){
       return res.status(404).send("not found")
    }
    // Allow updation only if user owns it
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("unauthorized access")
    }
    note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})

// ROUTER 4 : Delete notes from the user using PUT :"/api/notes/deletenote". Login required 
router.delete('/deletenote/:id', fetchuser , async (req, res) => {
    try {
    // find the note to be deleted and delete it.
    let note = await Note.findById(req.params.id); // getting note id that if it even exists
    if(!note){
       return res.status(404).send("not found")
    }
    // Allow deletion only if user owns it
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("unauthorized access")
    }
    note =await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"note has been deleted",note:note})
    } catch (error) {
        console.error(error.message);
          res.status(500).send("Internal Server Error");
    }
    

})
module.exports = router 