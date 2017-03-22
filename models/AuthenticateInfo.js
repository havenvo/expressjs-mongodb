"use strict";
var mongoose = require('mongoose');
var Base = require('./base.js');
const loadClass = require('mongoose-class-wrapper');
var AuthenticateInfoSchema = new mongoose.Schema({
    refresh_token: String,
    expired_time: Date,
    user_id: String
});

class AuthenticateInfo extends Base {

}

AuthenticateInfoSchema.plugin(loadClass, AuthenticateInfo);
var AuthenticateInfoModel = mongoose.model('auth', AuthenticateInfoSchema);
module.exports = AuthenticateInfoModel;