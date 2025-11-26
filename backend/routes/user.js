const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./userAuth');



const secretKey = 'bookstore123';

//singup
router.post('/signup', async(req,res) => {
    try
    {
        const {username, email, password, address, phoneNumber} = req.body;

        if(username.length < 4){return res.status(400).json({message : "length should be greater than 4"});}
        
        //check username already exist
        const existusername = await User.findOne({username : username});
        if(existusername){return res.status(400).json({message : "username already exist"});}

        //check for email exist
        const existemail = await User.findOne({email : email});
        if(existemail){return res.status(400).json({message : "email already exist"});}

        //check for password length
        if(password.length<=5){return res.status(400).json({message : "increase length of password"});}

        const hasspassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username : username,
            email : email,
            phoneNumber : phoneNumber,
            password : hasspassword,
            address : address,
        });
        
        //console.log(username, email, hasspassword, address);
        await newUser.save();
        return res.status(200).json({message : 'Signup Successfully'});

    }
    catch(error)
    {
        res.status(500).json({message : "Internal server error"});
    }

}
);

//signin

router.post('/signin', async(req,res) => {
    try
    {
      const {username,password} = req.body;
      const existuser = await User.findOne({username});
      if(!existuser){return res.status(400).json({message : "Invalid credentials"});}

      await bcrypt.compare(password, existuser.password, (err,data) => {
        if(data){
            const authClaims =[{name:existuser.username},{role:existuser.role},];

            const token = jwt.sign({authClaims}, secretKey, {expiresIn : '30d'});
            
            return res.status(200).json({id:existuser._id, role: existuser.role,token : token});}
        else { return res.status(400).json({message:"Invalid credentials"});}
      })
    }
    catch(error)
    {
        return res.status(400).json({message:"OOPs! some error please check"});
    }
});

router.get('/get-user-information', authenticateToken, async(req,res) =>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select('-password'); // -password to exclude password from the data

        return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message:'Internal server error'})
    }
});

router.put('/update-address', authenticateToken, async(req, res, next) => {
    try{
      const {id} = req.headers;
      const {address} = req.body;
      await User.findByIdAndUpdate(id,{address : address});
      return res.status(200).json({message:'Updated Successfull'});
    }
    catch(error){
        res.status(500).json({message:'Internal server error'})
    }
});

module.exports = router;