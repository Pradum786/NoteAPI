const userModel= require('../model/user');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken')
const SECRET_KEY=process.env.SECRET_KEY;

const singup= async(req,res) => {

    const { username, email, password } = req.body;

    try {
        const exitingUser= await userModel.findOne({ email: email });
        if(exitingUser){
          return res.status(400).json({ message:"User already exists"});
        }
        const hasPassword =await bcrypt.hash(password, 10);

        const result =await userModel.create({ 
            email: email,
             password:hasPassword,
            username:username });

            const token= jwt.sign({email:result.email, id:result._id},SECRET_KEY)
            res.status(201).json({user:result,token:token});
    }catch(e){
        console.log(e);
        res.status(500).json({message:'Something went wrong'})
    }

}

const singin= async (req,res) => {

    const { email, password } = req.body;
try{
    const exitingUser = await userModel.findOne({email:email});
    if(!exitingUser){
        return res.status(404).json({ message:"User not found"});
    }
    const matchtPassword = await bcrypt.compare(password,exitingUser.password);

    if(!matchtPassword){
        return res.status(400).json({message:'invalid Credentials'});
    }

    const token = jwt.sign({email: exitingUser.email,id : exitingUser._id},SECRET_KEY);

    res.status(200).json({user:exitingUser,token:token});
}catch(e){
        console.log(e);
        res.status(500).json({message:'Something went wrong'})
    }
}

module.exports={singup, singin}