/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var config = require('./config/environment');

// Connect to database
mongoose.set('debug', true);
var mongooseUri = uriUtil.formatMongoose(config.mongo.uri);
mongoose.connect(mongooseUri, config.mongo.options);
var mongooseConn = mongoose.connection;

mongooseConn.on('error', console.error.bind(console, 'connection error:'));

mongooseConn.once('open', function () {
});

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
   console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
