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
var https           = require('https');
var logger          = require('morgan');
var path            = require('path');

//  Get application root directory and system mode
var root            = path.resolve(__dirname);
var mode            = process.env.TS_RUN_MODE;

// Set application mode to: development | production
global.app          = require('./server/lib/Global.js')(mode, root);

var ini             = require(global.app.ini());    //  configuration object
var mdb             = require(ini.path.mongodb);    //  mongoose wrapper
var security        = require(ini.path.security)();

//  Setup
var app             = express();

//  Set up SSL or leave http
security.ssl(app);

app.set('env', ini.app.mode);
app.set('views', ini.path.views);
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(ini.cookie.secret, ini.cookie.options));
app.use(logger(ini.app.mode));
app.use(favicon(path.join(ini.file.favicon)));

//  API routing
require(ini.path.api)(app, mdb);

//  URL routing
require(ini.path.routes)(app);

//  Error responses
require(ini.path.error)(app);

//  Export content
module.exports = app;
