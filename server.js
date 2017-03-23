const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
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

const db = mongoose.connection;
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listening on port: ' + port);
});

app.use((req, res, next) => {
    if (app.get('env') === 'development') {
        // Get info to show log here
    }
    next();
});

const routes = require('./routes/index');
const todos = require('./routes/todo');
app.use('/api', routes);
app.use('/api', todos);