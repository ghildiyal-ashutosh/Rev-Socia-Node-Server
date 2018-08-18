const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    username: String,
    firstName: String,
    lastName : String,
    password: String,
    contact : Number,
    email: String,
    interest: {field1:String, field2: String, field3: String, field4: String},
    role: String
},{collection: 'user'});