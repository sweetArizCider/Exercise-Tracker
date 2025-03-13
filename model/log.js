const mongoose = require('mongoose');

const log = new mongoose.Schema({
    userId: String,
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    }
})

const Log = mongoose.model('Log', log);

module.exports = Log;