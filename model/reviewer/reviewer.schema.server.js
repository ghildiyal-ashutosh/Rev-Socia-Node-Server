const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    title: String,
    fields: [{type: String,
        enum: ['Science','Technology','Computer', 'Arts', 'Algorithm', 'Mathematics' ]}],
    rating: Number,
    reviewed:  [{type : mongoose.Schema.Types.ObjectId,
        ref : 'ReviewModel'}]
},{collection: 'reviewer'})




