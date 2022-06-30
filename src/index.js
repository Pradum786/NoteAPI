const express = require('express');
const app = express();
const userRouter=require('./Router/userRouter.js');
const noteRouter=require('./Router/noteRouter.js');
const dotenv = require('dotenv');
const cors= require('cors');

dotenv.config();

const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

app.use('/api/users',userRouter);
app.use('/api/notes',noteRouter);

app.get('/',(req, res) => {
    res.send('Note API From Pradum786');
})

const PORT =process.env.Port || 5000;

mongoose.connect(process.env.MONGO_URL).then(()=> {
    app.listen(PORT ,()=>{console.log("listening on port " + PORT)})

}).catch(err => {console.log(err);})

