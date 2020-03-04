const express = require('express');
const routeApi = require('./routesapi');

const app = express();

app.use(express.json());


routeApi(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}` ));
