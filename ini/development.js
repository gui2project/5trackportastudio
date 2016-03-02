/**
 *  @file   development.js
 *
 *  The configuration file to use during development.
 *
 *  It holds settings for the application.
 */

// Configuration settings
var ini = {
    app:{
        mode: 'dev'
    },
    db:   require('./common/db.js'),
    map:  require('./common/map.js'),
    path: require('./common/paths.js')
};

// Export Content
module.exports = ini;
