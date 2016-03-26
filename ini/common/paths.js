/**
 *  @file   paths.js
 *
 *  The configuration file for absolute paths.
 */

//  Requires
var path            = require('path');
var root            = global.app.root

var paths = {
    angular:            path.join(root, 'node_modules', 'angular'),
    api:                path.join(root, 'server', 'routes', 'api'),
    apiHandler:         path.join(root, 'server', 'lib', 'Api'),
    bootstrap:          path.join(root, 'node_modules', 'bootstrap', 'dist'),
    ctrl:               path.join(root, 'server', 'mvc', 'controllers'),
    documents:          path.join(root, 'doc'),
    models:             path.join(root, 'server', 'mvc', 'models'),
    error:              path.join(root, 'server', 'lib', 'Error'),
    images:             path.join(root, 'www', 'app', 'img'),
    jquery:             path.join(root, 'node_modules', 'jquery', 'dist'),
    jqueryui:           path.join(root, 'node_modules', 'jquery-ui'),
    jqueryvalidation:   path.join(root, 'node_modules', 'jquery-validation', 'dist'),
    jscookie:           path.join(root, 'node_modules', 'js-cookie', 'src'),
    nodeModules:        path.join(root, 'node_modules'),
    mongodb:            path.join(root, 'server', 'lib', 'Mongodb'),
    mixin:              path.join(root, 'server', 'mvc', 'views', 'mixin'),
    private:            path.join(root, 'server'),
    public:             path.join(root, 'www'),
    projectFiles: {
        css: [
                        path.join(root, 'www', 'app', 'css', '*.cs')
        ] ,
        jade: [
                        path.join(root, 'server', 'mvc', 'views', '*.jade')
        ],
        json: [
                        path.join(root, 'server', 'mvc', 'models', '*.json')
        ],
        js: [
                        path.join(root, 'ini', '*.js'),
                        path.join(root, 'server', '*.js'),
                        path.join(root, 'www', 'app', '*.js'),
                        path.join(root, 'app.js')
        ],
        mongodb:{
           cfg:         path.join(root, 'ini', 'mongodb.cfg'),
           exe:         path.join('C:', 'Program Files', 'MongoDB', 'Server', '3.2', 'bin', 'mongod.exe')
        }
    },
    root:               root,
    routes:             path.join(root, 'server', 'routes', 'paths'),
    security:           path.join(root, 'server', 'lib', 'Security'),
    users:              path.join(root, 'server', 'routes', 'users'),
    views:              path.join(root, 'server', 'mvc', 'views')
};


//  Export content
module.exports = paths;
