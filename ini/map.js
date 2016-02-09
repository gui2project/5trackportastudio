/**
 *  @file   map.js
 *
 *  The configuration file for web mapping static paths.
 */

//  Requires
var paths            = require('./paths.js');

var map = [
    {
        web: '/',
        sys: paths.public
    },
    {
        web: '/dep/doc',
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
    }
];

/* Application paths export*/
module.exports = map;
