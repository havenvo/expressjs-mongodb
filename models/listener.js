"use strict";
var mongoose = require('mongoose');
var Base = require('./base.js');
const loadClass = require('mongoose-class-wrapper');
var ListenerSchema = new mongoose.Schema({
    name: String
});

class Listener extends Base { }

ListenerSchema.plugin(loadClass, Listener);
var ListenerModel = mongoose.model('listener', ListenerSchema);
module.exports = ListenerModel;