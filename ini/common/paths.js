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
    api:         path.join(root, 'server', 'routes', 'api'),
    apiHandler:  path.join(root, 'server', 'lib', 'Api'),
    bootstrap:   path.join(root, 'node_modules', 'bootstrap', 'dist'),
    ctrl:        path.join(root, 'server', 'mvc', 'controllers'),
    documents:   path.join(root, 'doc'),
    models:      path.join(root, 'server', 'mvc', 'models'),
    error:       path.join(root, 'server', 'lib', 'error'),
    images:      path.join(root, 'www', 'app', 'img'),
    jquery:      path.join(root, 'node_modules', 'jquery', 'dist'),
    jqueryui:    path.join(root, 'node_modules', 'jquery-ui'),
    favicon:     path.join(root, 'www', 'app', 'img', 'favicon.ico' ),
    nodeModules: path.join(root, 'node_modules'),
    mongodb:     path.join(root, 'server', 'lib', 'mongodb'),
    partial:     path.join(root, 'server', 'mvc', 'views', 'partial'),
    private:     path.join(root, 'server'),
    public:      path.join(root, 'www'),
    root:        root,
    routes:      path.join(root, 'server', 'routes', 'paths'),
    users:       path.join(root, 'server', 'routes', 'users'),
    views:       path.join(root, 'server', 'mvc', 'views')
}

//  Export content
module.exports = paths;
