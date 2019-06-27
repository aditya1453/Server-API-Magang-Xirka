const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require(path.join(__dirname,'..','config'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  // For the given username fetch user from DB
  var mockedUsername = 'admin';
  var mockedPassword = 'bandung123';

  if (username && password) {
    if (username === mockedUsername && password === mockedPassword) {
      var token = jwt.sign({username: username},
        config.secret,
        { expiresIn: '1h' // expires in 1 hours
        }
      );
      // return the JWT token for the future API calls
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
      });
    } else {
      res.send(403).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.send(400).json({
      success: false,
      message: 'Authentication failed! Please check the request'
    });
  }
});

module.exports = router;
