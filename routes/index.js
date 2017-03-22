var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var app = require('../server');
router.post('/authenticate', function (req, res) {
    var username = req.body.user.username;
    var password = req.body.user.password;
    if (username == 'haven' && password == '123456') {
        var token = jwt.sign({ id: req.body.user.id }, app.get('superSecret'), {
            expiresIn: 1440
        });
        res.json({ token: token });
    } else {
        res.send('Unauthorized!');
    }
});
module.exports = router;