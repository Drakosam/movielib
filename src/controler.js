const Movies = require("./movies");

class Controller {
    test(req, res) {
        res.send('<h1> Ready to work, work!</h1>')
    }

    getAll(req, res) {
        const movie = new Movies();
        res.send(movie.all())
    }

    getMovie(req, res) {
        const duration = parseInt(req.query['duration']);
        const genres = req.query['genres'];

        const movie = new Movies();

        if (duration && genres) {
            res.send(movie.movieMachGenresAndDuration(JSON.parse(genres), duration));
        } else if (genres) {
            res.send(movie.movieMachGenres(JSON.parse(genres)));
        } else if (duration) {
            res.send(movie.randomMovieBetweenRuntime(duration));
        } else {
            res.send(movie.randomMovie());
        }
    }

    postMovie(req, res) {
        const body = req.body;
        const movie = new Movies();

        res.send(movie.addToDB(body));
    }

}

module.exports = Controller;
