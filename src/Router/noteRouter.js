const express = require("express");
const { deleteNote, createNote, getNotes, updateNote } = require("../controller/noteController");
const noteRouter= express.Router();
const auth = require("../middlewares/auth");

noteRouter.get('/',auth, getNotes)

noteRouter.post('/',auth,createNote)

noteRouter.delete('/',auth,deleteNote)

noteRouter.put('/',auth,updateNote);





module.exports =noteRouter;