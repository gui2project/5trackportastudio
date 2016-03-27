/**
 *  @file   production.js
 *
 *  The configuration file to use during production.
 *  It holds settings for the application.
 */

// Configuration settings
var ini = {
    app: {
        mode: 'prod'
    },
    cookie: require('./common/cookie.js'),
    db: require('./common/db.js'),
    file: require('./common/file.js'),
    map: require('./common/map.js'),
    path: require('./common/paths.js'),
    security: require('./common/security.js')
};

// Export Content
module.exports = ini;