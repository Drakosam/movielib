const routeApi = (app) => {
    // check if api is online
    app.get('/test',(req,res) => {
        res.send('<h1> Ready to work!</h1>')
    });
};

module.exports = routeApi;
