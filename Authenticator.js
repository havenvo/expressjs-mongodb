var app = require('./server');
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : app.get('superSecret')});
module.exports = authenticate;