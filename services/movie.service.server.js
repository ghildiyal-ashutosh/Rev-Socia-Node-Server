module.exports = (app) => {

    const movieModel = require('../model/movie/movie.model.server');

    findAllMovies = (req, res) => {
        movieModel.findAllMovies()
            .then((movies) => {
                console.log(movies);
                res.send(movies);
            });
    }

    findMovieUsingFilters = (req, res) => {
        const searchCriteria =req.body;
        console.log(searchCriteria);

        movieModel.findMovieUsingFilters(req.params.title, req.params.year)
            .then( (response) => {
                if(response === null) {
                    res.send({Title : "-1"});
                }
                else {
                    movieModel.updateMovie(response)
                        .then(() => res.send(response));
                }
            })
    }

    findMovieByTitle = (req, res) => {
        const searchCriteria =req.body;
        console.log(searchCriteria);

        movieModel.findMovieByTitle(req.params.title)
            .then( (response) => {
                if(response === null) {
                    res.send({Title: "-1"});
                }
                else {
                    movieModel.updateMovie(response)
                        .then(() => res.send(response));
                }
            })
    }

    createMovie = (req, res) => {
        movie = req.body;
        movie['Hits'] = 1;
        movieModel.createMovie(movie)
            .then((response) => {
                console.log(response);
                res.send(200);
            });
    }


    app.get('/api/movie', findAllMovies);
    app.get('/api/movie/:title/:year', findMovieUsingFilters);
    app.get('/api/movie/:title', findMovieByTitle);
    app.post('/api/movie/create', createMovie);
}