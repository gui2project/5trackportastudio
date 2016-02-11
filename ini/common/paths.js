/**
 *  @file   paths.js
 *
 *  The configuration file for absolute paths.
 */

//  Requires
var path            = require('path');
var root            = global.app.root

var paths = {
    angular:     path.join(root, 'node_modules', 'angular'),
    bootstrap:   path.join(root, 'node_modules', 'bootstrap', 'dist'),
    ctrl:        path.join(root, 'server', 'controllers'),
    documents:   path.join(root, 'doc'),
    error:       path.join(root, 'server', 'controllers', 'error'),
    images:      path.join(root, 'www', 'app', 'img'),
    jquery:      path.join(root, 'node_modules', 'jquery', 'dist'),
    jqueryui:    path.join(root, 'node_modules', 'jquery-ui'),
    favicon:     path.join(root, 'www', 'app', 'img', 'favicon.ico' ),
    nodeModules: path.join(root, 'node_modules'),
    partial:     path.join(root, 'server', 'views', 'partial'),
    private:     path.join(root, 'server'),
    public:      path.join(root, 'www'),
    root:        root,
    routes:      path.join(root, 'server', 'routes', 'paths'),
    users:       path.join(root, 'server', 'routes', 'users'),
    views:       path.join(root, 'server', 'views')
}

/* Application paths export*/
module.exports = paths;
