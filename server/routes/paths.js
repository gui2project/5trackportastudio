/**
 *  @file   paths.js
 *
 *  This is the url routing file it determines the controller or file that will
 *  be served by the node server.
 */

var express = require('express');
var ini     = require(global.app.ini());

/**
 * @name    middleware
 *
 * Sets up static and dynamic routing from a configuration file.
 *
 * @param   app     the express application reference
 */
var middleware = function(app){

    var router  = express.Router();

    /* Routing - GET */
    ini.map.dynamic.forEach(function(map){
        router.get(map.web, require(map.sys)[map.call]);
    });

    // Dynamic mapping
    app.use('/', router);

    //  Static mapping
    ini.map.static.forEach(function(map){
        app.use(map.web, express.static(map.sys));
    });

};

//  Export content
module.exports = middleware;
