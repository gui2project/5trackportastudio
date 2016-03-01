/**
 *  @file   api.js
 *
 *  This is the API routing file it determines the content to be saved or served
 *  back
 */

var path    = require('path');
var ini     = require(global.app.ini());

/**
 * @name    middleware
 *
 * Sets up API routing.
 *
 * @param   app     the express application reference
 * @param   mdb     the mongoose database wrapper
 */
var middleware = function(app, mdb){

    app.get( '/api', function(req,res){
        var help = require(path.join(ini.path.data, 'api.json'))
        res.json(help);
    });

    app.get( '/api/post/user/:first/:last', function(req,res){
        var myuser =  new mdb.models.users({name: req.params.first + ' ' + req.params.last})
        myuser.save(function(err,doc){ err ? res.json(err) : res.json(myuser) ; });
    });

};

//  Export content
module.exports = middleware;
