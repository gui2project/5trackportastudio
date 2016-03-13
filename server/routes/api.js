/**
 *  @file   api.js
 *
 *  This is the API routing file it determines the content to be saved or served
 *  back
 */

var fs      = require('fs');
var urlJoin = require('url-join');
var mongoose= require('mongoose');
var path    = require('path');

var ini     = require(global.app.ini());

var msg     = '[API]';

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
    api.add({   "url": urlJoin("/api", "get", "user", ":email"),
                "param": {
                    ":email": { "desc": "email to search for", "opt": null }
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

    //  Get list of effects
    api.add({   "url": urlJoin("/api", "get", "effects"),
                "param": null,
                "desc": "Gets a list of effects.",
                "return": "GET"
            },
            function(req, res, obj){
                var data = require(path.join(ini.path.models, "effects.json"));
                    api.response(res, false, data, obj)
            });

    //  Add a user to the database
    api.add({   "url": urlJoin("/api", "post", "user"),
                "param": {
                    ":name": { "desc": "Name", "opt": null },
                    ":email": { "desc": "email", "opt": null },
                    ":pass": { "desc": "password", "opt": null }
                },
                "desc": "Adds a user to the database.",
                "return": "POST"
            },
            function(req, res, obj){

                mdb.models.users.findOne({ 'email': req.body.email }, 'email', function (err, person) {
                    console.log(person);
                    if (person == null){
                        global.app.console.log(msg, "Adding user.")
                        var security = require(ini.path.security)();
                        var salt = security.salt();
                        var hash = security.hash(req.body.pass, salt);

                        var myuser = new mdb.models.users({name: req.body.name, email: req.body.email, hash: hash, salt: salt, projects: null});
                        myuser.save(function(err, doc){api.response(res, err, doc, obj);});
                    } else {
                        global.app.console.log(msg, "Duplicate user found - User is not being added.")
                        api.response(res, true, true, obj);
                    }
                });

            });

    //  Login a user
    api.add({   "url": urlJoin("/api", "post", "login"),
                "param": {
                    ":email": { "desc": "email", "opt": null },
                    ":pass": { "desc": "password", "opt": null }
                },
                "desc": "Authenticates a user.",
                "return": "POST"
            },
            function(req, res, obj){
                mdb.models.users.findOne({ 'email': req.body.email }, 'email hash salt', function (err, person) {

                    if (person != null){
                        global.app.console.log(msg, "Authenticating user.")
                        var security = require(ini.path.security)();
                        var hash = security.hash(req.body.pass, person.salt);

                        console.log(hash);
                        console.log(person.hash);

                        if (hash == person.hash){
                            global.app.console.log(msg, "Valid password matched to user");

                            var salt1 = security.salt();
                            var salt2 = security.salt();
                            var sessionhash = security.hash(salt1, salt2);

                            mdb.models.users.findOne({ 'hash': sessionhash }, 'user', function (err, session) {

                                if (session == null) {

                                    var mysession = new mdb.models.session({hash: sessionhash, user: person['_id'], time: new Date().getTime(), live: true});
                                    mysession.save(function(err, doc){
                                        global.app.console.log(msg, "Unique session made.")

                                        res.cookie('ts.user.id', person['_id'], ini.cookie.options);
                                        res.cookie('ts.user.session', sessionhash, ini.cookie.options);

                                        api.response(res, err, doc, obj);//api.response(res, null, true, obj);
                                    });

                                } else {
                                    global.app.console.log(msg, "Invalid session attempt.")
                                    api.response(res, true, true, obj);
                                }

                            });

                        } else {
                            global.app.console.log(msg, "Invalid password attempt made.")
                            api.response(res, true, true, obj);
                        }

                    } else {
                        global.app.console.log(msg, "User was not found.")
                        api.response(res, true, true, obj);
                    }
                });

            });

    //  Logout a user
    api.add({   "url": urlJoin("/api", "get", "logout"),
                "param": null,
                "desc": "Deauthenticates a user.",
                "return": "GET"
            },
            function(req, res, obj){

                mdb.models.session.update( {'user': req.cookies['ts.user.id'], 'hash': req.cookies['ts.user.session']},
                                           {live: false},
                                           function (err, numberAffected, rawResponse) {
                    global.app.console.log(msg, "Session terminating.")
                    res.clearCookie('ts.user.id');
                    res.clearCookie('ts.user.session');
                    api.response(res, null, true, obj);
                });
            });


    //  Get document from the database
    api.add({   "url": urlJoin("/api", "get", "doc", ":alias"),
                "param": {
                    ":alias": { "desc": "Alias of document to retrieve.", "opt": fileOptions() }
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
