/**
 *  @file   production.js
 *
 *  The configuration file to use during production.
 *
 *  It holds settings and links to the paths for the application.
 */

//  Requires
var path            = require('path');

// Configuration settings
var ini = {
    app:{
        mode: 'prod'
    },
    path: require('./paths.js')
};

// Reporting that the configuration was used
global.app.console.log('Using '+global.app.ini());

/* Application paths export*/
module.exports = ini;
