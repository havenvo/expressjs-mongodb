var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var app = require('../server');
router.post('/authenticate', function(req, res) {
    var user = {name: 'Haven'}; // Need get user from db
    var token = jwt.sign(user, app.get('superSecret'), {
        expiresIn: 1440
    });
    res.json({token: token});
});

module.exports = router;