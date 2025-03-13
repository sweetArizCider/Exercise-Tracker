const express = require('express')
const app = express()
const cors = require('cors')
const database = require('./model/database');
const connection = new database();
connection.connectToDb();
require('dotenv').config()

// Models
const User = require('./model/user');
const Log = require('./model/log');

// middleware
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// ENDPOINTS 

  // create user
app.post('/api/users', async(req, res) => {
  const username = req.body.username;
  try{
    const newUser = await User.create({username});
    res.status(200).json({username : newUser.username, _id: newUser._id});
  }catch(error){
    console.log({error: error});
  }
  //return json wwith 
});

  // get a list of all users

app.get('/api/users', (req,res)=>{
  //return a array of objects
})

  //post /api/users/:_id/exercises description*, duraction * and optionally date (if no date current date) => user json with exercise fields added

// api/users/:_id/logs => returns a user object with a count property representing the number of exercises that belong to that user. and log array with its objects (duration is a number)
// description should be a string, description, duration, and date should be a dateString

// You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. 
// from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
 

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
 