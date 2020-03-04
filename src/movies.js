const fs = require('fs');
const path = require('path');
const errorHelper = require("./errorhelper");


class Movies {
    data = undefined;
    error = false;
    noDb = false;
    errorMsg = undefined;

    constructor() {
        this.data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", 'data', "db.json"), 'utf8'));
        // I can probably dump it to the decorator but this is not part of the MVP
        if (!this.data || !this.data['movies']) {
            this.errorMsg = errorHelper.noDB();
            this.error = true;
            this.noDb = true;
        } else if (!this.data['movies'].length) {
            this.errorMsg = errorHelper.emptyTable('movies');
            this.error = true;
        }
    }

    all() {
        return this.data;
    }

    randomMovie() {
        if (this.error) {
            return this.errorMsg;
        }

        const {movies} = this.data;
        return this._pickRandom(movies)
    }

    randomMovieBetweenRuntime(duration, alpha = 10) {
        if (this.error) {
            return this.errorMsg;
        }

        const {movies} = this.data;

        const tempData = this._getMovieBetweenRuntime(movies, duration, alpha);

        if (!tempData.length) {
            return errorHelper.emptyTableForParameters()
        }

        return this._pickRandom(tempData)
    }

    movieMachGenres(genres = []) {
        if (this.error) {
            return this.errorMsg;
        }

        if (!genres.length) {
            return errorHelper.emptyTableForParameters()
        }

        const {movies} = this.data;

        const moviesArray = this._getMovieMachGenres(movies, genres);

        if (!moviesArray.length) {
            return errorHelper.emptyTableForParameters()
        }

        return {data: moviesArray, code: 200}
    }

    movieMachGenresAndDuration(genres = [], duration, alpha = 10) {
        if (this.error) {
            return this.errorMsg;
        }

        const {movies} = this.data;


        if (!genres.length) {
            return errorHelper.emptyTableForParameters()
        }

        const tempData = this._getMovieBetweenRuntime(movies, duration, alpha);

        if (!tempData.length) {
            return errorHelper.emptyTableForParameters()
        }

        const moviesArray = this._getMovieMachGenres(tempData, genres);

        if (!moviesArray.length) {
            return errorHelper.emptyTableForParameters()
        }

        return {data: this._ratingMovie(moviesArray, genres), code: 200}
    }

    addToDB(body) {
        if (!body['title'] || !(body['title'].length > 0 && body['title'].length < 255)) {
            return errorHelper.paramIsRequired('title')
        }

        if (!body['year']) {
            return errorHelper.paramIsRequired('year')
        }
        if (!body["runtime"]) {
            return errorHelper.paramIsRequired('runtime')
        }

        if (!body["director"] || !(body['director'].length > 0 || body['director'].length < 255)) {
            return errorHelper.paramIsRequired('director')
        }

        if (!body["genres"] || !Array.isArray(body["genres"]) || !body["genres"].length) {
            return errorHelper.paramIsRequired('genres')
        }

        const {genres} = this.data;
        for (const gender of body["genres"]) {
            if (!(genres.indexOf(gender) > -1)) {
                return {msg: `unknown genres ${gender}`, code: 400}
            }
        }
        const {movies} = this.data;
        body['id'] = parseInt(movies[movies.length - 1]['id']) + 1;
        this.data['movies'].push(body);
        this._uploadData(this.data);
        return {msg: "done", code: 201}
    }

    _uploadData(data) {
        fs.writeFileSync(path.join(__dirname, "..", 'data', "db.json"), JSON.stringify(data))
    }

    _getMovieBetweenRuntime(movies, duration, alpha = 10) {
        const con = item => item['runtime'] > duration - 10 && item['runtime'] < duration + 10;
        return movies.filter(con);
    }

    _getMovieMachGenres(movies, codeArray) {
        return movies.filter(e => this._isSearchMovie(e, codeArray) > 0);
    }

    _isSearchMovie(movie, codeArray) {
        let lvl = 0;
        const {genres} = movie;
        const searchMovie = e => codeArray.indexOf(e) > -1;
        for (const item of genres) {
            if (searchMovie(item)) {
                lvl++
            }
        }

        return lvl;
    }

    _pickRandom(pickList) {
        const randomPos = parseInt("" + Math.random() * pickList.length);
        return {data: pickList[randomPos], code: 200}
    }

    _ratingMovie(movies, genres) {
        return movies.sort((a, b) => this._isSearchMovie(b, genres) - this._isSearchMovie(a, genres))
    }
}

module.exports = Movies;
