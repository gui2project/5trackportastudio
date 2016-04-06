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
        web: '/',
        sys: paths.public
    }, {
        web: '/dep/angular',
        sys: paths.angular
    }, {
        web: '/dep/trip-js',
        sys: paths.tripjs
    }, {
        web: '/dep/bootstrap',
        sys: paths.bootstrap
    }, {
        web: '/dep/jquery',
        sys: paths.jquery
    }, {
        web: '/dep/jquery-ui',
        sys: paths.jqueryui
    }, {
        web: '/dep/jquery-validation',
        sys: paths.jqueryvalidation
    }, {
        web: '/dep/js-cookie',
        sys: paths.jscookie
    }],
    dynamic: [{
        web: '/mixer',
        sys: path.join(paths.ctrl, 'main'),
        call: 'index'
    }]
};

//  Export content
module.exports = map;