/**
 *  @file   production.js
 *
 *  The configuration file to use during production.
 *
 *  It holds absolute paths, and other settings.
 */

//  Requires
var path            = require('path');

// Configuration settings
var ini = {
    app:{
        mode: 'prod'
    },
    path: {
        angular:     path.join(global.app.root, 'node_modules', 'angular'),
        bootstrap:   path.join(global.app.root, 'node_modules', 'bootstrap', 'dist'),
        ctrl:        path.join(global.app.root, 'private', 'controllers'),
        error:       path.join(global.app.root, 'private', 'handlers', 'error.js'),
        images:      path.join(global.app.root, 'public', 'app', 'img'),
        jquery:      path.join(global.app.root, 'node_modules', 'jquery', 'dist'),
        favicon:     path.join(global.app.root, 'public', 'app', 'img', 'favicon.ico' ),
        nodeModules: path.join(global.app.root, 'node_modules'),
        partial:     path.join(global.app.root, 'private', 'views', 'partial'),
        private:     path.join(global.app.root, 'private'),
        public:      path.join(global.app.root, 'public'),
        root:        global.app.root,
        routes:      path.join(global.app.root, 'private', 'routes', 'index'),
        users:       path.join(global.app.root, 'private', 'routes', 'users'),
        views:       path.join(global.app.root, 'private', 'views')
    }
};

// Reporting that the configuration was used
global.app.console.log('Using '+global.app.ini());

/* Application paths export*/
module.exports = ini;
