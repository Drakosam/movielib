const Controller = require("./controler");
const controller =new  Controller();

const routeApi = (app) => {
    // check if api is online
    app.get('/test', controller.test);

    // get all data from json
    app.get('/all',controller.getAll);
};

module.exports = routeApi;
