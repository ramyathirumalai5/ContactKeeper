const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator');
const User = require('../models/User');


//@Route POST /api/users
//@desc  to add a new user
//@access public
router.post('/',[
  check('name','Please enter a valid name').not().isEmpty(),
  check('email','Please enter a valid email').isEmail(),
  check('password', 'Please enter a password with atleast 6 charecters').isLength({min:6})
],
async (req,res) =>{
  const errors = validationResult(req);

  if(!errors.isEmpty())
  {
    return res.status(404).json({error:errors.array()});
  }
  const{name,email,password} = req.body;

  try{
       let user = await User.findOne({email:email});
       console.log(user);
       if(user)
       {
         return res.status(404).json({msg:'User already exists'});
       }

       user = new User({
         name:name,
         email:email,
         password:password
       });
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password,salt); 
       await user.save();

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
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;