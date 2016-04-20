/**
 *  The configuration file for web mapping paths.
 *
 *  @name   map.js
 */

//  REQUIRES

var path = require('path');
var paths = require('./paths.js');

//  URL to File path mappings
var map = {
    static: [{
        web: '/dep/lib/angular',
        sys: paths.angular
    }, {
        web: '/dep/lib/trip-js',
        sys: paths.tripjs
    }, {
        web: '/dep/lib/bootstrap',
        sys: paths.bootstrap
    }, {
        web: '/dep/lib/js-cookie',
        sys: paths.jscookie
    }, {
        web: '/dep/lib/jquery/jquery-ui',
        sys: paths.jqueryui
    }, {
        web: '/dep/lib/jquery/jquery-color',
        sys: paths.jquerycolor
    }, {
        web: '/dep/lib/jquery/jquery-validation',
        sys: paths.jqueryvalidation
    }, {
        web: '/dep/lib/jquery',
        sys: paths.jquery
    }, {
        web: '/',
        sys: paths.public
    }],
    dynamic: [{
        web: '/',
        sys: path.join(paths.ctrl, 'main'),
        call: 'index'
    }]
};

//  Export content
module.exports = map;