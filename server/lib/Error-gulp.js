/**
 *  @name   Error-gulp.js
 *
 *  This holds the error handlers for Gulp.
 */

/**
 *  @class  ErrorGulp
 *
 *  This class holds all the error haandlers for Gulp.
 */
var ErrorGulp = function () {

    /**
     *  @method   git
     *
     *  Processes a gulp-git error
     *
     *  @param  {Object}    err     The error being handled
     *  @throw  {Object}    err     The error being handled
     */
    this.git = function (err) {
        if (err) throw err;
    };

    /**
     *  @method   exec
     *
     *  Handles errors for gulp-exec.
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
 *  @function   middleWare
 *
 *  Error handler middle ware intercept function
 */
var middleWare = function () {
    return new Error();
};

//  Export content
module.exports = middleWare;