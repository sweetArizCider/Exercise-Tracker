const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()


class Database {

    async connectToDb(){
        try{
            await mongoose.connect(process.env.DATABASE_URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log("Connected :)");
        }catch(error){
            console.log({error: error});
        }
    }
}

module.exports = Database;


