const fs = require('fs');
const path = require('path');
const errorHelper = require("./errorhelper");


class Movies {
    data = undefined;

    constructor() {
        this.data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", 'data', "db.json"), 'utf8'));
    }

    all() {
        return this.data;
    }

    randomMovie() {
        if (!this.data || !this.data['movies']) {
            return errorHelper.noDB()
        }
        if (!this.data['movies'].length) {
            return errorHelper.emptyTable('movies')
        }

        const {movies} = this.data;
        return this._pickRandom(movies)
    }

    randomMovieBetweenRuntime(duration, alpha = 10) {
        if (!this.data || !this.data['movies']) {
            return errorHelper.noDB()
        }
        if (!this.data['movies'].length) {
            return errorHelper.emptyTable('movies')
        }
        const {movies} = this.data;
        const con = item => item['runtime'] > duration - 10 && item['runtime'] < duration + 10;

        const tempData = movies.filter(con);
        if(!tempData.length){
            return errorHelper.emptyTableForParameters()
        }
        return this._pickRandom(tempData)
    }

    _pickRandom(pickList) {
        const randomPos = parseInt("" + Math.random() * pickList.length);
        return {data: pickList[randomPos], code: 200}
    }
}

module.exports = Movies;
