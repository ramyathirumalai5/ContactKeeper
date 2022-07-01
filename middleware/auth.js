const jwt = require('jsonwebtoken');
const config = require('config');

//after you are done you need to call 'next' which says that move on to the next piece of middleware.
module.exports = (req,res,next) =>{ 

//get the token
const token = req.header('x-auth-token'); //'x-auth-token' is the key to the token.

//check if there is a  token
if(!token){
  return res.status(401).json({msg:'No token! Authorization denied'});
}
//if there is a token then we have to verify it.
try {
  const decoded = jwt.verify(token,config.get('jwtSecret'));
  //once it gets verified, the payload will be put inside 'decoded'
  //now from the payload we want to take the user out and assign it to req.user so that we will have access to the user inside the route.
  req.user = decoded.user;
  
  next();

} catch (err) {
 //if it is not a valid token
 res.status(401).json({msg:'Token is not valid'});  
}
}