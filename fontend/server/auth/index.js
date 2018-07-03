'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../../node_amqplib/node_mongodb/res_user/model.res.user');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/twitter', require('./twitter'));
router.use('/google', require('./google'));

module.exports = router;