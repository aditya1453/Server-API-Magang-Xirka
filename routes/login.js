const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require(path.join(__dirname,'..','controllers','queries'))
const config = require(path.join(__dirname,'..','config'));

router.get('/', (req, res, next) => {
    res.render('login')
})
  
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    // For the given username fetch user from DB
    var mockedUsername = config.username_login
    var mockedPassword = config.password_login

    if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
            var token = jwt.sign({username: username},
                        config.secret,
                        { expiresIn: '1h'});
            console.log('New token auth')
            // return the JWT token for the future API calls
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            console.log('Login failed')
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
        } else {
            console.log('Login failed')
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
    }
});

  module.exports = router;