const express = require('express');
const routeApi = require('./routesapi');

const app = express();

routeApi(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => console.log(`Server started on port ${PORT}` ));
