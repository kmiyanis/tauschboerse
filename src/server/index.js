'use strict';

const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const env = require('node-env-file');
const express = require('express');
const app = express();
const articlesRoutes = require('./routes/articlesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const tradesRoutes = require('./routes/tradesRoutes');
const initDataCache = require('./services/DataCache').initDataCache;

function startServer(port) {
    console.log('Starting web server...');
    let server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Exchange Application API Server is ready on http://localhost:${server.address().port}! Waiting for requests...`);
    });
}

env(path.join(__dirname, 'config.env'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '10mb'}));

app.use('/', express.static(path.join(__dirname, './../../public')));
app.use('/api/articles', articlesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/trades', tradesRoutes);
app.use('/api/users', usersRoutes);

const useDataCache = require('./useDataCache').useDataCache;

if (useDataCache) {
    initDataCache(false)
        .then(() => {
            console.log('Data Cache initialised');
            startServer(3001);
        })
        .catch((err) => {
            console.log('Error initialising cache: ' + err);
        });
} else {
    startServer(3001);
}
