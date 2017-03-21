"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb://listen:123456@192.168.21.54:27017/listen', (err) => {
    if (err) {
        console.log('Cannot connect to mongodb: ' + err);
    } else {
        console.log('Database connected!');
    }
});

var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(3000, function () {
    console.log('Listening on port 3000');
});



app.get('/', function (req, res) {
    res.send('Hello word!');
});

app.post('/quotes', (req, res) => {
    var Todo = require('./models/todo.js');
    var todo = new Todo({ name: 'Master NodeJS', completed: false, note: 'Getting there...' });
    // Save it to database
    todo.save(function (err) {
        if (err)
            console.log(err);
        else
            console.log(todo);
    });
    res.json(req.body);
});

app.get('/quotes', (req, res) => {
    var Todo = require('./models/todo.js');
    var Listener = require('./models/listener.js');
    var listener = new Listener({ name: 'Haven' });

    listener.save(function (err) {
        if (err) {
            res.send('Something went wrong: ' + err);
        } else {
            res.json(listener);
        }
    });
    res.json(listener);
    // Todo.find({}, (err, todos) => {
    //     res.json(todos);
    // });
});

app.put('/listener', (req, res) => {
    var Listener = require('./models/listener.js');
    Listener.findById(req.body.id, function (err, listener) {
        if (err) {
            res.send('Something went wrong: ' + err);
        } else {
            if (listener != null) {
                listener.name = "Hihi";
                listener.save(function (err) {
                    if (err) {
                        res.send('Something went wrong: ' + err);
                    } else {
                        res.json(listener);
                    }
                });
            } else {
                res.send('Listener not found');
            }
        }
    })
});