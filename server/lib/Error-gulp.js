/**
 *  This holds the error handlers for Gulp.
 *
 *  @name   Error-gulp.js
 */

/**
 *  This class holds all the error haandlers for Gulp.
 *
 *  @class  ErrorGulp
 */
var ErrorGulp = function () {

    /**
     *  Processes a gulp-git error
     *
     *  @method   ErrorGulp.git
     *
     *  @param  {Object}    err     The error being handled
     *  @throw  {Object}    err     The error being handled
     */
    this.git = function (err) {
        if (err) throw err;
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
        console.log(stdout, stderr);
        cb(err);
    };

};

/**
 *  Error handler middle ware intercept function
 *
 *  @function   middleWare
 */
var middleWare = function () {
    return new Error();
};

//  Export content
module.exports = middleWare;