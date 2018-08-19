const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    username: String,
    firstName: String,
    lastName : String,
    password: String,
    contact : Number,
    email: String,
    role: String,
    crypto : Number,
    works :
        [{type : mongoose.Schema.Types.ObjectId,
            ref : 'WorkModel'}],
    reviewer : {}
},{collection: 'user'});