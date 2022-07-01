const express = require('express');
const dbConnect = require('./config/db');

const path = require('path');
const app =  express();
dbConnect();
//middleware
app.use(express.json({extended:false}));



app.use('/api/users' , require('./routes/users'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/contacts',require('./routes/contact'));

//Server static assets in production
if(process.env.NODE_ENV === 'production')
{
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
  console.log(`Server running at  port ${PORT}`)
})