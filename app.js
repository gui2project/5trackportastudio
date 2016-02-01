/**
 *  @file   app.js
 *
 *  This file is the controller for the application.
 */

// Set application mode to: development | production
global.app          = require('./global.js')('development');

//  Requires
var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var path            = require('path');
var ini             = require(global.app.ini());
var routes          = require(ini.path.routes);
var users           = require(ini.path.users);
var eHandler        = require(ini.path.error);

//  Setup
var app             = express();

app.set('env', ini.app.mode);
app.set('views', ini.path.views);
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger(ini.app.mode));
app.use(favicon(ini.path.favicon));
app.use('/', routes);

//  Static paths
app.use(express.static(ini.path.public));
app.use('/dep/angular', express.static(ini.path.angular));
app.use('/dep/bootstrap', express.static(ini.path.bootstrap));
app.use('/dep/jquery', express.static(ini.path.jquery));
app.use('/dep/jquery-ui', express.static(ini.path.jqueryui));

//  Status Response
app.use(eHandler.notFound);
app.use(eHandler.server);

/* Application paths export*/
module.exports = app;
