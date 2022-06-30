const express = require('express');
const userRouter= express.Router();
const { singup, singin}= require('../controller/userController')

userRouter.post('/singup',singup);

userRouter.post('/singin',singin);

module.exports =userRouter;