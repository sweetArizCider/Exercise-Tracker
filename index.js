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

app.route('/api/users')
.post(async(req, res) => {
  const username = req.body.username;
  try{
    const newUser = await User.create({username});
    res.status(200).json({username : newUser.username, _id: newUser._id});
  }catch(error){
    console.log({error: error});
  }
})
.get(async (req,res)=>{
  const foundUsers = await User.find({});
  res.status(200).send(foundUsers);
})


app.route('/api/users/:_id/exercises')
.post(async (req,res)=>{
  const userId = req.params._id;
  const {description, duration, date} = req.body
  try{
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({error: "No user found :("})
    }

    const exerciseData = {
      userId, 
      description, 
      duration,
      date: date ? date : new Date().toDateString()
    };

    const newExercise = await Log.create(exerciseData);

    res.status(201).json({_id: userId, username: user.username,date: newExercise.date, duration: newExercise.duration, description: newExercise.description,});
  }catch(error){
    console.log(error);
    res.status(400).json({error: "Bad data "})
  }
})

app.route('/api/users/:_id/logs?')
.get(async (req, res)=>{
  const userId = req.params._id;
  const from = req.query.from || new Date(0)
  const to = req.query.to || new Date(Date.now())
  const limit = !isNaN(req.query.limit) ? parseInt(req.query.limit) : 0;
  try{
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({error: "No user found :("})
    }
    const userLogs = await Log.find({userId, date: {$gte: from, $lte: to}}).limit(limit);
    const userLogsCount = userLogs.length;
    const logsFields = userLogs.map(log => ({
      description: log.description,
      duration: log.duration,
      date: log.date.toDateString()
    }));

    res.status(201).json({
      _id: user._id,
      username: user.username,
      count: userLogsCount,
      log: logsFields
    })
    
  }catch(error){
    res.status(500).json({error: "Bad data "});
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
 