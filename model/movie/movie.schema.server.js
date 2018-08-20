const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    Title: String,
    Year: String,
    Rated: String,
    Genre: String,
    Actors: String,
    Plot: String,
    Language: String,
    Awards: String,
    Poster: String,
    imdbRating: String,
    Website: String,
    Hits: Number
}, {collection: 'movie'});