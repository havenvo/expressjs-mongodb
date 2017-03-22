"use strict";
const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config');
const passport = require('passport');

mongoose.connect(config.database, (err) => {
    if (err) {
        console.log('Cannot connect to mongodb: ' + err);
    } else {
        console.log('Database connected!');
    }
});
var db = mongoose.connection;

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'));

app.listen(3000, function () {
    console.log('Listening on port 3000');
});

var routes = require('./routes/index');
var todos = require('./routes/todo');

app.use('/api', routes);
app.use('/api', todos);