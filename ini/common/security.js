/**
 *  @file   security.js
 *
 *  The configuration file for security settings.
 */

//  Requires

var root            = global.app.root

//  Database configurations
var security = {
    hash: 'sha512'
};

//  Export content
module.exports = security;