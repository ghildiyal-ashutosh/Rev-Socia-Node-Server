const mongoose = require('mongoose');
const movieSchema = require('./movie.schema.server');

const movieModel = mongoose.model('MovieModel', movieSchema);

findAllMovies = () =>
    movieModel.find();

findMovieUsingFilters = (Title, Year) =>
    movieModel.findOne({Title: Title, Year: Year});

findMovieByTitle = (Title) =>
    movieModel.findOne({Title: Title});

updateMovie = (movie) =>
    movieModel.update({
        _id: movie._id
    }, {
        $inc: { Hits: +1 }
    });

createMovie = (movie) =>
    movieModel.create(movie);



module.exports = {
    findAllMovies,
    findMovieUsingFilters,
    findMovieByTitle,
    createMovie,
    updateMovie
};