/**
 *  @name   main.js
 *
 *  This file holds the GET controller for the main page.
 */

var path = require('path');
var ini = require(global.app.ini());

/**
 *  @function   index
 *
 *  The default page for the application
 *
 *  @param  {Object}    req     The request passed by the application
 *  @param  {Object}    res     The response passed by the application
 */
var index = function (req, res) {
    res.render(path.join(ini.path.views, 'content', 'page.mixer.jade'), {
        title: 'trackstudio'
    });
};

//  Export content
module.exports.index = index;