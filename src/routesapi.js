const Controller = require("./controler");
const controller =new  Controller();

const routeApi = (app) => {
    // check if api is online
    app.get('/test', controller.test);

    // get all data from json
    app.get('/movies/all',controller.getAll);

    app.get('/movie',controller.getMovie);

    app.post('/movie',controller.postMovie);
};

module.exports = routeApi;
