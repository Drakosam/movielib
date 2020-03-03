const fs = require('fs');
const path = require('path');
const errorHelper = require("./errorhelper")


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

        const randomPos = parseInt("" + Math.random() * this.data['movies'].length);
        return {data:this.data['movies'][randomPos] , code: 200}
    }
}

module.exports = Movies;
