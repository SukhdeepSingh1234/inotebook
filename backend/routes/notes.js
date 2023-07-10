const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser'); 
const Note = require("../models/Note"); // getting Notes schema
const {body,ExpressValidator,validationResult} = require("express-validator");

// ROUTER 1 : Get all notes from the user using GET :"/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser, async (req, res) => {
  try {
    const notes=await Notes.find({user: req.user.id})
      res.json(notes)
    
  } catch (error) {
    console.log(error.message)
        res.status(500).send("Internal server error")
  }
  })

// ROUTER 2 : Add new notes from the user using POST :"/api/auth/addnotes". Login required 
router.post('/addnotes',[ //array to implement the check for the wrong information using express validator
body("title", "Enter a valid title").isLength({ min: 3 }),
body("description", "description  must be atleast 5 characters").isLength({ min: 5}),
], async (req, res) => {
  try {
    const {title,description,tag}=req.body;
    const errors = validationResult(req); // store errors in an array format
    if (!errors.isEmpty()) { // if no errors then return error array
    return res.status(400).json({ errors: errors.array() });
  }
  const note=new Note({
    title,description,tag,user:req.user.id
  })
  const savedNote=await note.save()
  res.json(savedNote)
  } catch (error) {
    console.log(error.message)
        res.status(500).send("Internal server error")
  }
  
  })

  module.exports=router