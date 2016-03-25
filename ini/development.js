/**
 *  @file   development.js
 *
 *  The configuration file to use during development.
 *  It holds settings for the application.
 */

// Configuration settings
var ini = {
    app:{
        mode: 'dev'
    },
    cookie:     require('./common/cookie.js'),
    db:         require('./common/db.js'),
    file:       require('./common/file.js'),
    map:        require('./common/map.js'),
    path:       require('./common/paths.js'),
    security:   require('./common/security.js')
};

//  Default override
ini.security.ssl.state = false;

// Export Content
module.exports = ini;
