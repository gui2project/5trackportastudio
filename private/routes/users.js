/**
 *  @file   index.js
 *
 *  This is the url routing file it determines the controller that will be used
 *  by the node server.
 *
 *  01/21/2015  Reorganized and added comments
 *
 */

//  Variables

/* application*/
var router  = require('express').Router();
var ini     = require(global.app.ini());

// Code

/* Exports */
module.exports = router;
