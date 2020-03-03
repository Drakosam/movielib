const fs = require('fs');
const path = require('path');


class Movies {
    data = {};

    constructor() {
        this.data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", 'data', "db.json"), 'utf8'));
    }

    all() {
        console.log(this.data);
        return this.data;
    }
}

module.exports = Movies;
