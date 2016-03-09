/**
 *  @file   api.js
 *
 *  This is the API routing file it determines the content to be saved or served
 *  back
 */

var fs      = require('fs');
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
        "url": urlJoin("/api", "get", "user", ":first", ":last"),
        "param": {
            "first": {
                "desc": "First name",
                "opt": null
            },
            "last": {
                "desc": "Last name",
                "opt": null
            }
        },
        "desc": "Adds a user to the database.",
        "return": "GET"
    },
    function(req, res, obj){
        //  TODO Needs to be modified to post
        //      - removal of url parameters
        //      - take parameters from forms
        var myuser = new mdb.models.users({name: req.params.first + ' ' + req.params.last});
        myuser.save(function(err, doc){api.response(res, err, doc, obj);});
    });

    // Document serving
    var fileOptions = function(){
        var arr = [];
        ini.file.forEach(function(obj){
            arr.push(obj.alias);
        });
        return arr;
    };

    api.add({
        "url": urlJoin("/api", "get", "doc", ":alias"),
        "param": {
            "alias": {
                "desc": "Alias of document to retrieve.",
                "opt": fileOptions()
            }
        },
        "desc": "Gets an allowed document from the application",
        "return": "GET"
    },
    function(req, res, obj){
        var myerr = true;

        ini.file.forEach(function(obj){
            if (req.params.alias.toLowerCase() == obj.alias.toLowerCase()){
                myerr = false;
                fs.readFile(obj.sys, function (err,data){
                    res.contentType(obj.mime);
                    res.send(data);
                });
            }
        });

        if (myerr) api.response(res, myerr, {"err": "File not found"}, obj);
    });

    //  Adding error handling and help
    api.end();
};

//  Export content
module.exports = middleware;
