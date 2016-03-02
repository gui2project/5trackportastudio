/**
 *  @file   api.js
 *
 *  This is the API routing file it determines the content to be saved or served
 *  back
 */

var urlJoin = require('url-join');

var ini     = require(global.app.ini());

/**
 * @name    middleware
 *
 * Sets up API routing.
 *
 * @param   app     The express application reference
 * @param   mdb     The mongoose database wrapper
 */
var middleware = function(app, mdb){

    //  Holds the API entry point and documentation generating object
    var api = require(ini.path.apiHandler)(app);

    api.add({
        "url": urlJoin("/api", "post", "user", ":first", ":last"),
        "param": {
            "first": "First name",
            "last": "Last name"
        },
        "desc": "Adds a user to the database.",
        "return": "POST"
    },
    function(req, res, obj){
        var myuser = new mdb.models.users({name: req.params.first + ' ' + req.params.last});
        myuser.save(function(err, doc){api.response(res, err, doc, obj);});
    });

    //  Adding error handling and help
    api.end();
};

//  Export content
module.exports = middleware;
