/**
 *  This holds the error handlers for the application.
 *
 *  @name   Error.js
 */

var path = require('path');
var ini = require(global.app.ini());
var msg = '[ ERROR ]';

/**
 *  This class holds all the error responses for the application.
 *
 *  @class  ErrorHandler
 */
var ErrorHandler = function () {
    /**
     *  Process a 404 missing resource
     *
     *  @method     ErrorHandler.notFound
     *
     *  @param  {Object}    req     The request passed by the application
     *  @param  {Object}    res     The response passed by the application
     *  @param  {Function}  next    The function to the next express item
     */
    this.notFound = function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    };
    /**
     *  Processes a 500 server error
     *
     *  @method   ErrorHandler.server
     *
     *  @see    tested against ini.mode for `dev|prod`.
     *          `dev` leaks stack trace to user
     *
     *  @param  {Object}    err     The error passed by the application
     *  @param  {Object}    req     The request passed by the application
     *  @param  {Object}    res     The response passed by the application
     *  @param  {Function}  next    The function to the next express item
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
 *  Error handler middle ware intercept function
 *
 *  @function   middleWare
 *
 *  @param  {Object}    app    The express application
 */
var middleWare = function (app) {

    global.app.console.log(msg, "Initializing.");
    var err = new ErrorHandler();

    global.app.console.log(msg, "Adding error responses..");

    app.use(err.notFound);
    global.app.console.log(msg, " - ", "404 - Not Found.");

    app.use(err.server);
    global.app.console.log(msg, " - ", "500 - Server.");

    global.app.console.log(msg, "Done.");
};

//  Export content
module.exports = middleWare;