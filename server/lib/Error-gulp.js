/**
 *  @file   Error-gulp.js
 *
 *  This holds the error handlers for Gulp.
 */

var msg = '[ ERROR-GULP ]';

//  Gulp Error Handlers
var error = function () {

    /**
     *  @name   git
     *
     *  Processes a gulp-git error
     *
     *  @param  err     The error being handled
     *  @throw  err     The error being handled
     */
    this.git = function (err) {
        if (err) throw err;
    };

    /**
     *  @name   exec
     *
     *  Handles errors for gulp-exec.
     *
     *  @param  err         the error being handled
     *  @param  stdout      stdout stream
     *  @param  stderr      stderr stream
     */
    this.exec = function (err, stdout, stderr) {
        console.log(stdout, stderr);
        cb(err);
    };

};

/**
 *  @name   middleware
 *
 *  error handler middleware function
 */
var middleware = function (app) {

    return new Error();
};

//  Export content
module.exports = middleware;