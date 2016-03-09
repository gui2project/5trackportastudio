/**
 *  @file   faq.js
 *
 *  This file holds the GET controller for the FAQ page.
 */

var path    = require('path');
var ini     = require(global.app.ini());

var index = function(req, res) {

    res.render(path.join(ini.path.partial, 'page.mixer.jade'), { title: 'trackstudio' });

} ;

//  Export content
module.exports.index = index;
