/**
 *  @name   api.js
 *
 *  This is the API routing file it determines the content to be saved
 *  or served back
 */

var fs = require('fs');
var urlJoin = require('url-join');
var mongoose = require('mongoose');
var path = require('path');

var ini = require(global.app.ini());

var msg = '[API]';

/**
 *  @function   fileOptions
 *
 *  Generates an array of document aliases from the ini.file.docs object
 *
 *  @return     {Array}     An array of Document aliases
 */
var fileOptions = function () {
    var arr = [];
    ini.file.docs.forEach(function (obj) {
        arr.push(obj.alias);
    });
    return arr;
};

/**
 * @function    middleWare
 *
 * Sets up API routing. Self Documenting methods are added to the api, They are
 * self documenting because the first paramter adds itself to the API help object.
 *
 * @param   {Object}    app     The express application reference
 * @param   {Object}    mdb     The mongoDB database object
 */
var middleWare = function (app, mdb) {

    //  Holds the API entry point and documentation generating object
    var api = require(ini.path.apiHandler)(app);

    //  Get user from the database
    api.add({
            "url": urlJoin("/api", "post", "find-user"),
            "param": [{
                ":id": {
                    "desc": "id to search for",
                    "opt": [null]
                }
            }],
            "desc": "Gets a user from the database.",
            "return": "POST"
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin("/api", "post", "find-user"));
            global.app.console.log(msg, 'PARAMS', req.body);

            if (req.body.id == 'empty') {
                api.response(res, false, false, obj);
            } else {
                var ObjectId = mongoose.Types.ObjectId;
                mdb.models.users.findOne({
                    '_id': req.body.id
                }, 'name email', function (err, person) {
                    api.response(res, err, person, obj);
                });
            }
        });

    //  Get list of effects
    api.add({
            "url": urlJoin("/api", "get", "effects"),
            "param": [null],
            "desc": "Gets a list of effects.",
            "return": "GET"
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin("/api", "get", "effects"));
            var data = require(path.join(ini.path.models, "effects.json"));
            api.response(res, false, data, obj);
        });

    //  Checks if a session is valid
    api.add({
            "url": urlJoin("/api", "get", "session", "valid"),
            "param": [null],
            "desc": "Checks if a session is valid.",
            "return": "GET"
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin("/api", "get", "session", "valid"));
            global.app.console.log(msg, req.cookies);
            mdb.models.session.findOne({
                'hash': req.cookies[ini.cookie.ts.session]
            }, 'user live', function (err, session) { // <-- error is here because there is no session
                global.app.console.log(msg, session);
                if (session === null) {
                    api.response(res, false, false, obj);
                } else if (req.cookies[ini.cookie.ts.user] == session.user) {
                    api.response(res, false, true, obj);
                } else {
                    api.response(res, false, false, obj);
                }
            });
        });

    //  Add a user to the database
    api.add({
            "url": urlJoin("/api", "post", "user"),
            "param": [{
                ":name": {
                    "desc": "Name",
                    "opt": [null]
                }
            }, {
                ":email": {
                    "desc": "email",
                    "opt": [null]
                }
            }, {
                ":pass": {
                    "desc": "password",
                    "opt": [null]
                }
            }, {
                ":login": {
                    "desc": "Wether to perform a login",
                    "opt": ["true", "false"]
                }
            }],
            "desc": "Adds a user to the database.",
            "return": "POST"
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin("/api", "post", "user"));
            mdb.models.users.findOne({
                'email': req.body.email
            }, 'email', function (err, person) {

                if (person === null) {
                    global.app.console.log(msg, "Adding user.", person);
                    var security = require(ini.path.security)();
                    var salt = security.salt();
                    var hash = security.hash(req.body.pass, salt);

                    global.app.console.log(msg, "Searching for user.");
                    var myuser = new mdb.models.users({
                        name: req.body.name,
                        email: req.body.email,
                        hash: hash,
                        salt: salt,
                        projects: null
                    });
                    myuser.save(function (err, user) {
                        if (req.body.login) {
                            var salt1 = security.salt();
                            var salt2 = security.salt();
                            var sessionhash = security.hash(salt1, salt2);

                            global.app.console.log(msg, "Attempting session.");
                            var mysession = new mdb.models.session({
                                hash: sessionhash,
                                user: user._id,
                                time: new Date()
                                    .getTime(),
                                live: true
                            });
                            mysession.save(function (err, session) {
                                global.app.console.log(msg, "Unique session made.");

                                res.cookie(ini.cookie.ts.user, user._id, ini.cookie.options);
                                res.cookie(ini.cookie.ts.session, sessionhash, ini.cookie.options);

                                api.response(res, null, true, obj);
                            });

                        } else {
                            api.response(res, err, doc, obj);
                        }
                    });
                } else {
                    global.app.console.log(msg, "Duplicate user found - User is not being added.");
                    api.response(res, true, true, obj);
                }
            });

        });

    //  Login a user
    api.add({
            "url": urlJoin("/api", "post", "login"),
            "param": [{
                ":email": {
                    "desc": "email",
                    "opt": [null]
                }
            }, {
                ":pass": {
                    "desc": "password",
                    "opt": [null]
                }
            }],
            "desc": "Authenticates a user.",
            "return": "POST"
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin("/api", "post", "login"));
            global.app.console.log(msg, 'input', req.body.email);
            mdb.models.users.findOne({
                'email': req.body.email
            }, 'email hash salt', function (err, person) {

                if (person !== null) {
                    global.app.console.log(msg, "Authenticating user.");
                    var security = require(ini.path.security)();
                    var hash = security.hash(req.body.pass, person.salt);

                    //console.log(hash);
                    //console.log(person.hash);

                    if (hash == person.hash) {
                        global.app.console.log(msg, "Valid password matched to user");

                        var salt1 = security.salt();
                        var salt2 = security.salt();
                        var sessionhash = security.hash(salt1, salt2);

                        mdb.models.users.findOne({
                            'hash': sessionhash
                        }, 'user', function (err, session) {

                            if (session === null) {

                                var mysession = new mdb.models.session({
                                    hash: sessionhash,
                                    user: person._id,
                                    time: new Date()
                                        .getTime(),
                                    live: true
                                });
                                mysession.save(function (err, doc) {
                                    global.app.console.log(msg, "Unique session made.");

                                    res.cookie(ini.cookie.ts.user, person._id, ini.cookie.options);
                                    res.cookie(ini.cookie.ts.session, sessionhash, ini.cookie.options);

                                    api.response(res, null, true, obj);
                                });

                            } else {
                                global.app.console.log(msg, "Invalid session attempt.");
                                api.response(res, true, true, obj);
                            }

                        });

                    } else {
                        global.app.console.log(msg, "Invalid password attempt made.");
                        api.response(res, true, true, obj);
                    }

                } else {
                    global.app.console.log(msg, "User was not found.");
                    api.response(res, true, true, obj);
                }
            });

        });

    //  Logout a user
    api.add({
            "url": urlJoin("/api", "get", "logout"),
            "param": [null],
            "desc": "Deauthenticates a user.",
            "return": "GET"
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin("/api", "get", "logout"));
            mdb.models.session.update({
                    'user': req.cookies[ini.cookie.ts.user],
                    'hash': req.cookies[ini.cookie.ts.session]
                }, {
                    live: false
                },
                function (err, numberAffected, rawResponse) {
                    global.app.console.log(msg, "Session terminating.");
                    res.clearCookie(ini.cookie.ts.user);
                    res.clearCookie(ini.cookie.ts.session);
                    api.response(res, null, true, obj);
                });
        });

    //  Get document from the database
    api.add({
            "url": urlJoin("/api", "get", "doc", ":alias"),
            "param": [{
                ":alias": {
                    "desc": "Alias of document to retrieve.",
                    "opt": fileOptions()
                }
            }],
            "desc": "Gets an allowed document from the application",
            "return": "GET"
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin("/api", "get", "doc", ":alias"));
            var myerr = true;
            ini.file.docs.forEach(function (obj) {
                if (req.params.alias.toLowerCase() == obj.alias.toLowerCase()) {
                    myerr = false;
                    fs.readFile(obj.sys, function (err, data) {
                        res.contentType(obj.mime);
                        res.send(data);
                    });
                }
            });

            if (myerr) api.response(res, myerr, {
                "err": "File not found"
            }, obj);
        });

    //  Adding error handling and help
    api.end();

};

//  Export content
module.exports = middleWare;