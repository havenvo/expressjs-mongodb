"use strict";
var mongoose = require('mongoose');
var Base = require('./base.js');
const loadClass = require('mongoose-class-wrapper');
var TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    created_at: { type: Date },
    updated_at: { type: Date },
});

class Todo extends Base {

}

TodoSchema.plugin(loadClass, Todo);
var TodoModel = mongoose.model('todo', TodoSchema);
module.exports = TodoModel;