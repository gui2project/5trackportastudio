/**
 *  @file   api.js
 *
 *  This is the API routing file it determines the content to be saved or served
 *  back
 */

var express = require('express');
var ini     = require(global.app.ini());


/**
 * @name    middleware
 *
 * Sets up static and dynamic routing from a configuration file.
 *
 * @param   app     the express application reference
 */
var middleware = function(app, mdb){

    app.get( '/api/post/user/:first/:last', function(req,res){
        var myuser =  new mdb.models.users({name: req.params.first + ' ' + req.params.last})
        myuser.save(function(err,doc){ err ? res.json(err) : res.json(myuser) ; });
    });

};

//  Export content
module.exports = middleware;
