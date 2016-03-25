/**
 *  @file   security.js
 *
 *  The configuration file for security settings.
 */

//  Requires

var root            = global.app.root

//  Database configurations
var security = {
    hash: 'sha512',
    ssl: {
        key:    process.env.TS_SSL_KEY,
        cert:   process.env.TS_SSL_CERT,
        port:   443,
        state:  true
    },
    http: {
        port:   3000
    }
};

//  Export content
module.exports = security;