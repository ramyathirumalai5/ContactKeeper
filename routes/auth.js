const express= require('express');
const router =  express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator');
const User = require('../models/User');

//anytime we need to protect a route, we need to bring in the middleware and pass it as a second argument in that protected route
const auth = require('../middleware/auth.js');

//@Route GET api/auth
//@desc Get logged in user
//@access Private(because we are getting a user that is logged in)
router.get('/',auth,async(req,res)=>{
  try {
    //findById is a mongoose method.If we send the correct token and we are logged in, then the 'req' object is going to have a user attatched to it with the current logged in users id.(this is because we did req.user = decoded.user in auth.js)
    const user = await User.findById(req.user.id).select('-password');
    // we don't want to return the password, so we are excluding it here
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//@Route POST api/auth(post request because we are sending data to get authenticated)
//@desc auth user and get token
//@access Public
router.post('/',[
  check('email','Please enter an email id').isEmail(),
  check('password', 'Please enter your password').exists()
],
async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(404).json({error:errors.array()});
  }

  const{email,password} = req.body;
  try{
   let user = await User.findOne({email:email});
   //findOne function returns the entire object,like schoolID,password,CreatedAt and updatedAt
   //if there is no user with this email, then we want to send an error
   if(!user)
   {
    return res.status(400).json({msg:'Invalid Credentials'})
   }
  // we are comparing the user entered password with the one in db.
  //password-> is from req.body and user.password-> is the hashed one in db
   const isMatch = await bcrypt.compare(password,user.password);
   //compare function returns true or false
   if(!isMatch)// if passwords dont match
   {
     return res.status(400).json({msg:'Invalid Credentials'});
   }
    //if password matches then we are going to send the payload

    const payload = {
      user:{
        id:user.id
      }
    }
   jwt.sign(payload,config.get('jwtSecret'),{
     expiresIn:360000
   },(err,token) => {
     if(err) throw err;
     res.json({token:token});
   });
  }
  catch(error){
   console.log(err.message);
   res.status(500).send('Server error');
  }
});
module.exports = router;
 