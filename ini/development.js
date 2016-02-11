/**
 *  @file   development.js
 *
 *  The configuration file to use during development.
 *
 *  It holds settings and links to the paths for the application.
 */

// Configuration settings
var ini = {
    app:{
        mode: 'dev'
    },
    map:  require('./common/map.js'),
    path: require('./common/paths.js')
};

// Reporting that the configuration was used
global.app.console.log('\n  Using:', global.app.ini());

// Export Content
module.exports = ini;
