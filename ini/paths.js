/**
 *  @file   paths.js
 *
 *  The configuration file for absolute paths.
 */

//  Requires
var path            = require('path');

var paths = {
    angular:     path.join(global.app.root, 'node_modules', 'angular'),
    bootstrap:   path.join(global.app.root, 'node_modules', 'bootstrap', 'dist'),
    ctrl:        path.join(global.app.root, 'server', 'controllers'),
    documents:   path.join(global.app.root, 'doc'),
    error:       path.join(global.app.root, 'server', 'controllers', 'error', 'index.js'),
    images:      path.join(global.app.root, 'www', 'app', 'img'),
    jquery:      path.join(global.app.root, 'node_modules', 'jquery', 'dist'),
    jqueryui:    path.join(global.app.root, 'node_modules', 'jquery-ui'),
    favicon:     path.join(global.app.root, 'www', 'app', 'img', 'favicon.ico' ),
    nodeModules: path.join(global.app.root, 'node_modules'),
    partial:     path.join(global.app.root, 'server', 'views', 'partial'),
    private:     path.join(global.app.root, 'server'),
    public:      path.join(global.app.root, 'www'),
    root:        global.app.root,
    routes:      path.join(global.app.root, 'server', 'routes', 'index'),
    users:       path.join(global.app.root, 'server', 'routes', 'users'),
    views:       path.join(global.app.root, 'server', 'views')
}

/* Application paths export*/
module.exports = paths;
