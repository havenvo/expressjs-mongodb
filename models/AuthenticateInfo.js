const mongoose = require('mongoose');
const Base = require('./base.js');
const loadClass = require('mongoose-class-wrapper');
const AuthenticateInfoSchema = new mongoose.Schema({
    refresh_token: String,
    expired_time: Date,
    user_id: String
});

class AuthenticateInfo extends Base {

}

AuthenticateInfoSchema.plugin(loadClass, AuthenticateInfo);
let AuthenticateInfoModel = mongoose.model('auth', AuthenticateInfoSchema);
module.exports = AuthenticateInfoModel;