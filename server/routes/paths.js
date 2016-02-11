/**
 *  @file   index.js
 *
 *  This is the url routing file it determines the controller that will be used
 *  by the node server.
 *
 *  01/21/2015  Reorganized and added comments
 *
 */

var ini     = require(global.app.ini());
var router  = require('express').Router();

// Code

/* Routing - GET */
ini.map.dynamic.forEach(function(map){
    router.get(map.web, require(map.sys)[map.call]);
});

/* Exports */
module.exports = router;
