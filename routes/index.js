var express = require('express');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var router = express.Router();
var app = require('../server');
var AuthenticateInfo = require('../models/AuthenticateInfo');
var expiresIn = 86400; // seconds = 1 day 
var refreshTokenExpiredIn = 43200; // minutes = 30 days
var type = 'Bearer';

router.post('/authenticate', (req, res) => {
    var username = req.body.user.username;
    var password = req.body.user.password;
    if (username == 'haven' && password == '123456') {
        generateAccessToken(req, res, (accessToken) => {
            generateRefreshToken(req, res, (refreshToken) => {
                var refreshTokenExpiredDate = moment(new Date()).add(refreshTokenExpiredIn, 'minutes');
                var authInfo = new AuthenticateInfo({ refresh_token: refreshToken, user_id: req.body.user.id, expired_time: refreshTokenExpiredDate });
                authInfo.save((err) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({ token: accessToken, refresh_token: refreshToken, type: type, expireIn: expiresIn });
                    }
                });
            });
        });
    } else {
        res.send('Unauthorized!');
    }
});

router.post('/token', (req, res) => {
    validateRefreshToken(req, res, (err) => {
        if (err) {
            res.status(401).json({ message: 'Refresh token is invalid' });
        } else {
            generateAccessToken(req, res, (accessToken) => {
                generateRefreshToken(req, res, (refreshToken) => {
                    var refreshTokenExpiredDate = moment(new Date()).add(refreshTokenExpiredIn, 'minutes');
                    var authInfo = new AuthenticateInfo({ refresh_token: refreshToken, user_id: req.body.user.id, expired_time: refreshTokenExpiredDate });
                    authInfo.save((err) => {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json({ token: accessToken, refresh_token: refreshToken, type: type, expireIn: expiresIn });
                        }
                    });
                })
            })

        }
    });
});

function generateAccessToken(req, res, next) {
    var token = jwt.sign({ id: req.body.user.id }, app.get('superSecret'), {
        expiresIn: expiresIn
    });
    next(token);
}

function validateRefreshToken(req, res, next) {
    AuthenticateInfo.findOne({ refresh_token: req.body.refresh_token }, (err, authenticationInfo) => {
        if (authenticationInfo != null && req.body.user.id == authenticationInfo.user_id) {
            if (new Date() > authenticationInfo.expired_time) {
                authenticationInfo.remove();
                next('Expired');
            } else {
                authenticationInfo.remove();
                next();
            }
        } else {
            next('Invalid info')
        }
    })
}

function generateRefreshToken(req, res, next) {
    var crypto = require('crypto');
    var refreshToken = crypto.randomBytes(3).toString('hex') + req.body.user.id + crypto.randomBytes(40).toString('hex');
    next(refreshToken);
}

module.exports = router;