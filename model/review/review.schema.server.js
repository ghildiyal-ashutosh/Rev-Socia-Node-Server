
const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    review: String,
    score: Number,
    work: {type : mongoose.Schema.Types.ObjectId, ref: 'WorkModel'},
    reviewer : {type:mongoose.Schema.Types.ObjectId, ref: 'ReviewerModel'},
    cost: Number,
   upvote: Number,
    timeStamp: String
}, {collection: 'review'});
