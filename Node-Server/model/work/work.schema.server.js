const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    title: String,
    points:Number,
    description: String,
    timeStamp: String,
    rubric: String,
    category: String,
}, {collection: 'work'});


















