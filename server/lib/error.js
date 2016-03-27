/**
 *  @file   error.js
 *
 *  This holds the error handlers for the server.
 */

var path = require('path');
var ini = require(global.app.ini());
var msg = '[ ERROR ]';

var error = function () {
    /**
     *  @name   notFound
     *
     *  Process a 404 missing resource
     */
    this.notFound = function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    };
    /**
     *  @name   server
     *
     *  Processes a 500 server error
     *
     *  dev  - will print stack trace
     *  prod - no stack traces leaked to user
     */
    this.server = function (err, req, res, next) {
        res.status(err.status || 500);
        if (ini.mode === 'dev')
            res.render(path.join(ini.path.mixin, 'error'), {
                message: err.message,
                error: err
            });
        else
            res.render(path.join(ini.path.mixin, 'error'), {
                message: err.message,
                error: {}
            });
    };
};

/**
 *  @name   middleware
 *
 *  error handler middleware function
 *
 *  @param  app     the express application
 */
var middleware = function (app) {

    global.app.console.log(msg, "Initializing.");
    err = new error();

    global.app.console.log(msg, "Adding error responses..");
    app.use(err.notFound);
    global.app.console.log(msg, " - ", "404 - Not Found.");

    app.use(err.server);
    global.app.console.log(msg, " - ", "500 - Server.");

    global.app.console.log(msg, "Done.");
};

//  Export content
module.exports = middleware;