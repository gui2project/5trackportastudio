/**
 *  This file holds the gulp task scripts, it is the task runner.
 *
 *  Examples:
 *      Usage
 *           gulp [TASK] [OPTIONS...]
 *
 *      Available tasks
 *          code.doc              Documents code base
 *          code.doc.js           Extracts documentation for JS code.
 *          code.format           Formats code base
 *          code.format.css       Formats CSS code.
 *          code.format.js        Formats JS code.
 *          code.format.json      Formats JSON code.
 *          code.lint             Performs all syntax tests
 *          code.lint.css         Checks css syntax.
 *          code.lint.jade        Checks jade/pug syntax.
 *          code.lint.js          Checks JS syntax.
 *          code.lint.json        Checks json syntax.
 *          code.prepare          Checks, formats, and documents code base
 *          git.cred.store        Tell git to store your credentials.
 *          git.error             Handle commong Git errors
 *          git.heroku            Pushes code to master branch, heroku branch, and deploys to heroku.
 *           --m="message"        Commit message to use.
 *          git.master            Pushes code to master branch.
 *           --m="message"        Commit message to use.
 *          help                  Display this help text.
 *          mongodb.config        Shows the MongoDB config file in json.
 *          mongodb.create        Creates MongoDB service on windows.
 *          mongodb.delete        Removes MongoDB service on windows.
 *          mongodb.start         Starts MongoDB service on windows.
 *          mongodb.stop          Stops MongoDB service on windows.
 *
 *  @name   gulpfile.js
 */

//  INCLUDES
var argv = require('yargs')
    .argv;
var concat = require('gulp-concat');
var exec = require('child_process')
    .exec;
var format_css = require('gulp-cssbeautify');
var format_js = require('gulp-jsbeautify');
var format_json = require('gulp-json-format');
var git = require('gulp-git');
var lint_css = require('gulp-csslint');
var lint_jade = require('gulp-jadelint');
var lint_js = require('gulp-jshint');
var lint_json = require("gulp-jsonlint");
var markdox = require("gulp-markdox");
var mkdirp = require('mkdirp');
var path = require('path');
var rm = require('gulp-rm');
var yaml = require('yamljs');
var removeHtmlComments = require('gulp-remove-html-comments');
//var jsdoc = require("gulp-jsdoc");

//  Get application root directory and system mode
var root = path.resolve(__dirname);
global.app = require('./server/lib/GlobalApplication.js')('gulp', root);
var ini = require(global.app.ini()); //  configuration object

//  LOCAL INCLUDES
var errorGulp = require(ini.path.errorGulp);

//  VARIABLES
var cfgMongoDB = yaml.load(ini.path.projectFiles.mongodb.cfg);

//  START GULP WITH HELP
var gulp = require('gulp-help')(require('gulp'), ini.opt.help);

//  DOCUMENTATION

//  JavaScript Documentation
gulp.task('code.doc.js', false, ['code.lint.js'],
    function () {
        return gulp.src(ini.path.projectFiles.js.loc)
            .pipe(markdox({
                template: ini.path.templateMd.js
            }))
            .pipe(concat('documentation-js.md'))
            .pipe(gulp.dest('./doc/'));
    });
//  Header for JS section
gulp.task('code.doc.js.head', false, ['code.doc.js'],
    function () {
        return gulp.src('./app.js')
            .pipe(markdox({
                template: ini.path.templateMd.jshead
            }))
            .pipe(concat('documentation-js-head.md'))
            .pipe(gulp.dest('./doc/'))
            .pipe(markdox({
                template: ini.path.templateMd.readme
            }))
            .pipe(concat('readme.md'))
            .pipe(gulp.dest('./doc/'));
    });
//  Merge into Readme
gulp.task('code.doc.merge', false, ['code.doc.js.head'],
    function () {
        return gulp.src(['./doc/Readme.md',
                './doc/documentation-js-head.md', './doc/documentation-js.md'
            ])
            .pipe(concat('Readme.md'))
            .pipe(gulp.dest('./doc/'));
    });
//  clean generated src readme files except for Readme.md
gulp.task('code.doc.clean', false, ['code.doc.merge'],
    function () {
        return gulp.src(['./doc/documentation-js-head.md', './doc/documentation-js.md'])
            .pipe(rm());
    });

//  CODE FORMATTERS

//  JavaScript
gulp.task('code.format.js', "Formats JS code.", [],
    function () {
        return gulp.src(ini.path.projectFiles.js.loc, ini.opt.inPlace)
            .pipe(format_js(require(ini.path.projectFiles.js.format)))
            .pipe(gulp.dest('./'));
    });
//  CSS
gulp.task('code.format.css', "Formats CSS code.", [],
    function () {
        return gulp.src(ini.path.projectFiles.css.loc, ini.opt.inPlace)
            .pipe(format_css(require(ini.path.projectFiles.css.format)))
            .pipe(gulp.dest('./'));
    });
//  JSON
gulp.task('code.format.json', "Formats JSON code.", [],
    function () {
        return gulp.src(ini.path.projectFiles.json.loc, ini.opt.inPlace)
            .pipe(format_json(4))
            .pipe(gulp.dest('./'));
    });

//  CODE LINTERS

//  JavaScript
gulp.task('code.lint.js', 'Checks JS syntax.', ['code.format.js'],
    function () {
        return gulp.src(ini.path.projectFiles.js.loc)
            .pipe(lint_js())
            .pipe(lint_js.reporter());
    });
//  Json
gulp.task('code.lint.json', 'Checks json syntax.', ['code.format.json'],
    function () {
        return gulp.src(ini.path.projectFiles.json.loc)
            .pipe(lint_json())
            .pipe(lint_json.reporter());
    });
//  CSS
gulp.task('code.lint.css', 'Checks css syntax.', ['code.format.css'],
    function () {
        return gulp.src(ini.path.projectFiles.css.loc)
            .pipe(lint_css(require(ini.path.projectFiles.css.linter)))
            .pipe(lint_css.reporter())
            .pipe(lint_css.failReporter());
    });
//  Jade/ Pug
gulp.task('code.lint.jade', 'Checks jade/pug syntax.', [],
    function () {
        return gulp
            .src(ini.path.projectFiles.jade.loc)
            .pipe(lint_jade(require(ini.path.projectFiles.jade.linter)));
    });

//  GIT TASKS

//  Remove git lock file
gulp.task('git.rm.lock', false, [],
    function () {
        return gulp.src('/.git/index.lock', ini.opt.git.lock)
            .pipe(rm());
    });
//  Run git add with -A option
gulp.task('git.add', false, ['code.prepare', 'git.rm.lock'],
    function () {
        return gulp.src('./')
            .pipe(git.add(ini.opt.git.add));
    });
//  Run git commit with -m option
gulp.task('git.commit', false, ['git.add'],
    function () {
        var message = argv.m ? argv.m : 'Pushing with Gulp.';
        return gulp.src('./')
            .pipe(git.commit(message));
    }, ini.opt.git.commit);
//  Run git pull
gulp.task('git.pull', false, ['git.commit'],
    function () {
        return git.pull('origin', 'master', errorGulp.git);
    });
//  Push to master
gulp.task('git.push.master', false, ['git.pull'],
    function () {
        return git.push('origin', 'master', errorGulp.git);
    });
//  Push to heroku
gulp.task('git.push.heroku', false, ['git.push.master'],
    function () {
        return git.push('origin', 'master:heroku', errorGulp.git);
    });
//  Store Credentials
gulp.task('git.cred.store', 'Tell git to store your credentials.', [],
    function () {
        var cmdStr = 'git config --global credential.helper store';
        exec(cmdStr, errorGulp.exec);
    });

//  WINDOWS SERVICES

//  Show translated configuration file to json
gulp.task('service.mongodb.show.config', false, [],
    function () {
        console.log(cfgMongoDB);
    });
//  Create necessary directories
gulp.task('service.mongodb.create.dirs', false, [],
    function () {
        var mpath = cfgMongoDB.systemLog.path.split('\\');
        mpath.pop();
        mkdirp(cfgMongoDB.storage.dbPath);
        mkdirp(mpath.join('\\'));
    });
//  Create MongoDB service
gulp.task('service.mongodb.create', false, ['service.mongodb.create.dirs'],
    function (cb) {
        var cmdStr = 'mongod.exe --config ' + ini.path.projectFiles.mongodb.cfg + ' --install';
        exec(cmdStr, errorGulp.exec);
    });
//  Stop MongoDB service
gulp.task('service.mongodb.stop', false, [],
    function (cb) {
        var cmdStr = 'net stop ' + cfgMongoDB.processManagement.windowsService.serviceName;
        exec(cmdStr, errorGulp.exec);
    });
//  Start MongoDB service
gulp.task('service.mongodb.start', false, [],
    function (cb) {
        var cmdStr = 'net start ' + cfgMongoDB.processManagement.windowsService.serviceName;
        exec(cmdStr, errorGulp.exec);
    });
//  Remove MongoDB service
gulp.task('service.mongodb.remove', false, ['service.mongodb.stop'],
    function (cb) {
        var cmdStr = 'sc.exe delete ' + cfgMongoDB.processManagement.windowsService.serviceName;
        exec(cmdStr, errorGulp.exec);
    });

//  DISPLAYED ROUTINES

//  MongoDB
gulp.task('mongodb.config', 'Shows the MongoDB config file in json.', ['service.mongodb.show.config']);
gulp.task('mongodb.create', 'Creates MongoDB service on windows.', ['service.mongodb.create']);
gulp.task('mongodb.start', 'Starts MongoDB service on windows.', ['service.mongodb.start']);
gulp.task('mongodb.stop', 'Stops MongoDB service on windows.', ['service.mongodb.stop']);
gulp.task('mongodb.delete', 'Removes MongoDB service on windows.', ['service.mongodb.remove']);

//  Code scripts
gulp.task('code.lint', 'Performs all syntax tests', ['code.lint.js', 'code.lint.json', 'code.lint.css', 'code.lint.jade']);
gulp.task('code.format', 'Formats code base', ['code.format.js', 'code.format.css', 'code.format.json']);
gulp.task('code.doc', 'Documents code base', ['code.doc.clean'], /*'code.doc.readme.new', */
    function () {
        return gulp.src(['./doc/readme.md', '/doc/documentation-js-header', './doc/documentation-js.md'])
            .pipe(concat('readme.md'))
            .pipe(gulp.dest('./doc/'));
    });
gulp.task('code.prepare', 'Checks, formats, and documents code base', ['code.format', 'code.lint', 'code.doc']);

//  Git updates
gulp.task('git.error', 'Handle commong Git errors', ['git.rm.lock']);
gulp.task('git.master', 'Pushes code to master branch.', ['git.push.master'],
    function () {},
    ini.opt.git.commit);
gulp.task('git.heroku', 'Pushes code to master branch, heroku branch, and deploys to heroku.', ['git.push.heroku'],
    function () {},
    ini.opt.git.commit);