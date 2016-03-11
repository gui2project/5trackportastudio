/**
 *  @file   api.js
 *
 *  This is the API routing file it determines the content to be saved or served
 *  back
 */

var fs      = require('fs');
var urlJoin = require('url-join');
var mongoose= require('mongoose');
var ini     = require(global.app.ini());

// Document serving
var fileOptions = function(){
    var arr = [];
    ini.file.docs.forEach(function(obj){
        arr.push(obj.alias);
    });
    return arr;
};

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

    //  Get user from the database
    api.add({   "url": urlJoin("/api", "get", "user", ":id"),
                "param": {
                    "email": { "desc": "email to search for", "opt": null }
                },
                "desc": "Gets a user from the database.",
                "return": "GET"
            },
            function(req, res, obj){
                var ObjectId = mongoose.Types.ObjectId;
                mdb.models.users.findOne({ '_id': req.params.id }, 'name email pass', function (err, person) {
                    api.response(res, err, person, obj)
                });
            });

    //  add a user to the database
    api.add({   "url": urlJoin("/api", "post", "user", ":name", ":email", ":pass"),
                "param": {
                    "name": { "desc": "Name", "opt": null },
                    "email": { "desc": "email", "opt": null },
                    "pass": { "desc": "password", "opt": null }
                },
                "desc": "Adds a user to the database.",
                "return": "GET"
            },
            function(req, res, obj){
                //  TODO Needs to be modified to post
                //      - removal of url parameters
                //      - take parameters from forms

                var myuser = new mdb.models.users({name: req.params.name, email: req.params.email, pass: req.params.pass, projects: null});
                myuser.save(function(err, doc){api.response(res, err, doc, obj);});
            });

    //get document from the database
    api.add({   "url": urlJoin("/api", "get", "doc", ":alias"),
                "param": {
                    "alias": { "desc": "Alias of document to retrieve.", "opt": fileOptions() }
                },
                "desc": "Gets an allowed document from the application",
                "return": "GET"
            },
            function(req, res, obj){
                var myerr = true;

                ini.file.docs.forEach(function(obj){
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
