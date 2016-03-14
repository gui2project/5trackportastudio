/**
 *  @file   map.js
 *
 *  The configuration file for web mapping paths.
 */

//  Requires
var path             = require('path');
var paths            = require('./paths.js');

var map = {
    static: [
        {
            web: '/',
            sys: paths.public
        },
        {
            web: '/app/doc',
            sys: paths.documents
        },
        {
            web: '/dep/angular',
            sys: paths.angular
        },
        {
            web: '/dep/bootstrap',
            sys: paths.bootstrap
        },
        {
            web: '/dep/jquery',
            sys: paths.jquery
        },
        {
            web: '/dep/jquery-ui',
            sys: paths.jqueryui
        },
        {
            web: '/dep/jquery-validation/',
            sys: paths.jqueryvalidation
        },
        {
            web: '/dep/js-cookie/',
            sys: paths.jscookie
        }
    ],
    dynamic: [
        {
            web: '/',
            sys: path.join(paths.ctrl, 'home'),
            call: 'index'
        },
        {
            web: '/home',
            sys: path.join(paths.ctrl, 'home'),
            call: 'home'
        },
        {
            web: '/about',
            sys: path.join(paths.ctrl, 'about'),
            call: 'index'
        },
        {
            web: '/contact',
            sys: path.join(paths.ctrl, 'contact'),
            call: 'index'
        },
        {
            web: '/faq',
            sys: path.join(paths.ctrl, 'faq'),
            call: 'index'
        }
    ]
};

//  Export content
module.exports = map;
