const express = require("express");
const { deleteNote, createNote, getNotes, updateNote } = require("../controller/noteController");
const noteRouter= express.Router();
const auth = require("../middlewares/auth");

noteRouter.get('/',auth, getNotes)

noteRouter.post('/',auth,createNote)

noteRouter.delete('/:id',auth,deleteNote)

noteRouter.put('/:id',auth,updateNote);





module.exports =noteRouter;