/**
 *  The configuration file for absolute paths.
 *
 *  @name   paths.js
 */

//  Requires
var path = require('path');
var root = global.app.root;

//  File and Directory Paths
var paths = {
    angular: path.join(root, 'node_modules', 'angular'),
    api: path.join(root, 'server', 'routes', 'api'),
    apiHandler: path.join(root, 'server', 'lib', 'Api'),
    bootstrap: path.join(root, 'node_modules', 'bootstrap', 'dist'),
    ctrl: path.join(root, 'server', 'mvc', 'controllers'),
    documents: path.join(root, 'doc'),
    models: path.join(root, 'server', 'mvc', 'models'),
    error: path.join(root, 'server', 'lib', 'ErrorHandler'),
    errorGulp: path.join(root, 'server', 'lib', 'Error-gulp'),
    images: path.join(root, 'www', 'app', 'img'),
    jquery: path.join(root, 'node_modules', 'jquery', 'dist'),
    jqueryui: path.join(root, 'node_modules', 'jquery-ui'),
    jqueryvalidation: path.join(root, 'node_modules', 'jquery-validation', 'dist'),
    jscookie: path.join(root, 'node_modules', 'js-cookie', 'src'),
    nodeModules: path.join(root, 'node_modules'),
    mongodb: path.join(root, 'server', 'lib', 'mongodb'),
    mixin: path.join(root, 'server', 'mvc', 'views', 'mixin'),
    private: path.join(root, 'server'),
    public: path.join(root, 'www'),
    projectFiles: {
        css: {
            format: path.join(root, 'ini', 'format', 'css.json'),
            linter: path.join(root, 'ini', 'linter', 'css.json'),
            loc: [
                path.join(root, 'server', '**', '*.css'),
                path.join(root, 'ini', '**', '*.css'),
                path.join(root, 'www', 'app', '**', '*.css'),
                path.join(root, '*.css'),
            ],
        },
        jade: {
            format: path.join(root, 'ini', 'format', 'jade.json'),
            linter: path.join(root, 'ini', 'linter', 'jade.json'),
            loc: [
                path.join(root, 'server', '**', '*.jade'),
                path.join(root, 'ini', '**', '*.jade'),
                path.join(root, 'www', 'app', '**', '*.jade'),
                path.join(root, '*.jade'),
            ]
        },
        json: {
            format: path.join(root, 'ini', 'format', 'json.json'),
            linter: path.join(root, 'ini', 'linter', 'json.json'),
            loc: [
                path.join(root, 'server', '**', '*.json'),
                path.join(root, 'ini', '**', '*.json'),
                path.join(root, 'www', 'app', '**', '*.json'),
                path.join(root, '*.json'),
            ]
        },
        js: {
            format: path.join(root, 'ini', 'format', 'js.json'),
            linter: path.join(root, 'ini', 'linter', 'js.json'),
            loc: [
                path.join(root, 'ini', '**', '*.js'),
                path.join(root, 'server', '**', '*.js'),
                path.join(root, 'www', 'app', '**', '*.js'),
                path.join(root, '*.js')
            ]
        },
        mongodb: {
            cfg: path.join(root, 'ini', 'mongodb.cfg'),
            exe: path.join('C:', 'Program Files', 'MongoDB', 'Server', '3.2', 'bin', 'mongod.exe')
        }
    },
    root: root,
    routes: path.join(root, 'server', 'routes', 'paths'),
    security: path.join(root, 'server', 'lib', 'Security'),
    users: path.join(root, 'server', 'routes', 'users'),
    templateMd: {
        js: path.join(root, 'server', 'mvc', 'views', 'template', 'template.md.js.ejs'),
        jshead: path.join(root, 'server', 'mvc', 'views', 'template', 'template.md.js.head.ejs'),
        readme: path.join(root, 'server', 'mvc', 'views', 'template', 'template.md.readme.ejs')
    },
    views: path.join(root, 'server', 'mvc', 'views')
};

//  Export content
module.exports = paths;