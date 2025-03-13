const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: String
})

const User = mongoose.model('User', user);

module.exports = User;
