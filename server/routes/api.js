/**
 *  This is the API routing file it determines the content to be saved
 *  or served back
 *
 *  @name   api.js
 */

//  REQUIRES

var fs = require('fs');
var urlJoin = require('url-join');
var mongoose = require('mongoose');
var path = require('path');

var ini = require(global.app.ini());

//  VARIABLES

var msg = '[API]';

/**
 *  Generates an array of document aliases from the ini.file.docs object
 *
 *  @function   fileOptions
 *  @return     {Array}     An array of Document aliases
 */
var fileOptions = function () {
    var arr = [];
    ini.file.docs.forEach(function (obj) {
        arr.push(obj.alias);
        arr.push(obj.alias + '.' + obj.ext);
    });
    return arr;
};

/**
 * Sets up API routing. Self Documenting methods are added to the api, They are
 * self documenting because the first paramter adds itself to the API help object.
 *
 * @function    middleWare
 * @param   {Object}    app     The express application reference
 * @param   {Object}    mdb     The mongoDB database object
 * @see /api/get/help   For generated methods
 */
var middleWare = function (app, mdb) {

    //  Holds the API entry point and documentation generating object
    var api = require(ini.path.apiHandler)(app);

    //  Get user from the database
    api.add({
            'url': urlJoin('/api', 'post', 'find-user'),
            'param': [{
                ':id': {
                    'desc': 'id to search for',
                    'opt': [null]
                }
            }],
            'desc': 'Gets a user from the database.',
            'return': 'POST'
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin('/api', 'post', 'find-user'));
            global.app.console.log(msg, 'PARAMS', req.body);

            if (req.body.id === 'empty') {
                //  No user is passed
                api.response(res, false, false, obj);
            } else {
                //  User is passed
                var ObjectId = mongoose.Types.ObjectId;
                // Find user
                mdb.models.users.findOne({
                    '_id': req.body.id
                }, 'name email', function (err, person) {
                    // Return user
                    api.response(res, err, person, obj);
                });
            }
        });

    //  Get list of effects
    api.add({
            'url': urlJoin('/api', 'get', 'effects'),
            'param': [null],
            'desc': 'Gets a list of effects.',
            'return': 'GET'
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin('/api', 'get', 'effects'));
            // Fetch effects
            var data = require(path.join(ini.path.models, 'effects.json'));
            // Return effects
            api.response(res, false, data, obj);
        });

    //  Checks if a session is valid
    api.add({
            'url': urlJoin('/api', 'get', 'session', 'valid'),
            'param': [null],
            'desc': 'Checks if a session is valid.',
            'return': 'GET'
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin('/api', 'get', 'session', 'valid'));
            global.app.console.log(msg, req.cookies);
            // Search for session based off of cookie value
            mdb.models.session.findOne({
                'hash': req.cookies[ini.cookie.ts.session]
            }, 'user live', function (err, session) {
                global.app.console.log(msg, session);
                if (session === null) {
                    // No session
                    api.response(res, false, false, obj);
                } else if (req.cookies[ini.cookie.ts.user] === session.user) {
                    // Session found
                    api.response(res, false, true, obj);
                } else {
                    //  Error
                    api.response(res, false, false, obj);
                }
            });
        });

    //  Add a user to the database
    api.add({
            'url': urlJoin('/api', 'post', 'user'),
            'param': [{
                ':name': {
                    'desc': 'Name',
                    'opt': [null]
                }
            }, {
                ':email': {
                    'desc': 'email',
                    'opt': [null]
                }
            }, {
                ':pass': {
                    'desc': 'password',
                    'opt': [null]
                }
            }, {
                ':login': {
                    'desc': 'Wether to perform a login',
                    'opt': ['true', 'false']
                }
            }],
            'desc': 'Adds a user to the database.',
            'return': 'POST'
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin('/api', 'post', 'user'));
            // Find if user exists
            mdb.models.users.findOne({
                'email': req.body.email
            }, 'email', function (err, person) {

                //  If person does not exist
                if (person === null) {
                    //  Generate user components
                    global.app.console.log(msg, 'Adding user.', person);
                    var security = require(ini.path.security)();
                    var salt = security.salt();
                    var hash = security.hash(req.body.pass, salt);

                    global.app.console.log(msg, 'Creating user entry.');
                    var myuser = new mdb.models.users({
                        name: req.body.name,
                        email: req.body.email,
                        hash: hash,
                        salt: salt,
                        projects: null
                    });

                    // Add user to database
                    myuser.save(function (err, user) {

                        if (req.body.login) {
                            // Generate session components
                            var salt1 = security.salt();
                            var salt2 = security.salt();
                            var sessionhash = security.hash(salt1, salt2);

                            // Generate session object
                            var mysession = new mdb.models.session({
                                hash: sessionhash,
                                user: user._id,
                                time: new Date()
                                    .getTime(),
                                live: true
                            });

                            global.app.console.log(msg, 'Attempting session.');
                            mysession.save(function (err, session) {
                                // Session success
                                global.app.console.log(msg, 'Unique session made.');

                                res.cookie(ini.cookie.ts.user, user._id, ini.cookie.options);
                                res.cookie(ini.cookie.ts.session, sessionhash, ini.cookie.options);

                                api.response(res, null, true, obj);
                            });

                        } else {
                            // Session Error
                            api.response(res, err, doc, obj);
                        }
                    });
                } else {
                    // User already exists
                    global.app.console.log(msg, 'Duplicate user found - User is not being added.');
                    api.response(res, true, true, obj);
                }
            });

        });

    //  Login a user
    api.add({
            'url': urlJoin('/api', 'post', 'login'),
            'param': [{
                ':email': {
                    'desc': 'email',
                    'opt': [null]
                }
            }, {
                ':pass': {
                    'desc': 'password',
                    'opt': [null]
                }
            }],
            'desc': 'Authenticates a user.',
            'return': 'POST'
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin('/api', 'post', 'login'));
            global.app.console.log(msg, 'input', req.body.email);
            // Find user
            mdb.models.users.findOne({
                'email': req.body.email
            }, 'email hash salt', function (err, person) {
                //  Person found
                if (person !== null) {
                    global.app.console.log(msg, 'Authenticating user.');
                    // Ceate password validation components
                    var security = require(ini.path.security)();
                    var hash = security.hash(req.body.pass, person.salt);

                    //  Match hashes to authenticate
                    if (hash === person.hash) {
                        global.app.console.log(msg, 'Valid password matched to user');

                        // Create Session components
                        var salt1 = security.salt();
                        var salt2 = security.salt();
                        var sessionhash = security.hash(salt1, salt2);

                        //  Find if session exists
                        mdb.models.users.findOne({
                            'hash': sessionhash
                        }, 'user', function (err, session) {

                            if (session === null) {
                                //  Session is new

                                // Create session object
                                var mysession = new mdb.models.session({
                                    hash: sessionhash,
                                    user: person._id,
                                    time: new Date()
                                        .getTime(),
                                    live: true
                                });

                                // Save session
                                mysession.save(function (err, doc) {
                                    global.app.console.log(msg, 'Unique session made.');

                                    res.cookie(ini.cookie.ts.user, person._id, ini.cookie.options);
                                    res.cookie(ini.cookie.ts.session, sessionhash, ini.cookie.options);

                                    api.response(res, null, true, obj);
                                });

                            } else {
                                // Session has been used
                                global.app.console.log(msg, 'Invalid session attempt.');
                                api.response(res, true, true, obj);
                            }

                        });

                    } else {
                        // user was not authenticated
                        global.app.console.log(msg, 'Invalid password attempt made.');
                        api.response(res, true, true, obj);
                    }

                } else {
                    //  User is not in our system
                    global.app.console.log(msg, 'User was not found.');
                    api.response(res, true, true, obj);
                }
            });
        });

    //  Logout a user
    api.add({
            'url': urlJoin('/api', 'get', 'logout'),
            'param': [null],
            'desc': 'Deauthenticates a user.',
            'return': 'GET'
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin('/api', 'get', 'logout'));
            // Invalidate the session
            mdb.models.session.update({
                    'user': req.cookies[ini.cookie.ts.user],
                    'hash': req.cookies[ini.cookie.ts.session]
                }, {
                    live: false
                },
                function (err, numberAffected, rawResponse) {
                    // Clean up cookies
                    global.app.console.log(msg, 'Session terminating.');
                    res.clearCookie(ini.cookie.ts.user);
                    res.clearCookie(ini.cookie.ts.session);
                    api.response(res, null, true, obj);
                });
        });

    //  Get document from the application
    api.add({
            'url': urlJoin('/api', 'get', 'doc', ':alias'),
            'param': [{
                ':alias': {
                    'desc': 'Alias of document to retrieve.',
                    'opt': fileOptions()
                }
            }],
            'desc': 'Gets an allowed document from the application',
            'return': 'GET'
        },
        function (req, res, obj) {
            global.app.console.log(msg, urlJoin('/api', 'get', 'doc', ':alias'));
            var myerr = true;

            // Search for an allowed document
            ini.file.docs.some(function (obj) {
                if (req.params.alias.toLowerCase() === obj.alias.toLowerCase() ||
                    req.params.alias.toLowerCase() === obj.alias.toLowerCase() + '.' + obj.ext.toLowerCase()) {
                    myerr = false;
                    // return document
                    fs.readFile(obj.sys, function (err, data) {
                        res.contentType(obj.mime);
                        res.send(data);
                    });
                }
            });

            //  Document wasnt found
            if (myerr) {
                api.response(res, myerr, {
                    'err': 'File not found'
                }, obj);
            }
        });

    //  Adding error handling and help
    api.end();

};

//  Export content
module.exports = middleWare;