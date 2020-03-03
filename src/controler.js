const Movies = require("./movies");

class Controller {
    test(req, res) {
        res.send('<h1> Ready to work, work!</h1>')
    }

    getAll(req, res) {
       const movie = new Movies();
        res.send(movie.all())
    }

    postMovie(req, res) {

    }

    postCategory(req, res) {

    }
}

module.exports = Controller;
