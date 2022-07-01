const express= require('express');
const router =  express.Router();
const auth = require('../middleware/auth');
const {check,validationResult} = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
//@Route GET api/contacts
//@desc Get all the contacts registered under this user
//@access Private

router.get('/',auth, async(req,res)=>{
  try {
    // the contact model has an 'user' field and we want to get contacts for this specific user.And since we have auth in our function we have access to req.user.We are sorting by date and -1 means descending order. So it will list the most recent contact first.
    const contacts = await Contact.find({user:req.user.id}).sort({date:-1});
    
    res.json(contacts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


//@Route POST api/contacts
//@desc  Add a new contact
//@access Private
router.post('/',[auth , [
  check('name','Name is required').not().isEmpty()
]],async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(404).json({error:errors.array()});
  }

  const{name,email,phone,type} = req.body;
 try
 {
  const newContact = new Contact({
    name:name,
    email:email,
    phone:phone,
    type:type,
    user:req.user.id //because we have auth, we have access to req.user
  });

  const contact = await newContact.save();//newContact is the instance of the contact we created.
  res.json(contact);
 }
 catch(err){
   console.error(err.message);
   res.status(500).send('Server Error');
 }
});

//@Route PUT api/contacts/:id
//@desc update a specific contact
//@access Private
router.put('/:id',auth,async(req,res)=>{
  const {name,email,phone,type} = req.body;

  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;
  
  try {
    //access the route parameter ':id' using req.params.id. to find the user id from db 
    let contact = await Contact.findById(req.params.id);
    if(!contact){
      return res.status(404).send('Contact not existing');
    }
   
    //Make sure user owns contact. It is not possible to edit someone else contact through the React app but can do it by going into postman.
    //We have a user field inside contact that says which user this contact belongs to.We are comparing that with the user who is currently connected.
    if(contact.user.toString()!=req.user.id)
    {
      res.status(401).json({msg:'Unauthorized request'});
    }
    //$set replaces the value of a field with a specified value.
    //If new is set to true it returns the updated document, and if is set to false (default) it returns the old one.
    contact = await Contact.findByIdAndUpdate(
       req.params.id,
      {$set:contactFields},
      {new:true});
      res.json(contact);
  } catch (err) {
     res.status(500).send('Server error1');
  }
});

//@Route DELETE api/contacts/:id
//@desc Delete a specific contact
//@access Private
router.delete('/:id', auth , async(req,res)=>{
  try {
    
    let contact = await Contact.findById(req.params.id);
    if(!contact){
      return res.status(404).send('Contact not existing');
    }
       
    if(contact.user.toString()!=req.user.id)
    {
      res.status(401).json({msg:'Unauthorized request'});
    }
    
    await Contact.findByIdAndRemove(req.params.id);
    res.send('Contact deleted');
  } catch (err) {
     res.status(500).send('Server error1');
  }
});

module.exports = router;