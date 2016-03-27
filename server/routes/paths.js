/**
 *  @name   paths.js
 *
 *  This is the url routing file it determines the controller or file that will
 *  be served by the node server.
 */

var express = require('express');
var ini = require(global.app.ini());
var msg = "[ PATHS ]";

/**
 * @function    middleWare
 *
 * Sets up static and dynamic routing from the configuration file.
 *
 * @param   {Object}    app     The express application reference
 */
var middleWare = function (app) {

    var router = express.Router();

    global.app.console.log(msg, "Initializing.");

    // Routing - GET
    global.app.console.log(msg, "Mapping dynamic URL paths.");
    ini.map.dynamic.forEach(function (map) {
        global.app.console.log(msg, " - ", map.web);
        router.get(map.web, require(map.sys)[map.call]);
    });

    // Dynamic mapping
    app.use('/', router);

    //  Static mapping
    global.app.console.log(msg, "Mapping static URL paths.");
    ini.map.static.forEach(function (map) {
        global.app.console.log(msg, " - ", map.web);
        app.use(map.web, express.static(map.sys));
    });

    global.app.console.log(msg, "Done.");
};

//  Export content
module.exports = middleWare;