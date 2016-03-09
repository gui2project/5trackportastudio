/**
 *  @file   production.js
 *
 *  The configuration file to use during production.
 *
 *  It holds settings for the application.
 */

// Configuration settings
var ini = {
    app:{
        mode: 'prod'
    },
    db:   require('./common/db.js'),
    file: require('./common/file.js'),
    map:  require('./common/map.js'),
    path: require('./common/paths.js')
};

// Export Content
module.exports = ini;
