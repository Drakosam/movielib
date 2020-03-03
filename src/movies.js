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
        const con = item => item['runtime'] > duration - 10 && item['runtime'] < duration + 10;

        const tempData = movies.filter(con);
        if (!tempData.length) {
            return errorHelper.emptyTableForParameters()
        }

        return this._pickRandom(tempData)
    }

    movieMachGender(genders = []) {
        if (this.error) {
            return this.errorMsg;
        }

        const codeArray = this._getGendersCode(genders);

        if (!codeArray.length) {
            return errorHelper.emptyTableForParameters()
        }

        const moviesArray = this._getMovieMachGenderCodes(codeArray);

        if (!moviesArray.length) {
            return errorHelper.emptyTableForParameters()
        }

        return {data: moviesArray.map(e => this._replaceCodeWithName(e)), code: 200}
    }

    _getMovieMachGenderCodes(codeArray) {
        const {movies} = this.data;
        return movies.filter(e => this._isSearchMovie(e, codeArray));
    }

    _isSearchMovie(movie, codeArray) {
        const {genres} = movie;
        const searchMovie = e => codeArray.indexOf(e) > -1;
        for (const item of genres) {
            if (searchMovie(item)) {
                return true;
            }
        }

        return false;
    }

    _getGendersCode(genders) {
        const {category} = this.data;
        const rArray = [];

        for (const gender of genders) {
            const index = category.findIndex(e => e.toLowerCase() === gender.toLowerCase());
            if (index > -1) {
                rArray.push(index);
            }
        }
        return rArray
    }

    _pickRandom(pickList) {
        const randomPos = parseInt("" + Math.random() * pickList.length);
        return {data: this._replaceCodeWithName(pickList[randomPos]), code: 200}
    }

    _replaceCodeWithName(movie) {
        const {category} = this.data;
        const {genres} = movie;
        const mapGenders = genres.map(e => category[e]);
        movie['genres'] = mapGenders;
        return movie
    }
}

module.exports = Movies;
