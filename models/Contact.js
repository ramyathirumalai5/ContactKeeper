const mongoose= require('mongoose');
const ContactSchema = mongoose.Schema({
  //need to create a relationship between user and contact.
  //Every user doesn't have a same set of contatcs.each user has their own set of contacts.
  user:{
    type:mongoose.Schema.Types.ObjectId,// when we create an entry with mongoDB the document has what is called as an objectID.
    ref:'users'// this is the specific collection that we have in our db.
  },
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    
  },
  phone :{
    type:String
  },
  type:{
  type:String,
  default:'Personal'
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('contact',ContactSchema);