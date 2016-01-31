/**
 *  @file   error.js
 *
 *  This holds the error handlers for the server.
 */

var error = function(){
    /**
     *  @name   notFound
     *
     *  Process a 404 missing resource
     */
    this.notFound = function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    };
    /**
     *  @name   server
     *
     *  Processes a 500 server error
     *
     *  dev  - will print stacktrace
     *  prod - no stacktraces leaked to user
     */
    this.server = function(err, req, res, next) {
        res.status(err.status || 500);
        app.get('env') === 'dev' ?
            res.render(path.join(ini.path.partial, 'error'),
                {message: err.message, error: err}) :
            res.render(path.join(ini.path.partial, 'error'),
                {message: err.message, error: {}});
    };
};

//  Generate an instance of the error object
var errHandler = new error();

/* Application paths export*/
module.exports = errHandler;




