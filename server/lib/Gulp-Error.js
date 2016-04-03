/**
 *  This holds the error handlers for Gulp.
 *
 *  @name   Gulp-Error.js
 */

/**
 *  This class holds all the error haandlers for Gulp.
 *
 *  @class  GulpError
 */
var GulpError = function () {

    /**
     *  Processes a gulp-git error
     *
     *  @method   ErrorGulp.git
     *
     *  @param  {Object}    err     The error being handled
     *  @throw  {Object}    err     The error being handled
     */
    this.git = function (err) {
        if (err) {
            throw err;
        }
    };

    /**
     *  Handles errors for gulp-exec.
     *
     *  @method   ErrorGulp.exec
     *
     *  @param  {Object}    err         The error being handled
     *  @param  {Stream}    stdout      stdout stream
     *  @param  {Stream}    stderr      stderr stream
     */
    this.exec = function (err, stdout, stderr) {
        console.log('GULP-EXEC-ERROR', stdout, stderr);
        cb(err);
    };

};

/**
 *  GulpError handler middle ware intercept function
 *
 *  @function   middleWare
 */
var middleWare = function () {
    return new GulpError();
};

//  Export content
module.exports = middleWare;