/**
 *  @file   home.js
 *
 *  This file holds the GET controller for the home page.
 */

var path    = require('path');
var ini     = require(global.app.ini());

var index = function(req, res) {

    res.render(path.join(ini.path.partial, 'page.mixer.jade'), { title: 'GUI II Project - Index' });

} ;

var home = function(req, res) {

    res.render(path.join(ini.path.partial, 'page.mixer.jade'), { title: 'GUI II Project - Home' });

} ;

//  Export content
module.exports.index = index;
module.exports.home  = home;
