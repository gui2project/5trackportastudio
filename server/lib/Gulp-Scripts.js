/**
 *  This holds the scripts for Gulp.
 *
 *  @name   Gulp-Scripts.js
 */
var ini = require(global.app.ini()); //  configuration object

//  INCLUDES
var rm = require('gulp-rm');
var concat = require('gulp-concat');
var markdox = require("gulp-markdox");
var execFull = require('gulp-exec');
var deleteLines = require('gulp-delete-lines');
var indent = require('gulp-indent');
var combiner = require('stream-combiner2');
var gulp = require('gulp');

/**
 *  The GulpScripts class, holds all the common functions as methods.
 *
 * @class  GulpScripts
 */
function GulpScripts() {

    /**
     *  Removes given files
     *
     *  @method removeFiles
     *  @param {Array.String} src   An array of source file paths.
     *  @param {Object} srcOpt      An options object for gulp.src
     *  @return {Stream}            Gulp Stream
     */
    this.removeFiles = function (src, srcOpt) {
        srcOpt = (srcOpt === undefined) ? null : srcOpt;
        return gulp.src(src, srcOpt)
            .pipe(rm());
    };

    /**
     *  Merges given files in order given
     *
     *  @method   removeFiles
     *  @param {Array.String} src       An array of source file paths.
     *  @param {String} dirOut          The output directory
     *  @param {String} fileOut         The output file name
     *  @return {Stream}                Gulp Stream
     */
    this.mergeFiles = function (src, dirOut, fileOut) {
        return combiner.obj([
            gulp.src(src),
            concat(fileOut),
            gulp.dest(dirOut)
        ]);
    };

    /**
     *  Makes a single markdown file from an .ejs template
     *
     *  @method   outputToExample
     *  @param {Array.String} command   The command to run.
     *  @param {Object} template        The .ejs template to use to create the .md file
     *  @param {String} dirOut          The output directory
     *  @param {String} fileOut         The output file name
     *  @return {Stream}                Gulp Stream
     */
    this.genSingleMarkdox = function (template, dirOut, fileOut) {
        return combiner.obj([
            markdox(template),
            concat(fileOut),
            gulp.dest(dirOut)
        ]);
    };

    /**
     *  Converts the output of a command to be used as an example in Markdown
     *
     *  @method   outputToExample
     *  @param {Array.String} command   The command to run.
     *  @param {Array.RegExp} filters   The regex filters for removing lines
     *  @param {String} dirOut          The output directory
     *  @param {String} fileOut         The output file name
     *  @return {Stream}                Gulp Stream
     */
    this.outputToExample = function (command, filters, dirOut, fileOut) {
        return combiner.obj([
            execFull(command, {
                pipeStdout: true
            }),
            deleteLines(filters),
            indent({
                tabs: true,
                amount: 1
            }),
            concat(fileOut),
            gulp.dest(dirOut)
        ]);
    };

    /**
     *  Formats files
     *
     *  @method   codeFormat
     *  @param {Array.String} src       An array of source file paths.
     *  @param {Class} formatter        The formatter to use
     *  @param {Object} format          The options for the formatter
     *  @return {Stream}                Gulp Stream
     */
    this.codeFormat = function (src, formatter, formatOpt) {
        return combiner.obj([
            gulp.src(src, ini.opt.inPlace),
            formatter(formatOpt),
            gulp.dest('./')
        ]);
    };

    /**
     *  Checks syntax of a filetype
     *
     *  @method   codeLint
     *  @param {Array.String} src       An array of source file paths.
     *  @param {Class} linter           The linter to use
     *  @param {Object} linterOpt       Options object for the linter
     *  @param {Object} reporterState   If the reporter is in a seperate method
     *  @return {Stream}                Gulp Stream
     */
    this.codeLint = function (src, linter, linterOpt, reporterState) {
        var tasks = [
            gulp.src(src),
            linter(linterOpt)
        ];

        if (reporterState) {
            tasks.push(linter.reporter());
            tasks.push(linter.reporter('fail'));
        }

        return combiner.obj(tasks);
    };
}
/**
 *  @function   middleWare
 *
 *  GulpScripts middle ware intercept function
 *
 *  @return  {Obj.GulpScripts}    The GulpScripts object
 */
var middleWare = function () {
    return new GulpScripts();
};
//  Export content
module.exports = middleWare;