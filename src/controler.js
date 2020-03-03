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
            res.send('uuu');
        } else if (genres) {
            res.send('yyy');
        } else if (duration) {
            res.send(movie.randomMovieBetweenRuntime(duration));
        } else {
            res.send(movie.randomMovie());
        }


    }

    postMovie(req, res) {

    }

    postCategory(req, res) {

    }
}

module.exports = Controller;
