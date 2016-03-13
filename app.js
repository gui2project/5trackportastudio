/**
 *  @file   app.js
 *
 *  This file is the controller for the application.
 */

//  Requires
var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var path            = require('path');

//  Get application root directory
var root            = path.resolve(__dirname);

// Set application mode to: development | production
global.app          = require('./server/lib/global.js')('development', root);

var ini             = require(global.app.ini());    //  configuration object
var mdb             = require(ini.path.mongodb);    //  mongoose wrapper

//  Setup
var app             = express();

app.set('env', ini.app.mode);
app.set('views', ini.path.views);
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//global.app.console.log(ini.cookie.secret);
app.use(cookieParser(ini.cookie.secret, ini.cookie.options));
app.use(logger(ini.app.mode));
app.use(favicon(path.join(ini.file.favicon)));

//  API routing
require(ini.path.api)(app, mdb);

//  URL routing
require(ini.path.routes)(app);

//  User responses
require(ini.path.users)(app);

//  Error responses
require(ini.path.error)(app);

//  Export content
module.exports = app;
